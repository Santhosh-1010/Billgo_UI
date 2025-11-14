import { PARTITION_META_DATA,PARTITION_META_FAILURE,PARTITION_META_SUCCESS } from "../actionTypes/partitionActionTypes";  
  const initialState = {
    loading: false,
    partitionMeta: null,
    error: null,
  };
  
  const partitionMetaDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case PARTITION_META_DATA:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PARTITION_META_SUCCESS:
        return {
          ...state,
          loading: false,
          partitionMeta: action.payload,
          error: null,
        };
      case PARTITION_META_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default partitionMetaDataReducer;
  