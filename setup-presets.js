const Criterion = require("./models/Criterion");
let Preset = require("./models/Preset");
const { CRITERIA } = require("./constants");

async function setupPresets() {
    const tokenCriterion = new Criterion({
        kind: CRITERIA.ERC20,
        contract: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        value: "1000000",
        score: 5
    });
    await tokenCriterion.save();

    const poapCriterion = new Criterion({
        kind: CRITERIA.POAP,
        value: "9043",
        score: 7
    });
    await poapCriterion.save();

    const preset = new Preset({
        owner: "1",
        criteria: [tokenCriterion._id, poapCriterion._id]
    });
    await preset.save();
}

module.exports = {setupPresets}