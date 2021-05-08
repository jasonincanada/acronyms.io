import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activeGameSelector } from './gameSlice'

const ActiveGame = () => {

  const { acronym, myphrase } = useSelector(activeGameSelector)
  const { slug } = useParams()

  return (
    <Fragment>
      <div>Room Slug: { slug }</div>
      <div>Acronym: { acronym }</div>
      <div>My phrase: { myphrase }</div>
    </Fragment>
  )
}

export default ActiveGame
