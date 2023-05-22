import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import postRouters from "./router/posts.js";
import userRouters from "./router/user.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "1gb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1gb", extended: true }));
app.use(cors());
// const CONNECTION_URL =
//   "mongodb+srv://minhquan1538199:minhquan@cluster0.thjx3ie.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// postRouter
app.use("/posts", postRouters);

// userRouter
app.use("/user", userRouters);
