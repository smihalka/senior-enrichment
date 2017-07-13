import React, { Component } from 'react';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap'
import {getOneStudent,putStudent} from '../reducers'
import store from '../store'

export default class StudentsUpdate extends Component {
  constructor (){
    super()
    this.state = store.getState()
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  componentDidMount () {
    const editThunk = getOneStudent(this.props.match.params.id)
    store.dispatch(editThunk)
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount () {
    this.unsubscribe();
  }

  handleOnSubmit(event){
    event.preventDefault()
    console.log(this.state,event.target.first_name.value)
    const evtObj = {
      id: this.props.match.params.id,
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      campusId: event.target.campusId.value
    }
    const putThunk = putStudent(this.props.match.params.id,evtObj)
    store.dispatch(putThunk)
    .then(()=>{this.props.history.push("/students")})
  }

  handleOnChange(event){
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
  //not sure about this part here
     this.setState({
       studentUpdate:{[name]: value}
     })
}

render() {
  //consditional rendering
  if(this.state.studentUpdate){
    const studentSelect = this.state.studentUpdate
    return (
      <div>
        <h3>Student Info </h3>
        <form data-id={studentSelect.id} onSubmit={this.handleOnSubmit}>
          <FormGroup bsSize="large">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              className="form-control"
              name='first_name'
              type='text'
              value={studentSelect.first_name}
              onChange={this.handleOnChange}
            required/>
          </FormGroup>
          <FormGroup bsSize="large">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              className="form-control"
              name='last_name'
              type='text'
              value={studentSelect.last_name}
              onChange={this.handleOnChange}
            required/>
          </FormGroup>
          <FormGroup bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              className="form-control"
              name='email'
              type='text'
              value={studentSelect.email}
              onChange={this.handleOnChange}
            required/>
          </FormGroup>
          <FormGroup bsSize="large">
            <ControlLabel>Campus Id</ControlLabel>
            <FormControl
              className="form-control"
              name='campusId'
              type='text'
              value={studentSelect.campusId}
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
          return (<div><h1>Edit comming soon!</h1></div>)
        }
      }
}
