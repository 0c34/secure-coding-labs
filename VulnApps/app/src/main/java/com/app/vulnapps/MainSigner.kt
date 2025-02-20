package com.app.vulnapps

import android.util.Log
object MainSigner {

    fun generateAndSign(dataToSign: String): String? {
        KeyStoreHelper.generateHMACKey()
        val secretKey = KeyStoreHelper.getHMACKey()
        Log.i("HMAC Key","KEY:${secretKey}")
        return HMACSigner.signData(dataToSign)
    }
}