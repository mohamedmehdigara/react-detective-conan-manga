import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with the actual API endpoint

export const fetchMangaTitles = () => {
  return axios.get(`${API_BASE_URL}/manga/titles`);
};

export const fetchChapters = (mangaId) => {
  return axios.get(`${API_BASE_URL}/manga/${mangaId}/chapters`);
};

export const fetchPages = (chapterId) => {
  return axios.get(`${API_BASE_URL}/chapters/${chapterId}/pages`);
};
