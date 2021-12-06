import axios from 'axios';

export async function getPostsById(userId) {
  const url = `/posts/user/${userId}`;

  try {
    const response = await axios.get(url);
    return response.status === 500 ? [] : response.data;
  }
  catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPosts() {
    const url = `/posts`;
  
    try {
      const response = await axios.get(url);
      return response.status === 500 ? [] : response.data;
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }