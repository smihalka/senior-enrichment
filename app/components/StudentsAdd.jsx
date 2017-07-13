import React, { Component } from 'react';
import {FormGroup, FormControl, Button,ControlLabel,HelpBlock} from 'react-bootstrap'
import store from '../store';
import {addStudent,postStudent} from '../reducers'
import {connect} from 'react-redux'


function StudentsAdd (props) {

      return (
        <div>
          <h3>Add New Student</h3><br/>
          <form onSubmit={props.handleOnSubmit}>
            <FormGroup bsSize="large">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                className="form-control"
                name='first_name'
                type='text'
                placeholder="First Name"
                onChange={props.handleOnChange}
              required/>
            </FormGroup>
            <FormGroup bsSize="large">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                className="form-control"
                name='last_name'
                type='text'
                placeholder="Last Name"
                onChange={props.handleOnChange}
              required/>
            </FormGroup>
            <FormGroup bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                className="form-control"
                name='email'
                type='text'
                placeholder="Email"
                onChange={props.handleOnChange}
              required/>
            </FormGroup>
            <FormGroup bsSize="large">
              <ControlLabel>Campus</ControlLabel>
              <FormControl
                className="form-control"
                name='campusId'
                type='text'
                placeholder="campus"
                onChange={props.handleOnChange}
              required/>
            </FormGroup>
            <Button type="submit">
              Enter
            </Button>
          </form>
        </div>
      )

  }


  const mapStateToProps = null

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
           ownProps.history.push("/students")
         })

       }
     }
   }

   const StudentsAddContainer = connect(mapStateToProps,mapDispatchToProps)(StudentsAdd)
   export default StudentsAddContainer
