const Criterion = require("../models/Criterion");
const { getERC20Criterion } = require("./erc20");
const { getERC721Criterion } = require("./erc721");
const { getPoapCriterion } = require("./poap");
const { getLiquidityCriterion } = require("./liquidity");
const { CRITERIA } = require("../constants");

async function getCriterion(id, account) {
    const criterion = await Criterion.findById(id);
    switch(criterion.kind) {
        case CRITERIA.ERC20:
            return await getERC20Criterion(criterion, account);
        case CRITERIA.ERC721:
            return await getERC721Criterion(criterion, account);
        case CRITERIA.POAP:
            return await getPoapCriterion(criterion, account);
        case CRITERIA.LIQUIDITY:
            return await getLiquidityCriterion(criterion, account);
        default:
            return 0;
    }
}

module.exports = { getCriterion };