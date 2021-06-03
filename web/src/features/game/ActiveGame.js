import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activeGameSelector, postPhrase,
         finishGame, getActiveGame, startNewGame } from './gameSlice'
import { useTimers } from '../../timers'

const ActiveGame = () => {

  const dispatch = useDispatch()
  const game     = useSelector(activeGameSelector)

  const { id, acronym, finishing, myphrase, error } = game
  const { slug } = useParams()
  const [ phrase, setPhrase ] = useState('')
  const [ timeLeft, setTimeLeft ] = useState('')

  const keyDown = (key) => {
    if (key === "Enter") {
      dispatch(postPhrase({game, phrase}))
    }
  }

  // called when the player clicks the Start New Game button
  const startNew = () => { dispatch(startNewGame(slug)) }


  // timers
  useEffect(() => {
    if (!useTimers) return

    // run every second
    const timer = setInterval(() => {

      // if we have an active game
      if (id) {
        const now = new Date()
        const millis = +new Date(finishing + ' UTC') - now
        const seconds = Math.round(millis / 1000)

        setTimeLeft(`${seconds} sec`)

        // if we're past the game's finishing time
        if (seconds < 0) {
          dispatch(finishGame())
        }
      }

      // otherwise check to see if we now have an active game
      else {
        dispatch(getActiveGame(slug))
      }
    }, 1000);

    return () => clearTimeout(timer)
  })


  // if there's an active game
  if (id) {

    return (
      <Fragment>
        <Acronym acronym={acronym} />

        <div>Time Left: { timeLeft }</div>
        <div>My phrase: { myphrase }</div>

        { error &&
          <div>Error: { error }</div>
        }

        <Form onSubmit={(ev) => ev.preventDefault()}>
          <Form.Group>
            <Form.Control type="text"
                          size="lg"
                          autoFocus
                          onChange={ (ev) => setPhrase(ev.target.value)}
                          onKeyDown={(ev) => keyDown(ev.key)}
                          placeholder="my phrase" />
            <Form.Text>Enter your phrase and hit enter. You can change it as many times as you want</Form.Text>
          </Form.Group>
        </Form>
      </Fragment>
    )
  }

  // no active game, show a button to start a new one
  else {
    return (
      <Fragment>
        <Button onClick={startNew}>Start New Game</Button>
      </Fragment>
    )
  }
}

const Acronym = ({acronym}) => {

  const styles = {
    fontSize: '3rem',
    letterSpacing: '0.5rem'
  }

  return (
    <div>
      <span style={styles}>{acronym}</span>
    </div>
  )
}


export default ActiveGame
