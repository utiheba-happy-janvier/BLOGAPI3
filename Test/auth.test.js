const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("./model/User");

require("dotenv").config();
router.post("/register", async (req, res) => {
  try {
    const users = await Users.findOne({ email: req.body.email });
    if (users) {
      return res.status(400).json({
        status: "fail",
        error: "Email is in use",
      });
    }