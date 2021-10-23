const pinataSDK = require('@pinata/sdk');
require('dotenv').config();

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

module.exports = { pinata };