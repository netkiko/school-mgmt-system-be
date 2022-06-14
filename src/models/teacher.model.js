const dbConn = require("../../config/db.config");

// Teacher Constructor
class Teacher {
    constructor(teacher) {
        this.email = teacher.email;
        this.name = teacher.name;
    }
}

// Fetch all teachers
Teacher.getAllTeachers = (result) => {
    dbConn.query("SELECT email,name FROM teachers", (err, res) => {
        if (err) {
            console.log("Enountered error while fetching all teachers.", err);
            result(err, null);
        } else {
            console.log("All teachers were successfully fetched.");
            result(null, res);
        }
    });
};

// Fetch teacher by email
Teacher.getTeacherByEmail = (email, result) => {
    dbConn.query("SELECT email,name FROM teachers WHERE email=?", email, (err, res) => {
        if (err) {
            console.log("Encountered error while fetching teacher by email.", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Create new teacher
Teacher.createTeacher = (teacherReqData, result) => {
    dbConn.query("INSERT INTO teachers SET ?", teacherReqData, (err, res) => {
        if (err) {
            console.log("Encountered error while adding new teacher.");
            result(err, null);
        } else {
            console.log("New teacher was successfully added.");
            result(null, res);
        }
    });
};

// Update teacher by email
Teacher.updateTeacher = (email, teacherReqData, result) => {
    dbConn.query("UPDATE teachers SET name=? WHERE email=?", [teacherReqData.name, email], (err, res) => {
        if (err) {
            console.log("Error while updating teacher by email.");
            result(err, null);
        } else {
            console.log("Teacher was successfully updated.");
            result(null, res);
        }
    });
};

// Delete teacher by email
Teacher.deleteTeacher = (email, result) => {
    dbConn.query("DELETE FROM teachers WHERE email=?", email, (err, res) => {
        if (err) {
            console.log("Encountered error while deleting teacher by email.");
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Teacher;
