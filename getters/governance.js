const fetch = require('node-fetch');

const {
    AAVE_GOVERNANCE_SUBGRAPH_ENDPOINT,
    MAKER_GOVERNANCE_SUBGRAPH_ENDPOINT
} = require("../constants");

async function getSubgraphGovernance(endpoint, query, fieldName) {
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

async function getAaveGovernance(account) {
    const query = `{
      votes(first: 1, where: {
        voter: "${account}"
      }) {
        id
      }
    }`;

    return await getSubgraphGovernance(AAVE_GOVERNANCE_SUBGRAPH_ENDPOINT, query, "votes");
}

async function getMakerGovernance(account) {
    const query = `{
      pollVotes(first: 1, where: {
        voter: "${account}"
      }) {
        id
      }
    }`;

    return await getSubgraphGovernance(MAKER_GOVERNANCE_SUBGRAPH_ENDPOINT, query, "pollVotes");
}

async function getGovernanceCriterion(criterion, account) {
    let result = false;
    switch(criterion.value) {
        case "AAVE":
            result = await getAaveGovernance(account);
            break;
        case "MAKER":
            result = await getMakerGovernance(account);
            break;
        default:
            break;
    }
    const score = result ? criterion.score : 0;
    console.log(`Calculated governance criterion ${criterion._id} for ${account}, score is ${score}`);
    return score;
}

module.exports = { getGovernanceCriterion };