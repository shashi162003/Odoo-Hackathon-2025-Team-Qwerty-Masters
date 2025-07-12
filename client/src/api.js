// Centralized API service for client
import axios from 'axios';

const BASE_URL = 'https://odoo-hackathon-2025-team-qwerty-masters.onrender.com/api/v1';

// Auth
export const signup = (data) => axios.post(`${BASE_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${BASE_URL}/auth/login`, data);
export const generateOTP = (data, token) => axios.post(`${BASE_URL}/auth/generate-otp`, data, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
export const verifyOTP = (data, token) => {
    console.log('verifyOTP payload:', data, 'token:', token);
    return axios.post(`${BASE_URL}/auth/verify-otp`, data, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
};
export const logout = (token) => axios.get(`${BASE_URL}/auth/logout`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });

// Profile
export const getProfile = (id) => axios.get(`${BASE_URL}/profile/getProfile/${id}`);
export const updateProfile = (id, data, token) => axios.post(`${BASE_URL}/profile/updateProfile/${id}`, data, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });

// Questions
export const createQuestion = (data, token) => axios.post(`${BASE_URL}/questions/createQuestion`, data, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
export const getQuestions = () => axios.get(`${BASE_URL}/questions/getQuestions`);
export const getQuestionById = (id) => axios.get(`${BASE_URL}/questions/getQuestions/${id}`);
export const deleteQuestion = (id, token) => axios.post(`${BASE_URL}/questions/deleteQuestions/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
export const upvoteQuestion = (id, token) => axios.post(`${BASE_URL}/questions/upvoteQuestions/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
export const downvoteQuestion = (id, token) => axios.post(`${BASE_URL}/questions/downvoteQuestions/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });

// Answers
export const addAnswer = (data, token) => axios.post(`${BASE_URL}/answers/addAnswer`, data, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
export const getAnswers = (questionId) => axios.get(`${BASE_URL}/answers/getAnswers/${questionId}`);
export const updateAnswer = (answerId, data, token) => axios.post(`${BASE_URL}/answers/updateAnswer/${answerId}`, data, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
export const deleteAnswer = (answerId, token) => axios.post(`${BASE_URL}/answers/deleteAnswer/${answerId}`, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
export const upvoteAnswer = (answerId, token) => axios.post(`${BASE_URL}/answers/upvoteAnswer/${answerId}`, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
export const downvoteAnswer = (answerId, token) => axios.post(`${BASE_URL}/answers/downvoteAnswer/${answerId}`, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });

// Add more as needed
