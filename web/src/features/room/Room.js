import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRoom, roomSelector } from './roomSlice'
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return (
    <Fragment>
      <div>
        <h2>r/{slug}</h2>

        <p>Description: {description}</p>

        <ActiveGame />

        <FinishedGames />
      </div>
    </Fragment>
  )
}

export default Room
