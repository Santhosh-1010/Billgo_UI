import {
    UPDATE_CHAT_SESSION,
    CHAT_SESSION_ERROR,
  } from '../actionTypes/userSessionActionTypes';
  
  const initialState = {
    sessions: [], // Ensure sessions is part of the initial state
    activeSession: null,
    error: null,
  };
  
  const usersSessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_CHAT_SESSION:
        return {
          ...state,
          sessions: action.payload.sessions, // Update sessions array
        };
      case CHAT_SESSION_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default usersSessionReducer;
  