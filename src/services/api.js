import axios from 'axios'

//a Base URL é a rota que não vai mudar

const api = axios.create({
    baseURL: 'https://www.breakingbadapi.com/api'
});

export default api;