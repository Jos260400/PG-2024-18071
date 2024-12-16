import axios from 'axios';

/*  */
const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

export const login = async (credentials) => {
  return await api.post('/login', credentials);
};

export const register = async (userData) => {
  return await api.post('/register', userData);
};

export const submitQuestionnaire = async (answers) => {
  return await api.post('/questionnaire', answers);
};

export default api;
