import User from "../models/User.js";

// to authenticate JWT Token
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided,authentication denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "Token is invalid or User no longer exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating token:", error);
    res.status(500).json({ message: "Internal server error" });
  }

};

// to authorize user based on role
export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
       return res.status(403).json({ message: "Access forbidden" });
    }

    next();
  }
};
