import axios from 'axios';

 const getAllPostsByUserId = async (url, userId) => {
  let post =  await axios.get(url);
  return post.data.filter(todo => todo.userId == userId);
} 

export default {getAllPostsByUserId};