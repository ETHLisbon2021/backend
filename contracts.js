const { providers, Contract, Wallet } = require('ethers');
require('dotenv').config();

const eligibleAbi = require("./abi/eligible.json");

const criteriaProvider = new providers.WebSocketProvider(process.env.CRITERIA_WS_URL);

const eligibleProvider = new providers.WebSocketProvider(process.env.ELIGIBLE_WS_URL);
const eligible = new Contract(process.env.ELIGIBLE_ADDRESS, eligibleAbi, eligibleProvider);

const wallet = new Wallet(process.env.PRIVATE_KEY);
const connectedElligible = eligible.connect(wallet.connect(eligibleProvider));

module.exports = { criteriaProvider, eligibleProvider, eligible: connectedElligible };