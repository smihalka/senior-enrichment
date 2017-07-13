import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {Table,Button,Glyphicon} from 'react-bootstrap'

export default class CampusesStudents extends Component {
  constructor (){
    super()
    this.state = {
      students: [],
      campus:[]
    }
  }
   componentDidMount(){
     axios.get(`/api/campuses/${this.props.match.params.id}/students`)
     .then(res => res.data)
     .then((students) =>{
       this.setState({students: students})
     }).catch(console.log)

     axios.get(`/api/campuses/${this.props.match.params.id}`)
     .then(res => res.data)
     .then((campus) =>{
       this.setState({campus: campus})
     }).catch(console.log)
   }
   render() {
     return (
       <div>
         <h1>Students: {this.state.campus.name}</h1>
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
                 </tr>
                 )
               })}
             </tbody>

           </Table>
           {/* <h2><Link to={`/students/add`}>Add New Student</Link></h2> */}
         </div>
       </div>


     )
   }

  }
