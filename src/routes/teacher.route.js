const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");

// Get all teachers
router.get("/", teacherController.getAllTeachers);

// Get teacher by email
router.get("/:email", teacherController.getTeacherByEmail);

// Create new teacher
router.post("/", teacherController.createTeacher);

// Update teacher by email
router.put("/:email", teacherController.updateTeacher);

// Delete teacher by email
router.delete("/:email", teacherController.deleteTeacher);

module.exports = router;
