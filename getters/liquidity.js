const fetch = require('node-fetch');

const {
    AAVE_SUBGRAPH_ENDPOINT,
    CURVE_SUBGRAPH_ENDPOINT,
    UNISWAP_V2_SUBGRAPH_ENDPOINT,
    UNISWAP_V3_SUBGRAPH_ENDPOINT,
    MAKER_SUBGRAPH_ENDPOINT
} = require("../constants");

async function getSubgraphLiquidity(endpoint, query, fieldName) {
    const response = await fetch(endpoint, {
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
    const length = (result?.data ?? {})[fieldName]?.length ?? 0;
    return length > 0;
}

async function getAaveLiquidity(account) {
    const query = `{
      deposits(first: 1, where: {
        user: "${account}"
      }) {
        id
      }
    }`;
    return await getSubgraphLiquidity(AAVE_SUBGRAPH_ENDPOINT, query, "deposits");
}

async function getCurveLiquidity(account) {
    const query = `{
      addLiquidityEvents(first: 1, where: {
        provider: "${account}"
      }) {
        id
      }
    }`;
    return await getSubgraphLiquidity(CURVE_SUBGRAPH_ENDPOINT, query, "addLiquidityEvents");
}

async function getUniswapLiquidity(account) {
    const query = `{
      mints(first: 1, where: {
        sender: "${account}"
      }) {
        id
      }
    }`;
    const v2 = await getSubgraphLiquidity(UNISWAP_V2_SUBGRAPH_ENDPOINT, query, "mints");
    const v3 = await getSubgraphLiquidity(UNISWAP_V3_SUBGRAPH_ENDPOINT, query, "mints");
    return v2 || v3;
    return false;
}

async function getMakerLiquidity(account) {
    const query = `{
      cdps(first: 1, where: {
        owner: "${account}"
      }) {
        id
      }
    }`;
    return await getSubgraphLiquidity(MAKER_SUBGRAPH_ENDPOINT, query, "cdps");
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
        case "UNISWAP":
            result = await getUniswapLiquidity(account);
            break;
        case "MAKER":
            result = await getMakerLiquidity(account);
            break;
        default:
            break;
    }
    const score = result ? criterion.score : 0;
    console.log(`Calculated liquidity criterion ${criterion._id} for ${account}, score is ${score}`);
    return score;
}

module.exports = { getLiquidityCriterion };