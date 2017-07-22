/* -----------------    IMPORTS     ------------------ */
import { combineReducers } from 'redux'
import axios from 'axios';
import campuses from './campuses'
import students from './students'
import newCampus from './newCampus'
import newStudent from './newStudent'
import studentUpdate from './studentUpdate'
import campusUpdate from './campusUpdate'
import campusStudents from './campusStudents'

const reducers = combineReducers({
  campusStudents,
  campuses,
  students,
  newCampus,
  newStudent,
  studentUpdate,
  campusUpdate
})

export * from './campuses'
export * from './students'
export * from './newCampus'
export * from './newStudent'
export * from './studentUpdate'
export * from './campusUpdate'
export * from './campusStudents'

export default reducers
