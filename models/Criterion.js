const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CriterionSchema = new Schema({
    kind: {
        type: String,
        required: true
    },
    contract: String,
    value: String,
    score: {
        type: Number,
        required: true
    }
});

module.exports = Criterion = mongoose.model('criterion', CriterionSchema);