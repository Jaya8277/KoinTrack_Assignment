const express = require("express");

const authRoutes = express.Router();

const { signup, Login } = require("../controllers/User.Controller");

authRoutes.post("/register", signup);
authRoutes.post("/login", Login);

module.exports = authRoutes;
