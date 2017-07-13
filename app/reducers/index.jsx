/* -----------------    IMPORTS     ------------------ */
import { combineReducers } from 'redux'
import axios from 'axios';


/* ------------    INITIAL STATE    ------------------ */
//not sure campus and student update are needed, but they
//make me feel safe for now... or not because I am wondering
//if we need them
const initialState = {
  campuses: [],
  students: [],
  studentUpdate: {},
  campusUpdate: {},
  campusStudents: []
}

/* -----------------    ACTION TYPES     ------------------ */

const GET_CAMPUSES = 'GET_CAMPUSES'
const GET_CAMPUS = 'GET_CAMPUS'
//not sure being used correctly
const ADD_CAMPUS = 'ADD_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const POST_CAMPUS = 'POST_CAMPUS'

const GET_STUDENTS = 'GET_STUDENTS'
const GET_STUDENT = 'GET_STUDENT'
//not sure being used correctly
const ADD_STUDENT = 'ADD_STUDENT'
const POST_STUDENT = 'POST_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'

const PUT_STUDENT = 'PUT_STUDENT'
const PUT_CAMPUS  = 'PUT_CAMPUS'

const GET_STUDENTS_CAMPUS  = 'GET_STUDENTS_CAMPUS'


/* -----------------    ACTION CREATORS     ------------------ */

function getCampuses(campuses) {
  const action = {type: GET_CAMPUSES, campuses}
  return action
}
function getStudents(students) {
  const action = {type: GET_STUDENTS, students}
  return action
}

export function addCampus(newCampus) {
  const action = {type: ADD_CAMPUS, newCampus};
  return action
}

export function addNewCampus(campus) {
  const action = {type: POST_CAMPUS, campus}
  return action
}

export function addStudent(newStudent) {
  const action = {type: ADD_STUDENT, newStudent}
  return action
}

export function addNewStudent(student) {
  const action = {type: POST_STUDENT, student}
  return action
}

export function getStudent(student) {
  const action = {type: GET_STUDENT, student}
  return action
}

export function getCampus(campus) {
  const action = {type: GET_CAMPUS, campus}
  return action
}

export function deleteCampus(campusid) {
  const action = {type: DELETE_CAMPUS, campusid}
  return action
}

export function deleteStudent(studentid) {
  const action = {type: DELETE_STUDENT, studentid}
  return action
}

export function putChangeStudent(student) {
  const action = {type: PUT_STUDENT, student}
  return action
}

function putChangeCampus(campus) {
  const action = {type: PUT_CAMPUS, campus}
  return action
}

function getStudentCampus(students) {
  const action = {type: GET_STUDENTS_CAMPUS, students}
  return action
}

/* ------------      THUNKS       --------------------*/


export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      const action = getCampuses(campuses)
      dispatch(action)
    })
  }
}

export function fetchStudents() {
  return function thunk(dispatch) {
    return axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      const action = getStudents(students)
      dispatch(action)
    })
  }
}

export function postCampus(campus) {
  return function thunk(dispatch){
    return axios.post('api/campuses', campus)
    .then(res => res.data)
    .then(newCampus => {
      console.log(newCampus)
      const action = addNewCampus(newCampus)
      dispatch(action);
    })
  }
}

export function postStudent(student) {
  return function thunk(dispatch){
    return axios.post('api/students', student)
    .then(res => res.data)
    .then(newStudent => {
      const action = addNewStudent(newStudent)
      dispatch(action);
    })
  }
}


export function removeCampus(id) {
  return function thunk(dispatch) {
    return axios.delete(`/api/campuses/${id}`)
    .then(res => res.data)
    .then((bool) => {
      if(bool){
        id = Number(id)
        const action = deleteCampus(id)
        dispatch(action)
      }
    }).catch(console.error.bind(console))
  }
}

export function removeStudent(id) {
  return function thunk(dispatch) {
    return axios.delete(`/api/students/${id}`)
    .then(res => res.data)
    .then((bool) => {
      if(bool){
        id = Number(id)
        const action = deleteStudent(id)
        dispatch(action)
      }
    }).catch(console.error.bind(console))
  }
}

export function getOneStudent(id){
  return function thunk(dispatch){
    return axios(`/api/students/${id}`)
    .then(res => res.data)
    .then(student =>{
      const action = getStudent(student)
      dispatch(action)
    }).catch(console.error.bind(console))
  }
}

export function putStudent(id,changeStudent) {
  return function thunk(dispatch){
    return axios.put(`api/students/${id}`, changeStudent)
    .then(res => res.data)
    .then(bool => {
      console.log(bool)
        const action = putChangeStudent(changeStudent)
        dispatch(action)
    }).catch(console.error.bind(console))
  }
}

export function putCampus(id,changeCampus) {
  return function thunk(dispatch){
    return axios.put(`api/campuses/${id}`, changeCampus)
    .then(res => res.data)
    .then(bool => {
      if(bool){
        const action = putChangeCampus(changeCampus)
        dispatch(action)
      }
    }).catch(console.error.bind(console))
  }
}

export function getOneCampus(id){
  return function thunk(dispatch){
    return axios(`/api/campuses/${id}`)
    .then(res => res.data)
    .then(campus =>{
      const action = getCampus(campus)
      dispatch(action)
    }).catch(console.error.bind(console))
  }
}

export function fetchStudentsCampus(id){
  return function thunk(dispatch){
    return axios(`/api/campuses/${id}/students`)
    .then(res => res.data)
    .then(students =>{
      const action = getStudentCampus(students)
      dispatch(action)
    }).catch(console.error.bind(console))
  }
}


/* ------------       REDUCERS     ------------------ */

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_CAMPUSES:
    return Object.assign({},state,{
        campuses: action.campuses})
    case GET_STUDENTS:
    return Object.assign({},state,{
        students: action.students})
    case ADD_CAMPUS:
    return Object.assign({},state,{
        newCampus: action.newCampus
    })
    case POST_CAMPUS:
    return Object.assign({},state,{
        campuses: state.campuses.concat(action.campus)
    })
    case ADD_STUDENT:
    return Object.assign({},state,{
        newStudent: action.newStudent
    })
    case POST_STUDENT:
    return Object.assign({},state,{
        students: state.students.concat(action.student)
    })
    case DELETE_CAMPUS:
    return Object.assign({},state,{
      campuses: state.campuses.filter((campus)=>{
        return campus.id !== action.campusid})
    })
    case DELETE_STUDENT:
    return Object.assign({},state,{
      students: state.students.filter((student)=>{
        return student.id !== action.studentid})
    })
    case GET_STUDENT:
    return Object.assign({},state,{
        studentUpdate: action.student
    })
    case PUT_STUDENT:
    return Object.assign({},state,{
      students: state.students.filter((student)=>{
        action.student.id = +action.student.id
        return student.id !== action.student.id}).concat(action.student)
    })
    case PUT_CAMPUS:
    return Object.assign({},state,{
      campuses: state.campuses.filter((campus)=>{
        action.campus.id = +action.campus.id
        return campus.id !== action.campus.id}).concat(action.campus)
    })
    case GET_CAMPUS:
    return Object.assign({},state,{
        campusUpdate: action.campus
    })
    case GET_STUDENTS_CAMPUS:
    return Object.assign({},state,{
        campusStudents: action.students
    })
    default: return state
  }
};

export default rootReducer
