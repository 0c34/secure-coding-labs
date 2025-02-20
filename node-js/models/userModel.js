const db = require('../config/database');

  exports.createUser = async ({ name, email, phone_number, password, dob }) => {
     const query = 'INSERT INTO user_accounts (name, email, phone_number, password_hash,dob) VALUES (?, ?, ?, ?, ?)';
     await db.query(query, [name, email, phone_number, password, dob]);
 };


exports.getProfile = async({user_id}) => {
    console.log(`userid:${user_id}`)
    try {
        const query = 'SELECT * FROM user_accounts WHERE user_id = ?';
        console.log(`sql query: ${query}`)
        const [rows] = await db.query(query, [user_id]);
        
        if (rows.length === 0) {
            console.log(`No data found for user_id: ${user_id}`);
            return null;
        }
        
        console.log('Data:', rows[0]);
        return rows[0];
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}
exports.updateProfile = async({name, email, phone_number, dob, user_id}) => {
    try {
        const query = `UPDATE user_accounts 
               SET name = '${name}', 
                   email = '${email}', 
                   phone_number = '${phone_number}', 
                   dob = '${dob}' 
               WHERE user_id = '${user_id}'`;

        const update = await db.query(query);
        console.log('Profile updated:', update);
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}
exports.checkExisting = async({ email }) => {
    const query = 'SELECT email FROM user_accounts where email=?';
    const [existingUser] = await db.query(query,[email])
    return existingUser
}

exports.login = async({email}) => {
    const query = 'SELECT * FROM user_accounts WHERE email=?'
    const [user] = await db.query(query, [email])
    return user;
}