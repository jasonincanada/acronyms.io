import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activeGameSelector, postPhrase, startNewGame } from './gameSlice'

const ActiveGame = () => {

  const { id, acronym, started, finishing, myphrase, error } = useSelector(activeGameSelector)
  const { slug } = useParams()
  const [ phrase, setPhrase ] = useState('');
  const dispatch = useDispatch();

  const keyDown = (key) => {
    if (key === "Enter") {
      dispatch(postPhrase(phrase))
    }
  }

  // called when the player clicks the Start New Game button
  const startNew = () => { dispatch(startNewGame(slug)) }

  // if there's an active game
  if (id) {

    return (
      <Fragment>
        <div>Room Slug: { slug }</div>
        <div>Acronym: { acronym }</div>
        <div>Started: { started }</div>
        <div>Finishing: { finishing }</div>
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
        <button onClick={startNew}>Start New Game</button>
      </Fragment>
    )
  }
}

export default ActiveGame
