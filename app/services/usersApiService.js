import axios from 'axios';

export async function getUserById(userId) {
  const url = `/users/${userId}`;

  try {
    const response = await axios.get(url);
    return response.status === 500 ? {} : response.data;
  }
  catch (error) {
    console.log(error);
    return {};
  }
}

export async function updateUser(userId, data) {
  const url = `/users/${userId}`;

  try {
    const response = await axios.put(url,data);
    return response.status === 500 ? null : response.data;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUsers(params) {
  const url = `/users?search=${params.search}`;

  try {
    const response = await axios.get(url);
    return response.status === 500 ? {} : response.data;
  }
  catch (error) {
    console.log(error);
    return {};
  }
}