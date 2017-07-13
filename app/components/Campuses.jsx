import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Table,Button,Glyphicon} from 'react-bootstrap'
import {removeCampus} from '../reducers'

function Campuses (props) {

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
            {props.campuses.map((campus,key)=>{
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
                <td><Button bsSize='xsmall' onClick={props.handleDelete}>
                  <Glyphicon data-name={campus.name} data-value={campus.id} glyph='glyphicon glyphicon-remove'/>
                </Button></td>
              </tr>)})}
          </tbody>
        </Table>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}
const mapDispatchToProps= (dispatch) => {
  return {
    handleDelete(event){
      if(confirm(`Please confirm delete of ...${event.target.dataset.name}`)){
        dispatch(removeCampus(event.target.dataset.value))
      }
    }
  }
}
const ContainerCampuses = connect(mapStateToProps,mapDispatchToProps)(Campuses)
export default ContainerCampuses
