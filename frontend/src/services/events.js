import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/events'
console.log('current token from local storage in event service', localStorage.getItem("token"))

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  console.log('new event to create', newObject)
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
}

export default { 
  getAll: getAll, 
  create: create
}