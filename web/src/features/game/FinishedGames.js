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
      <h3>Finished Games</h3>

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

      <ul>
      </ul>
    </Fragment>
  )
}

const FinishedGame = ({game}) => {

  const phrases  = useSelector(phrasesSelectors.selectEntities)
  const dispatch = useDispatch()

  const refreshVotes = () => {
    dispatch(getVotes(game))
  }

  return (
    <Fragment>
      <h4>Game {game.id}: {game.acronym}</h4>

      <Fragment>
        <Button onClick={refreshVotes}>Refresh Votes</Button>

        { game.phrases &&

          <ListGroup>
            { game.phrases.map(id => <ListGroup.Item key={id}>
                                       <Phrase phrase={phrases[id]} />
                                     </ListGroup.Item>) }
          </ListGroup>
        }
      </Fragment>
    </Fragment>
  )
}

const Phrase = ({phrase}) => {
  return (
    <div>
      {phrase.phrase} - {phrase.author} {phrase.votes}

      <VoteButton phrase={phrase} />

      { phrase.playervoted &&

        <FontAwesomeIcon icon={['fas', 'check']}
                         color="limegreen" />
      }

    </div>
  )
}

const VoteButton = ({phrase}) => {
  const dispatch = useDispatch()

  return (
    <Button onClick={() => dispatch(voteFor(phrase))}>Vote</Button>
  )
}

export default FinishedGames
