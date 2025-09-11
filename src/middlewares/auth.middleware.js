import { asyncHandeler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const verifyJWT = asyncHandeler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
      console.log("token",token);

    if (!token) {
      throw new ApiError(401, "Unauthorized user,token is required");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE);

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      //TODO :discuss about fronted
      throw new ApiError(404, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
