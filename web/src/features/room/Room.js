import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const Room = () => {

  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    console.log('room init')
  })

  return (
    <Fragment>
      <div>
        <h2>r/{slug}</h2>

        <p>This is a room page</p>
      </div>
    </Fragment>
  )
}

export default Room
