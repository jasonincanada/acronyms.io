import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { roomSelector } from '../room/roomSlice'
import { finishedGamesSelectors,
         phrasesSelectors,
         getPhrases,
         voteFor
       } from './finishedGamesSlice'


const FinishedGames = () => {

  const games           = useSelector(finishedGamesSelectors.selectEntities)
  const {finishedgames} = useSelector(roomSelector)

  return (
    <Fragment>
      <h3>Finished Games</h3>
      <ul>
        { finishedgames.map(id => <li key={id}>
                                    <FinishedGame game={games[id]} />
                                  </li>) }
      </ul>
    </Fragment>
  )
}

const FinishedGame = ({game}) => {

  const phrases  = useSelector(phrasesSelectors.selectEntities)
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)

  const expand = () => {
    dispatch(getPhrases(game))
    setExpanded(true)
  }

  return (
    <Fragment>
      <h4>Game {game.id}: {game.acronym}</h4>

      <button onClick={expand}>View</button>

      { expanded &&
          <ul>
            { game.phrases.map(id => <li key={id}>
                                       <Phrase phrase={phrases[id]} />
                                     </li>) }
          </ul>
      }
    </Fragment>
  )
}

const Phrase = ({phrase}) => {
  return (
    <div>
      Phrase {phrase.id} by {phrase.author}: {phrase.phrase} ({phrase.votes})

      <VoteButton phrase={phrase} />
    </div>
  )
}

const VoteButton = ({phrase}) => {
  const dispatch = useDispatch()

  return (
    <button onClick={() => dispatch(voteFor(phrase))}>Vote</button>
  )
}

export default FinishedGames
