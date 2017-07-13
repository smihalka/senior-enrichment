import React from 'react'
import { Link } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'

const Navigation = (props) => {

  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Margies Campus World</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/campuses">
            <NavItem eventKey={1}>Campuses</NavItem>
          </LinkContainer>
          <LinkContainer to="/students">
            <NavItem eventKey={2}>Students</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Navigation
