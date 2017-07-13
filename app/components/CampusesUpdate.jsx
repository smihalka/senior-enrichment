import React, { Component } from 'react';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap'
import {getOneCampus,putCampus} from '../reducers'
import store from '../store'

export default class CampusesUpdate extends Component {
  constructor (){
    super()
    this.state = store.getState()
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  componentDidMount () {
    const editThunk = getOneCampus(this.props.match.params.id)
    store.dispatch(editThunk)
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleOnSubmit(event){
    event.preventDefault()
    const evtObj = {
      id: this.props.match.params.id,
      name: event.target.campus.value,
      image: event.target.image.value
    }
    const putThunk = putCampus(this.props.match.params.id,evtObj)
    store.dispatch(putThunk)
    .then(()=>{this.props.history.push("/campuses")})
  }

  handleOnChange(event){
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const campusid = Number(event.target.dataset.id)
    console.log(value,event.target.dataset.id)
    this.setState({
      campusUpdate:{[name]: value}
    })
  }

   render() {
     //consditional rendering
     if(this.state.campusUpdate){
       const campusSelect = this.state.campusUpdate
     return (
       <div>
         <h1>Edit Campus</h1>
         <form onSubmit={this.handleOnSubmit}>
           <FormGroup bsSize="large">
             <ControlLabel>Campus Name</ControlLabel>
             <FormControl
               className="form-control"
               name='campus'
               type='text'
               value={campusSelect.name}
               onChange={this.handleOnChange}
             required/>
           </FormGroup>
           <FormGroup bsSize="large">
             <ControlLabel>Image URL</ControlLabel>
             <FormControl
               className="form-control"
               name='image'
               type='text'
               value={campusSelect.image}
               onChange={this.handleOnChange}
             required/>
           </FormGroup>
           <Button type="submit">
             Enter
           </Button>
         </form>
       </div>
     )
   }else{
     return(<div><h1>Edit comming soon!</h1></div>)
   }
   }
}
