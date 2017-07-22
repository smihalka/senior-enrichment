import axios from 'axios';

/* -----------------    ACTION TYPES     ------------------ */

const GET_STUDENTS = 'GET_STUDENTS'
const DELETE_STUDENT = 'DELETE_STUDENT'
const POST_STUDENT = 'POST_STUDENT'
const PUT_STUDENT = 'PUT_STUDENT'

/* -----------------    ACTION CREATORS     ------------------ */

function getStudents(students) {
  const action = {type: GET_STUDENTS, students}
  return action
}

export function deleteStudent(studentid) {
  const action = {type: DELETE_STUDENT, studentid}
  return action
}

export function addNewStudent(student) {
  const action = {type: POST_STUDENT, student}
  return action
}

export function putChangeStudent(student) {
  const action = {type: PUT_STUDENT, student}
  return action
}

/* ------------      THUNKS       --------------------*/

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

/* ------------       REDUCER     ------------------ */

const students = function(state = [], action) {
  switch(action.type) {
    case GET_STUDENTS:
      return action.students
    case DELETE_STUDENT:
      return state.filter((student)=>{
        return student.id !== action.studentid
      })
    case POST_STUDENT:
      return state.concat(action.student)
    case PUT_STUDENT:
      return state.filter((student)=>{
          action.student.id = +action.student.id
          return student.id !== action.student.id}).concat(action.student)
    default: return state
  }
}

export default students
