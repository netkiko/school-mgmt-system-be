const express = require("express");
const router = express.Router();

const teacherStudentController = require("../controllers/teacherStudents.controller");

// Get all registered students
router.get("/", teacherStudentController.getAllTeacherStudents);

// Get registered students by teacher's email
router.get("/:email", teacherStudentController.getTeacherStudentByEmail);

// Get registered common students by teacher's email
router.get("/common/:email", teacherStudentController.getTeacherCommonStudentByEmail);

// Register students to teacher
router.post("/register", teacherStudentController.createTeacherStudent);

// Delete registered students by teacher's email
router.delete("/:email", teacherStudentController.deleteTeacherStudents);

// Delete registered student by teacher and student's email
router.delete("/:teacherEmail/:studentEmail", teacherStudentController.deleteTeacherStudent);

module.exports = router;
