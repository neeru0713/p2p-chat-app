const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { signupController, signInController } = require("../controllers/authController");

router.post("/signup", signupController);

router.post("/signin", signInController);



module.exports = { router };
