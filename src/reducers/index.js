import { combineReducers } from 'redux';
import flushDBReducer from './adminReducers';
import loginReducer from './loginReducer';
import registrationReducer from './registrationReducer';
import gitGraphReducers from './gitGraphReducers'
import userListData from './adminUsersReducer';
import userReducer from './userReducer';
import chatUploadDocumentReducer from './chatUploadDocumentReducer';
import usersSessionReducer from './userSessionReducers';
import partitionListReducer from './partitionListReducer';
const rootReducer = combineReducers({
    adminData: flushDBReducer,
    loginData: loginReducer,
    registrationData: registrationReducer,
    gitGraph: gitGraphReducers,
    usersList: userListData,
    user: userReducer,
    chatDocument:chatUploadDocumentReducer,
    usersSession: usersSessionReducer,
    partitionList:partitionListReducer
});

export default rootReducer;