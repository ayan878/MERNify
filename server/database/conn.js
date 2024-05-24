import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  const mongodb = await MongoMemoryServer.create();
  mongoose.set("strictQuery", true); // Enable strict query mode

  const mongoUri = mongodb.getUri(); // Corrected variable name from getURI to getUri
  const db = await mongoose.connect(mongoUri); // Corrected variable name from getUri to mongoUri

  console.log("Database connected");
}

export default connect;
