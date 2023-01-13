const express = require("express");
const questionRoutes = express.Router();

const {
  CreateQuestion,
  UpdateQuestion,
  GetQuestion,
} = require("../controllers/question.Controller");

questionRoutes.post("/create", CreateQuestion);
questionRoutes.put("/update/:id", UpdateQuestion);
questionRoutes.get("/get", GetQuestion);

module.exports = questionRoutes;
