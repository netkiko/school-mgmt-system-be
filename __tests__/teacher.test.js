const db = require("../config/db.config");
const request = require("supertest");
const app = require("../index");

// Test Data
const fetchTeacherData = {
    email: "michael_jordan@gmail.com",
    name: "Michael Jordan",
};
const testTeacherData = {
    email: "bill_russell@gmail.com",
    name: "Bill Russell",
    new_name: "Billy Hassle",
};

beforeAll(async () => {
    await db.query("DELETE FROM teachers WHERE email=?", testTeacherData.email);
});

beforeEach(async () => {});

afterEach(async () => {});

afterAll(async () => {
    db.end();
});

describe("Fetch All Teachers via GET /api/teachers/", () => {
    test("It should respond with an array of teachers", async () => {
        const response = await request(app).get("/api/teachers/");
        const arrTeachers = response.body;
        expect(arrTeachers.length > 0).toBeTruthy();
        expect(arrTeachers[0]?.email).toBeTruthy(); // should have email element
        expect(arrTeachers[0]?.name).toBeTruthy(); // should have name element
        expect(arrTeachers.filter((d) => d.email === "larry_bird@gmail.com").length > 0).toBeTruthy();
        expect(arrTeachers.filter((d) => d.email === "magic_johnson@gmail.com").length > 0).toBeTruthy();
        expect(arrTeachers.filter((d) => d.email === "michael_jordan@gmail.com").length > 0).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });
});

describe("Fetch Teacher via GET /api/teachers/:email", () => {
    test("It should respond with details of teacher", async () => {
        const response = await request(app).get(`/api/teachers/${fetchTeacherData.email}`);
        const arrTeachers = response.body;
        expect(arrTeachers.length > 0).toBeTruthy();
        expect(arrTeachers[0]?.email === fetchTeacherData.email).toBeTruthy();
        expect(arrTeachers[0]?.name === fetchTeacherData.name).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });
});

describe("Create New Teacher via POST /api/teachers/", () => {
    test("It should respond with error for missing 'email' param", async () => {
        const newTeacherResp = await request(app).post("/api/teachers").send({ email: "", name: testTeacherData.name });
        expect(newTeacherResp.body).toHaveProperty("success");
        expect(newTeacherResp.body).toHaveProperty("message");
        expect(newTeacherResp.body.success).toBe(false);
        expect(newTeacherResp.body.message).toBe("Please fill all fields.");
        expect(newTeacherResp.statusCode).toBe(400);
    });

    test("It should respond with error for missing 'name' param", async () => {
        const newTeacherResp = await request(app)
            .post("/api/teachers")
            .send({ email: testTeacherData.email, name: "" });
        expect(newTeacherResp.body).toHaveProperty("success");
        expect(newTeacherResp.body).toHaveProperty("message");
        expect(newTeacherResp.body.success).toBe(false);
        expect(newTeacherResp.body.message).toBe("Please fill all fields.");
        expect(newTeacherResp.statusCode).toBe(400);
    });

    test("It should respond with error for duplicate entry", async () => {
        const newTeacherResp = await request(app)
            .post("/api/teachers")
            .send({ email: fetchTeacherData.email, name: fetchTeacherData.name });
        expect(newTeacherResp.body.code).toBe("ER_DUP_ENTRY");
        expect(newTeacherResp.body.errno).toBe(1062);
        expect(newTeacherResp.statusCode).toBe(400);
    });

    test("It should create new teacher", async () => {
        const newTeacherResp = await request(app)
            .post("/api/teachers")
            .send({ email: testTeacherData.email, name: testTeacherData.name });
        expect(newTeacherResp.body).toHaveProperty("success");
        expect(newTeacherResp.body).toHaveProperty("message");
        expect(newTeacherResp.body.success).toBe(true);
        expect(newTeacherResp.body.message).toBe("Teacher was successfully created.");
        expect(newTeacherResp.statusCode).toBe(201);

        // Verify that the new added teacher exists in teacher table
        const response = await request(app).get(`/api/teachers/${testTeacherData.email}`);
        expect(response.body.length).toBe(1);
    });
});

describe("Update Teacher via PUT /api/teachers/:email", () => {
    test("It should respond with error for missing 'name' param", async () => {
        const updateResponse = await request(app).put(`/api/teachers/${testTeacherData.email}`).send({
            name: "",
        });
        expect(updateResponse.body).toHaveProperty("success");
        expect(updateResponse.body).toHaveProperty("message");
        expect(updateResponse.body.success).toBe(false);
        expect(updateResponse.body.message).toBe("Please fill all fields.");
        expect(updateResponse.statusCode).toBe(400);
    });

    test("It should update details of teacher", async () => {
        const updateResponse = await request(app).put(`/api/teachers/${testTeacherData.email}`).send({
            name: testTeacherData.name,
        });
        expect(updateResponse.body).toHaveProperty("success");
        expect(updateResponse.body).toHaveProperty("message");
        expect(updateResponse.body.success).toBe(true);
        expect(updateResponse.body.message).toBe("Teacher was successfully updated.");
        expect(updateResponse.statusCode).toBe(200);

        // Verify that the updated teacher reflects in teacher table
        const response = await request(app).get(`/api/teachers/${testTeacherData.email}`);
        expect(response.body[0]?.name === testTeacherData.name).toBeTruthy();
    });
});

describe("Delete Teacher via DELETE /api/teachers/:email", () => {
    test("It should respond with error for deleting teacher with registered students", async () => {
        const deleteResponse = await request(app).delete(`/api/teachers/${fetchTeacherData.email}`);
        expect(deleteResponse.body.errno).toBe(1451);
        expect(deleteResponse.statusCode).toBe(400);
    });

    test("It should delete teacher record", async () => {
        const deleteResponse = await request(app).delete(`/api/teachers/${testTeacherData.email}`);
        expect(deleteResponse.body).toHaveProperty("success");
        expect(deleteResponse.body).toHaveProperty("message");
        expect(deleteResponse.body.success).toBe(true);
        expect(deleteResponse.body.message).toBe("Teacher was successully deleted.");
        expect(deleteResponse.statusCode).toBe(200);

        // Verify that the deleted teacher does not exist in teacher table
        const response = await request(app).get(`/api/teachers/${testTeacherData.email}`);
        expect(response.body.length).toBe(0);
    });
});
