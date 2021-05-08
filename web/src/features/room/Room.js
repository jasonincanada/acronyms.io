import React, { Fragment, useEffect } from 'react'
import { createAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ActiveGame from '../game/ActiveGame'

const roomInit = createAction('room/init')

const Room = () => {

  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    console.log('room init')
    dispatch(roomInit(slug))
  })

  return (
    <Fragment>
      <div>
        <h2>r/{slug}</h2>

        <p>This is a room page</p>

        <ActiveGame />
      </div>
    </Fragment>
  )
}

export default Room
