import React, { Component } from 'react';
import {FormGroup, FormControl, Button,ControlLabel,HelpBlock} from 'react-bootstrap'
import store from '../store';
import {addStudent,postStudent,emptyStudent} from '../reducers'
import {connect} from 'react-redux'
import validator from 'email-validator'


function StudentsAdd (props) {
  //valid stuff could make file likely if have time
    const theValidator = (props)=>{
      let first_nameValidation = null
      let last_nameValidation = null
      let email_Validation = null
      if(props.first_name){
        if(props.first_name.length < 3){
          first_nameValidation = 'error'
        }else{
          first_nameValidation = 'success'
        }
      }
      if(props.last_name){
        if(props.last_name.length < 3){
          last_nameValidation = 'error'
        }else{
          last_nameValidation = 'success'
        }
      }

      if(validator.validate(props.email)){
        email_Validation = 'success'
      }else{
        if(!props.email){
          email_Validation = null
        }else{
          email_Validation = 'error'
        }

      }
      return ({first_nameValidation,last_nameValidation,email_Validation})
    }

    const {first_nameValidation, last_nameValidation, email_Validation} = theValidator(props.newStudent)

    const addNewStudentButton = (first,last,email)=>{
      if(first !== 'success' || last !== 'success' || email !== 'success'){
        return (
          <Button disabled type="submit">
            Enter
          </Button>
        )
      }else{
        return(
          <Button type="submit">
            Enter
          </Button>
        )
      }
    }
      return (
        <div>
          <h3>Add New Student</h3><br/>
          <form onSubmit={props.handleOnSubmit}>
            <FormGroup bsSize="large" validationState={first_nameValidation}>
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                className="form-control"
                name='first_name'
                type='text'
                placeholder="First Name"
                onChange={props.handleOnChange}
              required/>
            </FormGroup>
            <FormGroup bsSize="large" validationState={last_nameValidation}>
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                className="form-control"
                name='last_name'
                type='text'
                placeholder="Last Name"
                onChange={props.handleOnChange}
              required/>
            </FormGroup>
            <FormGroup bsSize="large" validationState={email_Validation}>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                className="form-control"
                name='email'
                type='text'
                placeholder="Email"
                onChange={props.handleOnChange}
              required/>
            </FormGroup>
            <FormGroup controlId="formControlsSelect" bsSize="large">
              <ControlLabel>Campus</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={props.handleOnChange} name='campusId'>
                {props.campuses.map((campus)=>{
                  return <option key={campus.id} value={campus.id}>{campus.id}: {campus.name}</option>
                })}
              </FormControl>
            </FormGroup>

            {addNewStudentButton(first_nameValidation,last_nameValidation,email_Validation)}
          </form>
        </div>
      )

  }


  const mapStateToProps = function(state){
    return{
      newStudent: state.newStudent,
      campuses: state.campuses
    }
  }

  const mapDispatchToProps = function(dispatch,ownProps){
     return{
       handleOnChange(event){
         const value = event.target.value
         const name = event.target.name
         console.log(name,value)
         dispatch(addStudent({[name]: value}))
       },
       handleOnSubmit(event){
         event.preventDefault()
         const value = event.target.value
         const name = event.target.name
         dispatch(postStudent({
           first_name: event.target.first_name.value,
           last_name: event.target.last_name.value,
           email: event.target.email.value,
           campusId: event.target.campusId.value
         })).then(()=>{
          dispatch(emptyStudent({}))
          ownProps.history.push("/students")
         })

       }
     }
   }

   const StudentsAddContainer = connect(mapStateToProps,mapDispatchToProps)(StudentsAdd)
   export default StudentsAddContainer
