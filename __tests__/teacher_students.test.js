const db = require("../config/db.config");
const request = require("supertest");
const app = require("../index");

// Test Data
const teacherEmails = ["larry_bird@gmail.com", "magic_johnson@gmail.com", "michael_jordan@gmail.com"];
const teacherStudentData = {
    teacher: "kareem_abdul_jabbar@gmail.com",
    students: ["yao_ming@gmail.com", "tim_duncan@gmail.com"],
};

beforeAll(async () => {});

beforeEach(async () => {});

afterEach(async () => {});

afterAll(async () => {
    db.end();
});

describe("Fetch All Registered Students via GET /api/teacher_students/", () => {
    test("It should respond with an array of registered students", async () => {
        const response = await request(app).get("/api/teacher_students/");
        const arrStudents = response.body;
        expect(arrStudents.length > 0).toBeTruthy();
        expect(arrStudents.includes("chris_paul@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("kobe_bryant@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("lebron_james@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("luca_doncic@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("paul_pierce@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("shaquille_oneal@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("stephen_curry@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("tim_duncan@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("yao_ming@gmail.com")).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });
});

describe("Fetch Registered Students to Teachers via GET /api/teacher_students/:email", () => {
    test("It should respond with an array of registered students to teacher", async () => {
        const response = await request(app).get(`/api/teacher_students/${teacherEmails[0]}`);
        expect(response.body).toHaveProperty("students");
        const arrStudents = response.body.students;
        expect(arrStudents.length > 0).toBeTruthy();
        expect(arrStudents.includes("kobe_bryant@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("luca_doncic@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("shaquille_oneal@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("tim_duncan@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("yao_ming@gmail.com")).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });

    test("It should respond with an array of registered students to multiple teachers", async () => {
        const response = await request(app).get(`/api/teacher_students/${teacherEmails[1]},${teacherEmails[2]}`);
        expect(response.body).toHaveProperty("students");
        const arrStudents = response.body.students;
        expect(arrStudents.length > 0).toBeTruthy();
        expect(arrStudents.includes("chris_paul@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("lebron_james@gmail.com")).toBeTruthy();
        expect(arrStudents.includes("luca_doncic@gmail.com")).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });
});

describe("Register Students to Teacher via POST /api/teacher_students/", () => {
    test("It should respond with error for missing 'teacher' element or empty value", async () => {
        const newStudentResp = await request(app).post("/api/teacher_students/register").send({
            teacher: "",
            students: teacherStudentData.students,
        });
        expect(newStudentResp.body).toHaveProperty("success");
        expect(newStudentResp.body).toHaveProperty("message");
        expect(newStudentResp.body.success).toBe(false);
        expect(newStudentResp.body.message).toBe("Please fill all fields.");
        expect(newStudentResp.statusCode).toBe(400);
    });

    test("It should respond with error for missing 'students' element or empty value", async () => {
        const newStudentResp = await request(app).post("/api/teacher_students/register").send({
            teacher: teacherStudentData.teacher,
            students: "",
        });
        expect(newStudentResp.body).toHaveProperty("success");
        expect(newStudentResp.body).toHaveProperty("message");
        expect(newStudentResp.body.success).toBe(false);
        expect(newStudentResp.body.message).toBe("Please fill all fields.");
        expect(newStudentResp.statusCode).toBe(400);
    });

    test("It should respond with error for non-array or empty array value of 'students'", async () => {
        const newStudentResp = await request(app)
            .post("/api/teacher_students/register")
            .send({ teacher: teacherStudentData.teacher, students: [] });
        expect(newStudentResp.body).toHaveProperty("success");
        expect(newStudentResp.body).toHaveProperty("message");
        expect(newStudentResp.body.success).toBe(false);
        expect(newStudentResp.body.message).toBe("Please fill all fields.");
        expect(newStudentResp.statusCode).toBe(400);
    });

    test("It should register students to teacher (ignore duplicate entries)", async () => {
        const newStudentResp = await request(app)
            .post("/api/teacher_students/register")
            .send({ teacher: teacherStudentData.teacher, students: teacherStudentData.students });
        expect(newStudentResp.statusCode).toBe(204);

        // Verify that the new added student exists in teacher_students table
        const response = await request(app).get(`/api/teacher_students/${teacherStudentData.teacher}`);
        expect(response.body).toHaveProperty("students");
        const arrStudents = response.body.students;
        expect(arrStudents.length > 0).toBeTruthy();
        expect(arrStudents.includes(teacherStudentData.students[0])).toBeTruthy();
        expect(arrStudents.includes(teacherStudentData.students[1])).toBeTruthy();
    });
});
