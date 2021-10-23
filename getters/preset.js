const Preset = require("../models/Preset");
const { getCriterion } = require("./criterion");

async function getPreset(id, account) {
    const preset = await Preset.findById(id);
    let score = 0;
    for (let i = 0; i < preset.criteria.length; i++) {
        try {
            score += await getCriterion(preset.criteria[i], account);
        } catch (e) {
            console.log(`Criteria ${id} failed for ${account}, skipping. Error: ${e}`);
        }
    }

    console.log(`Calculated preset ${id} (${preset.name}) for ${account}, score is ${score}`);
    return score;
}

module.exports = { getPreset };