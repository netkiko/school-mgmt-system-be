const TeacherModel = require("../models/teacher.model");

// Get all teachers
const getAllTeachers = (req, res) => {
    TeacherModel.getAllTeachers((err, teachers) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(teachers);
        }
    });
};

// Get teacher by email
const getTeacherByEmail = (req, res) => {
    TeacherModel.getTeacherByEmail(req.params.email, (err, teacher) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(teacher);
        }
    });
};

// Create new teacher
const createTeacher = (req, res) => {
    const bodyData = req.body || {};
    if (bodyData?.email && bodyData?.email.trim().length > 0 && bodyData?.name && bodyData?.name.trim().length > 0) {
        const teacherReqData = new TeacherModel(req.body);
        TeacherModel.createTeacher(teacherReqData, (err, teacher) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send({
                    success: true,
                    message: "Teacher was successfully created.",
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

// Update teacher by email
const updateTeacher = (req, res) => {
    const bodyData = req.body || {};
    if (bodyData?.name && bodyData?.name.trim().length > 0) {
        const teacherReqData = new TeacherModel(req.body);
        TeacherModel.updateTeacher(req.params.email, teacherReqData, (err, teacher) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send({
                    success: true,
                    message: "Teacher was successfully updated.",
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

// Delete teacher by email
const deleteTeacher = (req, res) => {
    TeacherModel.deleteTeacher(req.params.email, (err, teacher) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send({
                success: true,
                message: "Teacher was successully deleted.",
            });
        }
    });
};

module.exports = { getAllTeachers, getTeacherByEmail, createTeacher, updateTeacher, deleteTeacher };
