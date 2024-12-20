import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/accounts'
console.log('current token from local storage in account service', localStorage.getItem("token"))

const getAll = () => {
  return axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
}

const get = (email) => {
  return axios.get(`${baseUrl}/${email}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
}

const register = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (email, newObject) => {
  console.log('current token before we pass it through the update function', localStorage.getItem("token"))
  return axios.put(`${baseUrl}/${email}`, newObject, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
}

const addEvent = (email, newObject) => {
  return axios.put(`${baseUrl}/${email}/events`, newObject, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
  get: get,
  register: register, 
  update: update,
  addEvent: addEvent,
  login: login
}