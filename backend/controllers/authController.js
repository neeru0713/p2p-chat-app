const { signupService } = require("../services/authService");

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

module.exports = { signupController };
