require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const adminModel = require("../models/UserSchema");

// User Register

const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    console.log(req.body.password);
    if (!(email && password && name)) {
      return res.status(400).send({
        success: false,
        message: `All fields are required`,
      });
    }

    if (password.length > 14 || password.length < 9) {
      return res.status(400).send({
        success: false,
        message: `password must be with charector between 8 to 15`,
      });
    } else if (/[a-z]/.test(password) == false) {
      return res.status(400).send({
        success: false,
        message: `password must be should have atleast one lower case letter `,
      });
    } else if (/[A-Z]/.test(password) == false) {
      return res.status(400).send({
        success: false,
        message: `password must be should have atleast one upper case letter`,
      });
    } else if (/[0-9]/.test(password) == false) {
      return res.status(400).send({
        success: false,
        message: `password must be should have atleast one numeric charector`,
      });
    }

    const existuser = await adminModel.findOne({ email });
    if (existuser) {
      return res.status(400).send({
        success: false,
        message: `User is already present`,
      });
    }

    const myencpassword = await bycrypt.hash(password, 10);

    const user = await adminModel.create({
      name: name,
      email: email,
      password: myencpassword,
    });

    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.end("Some Error Occured");
  }
};

// User Login

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!(email && password)) {
      return res.status(400).send({
        success: false,
        message: `please fill all fields`,
      });
    }

    const user = await adminModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: `Please Regiser First`,
      });
    }

    if (email && (await bycrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          uid: user._id,
          email,
          name: user.name,
        },
        process.env.SECRET,
        {
          expiresIn: "2d",
        }
      );

      user.token = token;
      user.password = undefined;
      return res.status(201).json({ token });
    }
    return res.status(400).send({
      success: false,
      message: `Invalid Credentials`,
    });
  } catch (error) {
    console.log(error);
    res.end("error occured");
  }
};

module.exports = { signup, Login };
