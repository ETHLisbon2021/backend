const { Contract } = require('ethers');
const { criteriaProvider } = require("../contracts");

const erc721ABi = require("../abi/erc721.json");

async function getERC721Balance(token, account) {
    const contract = new Contract(token, erc721ABi, criteriaProvider);
    return await contract.balanceOf(account);
}

async function getERC721Criterion(criterion, account) {
    const balance = await getERC721Balance(criterion.contract, account);
    let score;
    if (balance.gte(criterion.value)) {
        score = criterion.score;
    } else {
        score = 0;
    }
    console.log(`Calculated ERC721 criterion ${criterion._id} for ${account}, score is ${score}`);
    return score;
}


module.exports = { getERC721Criterion };