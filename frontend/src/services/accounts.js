import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/accounts'

const getAll = () => {
  return axios.get(baseUrl)
}

const register = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (email, newObject) => {
  return axios.put(`${baseUrl}/${email}`, newObject)
}

const login = (email, password) => {
  return axios.post(
    `${baseUrl}/login`, 
    { email, password }, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

export default { 
  getAll: getAll, 
  register: register, 
  update: update,
  login: login
}