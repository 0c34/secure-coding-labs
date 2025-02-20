import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.security.KeyStore
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey

object KeyStoreHelper {

    private const val KEY_ALIAS = "MyHMACKey"

    // Generates and stores the HMAC key in the Android Keystore
    fun generateHMACKey() {
        try {
            val keyGenerator = KeyGenerator.getInstance(
                KeyProperties.KEY_ALGORITHM_HMAC_SHA256, "AndroidKeyStore"
            )
            keyGenerator.init(
                KeyGenParameterSpec.Builder(KEY_ALIAS, KeyProperties.PURPOSE_SIGN)
                    .setDigests(KeyProperties.DIGEST_SHA256)
                    .build()
            )
            keyGenerator.generateKey()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    // Retrieves the HMAC key from the Android Keystore
    fun getHMACKey(): SecretKey? {
        return try {
            val keyStore = KeyStore.getInstance("AndroidKeyStore")
            keyStore.load(null)
            keyStore.getKey(KEY_ALIAS, null) as? SecretKey
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}