const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const JWT_SECRET = 'securecodesecret'

exports.getProfile = async (req, res) =>{
    const userId = req.user.user_id//req.query.user_id
    if (!userId){
        return res.status(400).send("User ID is requeired")
    }
    try{
        console.log(`userid:${userId}`)
        const profile = await User.getProfile({user_id: userId})
        if (!profile) {
            return res.status(404).send('User not found');
        }
        res.render('home', {profile});
    }catch(error){
        console.error('Error fetching user profile:', error);
        res.status(500).send(`Internal Server Error${error}`);
    }

};

exports.registerPage = (req, res) => {
    res.render('register');
};

// Handle user registration

exports.registerUser = async (req, res) => {
    const { name, email, phone_number, password, dob } = req.body;

    const isExsisting = await User.checkExisting({email})

    if(isExsisting.length > 0){
        return res.status(400).send('Email already exists. Please use a different email.');
    }else{
        const hashedPassword = md5(password);

        try {
            await User.createUser({ name, email, phone_number, password: hashedPassword, dob });
            res.send('User registered successfully!');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error registering user');
        }
    }
};


comparePassword = async (inputPassword, storedHash) => {

    const hashedInputPassword = md5(inputPassword);
    return hashedInputPassword === storedHash;
};

generateToken = async (user_id, secret) => {
    const token = jwt.sign({user_id}, secret, {expiresIn:'1h'})
    return token
}

exports.loginPage = (req, res) => {
    res.render('login');
}
exports.login = async(req, res) => {
    const {email, password} = req.body
    const user = await User.login({email:email})
    if (user[0] && await comparePassword(password, user[0].password_hash)){
        user_id = user[0].user_id
        token = await generateToken(user_id,JWT_SECRET)
        res.cookie('token', token);
        res.json({user_id})
    }else{
        res.status(401).json({message:'Invalid email or password'})
    }
}