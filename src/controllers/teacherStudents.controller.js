const TeacherStudentsModel = require("../models/teacherStudents.model");

// Get all registered students
const getAllTeacherStudents = (req, res) => {
    TeacherStudentsModel.getAllTeacherStudents((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

// Get registered students by teacher's email
const getTeacherStudentByEmail = (req, res) => {
    TeacherStudentsModel.getTeacherStudentByEmail(req.params.email, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

// Get registered common students by teacher's email
const getTeacherCommonStudentByEmail = (req, res) => {
    TeacherStudentsModel.getTeacherCommonStudentByEmail(req.params.email, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

// Register students to teacher
const createTeacherStudent = (req, res) => {
    const bodyData = req.body || {};
    if (
        bodyData?.teacher &&
        bodyData?.teacher.trim().length > 0 &&
        bodyData?.students &&
        Array.isArray(bodyData?.students) &&
        bodyData?.students.length > 0
    ) {
        TeacherStudentsModel.createTeacherStudent(bodyData, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(204).send({
                    success: true,
                    message: "Students were successfully registered to teacher.",
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

// Delete registered students by teacher's email
const deleteTeacherStudents = (req, res) => {
    const teacherEmail = req.params.email;
    TeacherStudentsModel.deleteTeacherStudents(teacherEmail, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send({
                success: true,
                message: `Students under Teacher: ${teacherEmail} were successully deleted.`,
            });
        }
    });
};

// Delete registered students by teacher's email
const deleteTeacherStudent = (req, res) => {
    const teacherEmail = req.params.teacherEmail;
    const studentEmail = req.params.studentEmail;
    TeacherStudentsModel.deleteTeacherStudent(teacherEmail, studentEmail, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send({
                success: true,
                message: `Student under Teacher: ${teacherEmail} was successully deleted.`,
            });
        }
    });
};

module.exports = {
    getAllTeacherStudents,
    getTeacherStudentByEmail,
    getTeacherCommonStudentByEmail,
    createTeacherStudent,
    deleteTeacherStudents,
    deleteTeacherStudent,
};
