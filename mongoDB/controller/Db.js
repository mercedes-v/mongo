require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
const client = new MongoClient(url, { useNewUrlParser: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

module.exports = { client,connectDB,
 
};