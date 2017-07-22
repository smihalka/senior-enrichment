const Sequelize = require('sequelize');
const db = require('../index.js')
const Campus = require('./campus')
//Students, data structures. Interesting bunch is all I have to say

const Student = db.define('student', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
})

//Students belong to University... The man is always owning,
//never really giving Campsues have many students, but may have none at all
//Yeah, I just informative, like I am a pro and what not !!!

Student.belongsTo(Campus, {as: 'campus'})

module.exports = Student
