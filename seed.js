

var Promise = require('bluebird');
var db = require('./db');
var Campus = require('./db/models/campus');
var Student = require('./db/models/student');

var data = {
  students: [
    {first_name: "Erin", last_name: "Mihalka", email: "erin@mihalka.com", campusId: "3" },
    {first_name: "Laura", last_name: "Kravetz", email: "laura@mihalka.com",campusId: "1"},
    {first_name: "Shayne", last_name: "Mihalka", email: "shayne@mihalka.com", campusId: "1"},
    {first_name: "Lina", last_name: "Jones", email: "lj@fullstackacademy.com", campusId: "5"},
    {first_name: "Sulamita", last_name: "Morales",email: "sula@fullstackacademy.com", campusId: "5"},
    {first_name: "Kevin", last_name: "Genus", email: "kevin@fullstackacademy.com", campusId: "5"}
    ]
  ,
  campuses: [
    {name: "University of California at Santa Barbara", image: "/img/ucsb.png"},
    {name: "Santa Barbara City College", image: "/img/sbcc.png"},
    {name: "Ventura City College", image: "/img/vc.png"},
    {name: "California State University at Channel Islands", image: "/img/csuci.png"},
    {name: "Fullstack Academy", image: "/img/fullstack.png"}
  ]
};

db.sync({force: true})
.then(() => {
  console.log("Dropped old data, now inserting data");
  const createCampusSeed = Promise.map(data.campuses, function (campus) {
    console.log(campus)
    return Campus.create(campus);
  });
  return Promise.all([createCampusSeed])
})
.then(() => {

  const creatingStudents = Promise.map(data.students, function (student) {
    console.log(student)
    return Student.create(student);
  });
  return Promise.all([creatingStudents]);
})
.then(() => {
  console.log('students should be there!')
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
// .finally(()=> {
//   db.close(); // creates but does not return a promise
//   return null; // stops bluebird from complaining about un-returned promise
// });
