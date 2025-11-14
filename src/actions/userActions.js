import {
    USER_LIST_DATA, USER_LIST_FAILURE, USER_LIST_SUCCESS,
    USER_PENDING_DATA, USER_PENDING_FAILURE, USER_PENDING_SUCCESS,
    USER_APPROVE_DATA, USER_APPROVE_FAILURE, USER_APPROVE_SUCCESS,
    USER_DELETE_DATA, USER_DELETE_FAILURE, USER_DELETE_SUCCESS,
    USER_REJECT_DATA,USER_REJECT_FAILURE,USER_REJECT_SUCCESS,
    USER_ROLE_EDIT_DATA,USER_ROLE_EDIT_FAILURE,USER_ROLE_EDIT_SUCCESS,
    USER_RESET_PASSWORD_DATA,USER_RESET_PASSWORD_FAILURE,USER_RESET_PASSWORD_SUCCESS
} from "../actionTypes/adminActionTypes.js";
import { AdminUsers } from "../interceptor/interceptor.js";
import { apis } from "../utils/config.js";
import { STATIC_ADMIN_USERS, STATIC_PENDING_USERS } from "../utils/constatnts.js";

export const userListRequest = () => ({
    type: USER_LIST_DATA,
});

export const userListSuccess = (message) => ({
    type: USER_LIST_SUCCESS,
    payload: message,
});
export const userListFailure = (error) => ({
    type: USER_LIST_FAILURE,
    payload: error
})

export const pendingUserListData = () => ({
    type: USER_PENDING_DATA
})
export const pendingUserListSuccess = (data) => ({
    type: USER_PENDING_SUCCESS,
    payload: data
})
export const pendingUserListFailure = (error) => ({
    type: USER_PENDING_FAILURE,
    payload: error
})

export const approveUserData = () => ({
    type: USER_APPROVE_DATA
})
export const approveUserSuccess = (response) => ({
    type: USER_APPROVE_SUCCESS,
    payload: response
})
export const approveUserFailure = (error) => ({
    type: USER_APPROVE_FAILURE,
    payload: error
})

export const userDeleteData = () => ({
    type: USER_DELETE_DATA
})
export const userDeleteSuccess = (response) => ({
    type: USER_DELETE_SUCCESS,
    payload: response
})
export const userDeleteFailure = (error) => ({
    type: USER_DELETE_FAILURE,
    payload: error
})

export const userRejectData=()=>({
    type:USER_REJECT_DATA
})
export const userRejectSuccess=(response)=>({
    type:USER_REJECT_SUCCESS,
    payload:response
})
export const userRejectFailure=(error)=>({
    type:USER_REJECT_FAILURE,
    payload:error
})

export const userRoleEditData=()=>({
    type:USER_ROLE_EDIT_DATA
})
export const userRoleEditSuccess=(response)=>({
    type:USER_ROLE_EDIT_SUCCESS,
    payload:response
})
export const userRoleEditFailure=(error)=>({
    type:USER_ROLE_EDIT_FAILURE,
    payload:error
})

export const userResetPasswordData =()=>({
    type:USER_RESET_PASSWORD_DATA
})
export const userResetPasswordSeccess=(response)=>({
    type:USER_RESET_PASSWORD_SUCCESS,
    payload:response
})
export const userResetPasswordFailure=(error)=>({
    type:USER_RESET_PASSWORD_FAILURE,
    payload:error
})
export const userList = (payload) => {
    return (dispatch) => {
        dispatch(userListRequest());

        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                let filteredUsers = [...STATIC_ADMIN_USERS];
                
                // Apply filters if provided
                if (payload) {
                    if (payload.email) {
                        filteredUsers = filteredUsers.filter(user => 
                            user.email.toLowerCase().includes(payload.email.toLowerCase())
                        );
                    }
                    if (payload.role) {
                        filteredUsers = filteredUsers.filter(user => 
                            user.role.toLowerCase().includes(payload.role.toLowerCase())
                        );
                    }
                    if (payload.company_name) {
                        filteredUsers = filteredUsers.filter(user => 
                            user.company_name.toLowerCase().includes(payload.company_name.toLowerCase())
                        );
                    }
                }

                const mockResponse = {
                    status: 200,
                    data: {
                        users: filteredUsers,
                        total_pages: 1,
                        current_page: 1,
                        total_users: filteredUsers.length
                    }
                };
                
                dispatch(userListSuccess(mockResponse));
                resolve(mockResponse);
            }, 600);
        });
    };
};


export const pendingUserList = (payload) => {
    return (dispatch) => {
        dispatch(pendingUserListData());

        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    status: 200,
                    data: {
                        pending_users: STATIC_PENDING_USERS,
                        total_pages: 1,
                        current_page: 1,
                        total_pending_users: STATIC_PENDING_USERS.length
                    }
                };
                
                dispatch(pendingUserListSuccess(mockResponse));
                resolve(mockResponse);
            }, 500);
        });
    };
};

export const userApprove = (userid) => {
    return (dispatch) => {
        dispatch(approveUserData());
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    status: 200,
                    message: "User approved successfully"
                };
                
                dispatch(approveUserSuccess(mockResponse));
                resolve(mockResponse);
            }, 800);
        });
    }
}

export const userDelete = (userid) => {
    return (dispatch) => {
        dispatch(userDeleteData());
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    status: 200,
                    message: "User deleted successfully"
                };
                
                dispatch(userDeleteSuccess(mockResponse));
                resolve(mockResponse);
            }, 700);
        });
    }
}

export const userReject=(userid)=>{
    return (dispatch)=>{
        dispatch(userRejectData())
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    status: 200,
                    message: "User rejected successfully"
                };
                
                dispatch(userRejectSuccess(mockResponse));
                resolve(mockResponse);
            }, 600);
        });
    }
}

export const userRoleEdit=(payload)=>{    
    return(dispatch)=>{
        dispatch(userRoleEditData())
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    status: 200,
                    message: "User role updated successfully"
                };
                
                dispatch(userRoleEditSuccess(mockResponse));
                resolve(mockResponse);
            }, 700);
        });
    }
}

export const userResetPassword=(password,payload)=>{    
    return(dispatch)=>{
        dispatch(userResetPasswordData())
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    status: 200,
                    message: "Password reset successfully"
                };
                
                dispatch(userResetPasswordSeccess(mockResponse));
                resolve(mockResponse);
            }, 800);
        });
    }
}