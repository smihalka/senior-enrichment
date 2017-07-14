import React from 'react';
import {FormGroup, FormControl, Button,ControlLabel,HelpBlock} from 'react-bootstrap'
import {addCampus,postCampus,emptyCampus} from '../reducers'
import {connect} from 'react-redux'
import {theValidator, campusButton} from './FormValidateCampus'

function CampusesAdd (props) {

    const {nameValidation, imageValidation} = theValidator(props.newCampus)

    return (
      <div>
        <h3>Add New Campus</h3><br/>
        <form onSubmit={props.handleOnSubmit}>
          <FormGroup bsSize="large" validationState={nameValidation}>
            <ControlLabel>Campus Name</ControlLabel>
            <FormControl
              name='name'
              type="text"
              placeholder="Enter New Campus"
              onChange={props.handleOnChange}/>
          </FormGroup>
          <FormGroup bsSize="large" validationState={imageValidation}>
            <ControlLabel>Image Url</ControlLabel>
            <FormControl
              name='image'
              type="text"
              placeholder="Enter URL Path"
              onChange={props.handleOnChange}/>
            <HelpBlock>Please contact admin to upload image to server for you</HelpBlock>
          </FormGroup>
          {campusButton(imageValidation,nameValidation)}
        </form>
      </div>
    )
}

const mapStateToProps = function(state){
  return{
    newCampus: state.newCampus
  }
}

const mapDispatchToProps = function(dispatch,ownProps){
   return{
     handleOnChange(event){
       const value = event.target.value
       const name = event.target.name
       dispatch(addCampus({[name]: value}))
     },
     handleOnSubmit(event){
       event.preventDefault()
       const value = event.target.value
       const name = event.target.name
       dispatch(postCampus({
         name: event.target.name.value,
         image: event.target.image.value
       })).then(()=>{
         dispatch(emptyCampus({}))
         ownProps.history.push('/campuses')
       })

     }
   }
 }

 const CampusesAddContainer = connect(mapStateToProps,mapDispatchToProps)(CampusesAdd)
 export default CampusesAddContainer
