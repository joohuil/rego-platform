import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/events'
const token = localStorage.getItem("token")
console.log('cur tok', token)

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  console.log('axios', newObject)
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export default { 
  getAll: getAll, 
  create: create
}