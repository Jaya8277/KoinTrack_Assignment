const questionSchema = require("../models/questionSchema");
var jwt = require("jsonwebtoken");
const adminModel = require("../models/UserSchema");
const answerSchema = require("../models/answerSchema");

//Get All Questions
const GetQuestion = async (req, res) => {
  try {
    const Getquestions = await questionSchema.find({});

    return res.status(201).send({
      success: true,
      message: "get All questions",
      data: Getquestions,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Some Error Occured",
      error,
    });
  }
};

//Create Questions
const CreateQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    const { authorization } = req.headers;

    // console.log(authorization);

    const token = authorization.split(" ")[1];

    const userDetail = jwt.verify(token, process.env.SECRET);
    // console.log(userDetail.email);

    const loggedUser = await adminModel.findOne({ email: userDetail.email });
    // console.log(loggedUser._id, loggedUser, 19);

    const Question = await questionSchema.create({
      question,
      user_id: loggedUser._id,
    });

    return res.status(201).send({
      success: true,
      message: "Succesfully Created",
      Question,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Some Error Occured",
      error,
    });
  }
};


//Update Questions 

const UpdateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const { authorization } = req.headers;
    // console.log(authorization);
    const token = authorization.split(" ")[1];
    // console.log(token);
    const userDetail = jwt.verify(token, process.env.SECRET);
    // console.log(userDetail);

    const questionEdit = await questionSchema.findOne({
      user_id: userDetail.uid,
    });
    // console.log(questionEdit._id.valueOf())
    const popularity1 = await answerSchema.find({
      question_id: questionEdit._id.valueOf(),
    });

    // console.log(popularity1)

    // console.log(questionEdit.popularity, 72);

    if (userDetail.uid != questionEdit.user_id) {
      return res.status(400).send({
        success: true,
        message: "You are unauthorized",
      });
    }
    const Question = await questionSchema.findByIdAndUpdate(id, {
      question: req.body.question,
      user_id: userDetail.uid,
      popularity: popularity1.length,
    });

    // console.log(Question);

    if (Question == null) {
      return res.status(401).send({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Succesfully Updated",

      Question,
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
module.exports = { CreateQuestion, UpdateQuestion, GetQuestion };
