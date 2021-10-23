const { providers, Contract } = require('ethers');
require('dotenv').config();

const eligibleAbi = require("./abi/eligible.json");

const criteriaProvider = new providers.WebSocketProvider(process.env.CRITERIA_WS_URL);

const eligibleProvider = new providers.WebSocketProvider(process.env.ELIGIBLE_WS_URL);
const eligible = new Contract(process.env.ELIGIBLE_ADDRESS, eligibleAbi, eligibleProvider);

module.exports = { criteriaProvider, eligibleProvider, eligible };