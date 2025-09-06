// require('dotenv').config({path: './.env'});

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      {
        `Server is running at port ${process.env.PORT}`;
      }
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection failed", error);
  });

/*
const app = express();
import express from "express";

async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
*/
