const Sale = require("../models/Sale");
const { eligible } = require("../contracts");

async function handleSale(tokenAddress, initiator) {
    const saleData = await eligible.sales(tokenAddress);
    const sale = new Sale({
        saleId: tokenAddress.toLowerCase(),
        owner: initiator.toLowerCase(),
        totalCap: saleData.totalCap.toString(),
        maxDeposit: saleData.maxDeposit.toString(),
        users: []
    });
    await sale.save();
    console.log(`Created new sale for token ${sale.saleId}`);
}

module.exports = { handleSale };