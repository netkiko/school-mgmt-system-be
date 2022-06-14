const express = require("express");
const router = express.Router();

const teacherStudentController = require("../controllers/teacherStudents.controller");

// Get all registered students
router.get("/", teacherStudentController.getAllTeacherStudents);

// Get registered students by teacher's email
router.get("/:email", teacherStudentController.getTeacherStudentByEmail);

// Register students to teacher
router.post("/register", teacherStudentController.createTeacherStudent);

// Delete registered students by teacher's email
router.delete("/:email", teacherStudentController.deleteTeacherStudent);

module.exports = router;
