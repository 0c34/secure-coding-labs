package com.app.vulnapps


import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import android.content.Context
import android.content.SharedPreferences
import android.content.Intent
import android.os.Build
import javax.crypto.Cipher
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec
import android.util.Base64
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.security.KeyStore
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey


class MainActivity : AppCompatActivity() {
    lateinit var usernameInput : EditText
    lateinit var passwordInput : EditText
    lateinit var loginBtn: Button
    private lateinit var sharedPreferences: SharedPreferences
    private lateinit var credentialManager: CredentialManager


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        generateKey()
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        usernameInput = findViewById(R.id.username_input)
        passwordInput = findViewById(R.id.password_input)
        loginBtn = findViewById(R.id.logn_btn)

        sharedPreferences = getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)
        credentialManager = CredentialManager()

        loginBtn.setOnClickListener{
            val username = usernameInput.text.toString()
            val password = passwordInput.text.toString()
            login(username,password)
            Log.i("Test credentials", "Username: $username and Password: $password")
        }
    }
    private fun login(username: String, password: String) {
        val urlString = credentialManager.loginUrl //"http://10.0.2.2/get-token"  // Use 10.0.2.2 for localhost in Android emulator
        val jsonInputString = JSONObject().apply {
            put("email", username)
            put("password", password)
        }.toString()
        val signature = MainSigner.generateAndSign(jsonInputString)
        val bodyReq = JSONObject().apply {
            put("email", username)
            put("password", password)
            put("signature", signature)
        }.toString()
        Thread {
            try {
                val url = URL(urlString)
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/json")
                connection.doOutput = true

                // Send login data
                OutputStreamWriter(connection.outputStream).use { writer ->
                    writer.write(bodyReq)
                }

                // Read the response
                val responseCode = connection.responseCode
                val responseMessage = StringBuilder()

                BufferedReader(InputStreamReader(connection.inputStream)).use { reader ->
                    var line: String?
                    while (reader.readLine().also { line = it } != null) {
                        responseMessage.append(line)
                    }
                }

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    val jsonResponse = JSONObject(responseMessage.toString())
                    val token = jsonResponse.getString("token") // Adjust this based on your backend response structure
                    val dataObject = jsonResponse.getJSONObject("data")
                    val userId = dataObject.getInt("user_id")
                    val phoneNumber = dataObject.getString("phone_number")
                    val userEmail = dataObject.getString("user_email")

                    Log.i("Response", "Login Response: $jsonResponse")
                    //Log.i("Login", "Token received: $token")

                    // Store token in SharedPreferences
                    sharedPreferences.edit().apply {
                        /*putString("auth_token", encryptData((token)))
                        putInt("user_id",userId)
                        putString("phone_number", encryptData(phoneNumber))
                        putString("email", encryptData(userEmail))
                        putString("auth_token", encryptData((token)))*/

                        putInt("user_id",userId)
                        putString("phone_number", phoneNumber)
                        putString("email", userEmail)
                        apply()
                    }
                    val intent = Intent(this, SuccessActivity::class.java)
                    startActivity(intent)
                    finish()

                    runOnUiThread {
                        Log.i("Login", "Login successful!")
                    }
                } else {
                    Log.i("Login", "Login failed! Response Code: $responseCode")
                }

            } catch (e: Exception) {
                Log.e("Login", "Error: ${e.message}")
            }
        }.start()
    }

    private fun generateKey() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
            val keyGenParameterSpec = KeyGenParameterSpec.Builder(
                "alias-key",
                KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
            )
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .build()

            keyGenerator.init(keyGenParameterSpec)
            keyGenerator.generateKey()
        } else {
        }
    }

    private  fun encryptData(data: String): String {
        val keyStore = KeyStore.getInstance("AndroidKeyStore")
        keyStore.load(null)
        val secretKey = keyStore.getKey("alias-key", null) as SecretKey
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        cipher.init(Cipher.ENCRYPT_MODE, secretKey)
        val iv = cipher.iv
        val encryptedData = cipher.doFinal(data.toByteArray())
        val ivAndEncryptedData = iv + encryptedData
        return Base64.encodeToString(ivAndEncryptedData, Base64.DEFAULT)
    }
    fun decryptData(encryptedData: ByteArray): String? {
        val keyStore = KeyStore.getInstance("AndroidKeyStore")
        keyStore.load(null)

        val iv = encryptedData.take(12).toByteArray()
        val cipherText = encryptedData.drop(12).toByteArray()

        val secretKeyEntry = keyStore.getKey("alias-key", null) as SecretKey
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        cipher.init(Cipher.DECRYPT_MODE, secretKeyEntry, GCMParameterSpec(128, iv))

        return String(cipher.doFinal(cipherText), Charsets.UTF_8)
    }
}
