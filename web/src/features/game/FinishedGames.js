import { Fragment } from 'react'

const FinishedGames = () => {

  const game_ids = [1]
  const games = {'1': { id: 1,
                        acronym: 'abcdef',
                        finished: new Date(),
                        phrases: [
         { id: 1, author: { displayname: 'name'       }, phrase: 'a b c d e f', votes: 5 },
         { id: 2, author: { displayname: 'other name' }, phrase: 'a b c d e f', votes: 4 },
                        ]
                }}

  return (
    <Fragment>
      <h3>Finished Games</h3>
      <ul>
        { game_ids.map(id => <li key={id}>
                               <FinishedGame game={games[id]} />
                             </li>) } 
      </ul>
    </Fragment>
  )
}

const FinishedGame = ({game}) => {
  return (
    <Fragment>
      <h4>Game {game.id}: {game.acronym}</h4>
      <ul>
        { game.phrases.map(p => <li key={p.id}>
                                  <Phrase phrase={p} />
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
