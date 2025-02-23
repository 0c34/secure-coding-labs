const Citize = require('../models/citizenModel');

exports.insertCitizen = async (req, res) => {
    try {
        await Citize.insertCitizen();
        res.json({ message: 'Citizen inserted successfully' });
    } catch (error) {
        console.error('Error inserting citizen:', error);
        res.status(500).send('Internal Server Error');
    }
}
exports.getCitizen = async (req, res) => {
    try {
        const citizen = await Citize.getCitizen();
        res.json(citizen);
    } catch (error) {
        console.error('Error fetching citizen:', error);
        res.status(500).send('Internal Server Error');
    }
}