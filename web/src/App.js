import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
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
          <header className="App-header">
            acronyms.io
          </header>

          <User />

          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/r/room-with-game">Room With Game</Link></li>
              <li><Link to="/r/room-no-game">Room Without Game</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/logout">Logout</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>

          <div>
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
