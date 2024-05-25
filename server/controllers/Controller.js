import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Validate input
    // if (!username || !password || !email) {
    //   console.warn("Validation failed: Missing username, password, or email");
    //   return res
    //     .status(400)
    //     .send({ error: "Username, password, and email are required" });
    // }

    // Check if username already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      console.warn("Username already exists:", username);
      return res.status(400).send({ error: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      console.warn("Email already exists:", email);
      return res.status(400).send({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });

    // Save user to the database
    const savedUser = await newUser.save();
    res
      .status(201)
      .send({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error in register function:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}


//** POST: http://localhost:8000/api/login */
export async function login(req, res) {
  res.json("login route");
}

//** GET: http://localhost:8000/api/user/example123 */
export async function getUSer(req, res) {
  res.json("getUser route");
}

//** PUT: http://localhost:8000/api/updateuser */
export async function updateUser(req, res) {
  res.json("updateUser route");
}

//** GET: http://localhost:8000/api/generateOTP */
export async function generateOTP(req, res) {
  res.json("generateOTP route");
}

//** GET: http://localhost:8000/api/varifyOTP */
export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

// successfully redirect to user when OTP is valid
//** GET: http://localhost:8000/api/createResetSession */
export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

//** PUT: http://localhost:8000/api/resetPassword */
export async function resetPassword(req, res) {
  res.json("reset password route");
}

// "firstName":"Ayan",
// 	"lastName":"Raza",
// 	"mobile":"8651939500",
// 	"address":"Siwan",
