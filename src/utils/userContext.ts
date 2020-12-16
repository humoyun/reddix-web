import { createContext } from 'react'

const initUserData = {
  fetching: false,
  user: null
}

const UserContext = createContext(initUserData)

export default UserContext