const { Contract } = require('ethers');
const { criteriaProvider } = require("../contracts");

const erc20ABi = require("../abi/erc20.json");

async function getERC20Balance(token, account) {
    const contract = new Contract(token, erc20ABi, criteriaProvider);
    return await contract.balanceOf(account);
}

async function getERC20Criterion(criterion, account) {
    const balance = await getERC20Balance(criterion.contract, account);
    let score;
    if (balance.gte(criterion.value)) {
        score = criterion.score;
    } else {
        score = 0;
    }
    console.log(`Calculated ERC20 criterion ${criterion._id} for ${account}, score is ${score}`);
    return score;
}

module.exports = { getERC20Criterion };