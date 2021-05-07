import { useSelector } from 'react-redux'
import { userSelector } from './userSlice'

const User = () => {

  const { username } = useSelector(userSelector)

  return (
    <div>Username: { username }</div>
  )
}

export default User
