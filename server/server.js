import express, { application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const port = 8000;
const app = express();

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
  const response = {
    actions: {
      errorMsg: "",
      successMsg: "",
    },
    responseBody: {
      message: "",
    },
    retrunStr: "",
  };

  const foundUser = await User.find({ email: req.body.email });
  if (foundUser.length > 0) {
    response.retrunStr = "error";
    response.actions.errorMsg = "User is already registered";
    response.actions.successMsg = "";
    response.responseBody.message = "";
    res.statusCode = 200;
    res.send(response);
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
        response.retrunStr = "success";
        response.actions.errorMsg = "";
        response.actions.successMsg = "User is registered successfully";
        response.responseBody.message = "";
        res.statusCode = 200;
        res.send(response);
      })
      .catch((err) => {
        console.log("Err while new user register in mongodb ", err);
        response.retrunStr = "error";
        response.actions.errorMsg = "Error while creating user";
        response.actions.successMsg = "";
        response.responseBody.message = "";
        res.statusCode = 200;
        res.send(response);
      });
  }
});

app.listen(port, () => {
  console.log("Server is listening on port : " + port);
});
