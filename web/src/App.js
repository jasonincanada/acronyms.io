import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row'
import { createAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './App.css'
import { Login, Logout } from './features/user/Login'
import Room from './features/room/Room'
import SignUp from './features/user/SignUp'
import User from './features/user/User'

const appInit = createAction('app/init')

function App() {
  const dispatch = useDispatch()

  // App initialization
  useEffect(() => {
    dispatch(appInit())
  })

  return (
    <Router>
      <Container>
      <Row>
        <Col>

        <div className="App">
          <Navbar bg="light">
            <Navbar.Brand href="/">acronyms.io</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Log In</Nav.Link>

                <NavDropdown title="Rooms">
                  <NavDropdown.Item href="/r/room-with-game">r/room-with-game</NavDropdown.Item>
                  <NavDropdown.Item href="/r/room-no-game">r/room-no-game</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

            <div style={{ textAlign: 'right'}}>
              <User />
            </div>
          </Navbar>

          <div className="mt-3">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/r/:slug">
                <Room />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </div>

        </Col>
      </Row>
      </Container>
    </Router>
  )
}

const Home = () => {
  return (
    <div>This is the home page</div>
  )
}

const About = () => {
  return (
    <div>This is the about page</div>
  )
}

export default App
