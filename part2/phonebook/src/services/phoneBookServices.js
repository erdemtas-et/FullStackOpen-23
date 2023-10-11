import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons"

const getAll = async () => {
  const request =  axios.get(baseUrl)
    const response = await request;
  return response.data;
}

const create = async (newPerson) => {
    const request =  axios.post(baseUrl,newPerson)
      const response = await request;
  return response.data;
}


const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    
}

const updatePerson = async (id,updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`,updatedPerson)
    const response = await request;
  return response.data;
    
}

  export default {getAll,create,deletePerson,updatePerson}