import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Table,Button,Glyphicon} from 'react-bootstrap'
import {fetchStudentsCampus,getOneCampus} from '../reducers'

class CampusesStudents extends Component {

  componentDidMount(){
    this.props.fetchStudentsCampusData(this.props.match.params.id)
  }
  render() {
    return (
      <div>
        <h1>Students: {this.props.campus.name}</h1>
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
              </tr>
            </thead>
            <tbody>
              {this.props.campusStudents.map((student,key)=>{
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
                </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campusStudents: state.campusStudents,
    campus: state.campusUpdate,
    campuses: state.campuses
  }
}
const mapDispatchToProps= (dispatch) => {
  return {
    fetchStudentsCampusData(id){
      console.log("dispatching")
      dispatch(fetchStudentsCampus(id))
      dispatch(getOneCampus(id))
    }
  }
}
const ContainerCampusesStudents = connect(mapStateToProps,mapDispatchToProps)(CampusesStudents)
export default ContainerCampusesStudents
