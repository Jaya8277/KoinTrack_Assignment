const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  popularity: { type: Number, default: 0 },
  user_id: String,
});

module.exports = mongoose.model("questiondata", questionSchema);
