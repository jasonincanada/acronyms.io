import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from './userSlice'

const User = () => {

  const { username, displayname } = useSelector(userSelector)

  return (
    <Fragment>
      <div>Username: { username }</div>
      <div>Display name: { displayname }</div>
    </Fragment>
  )
}

export default User
