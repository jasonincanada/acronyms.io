import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activeGameSelector, postPhrase } from './gameSlice'

const ActiveGame = () => {

  const { acronym, finishing, myphrase } = useSelector(activeGameSelector)
  const { slug } = useParams()
  const [ phrase, setPhrase ] = useState('');
  const dispatch = useDispatch();

  const keyDown = (key) => {
    if (key === "Enter") {
      dispatch(postPhrase(phrase))
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
