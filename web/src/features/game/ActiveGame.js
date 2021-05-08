import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activeGameSelector } from './gameSlice'

const ActiveGame = () => {

  const { acronym } = useSelector(activeGameSelector)
  const { slug } = useParams()

  return (
    <Fragment>
      <div>Room Slug: { slug }</div>
      <div>Acronym: { acronym }</div>
    </Fragment>
  )
}

export default ActiveGame
