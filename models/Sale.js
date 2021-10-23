const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    saleId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    owner: {
        type: String,
        required: true
    },
    totalCap: {
        type: String,
        required: true
    },
    maxDeposit: {
        type: String,
        required: true
    },
    preset: String,
    users: [
        {
            address: String,
            score: Number,
            allocation: String,
            amount: String
        }
    ],
    ipfsHash: String,
    calculated: Boolean
});

module.exports = Sale = mongoose.model('sale', SaleSchema);