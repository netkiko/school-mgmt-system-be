const express = require("express");
const bodyParser = require("body-parser");

// Create express app
const app = express();

// Parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse request data content type application/json
app.use(bodyParser.json());

// Import routes
const studentRoutes = require("./src/routes/student.route");
const teacherRoutes = require("./src/routes/teacher.route");
const teacherStudentsRoutes = require("./src/routes/teacherStudents.route");

// Use routes
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/teacher_students", teacherStudentsRoutes);

// Define root route
app.get("/", (req, res) => {
    res.send("Welcome to School Management System!");
});

module.exports = app;
// const express = require("express");
// const bodyParser = require("body-parser");

// // Create express app
// const app = express();

// // Setup the server port
// const port = process.env.PORT || 4000;

// // Parse request data content type application/x-www-form-rulencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // Parse request data content type application/json
// app.use(bodyParser.json());

// // Import routes
// const studentRoutes = require("./src/routes/student.route");
// const teacherRoutes = require("./src/routes/teacher.route");
// const teacherStudentsRoutes = require("./src/routes/teacherStudents.route");

// // Use routes
// app.use("/api/students", studentRoutes);
// app.use("/api/teachers", teacherRoutes);
// app.use("/api/teacher_students", teacherStudentsRoutes);

// // Define root route
// app.get("/", (req, res) => {
//     res.send("Welcome to School Management System!");
// });

// // Listen to defined port
// app.listen(port, () => {
//     console.log(`Backend server is running at port ${port}`);
// });

// module.exports = app;