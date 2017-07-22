/* -----------------    ACTION TYPES     ------------------ */

const ADD_CAMPUS = 'ADD_CAMPUS'
const EMPTY_CAMPUS  = 'EMPTY_CAMPUS'

/* -----------------    ACTION CREATORS     ------------------ */

export function addCampus(newCampus) {
  const action = {type: ADD_CAMPUS, newCampus};
  return action
}

export function emptyCampus(newCampus) {
  const action = {type: EMPTY_CAMPUS, newCampus};
  return action
}


/* ------------       REDUCERS     ------------------ */

const newCampus = function(state = {}, action) {
  switch(action.type) {
    case ADD_CAMPUS:
    return Object.assign({},state,action.newCampus)
    case EMPTY_CAMPUS:
    return action.newCampus
    default: return state
  }
}

export default newCampus
