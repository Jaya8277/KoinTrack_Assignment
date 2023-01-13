const express = require("express");
const answerRoutes = express.Router();

const { AddAnswer, getAnswer } = require("../controllers/answer.Controller");

answerRoutes.post("/submit/:id", AddAnswer);

answerRoutes.get("/get", getAnswer);

module.exports = answerRoutes;
