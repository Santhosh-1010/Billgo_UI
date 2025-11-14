import { PARTITION_LIST_DATA,PARTITION_LIST_FAILURE,PARTITION_LIST_SUCCESS } from "../actionTypes/partitionActionTypes";  
  const initialState = {
    loading: false,
    partitionList: null,
    error: null,
  };
  
  const partitionListReducer = (state = initialState, action) => {
    switch (action.type) {
      case PARTITION_LIST_DATA:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PARTITION_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          partitionList: action.payload,
          error: null,
        };
      case PARTITION_LIST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default partitionListReducer;
  