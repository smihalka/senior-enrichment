import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {removeStudent} from '../reducers'
import {Table,Button,Glyphicon} from 'react-bootstrap'
import store from '../store';

export default class Students extends Component {
  constructor (){
    super()
    this.state = store.getState();
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  handleDelete(event){
    if(confirm(`Please confirm delete of ...${event.target.dataset.name}`)){
        store.dispatch(removeStudent(event.target.dataset.value))
    }

  }

  componentWillUnmount () {
    this.unsubscribe();
  }
   render() {
     console.log(this.state.students)
    return (
      <div>
        <h1>Students</h1>
        <div>
          <Table bordered hover responsive striped>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Campus</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((student,key)=>{
                return (<tr key={key}>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td><Link to={`/students/${student.id}`}>
                    <Button bsSize='xsmall'>
                      <Glyphicon glyph='glyphicon glyphicon-pencil'/>
                    </Button>
                  </Link></td>
                  <td>{student.campusId}</td>
                  <td><Button bsSize='xsmall' onClick={this.handleDelete}>
                    <Glyphicon data-name={student.first_name} data-value={student.id} glyph='glyphicon glyphicon-remove'/>
                  </Button></td>
                </tr>
                )
              })}
            </tbody>

          </Table>
          <h2><Link to={`/students/add`}>Add New Student</Link></h2>
        </div>
      </div>
 )
  }
}
