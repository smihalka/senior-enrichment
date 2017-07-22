/* -----------------    ACTION TYPES     ------------------ */

const ADD_STUDENT = 'ADD_STUDENT'
const EMPTY_STUDENT  = 'EMPTY_STUDENT'

/* -----------------    ACTION CREATORS     ------------------ */


export function addStudent(newStudent) {
  const action = {type: ADD_STUDENT, newStudent}
  return action
}

export function emptyStudent(newStudent) {
  const action = {type: EMPTY_STUDENT, newStudent};
  return action
}

/* ------------       REDUCER     ------------------ */

const newStudent = function(state = {}, action) {
  switch(action.type) {
    case ADD_STUDENT:
    return Object.assign({},state,action.newStudent)
    case EMPTY_STUDENT:
    return action.newStudent
    default: return state
  }
}

export default newStudent
