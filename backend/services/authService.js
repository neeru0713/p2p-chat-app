const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signupService = async (email, mobile, password) => {
  const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
  if (userExists) throw { status: 400, message: "User already exists" };

  const newUser = new User({ email, mobile, password });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user: newUser };
};

module.exports = { signupService };
