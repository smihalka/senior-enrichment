import React, { Component } from 'react';
import {FormGroup, FormControl, Button,ControlLabel,HelpBlock} from 'react-bootstrap'
import store from '../store';
import {addStudent,postStudent,emptyStudent} from '../reducers'
import {connect} from 'react-redux'
import validator from 'email-validator'


export function theValidator (props) {
  let nameValidation = null
  let imageValidation = null
  if(props.name){
    if(props.name.length < 3){
      nameValidation = 'error'
    }else{
      nameValidation = 'success'
    }
  }
  if(props.image){
    if(props.image.length < 4){
      imageValidation = 'error'
    }else{
      imageValidation = 'success'
    }
  }
  return ({nameValidation,imageValidation})
}

export function campusButton (image,name) {
  if(image !== 'success' || name !== 'success'){
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



//const {nameValidation, imageValidation} = theValidator(props.newCampus)
