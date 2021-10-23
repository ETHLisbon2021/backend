const Sale = require("../models/Sale");

async function handleDeposit(tokenAddress, user, amount) {
    const sale = await Sale.findOne({ saleId: tokenAddress.toLowerCase() });

    sale.users.push({
        address: user.toLowerCase(),
        amount: amount
    });

    await sale.save();

    console.log(`Users ${user} deposited to sale ${tokenAddress}`);
}

module.exports = { handleDeposit };