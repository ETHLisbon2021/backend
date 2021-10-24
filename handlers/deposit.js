const Sale = require("../models/Sale");

async function handleDeposit(tokenAddress, user, amount) {
    const sale = await Sale.findOne({ saleId: tokenAddress.toLowerCase() });

    for (let i = 0; i < sale.users.length; i++) {
        if (sale.users[i].address.toLowerCase() === user.toLowerCase()) {
            return;
        }
    }

    sale.users.push({
        address: user.toLowerCase(),
        amount: amount
    });

    await sale.save();

    console.log(`Users ${user} deposited to sale ${tokenAddress}`);
}

module.exports = { handleDeposit };