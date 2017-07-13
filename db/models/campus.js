var Sequelize = require('sequelize');
var db = require('../index.js')
//Campus basics for Margaret, she is a nice lady, but I worry about
//her business acume, why would she hire me?
//In other news, images will be kept in the public folder... duh!!
var Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Campus;
