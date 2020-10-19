const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { uuid } = require("uuidv4");

const students = [];

const studentMapping = (student) => {
  return {
    id: student.id,
    name: student.name,
    age: student.age,
    gender: student.gender,
  };
};

/* GET student details. */
router.get("/student/:id", function (req, res, next) {
  const student = students.filter((s) => s.id === req.params.id);
  if (student.length) {
    res.json(200, _.first(student));
  } else {
    res.json(404, {
      errorDescription: `Student with id ${req.params.id} record not found`,
    });
  }
});

/* GET list of registered student. */
router.get("/students", function (req, res, next) {
  const mappedStudents = students.map((student) => studentMapping(student));
  res.json(200, mappedStudents);
});

/* CREATE student. */
router.post("/student/register", function (req, res, next) {
  const student = {
    id: uuid(),
    ...req.body,
  };
  students.push(student);
  res.send(200);
});

/* UPDATE student details. */
router.put("/student/:id", function (req, res, next) {
  const id = req.params.id;

  _.remove(students, (student) => {
    return student.id === id;
  });

  const updatedStudent = req.body;

  const student = {
    id,
    name: updatedStudent.name,
    age: updatedStudent.age,
    gender: updatedStudent.gender,
  };

  students.push(student);

  res.json(200, {
    id: req.params.id,
  });
});

/* DELETE student. */
router.delete("/student/:id", function (req, res, next) {
  _.remove(students, (student) => {
    return student.id === req.params.id;
  });
  res.json(200, {
    id: req.params.id,
  });
});

module.exports = router;
