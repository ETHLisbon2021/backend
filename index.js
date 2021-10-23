const mongoose = require('mongoose');
const { queue } = require("async");
require('dotenv').config();

const { eligible } = require("./contracts");
const { handleSale } = require("./handlers/sale");
const { handleDeposit } = require("./handlers/deposit");
const { createApp } = require("./app");

mongoose
    .connect(
        `mongodb://mongo:27017/eligible`,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

eligible.on("SaleInitiated", handleSale);
eligible.on("Deposited", handleDeposit);

const calculationQueue = queue((task, callback) => {
    task().then(callback);
})

createApp(calculationQueue);