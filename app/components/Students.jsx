import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {removeStudent} from '../reducers'
import {Table,Button,Glyphicon} from 'react-bootstrap'

function Students (props) {

    return (
      <div>
        <h1>Students</h1>
        <h4><Link to={`/students/add`}>Add New Student</Link></h4>
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
              {props.students.map((student,key)=>{
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
                  <td><Button bsSize='xsmall' onClick={props.handleDelete}>
                    <Glyphicon data-name={student.first_name} data-value={student.id} glyph='glyphicon glyphicon-remove'/>
                  </Button></td>
                </tr>
                )
              })}
            </tbody>

          </Table>

        </div>
      </div>
    )

}

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}
const mapDispatchToProps= (dispatch) => {
  return {
    handleDelete(event){
      if(confirm(`Please confirm delete of ...${event.target.dataset.name}`)){
          dispatch(removeStudent(event.target.dataset.value))
      }
    }

  }
}
const ContainerStudents = connect(mapStateToProps,mapDispatchToProps)(Students)
export default ContainerStudents
