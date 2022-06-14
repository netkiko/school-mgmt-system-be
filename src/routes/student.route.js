const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");

// Get all students
router.get("/", studentController.getAllStudents);

// Get student by email
router.get("/:email", studentController.getStudentByEmail);

// Create new student
router.post("/", studentController.createStudent);

// Update student by email
router.put("/:email", studentController.updateStudent);

// Delete student by email
router.delete("/:email", studentController.deleteStudent);

module.exports = router;
