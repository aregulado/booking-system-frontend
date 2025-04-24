import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Change this to match your backend
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer hardcoded-token', // You can override this per request
    },
});

export default apiClient;