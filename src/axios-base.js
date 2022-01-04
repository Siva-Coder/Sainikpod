import axios from 'axios';

/** base url to make requests to the the movie database */
const instance = axios.create({
    baseURL: 'https://sainikpod.herokuapp.com',
});

export default instance;
