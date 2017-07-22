import axios from 'axios';

const GET_CAMPUS = 'GET_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'

export function getCampus(campus) {
  const action = {type: GET_CAMPUS, campus}
  return action
}


export function updateCampus(updateCampus) {
  const action = {type: UPDATE_CAMPUS, updateCampus}
  return action
}
/* ------------      THUNKS       --------------------*/

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

/* ------------       REDUCER     ------------------ */
const campusUpdate = function(state = {},action){
  switch(action.type){
    case UPDATE_CAMPUS:
    return Object.assign({},state,action.updateCampus)
    case GET_CAMPUS:
    return action.campus
    default: return state
  }
}

export default campusUpdate
