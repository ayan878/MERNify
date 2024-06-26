import { Router } from "express";
import * as controller from "../controllers/Controller.js";
import Auth from "../middleware/auth.js";

const router = Router();

//** POST Methods */
router.post("/register", controller.register); // Register user
// router.post("/registerMail", controller.registerMail); // Send the email (implement this if needed)
router.post("/authenticate", (req, res) => res.end()); // Authenticate user
router.post("/login",controller.verifyUser, controller.login); // Login user

//** GET Methods */
router.get("/user/:username", controller.getUser); // Get user by username
router.get("/generateOTP", controller.generateOTP); // Generate random OTP
router.get("/verifyOTP", controller.verifyOTP); // Verify generated OTP
router.get("/createResetSession", controller.createResetSession); // Reset all the variables

//** PUT Methods */
router.put("/updateuser",Auth, controller.updateUser); // Update user profile
router.put("/reset", controller.resetPassword); // Reset password

router.get("/test-auth", Auth, (req, res) => {
  res.status(200).json({ message: "Authorization successful", user: req.user });
});

export default router;
