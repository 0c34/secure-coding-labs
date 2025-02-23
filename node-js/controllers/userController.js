const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const md5 = require('md5');


const JWT_SECRET = 'securecodesecret'
const saltRounds = 10;
const HMAC_KEY = 'mykey321';

exports.getProfile = async (req, res) =>{
    const userId = req.session.user_id
    if (!userId){
        return res.status(400).send("User ID is requeired")
    }
    try{
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

exports.updateProfile = async (req, res) => {
    const {user_id, name, email, phone_number, dob} = req.body;

    if (!user_id) {
        return res.status(400).send('User ID is required');
    }

    try {
        await User.updateProfile({name, email, phone_number, dob, user_id: user_id});
        res.json({message: 'Profile updated successfully'});
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).send('Internal Server Error');
    }
}

// Resister user
exports.registerPage = (req, res) => {
    res.render('register');
};

exports.registerUser = async (req, res) => { 
    const { name, email, phone_number, password, dob } = req.body;

    const isExsisting = await User.checkExisting({email})

    if(isExsisting.length > 0){
        return res.status(400).send('Email already exists. Please use a different email.');
    }else{
        const hashedPassword = md5(password);
        //const hashedPassword = await bcrypt.hash(password, saltRounds);

        try {
            await User.createUser({ name, email, phone_number, password: hashedPassword, dob });
            res.json({message: 'User registered successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).send('Error registering user');
        }
    }
};

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.login({email:email});
        if(!user || user.length === 0){
            return res.status(401).json({message:'Invalid email or password'});
        }
        if (user[0] && await comparePassword(password, user[0].password_hash)){
            const user_id = user[0].user_id;
            const user_name = user[0].name;
            req.session.user_id = user_id;
            req.session.user_name = user_name;
            req.session.role = user[0].role;
            res.status(200).json({page: 'home'});
        }else{
            res.status(401).json({message:'Invalid email or password'});
        }
    }catch (err){
            console.error('Error logging in user:', err);
            res.status(500).send('Internal Server Error');
        }

}
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}
exports.getUsers = async (req, res) => {
    try {
        const users = await User.getUsers();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
}
exports.usersPage = async (req, res) => {
        res.render('users');
}

//API and Mobile login
generateToken = async (user_id, secret) => {
    const token = jwt.sign({user_id}, secret, {expiresIn:'1h'})
    return token
}

exports.loginPage = (req, res) => {
    res.render('login');
}

// Function to sign data and return HMAC signature
function signData(data) {
    const hmac = crypto.createHmac('sha256', HMAC_KEY);
    hmac.update(data);
    return hmac.digest('base64'); // Return Base64-encoded signature
}

// Function to verify the HMAC signature
function verifySignature(data, signature) {
    const computedSignature = signData(data);
    return computedSignature === signature; // Compare computed signature with provided signature
}

comparePassword = async (inputPassword, storedHash) => {

    const hashedInputPassword = md5(inputPassword);
    return hashedInputPassword === storedHash;
};

exports.loginMobile = async(req, res) => {
    const {email, password} = req.body
    const user = await User.login({email:email})
    if (user[0] && await comparePassword(password, user[0].password_hash)){
        user_id = user[0].user_id
        phone_number = user[0].phone_number
        user_email = user[0].email

        token = await generateToken(user_id,JWT_SECRET)

        res.json({token:token, data:{user_id,phone_number,user_email}})
    }else{
        res.status(401).json({message:'Invalid email or password'})
    }
}