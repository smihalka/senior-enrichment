import React, { Component } from 'react';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap'
import {getOneStudent,putStudent,updateStudent} from '../reducers'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {theValidator, studentButton} from './FormValidateStudent'

class StudentUpdate extends Component {

  componentDidMount () {
    this.props.fetchUpdateStudentData(this.props.match.params.id)
  }

render() {
  //consditional rendering
  if(this.props.studentUpdate){
    const studentSelect = this.props.studentUpdate
    const {first_nameValidation, last_nameValidation, email_Validation} = theValidator(studentSelect)

    return (
      <div>
        <h3>Student id# {studentSelect.id} Info part of CampusId <Link to={`/campuses/${studentSelect.campusId}`}>{studentSelect.campusId}</Link></h3>
        <form data-id={studentSelect.id} onSubmit={this.props.handleOnSubmit}>
          <input type="hidden" name="id" value={this.props.match.params.id}/>
          <FormGroup bsSize="large" validationState={first_nameValidation}>
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              className="form-control"
              name='first_name'
              type='text'
              value={studentSelect.first_name}
              onChange={this.props.handleOnChange}
            required/>
          </FormGroup>
          <FormGroup bsSize="large" validationState={last_nameValidation}>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              className="form-control"
              name='last_name'
              type='text'
              value={studentSelect.last_name}
              onChange={this.props.handleOnChange}
            required/>
          </FormGroup>
          <FormGroup bsSize="large" validationState={email_Validation}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              className="form-control"
              name='email'
              type='text'
              value={studentSelect.email}
              onChange={this.props.handleOnChange}
            required/>
          </FormGroup>

          <FormGroup controlId="formControlsSelect" bsSize="large">
            <ControlLabel>Campus</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.props.handleOnChange} name='campusId'>
              {this.props.campuses.map((campus)=>{
                if(campus.id===studentSelect.campusId){
                  return <option key={campus.id} selected="selected" value={campus.id}>{campus.id}: {campus.name}</option>
                }else{
                  return <option key={campus.id} value={campus.id}>{campus.id}: {campus.name}</option>
                }
              })}
            </FormControl>
          </FormGroup>
          {studentButton(first_nameValidation,last_nameValidation,email_Validation)}
        </form>
      </div>
          )
        }else{
          return (<div><h1>Edit comming soon!</h1></div>)
        }
      }
}


const mapStateToProps = function(state){
  return{
    studentUpdate: state.studentUpdate,
    campuses: state.campuses
  }
}

const mapDispatchToProps = function(dispatch,ownProps){
   return{
     handleOnChange(event){
       const target = event.target
       const value = target.type === 'checkbox' ? target.checked : target.value
       const name = target.name
       dispatch(updateStudent({[name]: value}))
     },
     handleOnSubmit(event){
       event.preventDefault()
       const evtObj = {
         id:  event.target.id.value,
         first_name: event.target.first_name.value,
         last_name: event.target.last_name.value,
         email: event.target.email.value,
         campusId: Number(event.target.campusId.value)
       }
       const putThunk = putStudent(event.target.id.value,evtObj)
       dispatch(putThunk)
       .then(()=>{ownProps.history.push("/students")})
     },
     fetchUpdateStudentData(id){
       const editThunk = getOneStudent(id)
       dispatch(editThunk)
     }

   }
 }

 const StudentUpdateContainer = connect(mapStateToProps,mapDispatchToProps)(StudentUpdate)
 export default StudentUpdateContainer
