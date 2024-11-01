package com.app.vulnapps

class CredentialManager {
    // Hardcoded credentials (for demonstration purposes only)
    private val apiKey = "12345ABCDE67890FGHIJ"
    private val ftpPassword = "localFTP!@#"
    val loginUrl = "http://10.0.3.2/get-token"

    // Function to get API key
    fun getApiKey(): String {
        return apiKey
    }

    // Function to get FTP password
    fun getFtpPassword(): String {
        return ftpPassword
    }

    // Function to print credentials (for demonstration purposes)
    fun printCredentials() {
        println("API Key: $apiKey")
        println("FTP Password: $ftpPassword")
    }
}