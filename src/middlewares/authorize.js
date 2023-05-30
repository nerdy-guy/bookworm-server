import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/globalConfigs.js";

const authorize = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({
      status: 401,
      title: "Unauthorized",
    });
  }

  try {
    const user = jwt.verify(accessToken, JWT_SECRET);
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      title: "Unauthorized",
    });
  }
};

export default authorize;
