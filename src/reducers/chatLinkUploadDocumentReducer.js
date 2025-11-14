
  import { UPLOAD_LINK_DOCUMENT_DATA, UPLOAD_LINK_DOCUMENT_FAILURE , UPLOAD_LINK_DOCUMENT_SUCCESS } from "../actionTypes/chatDocumentActionTypes.js";

  const initialState = {
    loading: false,
    linkDocument: null,  
    message: null,   
    error: null,     
  };
  
  const chatLinkUploadDocumentReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_LINK_DOCUMENT_DATA:
        return {
          ...state,
          loading: true,
          message: null,  
          error: null,   
        };
  
      case UPLOAD_LINK_DOCUMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          linkDocument: action.payload,         
          message: "Document added successfully!",  
          error: null,
        };
  
      case UPLOAD_LINK_DOCUMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,  
        };
  
      default:
        return state;
    }
  };
  
  export default chatLinkUploadDocumentReducer;
  