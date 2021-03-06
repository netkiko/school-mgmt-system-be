This is an School Management System (Backend Server) project bootstrapped with [Node.JS](https://nodejs.org/en/), [Express.JS](https://expressjs.com/) and [MySQL](https://www.mysql.com/).

## Getting Started

```bash


1.  Fork/Clone this repository;
2.  Change directory to school-mgmt-system-be and run npm install;
3.  Start your locally installed MySQL
4.  Create DB school_mgmt_db (refer to MySQL_Queries.txt);
5.  Create Tables teachers, students and teacher_students (refer to MySQL_Queries.txt);
6.  Insert all default data (refer to MySQL_Queries.txt);
7.  Run the Backend Server via npm start;
8.  Run the Unit Tests via npm test.


```

## Improvements and Decisions Made

1.  The application has two (2) parent tables (teachers and students) that requires proper maintenance so they have their own set of endpoints to perform CRUD functionalities. Primary key is the email address field.
2.  Registration of students to teachers requires a child table (teacher_students) to properly manage and maintain it. It will also cater queries and deletions without touching the parent tables. Take note that, teachers or students data cannot be deleted when those are in use, meaning, they exists in this child table. In other words, a teacher details cannot be deleted if there is/are student/s registered to her/him. And so for student details cannot be deleted if he/she is registered to certain teacher/s.
3.  Child table (teacher_students) uses teacher and student's primary keys as its foreign keys, that means, insertion of data is stricter, as it requires that the teacher and student's emails were already there in teacher and student tables. Take note of adding data to parent tables first and use those in child table.
4.  The above-mentioned tables have equivalent endpoint route names that are easier to distinguish and maintain.
5.  Unit tests expectations are mostly dependent to the test data provided (via MySQL_Queries.txt) so insertion of those must be performed first from the Getting Started section.
6.  Fetching of registered students to a specific teacher is a lot easier, just provide the teacher's email (you may refer to EndPoints List section) in endpoint's param. For instance that you need to fetch the unique or common students registered to multiple teachers, just provide the comma-separated teacher emails in the endpoints's param and it will take care of it.

## EndPoints List

```bash


----------------------------------------------------------------------------
Teachers
----------------------------------------------------------------------------
1.  Get All Teachers                                GET /api/teachers/
2.  Get Teacher by Email                            GET /api/teachers/:email
3.  Create New Teacher                              POST /api/teachers/
4.  Update Teacher by Email                         PUT /api/teachers/:email
5.  Delete Teacher by Email                         DELETE /api/teachers/:email


----------------------------------------------------------------------------
Students
----------------------------------------------------------------------------
1.  Get All Students                                GET /api/students/
2.  Get Student by Email                            GET /api/students/:email
3.  Create New Student                              POST /api/students/
4.  Update Student by Email                         PUT /api/students/:email
5.  Delete Student by Email                         DELETE /api/students/:email


----------------------------------------------------------------------------
Registration of Students to Teachers
----------------------------------------------------------------------------
1.  Get All Registered Students                     GET /api/teacher_students/
2.  Get Registered Students by Teacher's Email/s    GET /api/teacher_students/:email
3.  Get Registered Common Students
        by Teacher Emails                           GET /api/teacher_students/common/:email
4.  Register Students to Teacher                    POST /api/teacher_students/register/
5.  Delete Registered Student
        by Teacher and Student's Email              DELETE /api/teacher_students/:teacherEmail/:studentEmail
6.  Delete All Registered Students
        by Teacher's Email                          DELETE /api/teacher_students/:email

```

You may refer to exported Postman Collection of these above APIs from the root folder. (SchoolMgmtSystemAPIs.postman_collection.json)
