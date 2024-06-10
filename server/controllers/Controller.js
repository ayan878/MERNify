import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


/** Middleware for verifying the user */
// export async function verifyUser(req, res, next) {
//   try {
//     const { username } = req.method === "GET" ? req.query : req.body;

//     // Check if the user exists
//     const exist = await UserModel.findOne({ username });
//     if (!exist) {
//       return res.status(404).send({ error: "Can't find User!" });
//     }

//     // Pass control to the next middleware function
//     next();
//   } catch (error) {
//     return res.status(500).send({ error: "Authentication Error" });
//   }
// }

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    // Check if the user exists
    const exist = await UserModel.findOne({ username });
    if (!exist) {
      return res.status(404).send({ error: "Can't find User!" });
    }

    // Pass control to the next middleware function
    next();
  } catch (error) {
    return res.status(500).send({ error: "Authentication Error" });
  }
}


// Register a new user
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Validate input
    if (!username || !password || !email) {
      console.warn("Validation failed: Missing username, password, or email");
      return res
        .status(400)
        .send({ error: "Username, password, and email are required" });
    }

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

// Login a user
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .send({ error: "Username and password are required" });
    }

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({ message: "Login successful", username: user.username, token });
  } catch (error) {
    console.error("Error in login function:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}


// Get a user by username
/** GET:http://localhost:8000/api/user/ayan878 */
export async function getUser(req, res) {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
   
    res.send(user);
  } catch (error) {
    console.error("Error in getUser function:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// Update a user's details
/** PUT:http://localhost:8000/api/updateuser */

export async function updateUser(req, res) {
  try {
    const { username, ...updateData } = req.body;

    // Check if username is provided
    if (!username) {
      return res.status(400).send({ error: "Username is required" });
    }

    // Log the incoming request data
    console.log("Update request data:", req.body);

    // Find the user by username and update the details
    const updatedUser = await UserModel.findOneAndUpdate(
      { username },
      updateData,
      { new: true }
    );

    // Log the result of the update operation
    console.log("Update result:", updatedUser);

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error in updateUser function:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}



// Generate an OTP
export async function generateOTP(req, res) {
  try {
    const { username } = req.body;

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to the user document (for simplicity, assuming user has an otp field)
    const updatedUser = await UserModel.findOneAndUpdate(
      { username },
      { otp },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ message: "OTP generated successfully", otp });
  } catch (error) {
    console.error("Error in generateOTP function:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// Verify an OTP
export async function verifyOTP(req, res) {
  try {
    const { username, otp } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Check if the OTP matches
    if (user.otp !== otp) {
      return res.status(400).send({ error: "Invalid OTP" });
    }

    res.send({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOTP function:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// Create a reset session
export async function createResetSession(req, res) {
  try {
    const { username } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Generate a reset token (for simplicity, assuming user has a resetToken field)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Save the reset token to the user document
    user.resetToken = resetToken;
    await user.save();

    res.send({ message: "Reset session created successfully", resetToken });
  } catch (error) {
    console.error("Error in createResetSession function:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// Reset a user's password
export async function resetPassword(req, res) {
  try {
    const { username, newPassword } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.send({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword function:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// "firstName":"Ayan",
// 	"lastName":"Raza",
// 	"mobile":"8651939500",
// 	"address":"Siwan",
