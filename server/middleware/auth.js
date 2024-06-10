// import jwt from "jsonwebtoken";

// /** Auth middleware */
// export default async function Auth(req, res, next) {
//   try {
//     // Access authorization header to validate request
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({ error: "Authorization header is missing" });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ error: "Token is missing" });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, ENV.JWT_SECRET);
//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.error("Authorization error:", error);
//     res.status(401).json({ error: "Authorization Failed" });
//   }
// }

import jwt from "jsonwebtoken";

/** Auth middleware */
export default async function Auth(req, res, next) {
  try {
    // Access authorization header to validate request
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }
    console.log(token);
    // Get JWT secret from environment variables
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    // console.log("JWT_SECRET:", jwtSecret);

    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    res
      .status(401)
      .json({ error: "Authorization Failed", message: error.message });
  }
}
