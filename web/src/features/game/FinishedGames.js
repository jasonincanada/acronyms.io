import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { roomSelector } from '../room/roomSlice'
import { finishedGamesSelectors,
         phrasesSelectors,
         getPhrases,
         getVotes,
         voteFor
       } from './finishedGamesSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome'


// used in Tab.Container to key/label games
const gameKey   = (game) => '#game-' + game.id
const gameTitle = (game) => game.id + ' - ' + game.acronym

const FinishedGames = () => {

  const games           = useSelector(finishedGamesSelectors.selectEntities)
  const {finishedgames} = useSelector(roomSelector)
  const dispatch        = useDispatch()

  const clickGame = (game) => {
    return (ev) => {
      dispatch(getPhrases(game))
    }
  }

  return (
    <Fragment>
      <Tab.Container>
        <Row>
          <Col sm={3}>
            <ListGroup>
              { finishedgames.map(id => <ListGroup.Item
                                          key={id}
                                          action
                                          onClick={clickGame(games[id])}
                                          href={gameKey(games[id])}>
                                            {gameTitle(games[id])}
                                        </ListGroup.Item> )}
            </ListGroup>
          </Col>
          <Col>
            <Tab.Content>
              { finishedgames.map(id => <Tab.Pane key={id} eventKey={gameKey(games[id])}>
                                          <FinishedGame game={games[id]} />
                                        </Tab.Pane>) }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  )
}

const FinishedGame = ({game}) => {

  const phrases  = useSelector(phrasesSelectors.selectEntities)
  const dispatch = useDispatch()

  const refreshVotes = () => {
    dispatch(getVotes(game))
  }

  // get the highest number of votes for a phrase in this game
  const winningVotes = game.phrases
                          ?.map(phrase => phrases[phrase]?.votes ?? 0)
                           .reduce((a,b) => Math.max(a,b), 0)

                           ?? 0

  return (
    <Fragment>
      <h3>{game.acronym}</h3>

      { game.phrases &&

        <ListGroup>
          { game.phrases.map(id => <ListGroup.Item key={id}>
                                     <Phrase phrase={phrases[id]}
                                             winningVotes={winningVotes} />
                                   </ListGroup.Item>) }
        </ListGroup>
      }

      <Button onClick={refreshVotes}
              variant="outline-secondary"
              size="sm"
              className="mt-2">Refresh Votes</Button>
    </Fragment>
  )
}

const Phrase = ({phrase, winningVotes}) => {
  const dispatch = useDispatch()

  // clicking a phrase casts the player's vote for it
  const clickPhrase = () => dispatch(voteFor(phrase))

  return (
    <div onClick={clickPhrase} style={{ cursor: 'pointer' }}>

      { phrase.votes > 0 && <span className="mr-2">{phrase.votes}</span> }

      { phrase.votes > 0 && phrase.votes === winningVotes &&

        <FontAwesomeIcon icon={['fas', 'trophy']}
                         color="gold"
                         className="mr-2" />
      }

      {phrase.phrase} <Author author={phrase.author} />

      { phrase.playervoted &&

        <FontAwesomeIcon icon={['fas', 'check']}
                         color="limegreen"
                         className="ml-2" />
      }

    </div>
  )
}

const Author = ({author}) => {
  return ( <span className="text-muted ml-3">[ {author} ]</span> )
}


export default FinishedGames
