const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer_description: String,
  submitted_by: String,
  creation_date: String,
  last_update_date: String,
  question_id: String,
});

module.exports = mongoose.model("answerdata", answerSchema);
