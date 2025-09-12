import { Router } from "express";
import { logingUser, logoutUser, registerUser,refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(logingUser);

//Secure routs
router.route("/logout").post(verifyJWT, logoutUser);
router .route("/refresh-token").post(refreshAccessToken)


export default router;
