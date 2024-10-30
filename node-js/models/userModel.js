const db = require('../config/database');

  exports.createUser = async ({ name, email, phone_number, password, dob }) => {
     const query = 'INSERT INTO user_accounts (name, email, phone_number, password_hash,dob) VALUES (?, ?, ?, ?, ?)';
     await db.query(query, [name, email, phone_number, password, dob]);
 };


exports.getProfile = async({user_id}) => {
    console.log(`userid:${user_id}`)
    try {
        const query = `SELECT * FROM user_accounts WHERE user_id = '${user_id}' `;
        console.log(`sql query: ${query}`)
        const [rows] = await db.query(query);
        
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
exports.checkExisting = async({ email }) => {
    const query = `SELECT email FROM user_accounts where email='${email}'`;
    const [existingUser] = await db.query(query)
    return existingUser
}

exports.login = async({email}) => {
    const query = 'SELECT * FROM user_accounts WHERE email=?'
    const [user] = await db.query(query, [email])
    return user;
}