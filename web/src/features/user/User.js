import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from './userSlice'

const User = () => {

  const { username, displayname } = useSelector(userSelector)

  return (
    <Fragment>
      { username &&

        <div>
          { username } / { displayname } / <a href="/logout">Logout</a>
        </div> }

      { !username && <a href="/login">Login</a> }

    </Fragment>
  )
}

export default User
