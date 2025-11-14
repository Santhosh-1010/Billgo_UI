import {
  UPLOAD_CHAT_DOCUMENT_DATA, UPLOAD_CHAT_DOCUMENT_FAILURE, UPLOAD_CHAT_DOCUMENT_SUCCESS,
  UPLOAD_LINK_DOCUMENT_DATA, UPLOAD_LINK_DOCUMENT_FAILURE, UPLOAD_LINK_DOCUMENT_SUCCESS
} from "../actionTypes/chatDocumentActionTypes.js";

import { Ingestion,IngestionURL } from "../interceptor/interceptor.js";
import { apis } from "../utils/config.js";

export const uploadCatDocumentRequest = () => ({
  type: UPLOAD_CHAT_DOCUMENT_DATA,
});

export const uploadCatDocumentSuccess = (data, index) => ({
  type: UPLOAD_CHAT_DOCUMENT_SUCCESS,
  payload: data
});

export const uploadCatDocumentFailure = (error) => ({
  type: UPLOAD_CHAT_DOCUMENT_FAILURE,
  payload: error,
});
export const uploadLinkData = () => ({
  type: UPLOAD_LINK_DOCUMENT_DATA
})
export const uploadLinkSuccess = (response) => ({
  type: UPLOAD_LINK_DOCUMENT_SUCCESS,
  payload: response
})
export const uploadLinkFailure = (error) => ({
  type: UPLOAD_LINK_DOCUMENT_FAILURE,
  payload: error
})
export const uploadChatDocument = (payload) => {
  return (dispatch) => {
    dispatch(uploadCatDocumentRequest());
    return Ingestion
      .post(apis.UPLOAD_DOCUMENT, payload)
      .then((response) => {
        const answersData = response.data;
        dispatch(uploadCatDocumentSuccess(answersData));
        return response;
      })
      .catch((error) => {
        dispatch(uploadCatDocumentFailure(error.message));
      });
  };
};
export const uploadLinkDocument = (payload) => {
  
  return (dispatch) => {
    dispatch(uploadLinkData());
    return IngestionURL
      .post(apis.UPLOAD_LINK_DOCUMENT, payload)
      .then((response) => {
        const answersData = response.data;
        dispatch(uploadLinkSuccess(answersData));
        return response;
      })
      .catch((error) => {
        dispatch(uploadLinkSuccess(error.message));
      });
  }
}