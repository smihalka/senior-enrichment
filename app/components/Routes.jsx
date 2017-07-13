import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Students from './Students'
import SudentsUpdate from './StudentsUpdate'
import StudentsAdd from './StudentsAdd'
import Campuses from './Campuses'
import CampusesUpdate from './CampusesUpdate'
import CampusesAdd from './CampusesAdd'
import CampusesStudents from './CampusesStudents'
import Nav from './Nav'
import {fetchCampuses,fetchStudents} from '../reducers'
import store from '../store';

class Routes extends Component {
  componentDidMount(){
    this.props.fetchInitialState()
  }
  render() {
    return (
        <Router>
          <div>
            <Nav/>
            <div className='container'>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/students/add" component={StudentsAdd} />
                <Route exact path="/students/:id" component={SudentsUpdate} />
                <Route exact path="/campuses/:id/students" component={CampusesStudents} />
                <Route exact path="/campuses" component={Campuses} />
                <Route exact path="/campuses/add" component={CampusesAdd} />
                <Route exact path="/campuses/:id" component={CampusesUpdate} />
              </Switch>
              </div>
          </div>
        </Router>
    )
  }

}


const mapProps = null;

const mapDispatch = dispatch => ({
  fetchInitialState: () => {
    dispatch(fetchStudents());
    dispatch(fetchCampuses());
  }
});

export default connect(mapProps, mapDispatch)(Routes);
