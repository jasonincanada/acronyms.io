import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activeGameSelector } from './gameSlice'

const ActiveGame = () => {

  const { acronym, finishing, myphrase } = useSelector(activeGameSelector)
  const { slug } = useParams()
  const [ phrase, setPhrase ] = useState('');

  const keyDown = (key) => {
    if (key === "Enter") {
      console.log("Hit enter with phrase:", phrase)
    }
  }

  return (
    <Fragment>
      <div>Room Slug: { slug }</div>
      <div>Acronym: { acronym }</div>
      <div>Finishing: { finishing }</div>
      <div>My phrase: { myphrase }</div>
      <div><input type="text"
                  autoFocus
                  onChange={ (ev) => setPhrase(ev.target.value)}
                  onKeyDown={(ev) => keyDown(ev.key)}
                  placeholder="my phrase" /></div>
    </Fragment>
  )
}

export default ActiveGame
