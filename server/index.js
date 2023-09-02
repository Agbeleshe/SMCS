const express = require("express");
const winston = require("winston");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const StudentModel = require("./models/StudentLogin"); // Import your student model here

const app = express();


app.use(
  cors({
    origin: ["https://smcsclient.vercel.app", "http://localhost:5173"], // Add localhost as an allowed origin
    methods: ["POST", "GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://smcsclient.vercel.app"); // Update this with the URL of your client app
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
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
  console.log("Received registration data:", req.body);
  StudentModel.create(req.body)
    .then((student) => {
      console.log("New student created:", student);
      res.status(201).json(student);
    })
    .catch((err) => {
      console.error("Error creating student:", err);
      res.status(500).json(err);
    });
});

// Set up Multer storage configuration for uploading result files
const storageResultFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

// Create a Multer instance for uploading result files
const uploadResultFile = multer({ storage: storageResultFile });

// Endpoint to upload result files
app.post("/uploadResult", uploadResultFile.single("resultFile"), async (req, res) => {
  const { email } = req.body;
  const resultFile = req.file;

  if (!resultFile) {
    logger.error("No file uploaded"); // Log the error
    res.status(400).json("No file uploaded");
    return;
  }

  const resultFilePath = path.join("uploads", resultFile.filename);

  try {
    // Update the user's result file information in the database
    const user = await StudentModel.findOneAndUpdate(
      { email: email },
      { resultFile: { filename: resultFile.originalname, path: resultFilePath } },
      { new: true }
    );

    if (user) {
      res.status(200).json(user);
    } else {
      logger.error("User not found"); // Log the error
      res.status(404).json("User not found");
    }
  } catch (err) {
    logger.error("Error uploading result file:", err); // Log the error
    console.error("Error while uploading result file:", err);
    res.status(500).json(err);
  }
});


// Endpoint to fetch user information
app.post("/fetchUserInfo", (req, res) => {
  const { email } = req.body;

  // Retrieve user information from the database based on the provided email
  StudentModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => {
      console.error("Error while fetching user info:", err);
      res.status(500).json(err);
    });
});

// Endpoint to fetch all students
app.get("/getAllStudents", (req, res) => {
  // Fetch all student records from the database
  StudentModel.find({})
    .exec()
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => {
      console.error("Error fetching students:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching students" });
    });
});

// Endpoint to download result files
app.get("/downloadResult/:filename", (req, res) => {
  const filenameFromDatabase = req.params.filename; // Get the filename from the request

  // Construct the file path to the result file
  const filePath = path.join(__dirname, "uploads", filenameFromDatabase);

  // Provide the result file for download
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading result file:", err);
      res.status(500).send("Error downloading result file");
    }
  });
});

// Start the server
app.listen(3001, () => {
  console.log("Server running perfectly ...");
});
