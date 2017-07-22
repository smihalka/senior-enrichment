import axios from 'axios';
/* -----------------    ACTION TYPES     ------------------ */

const GET_STUDENT = 'GET_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'

/* -----------------    ACTION CREATORS     ------------------ */

export function updateStudent(updateStudent) {
  const action = {type: UPDATE_STUDENT, updateStudent}
  return action
}

export function getStudent(student) {
  const action = {type: GET_STUDENT, student}
  return action
}

/* ------------      THUNKS       --------------------*/

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

/* ------------       REDUCERS     ------------------ */

const studentUpdate = function(state = {}, action) {
  switch(action.type) {
    case GET_STUDENT:
    return action.student
    case UPDATE_STUDENT:
    return Object.assign({},state,action.updateStudent)
    default: return state
  }
}

export default studentUpdate
