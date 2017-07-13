import React, { Component } from 'react';
import {FormGroup, FormControl, Button,ControlLabel,HelpBlock} from 'react-bootstrap'
import store from '../store';
import {addCampus,postCampus} from '../reducers'
import {connect} from 'react-redux'

function CampusesAdd (props) {
    return (
      <div>
        <h3>Add New Campus</h3><br/>
        <form onSubmit={props.handleOnSubmit}>
          <FormGroup bsSize="large">
            <ControlLabel>Campus Name</ControlLabel>
            <FormControl
              name='name'
              type="text"
              placeholder="Enter New Campus"
              onChange={props.handleOnChange}/>
          </FormGroup>
          <FormGroup bsSize="large">
            <ControlLabel>Image Url</ControlLabel>
            <FormControl
              name='image'
              type="text"
              placeholder="Enter URL Path"
              onChange={props.handleOnChange}/>
            <HelpBlock>Please contact admin to upload image to server for you</HelpBlock>
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
         ownProps.history.push('/campuses')
       })

     }
   }
 }

 const CampusesAddContainer = connect(mapStateToProps,mapDispatchToProps)(CampusesAdd)
 export default CampusesAddContainer
