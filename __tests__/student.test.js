const db = require("../config/db.config");
const request = require("supertest");
const app = require("../index");

// Test Data
const fetchStudentData = {
    email: "chris_paul@gmail.com",
    name: "Chris Paul",
};
const testStudentData = {
    email: "kyrie_irving@gmail.com",
    name: "Kyrie Irving",
    new_name: "Korn Irving",
};

beforeAll(async () => {
    await db.query("DELETE FROM students WHERE email=?", testStudentData.email);
});

beforeEach(async () => {});

afterEach(async () => {});

afterAll(async () => {
    db.end();
});

describe("Fetch All Students via GET /api/students/", () => {
    test("It should respond with an array of students", async () => {
        const response = await request(app).get("/api/students/");
        const arrStudents = response.body;
        expect(arrStudents.length > 0).toBeTruthy();
        expect(arrStudents[0]?.email).toBeTruthy(); // should have email element
        expect(arrStudents[0]?.name).toBeTruthy(); // should have name element
        expect(arrStudents.filter((d) => d.email === "chris_paul@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "dirk_nowitski@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "kobe_bryant@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "lebron_james@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "luca_doncic@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "paul_pierce@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "shaquille_oneal@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "stephen_curry@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "tim_duncan@gmail.com").length > 0).toBeTruthy();
        expect(arrStudents.filter((d) => d.email === "yao_ming@gmail.com").length > 0).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });
});

describe("Fetch Student via GET /api/students/:email", () => {
    test("It should respond with details of student", async () => {
        const response = await request(app).get(`/api/students/${fetchStudentData.email}`);
        const arrStudents = response.body;
        expect(arrStudents.length > 0).toBeTruthy();
        expect(arrStudents[0]?.email === fetchStudentData.email).toBeTruthy();
        expect(arrStudents[0]?.name === fetchStudentData.name).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });
});

describe("Create New Student via POST /api/students/", () => {
    test("It should respond with error for missing 'email' param", async () => {
        const newStudentResp = await request(app).post("/api/students").send({ email: "", name: testStudentData.name });
        expect(newStudentResp.body).toHaveProperty("success");
        expect(newStudentResp.body).toHaveProperty("message");
        expect(newStudentResp.body.success).toBe(false);
        expect(newStudentResp.body.message).toBe("Please fill all fields.");
        expect(newStudentResp.statusCode).toBe(400);
    });

    test("It should respond with error for missing 'name' param", async () => {
        const newStudentResp = await request(app)
            .post("/api/students")
            .send({ email: testStudentData.email, name: "" });
        expect(newStudentResp.body).toHaveProperty("success");
        expect(newStudentResp.body).toHaveProperty("message");
        expect(newStudentResp.body.success).toBe(false);
        expect(newStudentResp.body.message).toBe("Please fill all fields.");
        expect(newStudentResp.statusCode).toBe(400);
    });

    test("It should respond with error for duplicate entry", async () => {
        const newStudentResp = await request(app)
            .post("/api/students")
            .send({ email: fetchStudentData.email, name: fetchStudentData.name });
        expect(newStudentResp.body.code).toBe("ER_DUP_ENTRY");
        expect(newStudentResp.body.errno).toBe(1062);
        expect(newStudentResp.statusCode).toBe(400);
    });

    test("It should create new student", async () => {
        const newStudentResp = await request(app)
            .post("/api/students")
            .send({ email: testStudentData.email, name: testStudentData.name });
        expect(newStudentResp.body).toHaveProperty("success");
        expect(newStudentResp.body).toHaveProperty("message");
        expect(newStudentResp.body.success).toBe(true);
        expect(newStudentResp.body.message).toBe("Student was successfully created.");
        expect(newStudentResp.statusCode).toBe(201);

        // Verify that the new added student exists in student table
        const response = await request(app).get(`/api/students/${testStudentData.email}`);
        expect(response.body.length).toBe(1);
    });
});

describe("Update Student via PUT /api/students/:email", () => {
    test("It should respond with error for missing 'name' param", async () => {
        const updateResponse = await request(app).put(`/api/students/${testStudentData.email}`).send({
            name: "",
        });
        expect(updateResponse.body).toHaveProperty("success");
        expect(updateResponse.body).toHaveProperty("message");
        expect(updateResponse.body.success).toBe(false);
        expect(updateResponse.body.message).toBe("Please fill all fields.");
        expect(updateResponse.statusCode).toBe(400);
    });

    test("It should update details of student", async () => {
        const updateResponse = await request(app).put(`/api/students/${testStudentData.email}`).send({
            name: testStudentData.name,
        });
        expect(updateResponse.body).toHaveProperty("success");
        expect(updateResponse.body).toHaveProperty("message");
        expect(updateResponse.body.success).toBe(true);
        expect(updateResponse.body.message).toBe("Student was successfully updated.");
        expect(updateResponse.statusCode).toBe(200);

        // Verify that the updated student reflects in student table
        const response = await request(app).get(`/api/students/${testStudentData.email}`);
        expect(response.body[0]?.name === testStudentData.name).toBeTruthy();
    });
});

describe("Delete Student via DELETE /api/students/:email", () => {
    test("It should respond with error for deleting registered students", async () => {
        const deleteResponse = await request(app).delete(`/api/students/${fetchStudentData.email}`);
        expect(deleteResponse.body.errno).toBe(1451);
        expect(deleteResponse.statusCode).toBe(400);
    });

    test("It should delete student record", async () => {
        const deleteResponse = await request(app).delete(`/api/students/${testStudentData.email}`);
        expect(deleteResponse.body).toHaveProperty("success");
        expect(deleteResponse.body).toHaveProperty("message");
        expect(deleteResponse.body.success).toBe(true);
        expect(deleteResponse.body.message).toBe("Student was successully deleted.");
        expect(deleteResponse.statusCode).toBe(200);

        // Verify that the deleted student does not exist in student table
        const response = await request(app).get(`/api/students/${testStudentData.email}`);
        expect(response.body.length).toBe(0);
    });
});
