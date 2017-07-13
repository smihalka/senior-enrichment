'use strict'
const api = require('express').Router()
const {Campus, Student} = require('../db/models')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

// All the GETS
//all campuses on maggies planet
api.get('/campuses', (req, res) => {
  Campus.findAll()
  .then(result => res.json(result))
})

//campus by ID to Students
api.get('/campuses/:id/students', (req, res) => {
  Student.findAll({where:{
    campusId: req.params.id
  }}).then(result => res.json(result))
})

//campus by ID
api.get('/campuses/:id', (req, res) => {
  Campus.findOne({where:{
    id: req.params.id
  }}).then(result => res.json(result))
})
//a
//all students
api.get('/students/', (req, res) => {
  Student.findAll()
  .then(result => res.json(result))
})
//student by ID
api.get('/students/:id', (req, res) => {
  Student.findOne({where:{
    id: req.params.id
  }})
  .then(result => res.json(result))
})

// All the Posts add campus and student

api.post('/campuses', (req, res, next) => {
  Campus.create(req.body)
  .then((result) => {
    res.redirect('/api/campuses')
  }).catch(next)
})

api.post('/students', (req, res, next) => {
  Student.create(req.body)
  .then((result) => {
    res.redirect('/api/students')
  }).catch(next)
})

//Puts update campus, and student

api.put('/campuses/:id', (req, res, next) => {
  Campus.update(req.body,
    {where:{
      id: req.params.id
    }}).then((result) => {
      res.json(result)
    }).catch(next)
  })

api.put('/students/:id', (req, res, next) => {
  Student.update(req.body,
    {where:{
      id: req.params.id
    }}).then((result) => {
    res.json(result)
    }).catch(next)
  })

//delete api for Campus and Student

api.delete('/campuses/:id', (req, res, next) => {
  Campus.destroy({where:{
    id: req.params.id
  }}).then((result) => {
    res.json(result)
  }).catch(next)
})

api.delete('/students/:id', (req, res, next) => {
  Student.destroy({where:{
    id: req.params.id
  }}).then((result) => {
    res.json(result)
  }).catch(next)
})

module.exports = api
