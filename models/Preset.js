const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PresetSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    name: String,
    description: String,
    criteria: [
        String
    ]
});

module.exports = Preset = mongoose.model('preset', PresetSchema);