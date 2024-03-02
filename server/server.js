import dotenv from "dotenv";
dotenv.config();
import express, { application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const port = 8000;
const app = express();

const apiRes = {
  retrunStr: "",
  actions: {
    errorMsg: "",
    successMsg: "",
  },
  responseBody: {
    message: "",
  },
};

mongoose
  .connect("mongodb://127.0.0.1:27017/socialbook")
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("MongoDB Err ", err);
  });

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.post("/register", async (req, res) => {
  const foundUser = await User.find({ email: req.body.email });
  if (foundUser.length > 0) {
    apiRes.retrunStr = "error";
    apiRes.actions.errorMsg = "User is already registered";
    apiRes.actions.successMsg = "";
    apiRes.responseBody.message = "";
    res.statusCode = 200;
    res.send(apiRes);
  } else {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    newUser
      .save()
      .then(() => {
        console.log("New User Created...");
        apiRes.retrunStr = "success";
        apiRes.actions.errorMsg = "";
        apiRes.actions.successMsg = "User is registered successfully";
        apiRes.responseBody.message = "";
        res.statusCode = 200;
        res.send(apiRes);
      })
      .catch((err) => {
        console.log("Err while new user register in mongodb ", err);
        apiRes.retrunStr = "error";
        apiRes.actions.errorMsg = "Error while creating user";
        apiRes.actions.successMsg = "";
        apiRes.responseBody.message = "";
        res.statusCode = 200;
        res.send(apiRes);
      });
  }
});

app.post("/login", async (req, res) => {
  const foundUser = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  // console.log(foundUser);
  if (foundUser.length === 0) {
    apiRes.retrunStr === "error";
    apiRes.actions.errorMsg = "Invalid User or Password";
    apiRes.actions.successMsg = "";
    apiRes.responseBody.message = "";
    res.statusCode = 200;
    res.send(apiRes);
  } else {
    apiRes.retrunStr = "success";
    apiRes.actions.errorMsg = "";
    apiRes.actions.successMsg = "Login successfull";
    apiRes.responseBody.message = "";

    const user = { name: req.body.username };
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    apiRes.responseBody['jwt'] = token;
    res.statusCode = 200;
    res.send(apiRes);
  }
});

app.listen(port, () => {
  console.log("Server is listening on port : " + port);
});
