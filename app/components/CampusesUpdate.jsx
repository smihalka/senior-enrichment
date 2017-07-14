import React, { Component } from 'react';
import {FormGroup, FormControl, Button,ControlLabel,HelpBlock} from 'react-bootstrap'
import {getOneCampus,putCampus,updateCampus} from '../reducers'
import {connect} from 'react-redux'
import store from '../store'
import {theValidator, campusButton} from './FormValidateCampus'

class CampusUpdate extends Component {

  componentDidMount () {
    this.props.fetchUpdateCampusData(this.props.match.params.id)
  }

   render() {

   if(this.props.campusUpdate){
       const campusSelect = this.props.campusUpdate
       const {nameValidation, imageValidation} = theValidator(campusSelect)

     return (
       <div>
         <h1>Edit Campus</h1>

         <form onSubmit={this.props.handleOnSubmit}>
           <input type="hidden" name="id" value={this.props.match.params.id}/>
           <FormGroup bsSize="large" validationState={nameValidation}>
             <ControlLabel>Campus Name</ControlLabel>
             <FormControl
               className="form-control"
               name='name'
               type='text'
               value={campusSelect.name}
               onChange={this.props.handleOnChange}
             required/>
           </FormGroup>
           <FormGroup bsSize="large" validationState={imageValidation}>
             <ControlLabel>Image URL</ControlLabel>
             <FormControl
               className="form-control"
               name='image'
               type='text'
               value={campusSelect.image}
               onChange={this.props.handleOnChange}
             required/>
           </FormGroup>
           {campusButton(imageValidation,nameValidation)}
         </form>

       </div>
     )
   }else{
     return(<div><h1>Edit comming soon!</h1></div>)
   }
   }
}
const mapStateToProps = function(state){
  return{
    campusUpdate: state.campusUpdate
  }
}

const mapDispatchToProps = function(dispatch,ownProps){
   return{
     handleOnChange(event){
       const value = event.target.value
       const name = event.target.name
       dispatch(updateCampus({[name]: value}))
     },
     handleOnSubmit(event){
       event.preventDefault()
       const evtObj = {
         id: event.target.id.value,
         name: event.target.name.value,
         image: event.target.image.value
       }
       const putThunk = putCampus(event.target.id.value,evtObj)
       dispatch(putThunk)
       .then(()=>{
         ownProps.history.push('/campuses')
       })

     },
     fetchUpdateCampusData(id){
       const editThunk = getOneCampus(id)
       dispatch(editThunk)
     }

   }
 }

 const CampusUpdateContainer = connect(mapStateToProps,mapDispatchToProps)(CampusUpdate)
 export default CampusUpdateContainer
