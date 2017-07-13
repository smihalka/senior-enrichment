import React, { Component } from 'react';
import axios from 'axios'
import {FormGroup, FormControl, Button,ControlLabel,HelpBlock} from 'react-bootstrap'

export default class CampusesUpdate extends Component {
  constructor (){
    super()
    this.state = {
      campus: {}
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnSubmit(event){
    event.preventDefault()
    console.log(this.state)
    //  axios.post('/api/campuses',this.state)
    //  .then(res)
  }

  handleOnChange(event){
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const campusid = Number(event.target.dataset.id)
    console.log(value,event.target.dataset.id)
    this.setState({

      campus:{[name]: value}
    })
  }

   componentDidMount(){
     axios.get(`/api/campuses/${this.props.match.params.id}`)
     .then(res => res.data)
     .then((campus) =>{
       this.setState({campus: campus})
     }).catch(console.log)
   }
   render() {
     return (
       <div>
         <h1>Edit Campus {this.state.campus.name} #{this.state.campus.id}</h1>

         <form onSubmit={this.handleOnSubmit}>
           <FormGroup bsSize="large">
             <ControlLabel>Campus Name</ControlLabel>
             <FormControl
               className="form-control"
               name='campus'
               data-id={this.state.campus.id}
               type='text'
               value={this.state.campus.name}
               placeholder="First Name"
               onChange={this.handleOnChange}
             required/>
           </FormGroup>
           <Button type="submit">
             Enter
           </Button>


         </form>

       </div>
     )
   }
}
