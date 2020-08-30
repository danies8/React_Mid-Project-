import axios from 'axios';

const getAllUsers = (url) => {
  return axios.get(url);
}


export default {getAllUsers};