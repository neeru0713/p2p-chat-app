const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );
  
      const user = await User.findById(decoded.id).select("-password");
  
      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  };

  module.exports = { authMiddleware };