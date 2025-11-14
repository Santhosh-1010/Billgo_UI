import { PARTITION_LIST_DATA,PARTITION_LIST_FAILURE,PARTITION_LIST_SUCCESS ,
    PARTITION_META_DATA,PARTITION_META_FAILURE,PARTITION_META_SUCCESS
} from "../actionTypes/partitionActionTypes";
import { PartionList } from "../interceptor/interceptor.js";
  import { apis } from "../utils/config.js";
  import { STATIC_PARTITION_DATA } from "../utils/constatnts.js";

  export const partitionListData = () => ({
    type: PARTITION_LIST_DATA,
  });
  
  export const partitionListSuccess = (data) => ({
    type: PARTITION_LIST_SUCCESS,
    payload: data,
  });
  
  export const partitionListFailure = (error) => ({
    type: PARTITION_LIST_FAILURE,
    payload: error,
  });
  
  export const partitionMetaData = () => ({
    type: PARTITION_META_DATA,
  });
  
  export const partitionMetaSuccess = (data) => ({
    type: PARTITION_META_SUCCESS,
    payload: data,
  });
  
  export const partitionMetaFailure = (error) => ({
    type: PARTITION_META_FAILURE,
    payload: error,
  });
  export const partitionList = (payload = {}) => {    
    return (dispatch) => {
      dispatch(partitionListData());
  
      const { role } = payload;
      if (!role) {
        const error = new Error('Role is required in payload');
        console.error(error.message);
        dispatch(partitionListFailure(error.message));
        return Promise.reject(error);
      }
  
      // Simulate API delay and return static data
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockResponse = {
            data: STATIC_PARTITION_DATA
          };
          
          dispatch(partitionListSuccess(mockResponse.data));
          resolve(mockResponse);
        }, 400);
      });
    };
  };
  
  

  export const partionMeta =(payload)=>{
    return (dispatch) => {
        dispatch(partitionMetaData());
        return PartionList
          .post(apis.PARTITION_META, payload)  
          .then((response) => {
            const addedDocument = response.data;
            dispatch(partitionMetaSuccess(addedDocument));
            return response;
          })
          .catch((error) => {
            dispatch(partitionMetaFailure(error.message));
          });
      };
  }
  