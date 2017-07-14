import React from 'react';
import {Button} from 'react-bootstrap'
import validator from 'email-validator'


export function theValidator (props) {
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

export function studentButton (first,last,email){
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
