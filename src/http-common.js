import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.devto.ga',
  headers: {
    'Content-type': 'application/json'
  }
})