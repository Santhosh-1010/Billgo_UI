
  import { UPLOAD_CHAT_DOCUMENT_DATA,UPLOAD_CHAT_DOCUMENT_FAILURE,UPLOAD_CHAT_DOCUMENT_SUCCESS } from "../actionTypes/chatDocumentActionTypes.js";

  const initialState = {
    loading: false,
    chatdocument: null,  
    message: null,   
    error: null,     
  };
  
  const chatUploadDocumentReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_CHAT_DOCUMENT_DATA:
        return {
          ...state,
          loading: true,
          message: null,  
          error: null,   
        };
  
      case UPLOAD_CHAT_DOCUMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          chatdocument: action.payload,         
          message: "Document added successfully!",  
          error: null,
        };
  
      case UPLOAD_CHAT_DOCUMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,  
        };
  
      default:
        return state;
    }
  };
  
  export default chatUploadDocumentReducer;
  