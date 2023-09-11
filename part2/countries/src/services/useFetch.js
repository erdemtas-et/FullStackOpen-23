import axios from "axios"

const useFetch = (url) => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

export default useFetch