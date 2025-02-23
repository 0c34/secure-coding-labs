const db = require('../config/database');
const { fakerID_ID } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/*
CREATE TABLE IF NOT EXISTS citizen (
            citizen_id VARCHAR(255) PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20),
            dob DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`*/

exports.insertCitizen = async () => {
    const query = 'INSERT INTO citizen (citizen_id, first_name, last_name, email, phone_number, dob) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
        uuidv4(),
        fakerID_ID.person.firstName(),
        fakerID_ID.person.lastName(),
        fakerID_ID.internet.email(),
        fakerID_ID.phone.number(),
        fakerID_ID.date.past()
    ]
    await db.query(query, values);
}