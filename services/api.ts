import axios from 'axios';

export const itunesApi = axios.create({
  baseURL: 'https://itunes.apple.com/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
