import axios from 'axios';

/* -----------------    ACTION TYPES     ------------------ */

const GET_CAMPUSES = 'GET_CAMPUSES'
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const POST_CAMPUS = 'POST_CAMPUS'
const PUT_CAMPUS  = 'PUT_CAMPUS'

/* -----------------    ACTION CREATORS     ------------------ */
function getCampuses(campuses) { //
  const action = {type: GET_CAMPUSES, campuses}
  return action
}
export function deleteCampus(campusid) {
  const action = {type: DELETE_CAMPUS, campusid}
  return action
}
function addNewCampus(campus) {
  const action = {type: POST_CAMPUS, campus}
  return action
}

function putChangeCampus(campus) {
  const action = {type: PUT_CAMPUS, campus}
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

/* ------------       REDUCER     ------------------ */

const campuses = function(state = [], action) {
  switch(action.type) {
    case GET_CAMPUSES:
    return action.campuses
    case DELETE_CAMPUS:
    return state.filter((campus)=>{
      return campus.id !== action.campusid
    })
    case POST_CAMPUS:
    return state.concat(action.campus)
    case PUT_CAMPUS:
    return state.filter((campus)=>{
        action.campus.id = +action.campus.id
        return campus.id !== action.campus.id}).concat(action.campus)
    default: return state
  }
}

export default campuses
