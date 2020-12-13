import { createContext } from 'react'

const initUserData = {
  id: null,
  username: ''
}

const UserContext = createContext(initUserData)

export default UserContext