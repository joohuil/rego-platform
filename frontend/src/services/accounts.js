import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/accounts'

const getAll = () => {
  return axios.get(baseUrl)
}

const register = newObject => {
  console.log('axios', newObject)
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  register: register, 
  update: update 
}