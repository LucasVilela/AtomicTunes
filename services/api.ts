import axios from 'axios';

export const itunesApi = axios.create({
  baseURL: 'https://itunes.apple.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
