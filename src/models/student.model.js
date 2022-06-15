const dbConn = require("../../config/db.config");

// Student Constructor
class Student {
    constructor(student) {
        this.email = student.email;
        this.name = student.name;
    }
}

// Fetch all students
Student.getAllStudents = (result) => {
    dbConn.query("SELECT email,name FROM students", (err, res) => {
        if (err) {
            console.log("Enountered error while fetching all students.", err);
            result(err, null);
        } else {
            console.log("All students were successfully fetched.");
            result(null, res);
        }
    });
};

// Fetch student by email
Student.getStudentByEmail = (email, result) => {
    dbConn.query("SELECT email,name FROM students WHERE email=?", email, (err, res) => {
        if (err) {
            console.log("Encountered error while fetching student by email.", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Insert new student
Student.createStudent = (studentReqData, result) => {
    dbConn.query("INSERT INTO students SET ?", studentReqData, (err, res) => {
        if (err) {
            console.log("Encountered error while adding new student.");
            result(err, null);
        } else {
            console.log("New student was successfully added.");
            result(null, res);
        }
    });
};

// Update student by email
Student.updateStudent = (email, studentReqData, result) => {
    dbConn.query("UPDATE students SET name=? WHERE email=?", [studentReqData.name, email], (err, res) => {
        if (err) {
            console.log("Error while updating student by email.");
            result(err, null);
        } else {
            console.log("Student was successfully updated.");
            result(null, res);
        }
    });
};

// Delete student by email
Student.deleteStudent = (email, result) => {
    dbConn.query("DELETE FROM students WHERE email=?", email, (err, res) => {
        if (err) {
            console.log("Encountered error while deleting student by email.");
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Student;
