import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { finishedGamesSelectors } from './finishedGamesSlice'

const FinishedGames = () => {

  const ids   = useSelector(finishedGamesSelectors.selectIds)
  const games = useSelector(finishedGamesSelectors.selectEntities)

  return (
    <Fragment>
      <h3>Finished Games</h3>
      <ul>
        { ids.map(id => <li key={id}>
                          <FinishedGame game={games[id]} />
                        </li>) }
      </ul>
    </Fragment>
  )
}

const FinishedGame = ({game}) => {

  const phrase_ids = [1,2]
  const phrases = {'1': { id: 1, author: { displayname: 'name'       }, phrase: 'a b c d e f', votes: 5 },
                   '2': { id: 2, author: { displayname: 'other name' }, phrase: 'a b c d e f', votes: 4 }}

  return (
    <Fragment>
      <h4>Game {game.id}: {game.acronym}</h4>
      <ul>
        { game.phrases.map(id => <li key={id}>
                                   <Phrase phrase={phrases[id]} />
                                 </li>) }
      </ul>
    </Fragment>
  )
}

const Phrase = ({phrase}) => {
  return (
    <div>
      Phrase {phrase.id} by {phrase.author.displayname}: {phrase.phrase} ({phrase.votes})
    </div>
  )
}

export default FinishedGames
