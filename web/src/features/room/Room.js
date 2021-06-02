import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRoom, roomSelector } from './roomSlice'
import { getFinishedGames } from '../game/finishedGamesSlice'
import { getActiveGame } from '../game/gameSlice'
import ActiveGame from '../game/ActiveGame'
import FinishedGames from '../game/FinishedGames'


const Room = () => {

  const dispatch = useDispatch()
  const { slug } = useParams()
  const { description } = useSelector(roomSelector)

  useEffect(() => {
    console.log('room init')
    dispatch(getRoom(slug))
    dispatch(getActiveGame(slug))
    dispatch(getFinishedGames(slug))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])


  // timers
  useEffect(() => {

    // refresh our list of finished games every 5 seconds
    // note this causes a lot of redundant querying on the server for now
    const timer = setInterval(() => {
      dispatch(getFinishedGames(slug))
    }, 5000);

    return () => clearTimeout(timer)
  })


  return (
    <Fragment>
      <div>
        <h2>r/{slug}</h2>

        <p>Description: {description}</p>

        <ActiveGame />

        <hr />

        <FinishedGames />
      </div>
    </Fragment>
  )
}

export default Room
