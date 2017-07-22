import axios from 'axios';

/* -----------------    ACTION TYPES     ------------------ */

const GET_STUDENTS_CAMPUS  = 'GET_STUDENTS_CAMPUS'


/* -----------------    ACTION CREATORS     ------------------ */


function getStudentCampus(students) {
  const action = {type: GET_STUDENTS_CAMPUS, students}
  return action
}

/* ------------      THUNKS       --------------------*/


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

const campusStudents = function(state = [], action) {
  switch(action.type) {
    case GET_STUDENTS_CAMPUS:
    return action.students
    default: return state
  }
}

export default campusStudents
