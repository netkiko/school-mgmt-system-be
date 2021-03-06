const dbConn = require("../../config/db.config");

// TeacherStudent Constructor
class TeacherStudent {
    constructor(teacherStudent) {
        this.teacher_email = teacherStudent.teacher_email;
        this.student_email = teacherStudent.student_email;
    }
}

// Fetch all registered students
TeacherStudent.getAllTeacherStudents = (result) => {
    dbConn.query("SELECT DISTINCT student_email FROM teacher_students", (err, res) => {
        if (err) {
            console.log("Enountered error while fetching registered students.", err);
            result(err, null);
        } else {
            console.log("All registered students were successfully fetched.");
            const responseData = res.map((d) => d.student_email);
            result(null, responseData);
        }
    });
};

// Fetch registered students by teacher's email
TeacherStudent.getTeacherStudentByEmail = (email, result) => {
    const arrEmails = email.trim().split(",");
    let selectSQL = "SELECT DISTINCT student_email FROM teacher_students WHERE teacher_email IN (";
    for (let i = 0; i < arrEmails.length; i++) selectSQL = selectSQL + `'${arrEmails[i]}',`;
    selectSQL = selectSQL.substring(0, selectSQL.length - 1) + ")";

    dbConn.query(selectSQL, (err, res) => {
        if (err) {
            console.log("Encountered error while fetching registered students by teacher's email.", err);
            result(err, null);
        } else {
            const responseData = res.map((d) => d.student_email);
            result(null, { students: responseData });
        }
    });
};

// Fetch registered common students by teacher's email
TeacherStudent.getTeacherCommonStudentByEmail = (email, result) => {
    const arrEmails = email.trim().split(",");
    let selectSQL =
        "SELECT rs.student_email " +
        "FROM (SELECT student_email, count(*) as count FROM teacher_students WHERE teacher_email IN (";
    for (let i = 0; i < arrEmails.length; i++) selectSQL = selectSQL + `'${arrEmails[i]}',`;
    selectSQL = selectSQL.substring(0, selectSQL.length - 1) + ") ";
    selectSQL += "GROUP BY student_email) AS rs WHERE rs.count=" + arrEmails.length;

    dbConn.query(selectSQL, (err, res) => {
        if (err) {
            console.log("Encountered error while fetching registered common students by teacher's email.", err);
            result(err, null);
        } else {
            const responseData = res.map((d) => d.student_email);
            result(null, { students: responseData });
        }
    });
};

// Register students to teacher
TeacherStudent.createTeacherStudent = async (reqData, result) => {
    const teacherEmail = reqData.teacher;
    const arrStudentEmails = reqData.students;

    let insertValuesSQL = "INSERT IGNORE INTO teacher_students(teacher_email,student_email) VALUES ";
    for (let i = 0; i < arrStudentEmails.length; i++)
        insertValuesSQL = insertValuesSQL + `('${teacherEmail}', '${arrStudentEmails[i]}'),`;
    insertValuesSQL = insertValuesSQL.substring(0, insertValuesSQL.length - 1);
    dbConn.query(insertValuesSQL, (err, res) => {
        if (err) {
            console.log("Encountered error while registering students to a teacher.");
            result(err, null);
        } else {
            console.log("Students were successfully registered to a teacher.");
            result(null, res);
        }
    });
};

// Delete registered students by teacher's email
TeacherStudent.deleteTeacherStudents = (email, result) => {
    dbConn.query("DELETE FROM teacher_students WHERE teacher_email=?", email, (err, res) => {
        if (err) {
            console.log("Encountered error while deleting registered students by teacher's email.");
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Delete registered student by teacher and student's email
TeacherStudent.deleteTeacherStudent = (teacherEmail, studentEmail, result) => {
    dbConn.query(
        "DELETE FROM teacher_students WHERE teacher_email=? AND student_email=?",
        [teacherEmail, studentEmail],
        (err, res) => {
            if (err) {
                console.log("Encountered error while deleting registered students by teacher's email.");
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
};

module.exports = TeacherStudent;
