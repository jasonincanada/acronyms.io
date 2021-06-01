import Button from 'react-bootstrap/Button'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activeGameSelector, postPhrase,
         finishGame, getActiveGame, startNewGame } from './gameSlice'

const ActiveGame = () => {

  const dispatch = useDispatch()
  const game     = useSelector(activeGameSelector)

  const { id, acronym, started, finishing, myphrase, error } = game
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
        <div>Room Slug: { slug }</div>
        <div>Acronym: { acronym }</div>
        <div>Started: { started }</div>
        <div>Finishing: { finishing }</div>
        <div>Time Left: { timeLeft }</div>
        <div>My phrase: { myphrase }</div>
        { error &&
          <div>Error: { error }</div>
        }
        <div><input type="text"
                    autoFocus
                    onChange={ (ev) => setPhrase(ev.target.value)}
                    onKeyDown={(ev) => keyDown(ev.key)}
                    placeholder="my phrase" /></div>
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

export default ActiveGame
