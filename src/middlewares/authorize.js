import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/globalConfigs.js";

const authorize = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.json("Not valid token");
  }

  try {
    const user = jwt.verify(accessToken, JWT_SECRET);
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json("Not valid token");
  }
};

export default authorize;
