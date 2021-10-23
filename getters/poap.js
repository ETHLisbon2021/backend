const fetch = require('node-fetch');

const {POAP_SUBGRAPH_ENDPOINT} = require("../constants");

async function getPoap(eventId, account) {
    const query = `{
        tokens(where: {
            owner: "${account.toLowerCase()}",
            event: "${eventId}"
        }) {
            id
            owner {
                id
            }
            event {
                id
            }
        }
    }`;

    const response = await fetch(POAP_SUBGRAPH_ENDPOINT, {
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

    return (result?.data?.tokens?.length && result?.data?.tokens?.length > 0);
}

async function getPoapCriterion(criterion, account) {
    let score;
    if (await getPoap(criterion.value, account)) {
        score = criterion.score;
    } else {
        score = 0;
    }
    console.log(`Calculated POAP criterion ${criterion._id} for ${account}, score is ${score}`);
    return score;
}

module.exports = { getPoapCriterion };