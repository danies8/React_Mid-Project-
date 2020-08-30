import axios from 'axios';

 const getAllTodsByUserId = async (url, userId) => {
  let todos =  await axios.get(url);
  return todos.data.filter(todo => todo.userId == userId);
} 

export default {getAllTodsByUserId};