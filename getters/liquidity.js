const fetch = require('node-fetch');

const { AAVE_SUBGRAPH_ENDPOINT, CURVE_SUBGRAPH_ENDPOINT } = require("../constants");

async function getAaveLiquidity(account) {
    const query = `{
      deposits(first: 1, where: {
        user: "${account}"
      }) {
        id
      }
    }`;

    const response = await fetch(AAVE_SUBGRAPH_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query
        })
    });
    const result = await response.json();

    return (result?.data?.deposits?.length && result?.data?.deposits?.length > 0);
}

async function getCurveLiquidity(account) {
    const query = `{
      addLiquidityEvents(first: 1, where: {
        provider: "${account}"
      }) {
        id
      }
    }`;

    const response = await fetch(CURVE_SUBGRAPH_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query
        })
    });
    const result = await response.json();

    return (result?.data?.addLiquidityEvents?.length && result?.data?.addLiquidityEvents?.length > 0);
}

async function getLiquidityCriterion(criterion, account) {
    let result = false;
    switch(criterion.value) {
        case "AAVE":
            result = await getAaveLiquidity(account);
            break;
        case "CURVE":
            result = await getCurveLiquidity(account);
            break;
        default:
            break;
    }
    const score = result ? criterion.score : 0;
    console.log(`Calculated liquidity criterion ${criterion._id} for ${account}, score is ${score}`);
    return score;
}

module.exports = { getLiquidityCriterion };