const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


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



const signInService = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw { status: 400, message: "Invalid email or password" };
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { status: 400, message: "Invalid email or password" };
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  
    return { token, user };
  };
  

module.exports = { signupService, signInService };
