const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
    prompt: String,
    answer: String,
});

module.exports = mongoose.model("Prompt", PromptSchema);

