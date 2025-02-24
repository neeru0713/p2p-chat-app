const { signupService } = require("../services/authService");
const { signInService } = require("../services/authService");

const signupController = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    const { token, user } = await signupService(email, mobile, password);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


const signInController = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await signInService(email, password);
  
      res.status(200).json({ message: "Sign-in successful", token, user });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };
  
  

module.exports = { signupController, signInController };
