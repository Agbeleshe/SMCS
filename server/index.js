const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const StudentModel = require("./models/StudentLogin"); // Import your student model here

const app = express();
app.use(
  cors({
    origin: ["https://smcsclient.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Add any additional headers
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://smcsclient.vercel.app"); // Update this with the URL of your client app
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

mongoose.connect(
  "mongodb+srv://danielagbeleshe:68e1lEXa8m5kWqUa@studentsrecord.diu0mgv.mongodb.net/test?retryWrites=true&w=majority"
);
app.get("/", (req, res) => {
  res.json("Hello server......");
});
/// Endpoint for user login
app.post("/", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "Admin") {
    // Admin login successful
    res.json("Admin");
  } else {
    StudentModel.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            // Regular user login successful
            res.json("Success");
          } else {
            res.json("The password is incorrect");
          }
        } else {
          res.json("User not found");
        }
      })
      .catch((err) => {
        console.error("Error while logging in:", err);
        res.status(500).json(err);
      });
  }
});

// Endpoint for user registration
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  StudentModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json("User already exists");
      } else {
        // Create a new user
        const newUser = new StudentModel({
          email: email,
          password: password,
        });

        newUser
          .save()
          .then((user) => {
            res.json("User registered successfully");
          })
          .catch((err) => {
            console.error("Error while registering user:", err);
            res.status(500).json(err);
          });
      }
    })
    .catch((err) => {
      console.error("Error while checking for existing user:", err);
      res.status(500).json(err);
    });
});

// Endpoint for uploading result file
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadResultFile = multer({ storage: storage });

app.post("/uploadResult", uploadResultFile.single("resultFile"), async (req, res) => {
  const { email } = req.body;
  const resultFile = req.file;

  if (!resultFile) {
    res.status(400).json("No file uploaded");
    return;
  }

  // Update the user's result file information in the database
  try {
    const user = await StudentModel.findOneAndUpdate(
      { email: email },
      { resultFile: { filename: resultFile.originalname, path: resultFile.path } },
      { new: true }
    );

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error("Error while uploading result file:", err);
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
