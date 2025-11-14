import {
  FETCH_GIT_GRAPH_DATA,
  FETCH_GIT_GRAPH_SUCCESS,
  FETCH_GIT_GRAPH_FAILURE,
} from "../actionTypes/graphsDataActionTypes.js";
import { Api } from "../interceptor/interceptor.js";
import { apis } from "../utils/config.js";
import { STATIC_GIT_METRICS } from "../utils/constatnts.js";
export const fetchGraphRequest = () => ({
  type: FETCH_GIT_GRAPH_DATA,
});

export const fetchGraphSuccess = (data) => ({
  type: FETCH_GIT_GRAPH_SUCCESS,
  payload: data,
});

export const fetchGraphFailure = (error) => ({
  type: FETCH_GIT_GRAPH_FAILURE,
  payload: error,
});

export const fetchGitGraphList = ({ page, page_size }) => {
  return (dispatch) => {
    dispatch(fetchGraphRequest());
    
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create mock response with pagination
        const startIndex = (page - 1) * page_size;
        const endIndex = startIndex + page_size;
        
        const paginatedDocumentMetrics = STATIC_GIT_METRICS.document_metrics.slice(startIndex, endIndex);
        const totalPages = Math.ceil(STATIC_GIT_METRICS.document_metrics.length / page_size);
        
        const mockResponse = {
          document_metrics: paginatedDocumentMetrics,
          user_metrics: STATIC_GIT_METRICS.user_metrics,
          pagination: {
            current_page: page,
            total_pages: totalPages,
            total_items: STATIC_GIT_METRICS.document_metrics.length,
            page_size: page_size
          }
        };
        
        dispatch(fetchGraphSuccess(mockResponse));
        resolve({ payload: mockResponse });
      }, 800); // 800ms delay to simulate network request
    });
  };
};
