const express = require("express");
const winston = require("winston");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const StudentModel = require("./models/StudentLogin"); // Import your student model here
const bodyParser = require("body-parser"); // Import body-parser


const app = express();

//Create a new route for result uploads
const resultUploadRoute = express.Router();



app.use(
  cors({
    origin: ["https://smcsclient.vercel.app"], // Add localhost as an allowed origin
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

app.use(bodyParser.json()); // Use body-parser for JSON parsing

// Custom logging endpoint using body-parser
app.post("/logError", (req, res) => {
  const error = req.body.error; // Assuming you send the error message as { error: "Your error message here" }
  console.error("Server-side error:", error);

  // You can now send this error message to an external service of your choice

  res.status(200).send("Error message received");
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
    cb(null, "uploads/"); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueFileName = Date.now() + "-" + file.originalname;
    cb(null, uniqueFileName);
  },
});
// Create a Multer instance for uploading result files
const uploadResultFile = multer({ storage: storageResultFile });





//Endpoit to Update the route to handle result uploads
resultUploadRoute.post("/:studentId/uploadResult", uploadResultFile.single("resultFile"), async (req, res) => {
  const studentId = req.params.studentId;
  console.log("Received request for studentId:", studentId); // Log studentId

  const resultFile = req.file;
  if (!resultFile) {
    console.log("No file uploaded"); // Log if no file is uploaded
    return res.status(400).json({ error: "No file uploaded" });
  }

  const resultFilePath = path.join("uploads", resultFile.filename);
  console.log("Result file path:", resultFilePath); // Log the result file path

  try {
    // Update student's record with the result file information
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { _id: studentId },
      { resultFile: { filename: resultFile.originalname, path: resultFilePath } },
      { new: true }
    );

    if (updatedStudent) {
      console.log("Student record updated:", updatedStudent); // Log the updated student record
      res.status(200).json(updatedStudent);
    } else {
      console.log("Student not found"); // Log if the student is not found
      logger.error("Student not found");
      res.status(404).json("Student not found");
    }
  } catch (err) {
    console.error("Error uploading result file:", err); // Log any error that occurs
    logger.error("Error uploading result file:", err);
    res.status(500).json(err);
  }
});


app.use("/students", resultUploadRoute);




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
