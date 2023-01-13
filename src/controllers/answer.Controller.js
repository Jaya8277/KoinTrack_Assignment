const answerSchema = require("../models/answerSchema");
var jwt = require("jsonwebtoken");
const adminModel = require("../models/UserSchema");
const UserSchema = require("../models/UserSchema");
const questionSchema = require("../models/questionSchema");


//Get all answers

const getAnswer = async (req, res) => {
  try {
    const id = req.params.id;
    const Answers = await answerSchema.find({
      question_id: id,
    });
    console.log(Answers);

    return res.status(200).send({
      status: true,
      message: "Data Got Successfullt",
      data: Answers,
    });
  } catch (error) {
    return res.status(401).send({
      status: true,
      message: "No answer of question",
      error,
    });
  }
};


// Add answers

const AddAnswer = async (req, res) => {
  try {
    const id = req.params.id;

    const { answer_description } = req.body;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const userDetail = jwt.verify(token, process.env.SECRET);

    const AnswerQuestion = await questionSchema.findOne({
      _id: id,
    });

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const Answer = await answerSchema.create({
      answer_description: answer_description,
      submitted_by: userDetail.name,
      creation_date: null,
      last_update_date: dateTime,
      question_id: AnswerQuestion._id,
    });

    return res.status(201).send({
      success: true,
      message: "Answer Added Successfully",
      Answer,
    });
  } catch (error) {
    console.log(error);
    return res.status(201).send({
      success: false,
      message: "Some Error Occured",
      error,
    });
  }
};
module.exports = { AddAnswer, getAnswer };
