import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/accounts'
const token = localStorage.getItem("token")

const getAll = () => {
  return axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

const register = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (email, newObject) => {
  return axios.put(`${baseUrl}/${email}`, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

const addEvent = (email, newObject) => {
  return axios.put(`${baseUrl}/${email}/events`, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  })
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
  addEvent: addEvent,
  login: login
}