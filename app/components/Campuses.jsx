import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Table,Button,Glyphicon} from 'react-bootstrap'
import {removeCampus} from '../reducers'

function Campuses (props) {
  //Buttonsdisplay
  const studentViewButton = (id) => {
    const studentCount = props.students.filter(student => student.campusId === id).length
    if(studentCount > 0){
      return (
        <Button  bsSize='xsmall' onClick={props.handleClick}>
          <Glyphicon data-id={id} glyph='glyphicon glyphicon-education'/>
        </Button>)
      }else{
        return (
          <Button  bsSize='xsmall' disabled  onClick={props.handleClick}>
            <Glyphicon data-id={id} glyph='glyphicon glyphicon-education'/>
          </Button>
        )
      }
    }
    const removeButton = (id,name) => {
      const studentCount = props.students.filter(student => student.campusId === id).length
      if(studentCount > 0){
        return (
          <Button bsSize='xsmall' disabled onClick={props.handleDelete}>
            <Glyphicon data-name={name} data-value={id} glyph='glyphicon glyphicon-remove'/>
          </Button>
          )
        }else{
          return (
            <Button bsSize='xsmall' onClick={props.handleDelete}>
              <Glyphicon data-name={name} data-value={id} glyph='glyphicon glyphicon-remove'/>
            </Button>
          )
        }
      }

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
            {props.campuses.map((campus)=>{
              return (<tr key={campus.id}>
                <td>{campus.name}</td>
                <td>
                  {/* does not show if student count below 1 */}
                  {studentViewButton(campus.id)}
                </td>
                <td><Link to={`/campuses/${campus.id}`}>
                  <Button bsSize='xsmall'>

                    <Glyphicon glyph='glyphicon glyphicon-pencil'/>
                  </Button>
                </Link></td>
                <td>
                  {removeButton(campus.id,campus.name)}
                </td>
              </tr>)})}
          </tbody>
        </Table>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students
  }
}
const mapDispatchToProps= (dispatch,ownProps) => {
  return {
    handleDelete(event){
      if(confirm(`Please confirm delete of ...${event.target.dataset.name}`)){
        dispatch(removeCampus(event.target.dataset.value))
      }
    },
    handleClick(event){
      ownProps.history.push(`/campuses/${event.target.dataset.id}/students`)
    }
  }
}
const ContainerCampuses = connect(mapStateToProps,mapDispatchToProps)(Campuses)
export default ContainerCampuses
