package com.app.vulnapps

import android.util.Base64
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

object HMACSigner {

    private const val HMAC_KEY = "mykey321"  // Hardcoded HMAC key

    fun signData(data: String): String? {
        return try {
            // Convert the string key to a byte array
            val secretKeySpec = SecretKeySpec(HMAC_KEY.toByteArray(), "HmacSHA256")

            // Initialize Mac instance with the secret key
            val mac = Mac.getInstance("HmacSHA256")
            mac.init(secretKeySpec)

            // Sign the data
            val hmac = mac.doFinal(data.toByteArray())

            // Convert the HMAC to a Base64 encoded string
            Base64.encodeToString(hmac, Base64.NO_WRAP)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}