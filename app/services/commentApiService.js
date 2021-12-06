import axios from 'axios';

export async function postComment(params) {
    const url = `/comments`;

    try {
        const response = await axios.post(url , params);
        return response.status === 500 ? {} : response.data;
    }
    catch (error) {
        console.log(error);
        return {};
    }
}