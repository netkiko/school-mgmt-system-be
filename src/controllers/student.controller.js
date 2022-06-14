const StudentModel = require("../models/student.model");

// Get all students
const getAllStudents = (req, res) => {
    StudentModel.getAllStudents((err, students) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(students);
        }
    });
};

// Get student by email
const getStudentByEmail = (req, res) => {
    StudentModel.getStudentByEmail(req.params.email, (err, student) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(student);
        }
    });
};

// Create new student
const createStudent = (req, res) => {
    const bodyData = req.body || {};
    if (bodyData?.email && bodyData?.email.trim().length > 0 && bodyData?.name && bodyData?.name.trim().length > 0) {
        const studentReqData = new StudentModel(req.body);
        StudentModel.createStudent(studentReqData, (err, student) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send({
                    success: true,
                    message: "Student was successfully created.",
                });
            }
        });
    } else {
        res.status(400).send({
            success: false,
            message: "Please fill all fields.",
        });
    }
};

// Update student by email
const updateStudent = (req, res) => {
    const bodyData = req.body || {};
    if (bodyData?.name && bodyData?.name.trim().length > 0) {
        const studentReqData = new StudentModel(req.body);
        StudentModel.updateStudent(req.params.email, studentReqData, (err, student) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json({
                    success: true,
                    message: "Student was successfully updated.",
                });
            }
        });
    } else {
        res.status(400).send({
            success: false,
            message: "Please fill all fields.",
        });
    }
};

// Delete student by email
const deleteStudent = (req, res) => {
    StudentModel.deleteStudent(req.params.email, (err, student) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send({
                success: true,
                message: "Student was successully deleted.",
            });
        }
    });
};

module.exports = { getAllStudents, getStudentByEmail, createStudent, updateStudent, deleteStudent };
