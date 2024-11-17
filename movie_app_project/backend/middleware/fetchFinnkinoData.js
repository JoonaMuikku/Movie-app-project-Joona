const axios = require('axios');
const { Parser } = require('xml2js');
require('dotenv').config(); // Load environment variables from .env file

const parser = new Parser(); // Initialize XML parser

const fetchFinnkinoData = async (theatreId) => {
    try {
        const finnkinoURL = process.env.FINNKINO_URL; // Load URL from .env
        if (!finnkinoURL) {
            throw new Error('Finnkino URL is not defined in the environment variables');
        }

        const response = await axios.get(`${finnkinoURL}?area=${theatreId}`, {
            headers: {
                'Accept': 'application/xml',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        // Parse XML to JSON and return the result
        return new Promise((resolve, reject) => {
            parser.parseString(response.data, (err, result) => {
                if (err) {
                    reject('Failed to parse XML data');
                } else {
                    resolve(result);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching schedules:', error.message);
        throw new Error('Error fetching schedules');
    }
};

module.exports = { fetchFinnkinoData };
