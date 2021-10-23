const Sale = require("../models/Sale");

async function handleSale(tokenAddress, initiator) {
    const sale = new Sale({
        saleId: tokenAddress.toLowerCase(),
        owner: initiator.toLowerCase(),
        users: []
    });
    await sale.save();
    console.log(`Created new sale for token ${sale.saleId}`);
}

module.exports = { handleSale };