import dotenv from "dotenv";
dotenv.config();
import express from "express";
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
    userDetails: {},
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
    dob: String,
    gender: String,
    workingAt: String,
    linkedin: String,
    github: String,
    facebook: String,
    instagram: String,
    website: String,
    optionalEmail: String,
    hometown: String,
    country: String,
    address: String,
    pincode: String,
    contactNo: String,
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

function athenticateUser(req, res, next) {
  const header = req.headers.authorization;
  const token = header && header?.split(" ")[1];

  console.log("req", req);
  console.log("header", header);
  if (!!!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    else {
      req.user = user;
      next();
    }
  });
}

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
      dob: "",
      gender: "",
      workingAt: "",
      linkedin: "",
      github: "",
      facebook: "",
      instagram: "",
      website: "",
      optionalEmail: "",
      hometown: "",
      country: "",
      address: "",
      pincode: "",
      contactNo: "",
    });

    newUser
      .save()
      .then(() => {
        console.log("New User Created...");
        apiRes.retrunStr = "success";
        apiRes.actions.errorMsg = "";
        apiRes.actions.successMsg = "User is registered successfully";
        apiRes.responseBody.message = "";
        apiRes.responseBody.userDetails["username"] = req.body.username;

        const user = { name: req.body.username };
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        apiRes.responseBody["jwt"] = token;

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
  if (foundUser.length === 0) {
    apiRes.retrunStr = "error";
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
    apiRes.responseBody.userDetails["username"] = foundUser[0].username;
    console.log(foundUser[0].username);

    const user = { name: req.body.username };
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    apiRes.responseBody["jwt"] = token;
    res.statusCode = 200;
    res.send(apiRes);
  }
});

app.post("/userdetails", athenticateUser, async (req, res) => {
  console.log(req.body);
  const foundUser = await User.find({
    email: req.body.email,
  });
  if (foundUser.length === 0) {
    apiRes.retrunStr = "error";
    apiRes.actions.errorMsg = "User not found in DB";
    apiRes.actions.successMsg = "";
    apiRes.responseBody.message = "";
    apiRes.responseBody.userDetails = {};
    res.statusCode = 200;
    res.send(apiRes);
  } else {
    apiRes.retrunStr = "success";
    apiRes.actions.errorMsg = "";
    apiRes.actions.successMsg = "User found in DB";
    apiRes.responseBody.message = "";
    apiRes.responseBody.userDetails = {
      name: foundUser[0].firstName + " " + foundUser[0].lastName,
      dob: foundUser[0].dob,
      gender: foundUser[0].gender,
      workingAt: foundUser[0].workingAt,
      linkedin: foundUser[0].linkedin,
      github: foundUser[0].github,
      facebook: foundUser[0].facebook,
      instagram: foundUser[0].instagram,
      website: foundUser[0].website,
      optionalEmail: foundUser[0].optionalEmail,
      hometown: foundUser[0].hometown,
      country: foundUser[0].country,
      address: foundUser[0].address,
      pincode: foundUser[0].pincode,
      contactNo: foundUser[0].contactNo,
    };

    res.statusCode = 200;
    res.send(apiRes);
  }
});

app.post("/updateuser", athenticateUser, (req, res) => {
  // console.log("............");
});

app.post("/deleteaccount", athenticateUser, (req, res) => {});

app.listen(port, () => {
  console.log("Server is listening on port : " + port);
});
