import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Table,Button,Glyphicon} from 'react-bootstrap'
import {removeCampus} from '../reducers'
import store from '../store';

export default class Campuses extends Component {
  constructor (){
    super()
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleDelete(event){
    if(confirm(`Please confirm delete of ...${event.target.dataset.name}`)){
      store.dispatch(removeCampus(event.target.dataset.value))
    }
  }

  render() {
    return (
      <div>
        <h1>Campuses</h1>
        <h4><Link to={`/campuses/add`}>Add New Campus</Link></h4>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>Campus Name</th>
              <th>Student View</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.state.campuses.map((campus,key)=>{
              return (<tr key={campus.id}>
                <td>{campus.name}</td>
                <td><Link to={`/campuses/${campus.id}/students`}>
                  <Button bsSize='xsmall'>
                    <Glyphicon glyph='glyphicon glyphicon-education'/>
                  </Button></Link></td>
                <td><Link to={`/campuses/${campus.id}`}>
                  <Button bsSize='xsmall'>
                    <Glyphicon glyph='glyphicon glyphicon-pencil'/>
                  </Button>
                </Link></td>
                <td><Button bsSize='xsmall' onClick={this.handleDelete}>
                  <Glyphicon data-name={campus.name} data-value={campus.id} glyph='glyphicon glyphicon-remove'/>
                </Button></td>
              </tr>)})}
          </tbody>
        </Table>
      </div>
    )
  }
}
