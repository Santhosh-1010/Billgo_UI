import {
  START_CHAT_SESSION,
  END_CHAT_SESSION,
  UPDATE_CHAT_SESSION,
  CHAT_SESSION_ERROR,
} from '../actionTypes/userSessionActionTypes'; // Adjust the path as needed
import { PartionList } from "../interceptor/interceptor.js";

import { apis } from '../utils/config'; // Adjust the path as needed
import { STATIC_CHAT_SESSIONS } from '../utils/constatnts.js';
export const startChatSession = (userId) => ({
  type: START_CHAT_SESSION,
  payload: { userId },
});

export const endChatSession = () => ({
  type: END_CHAT_SESSION,
});

export const updateChatSession = (sessionData) => ({
  type: UPDATE_CHAT_SESSION,
  payload: sessionData,
});

export const chatSessionError = (error) => ({
  type: CHAT_SESSION_ERROR,
  payload: error,
});
export const fetchUserSession = (userId) => async (dispatch) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Use static data
    const sessions = STATIC_CHAT_SESSIONS;
    
    if (sessions && sessions.length > 0) {
      dispatch(updateChatSession({ sessions }));
    } else {
      throw new Error('No sessions found in response');
    }
  } catch (error) {
    console.error('Error fetching user session:', error);
    dispatch(chatSessionError(error.message));
  }
};