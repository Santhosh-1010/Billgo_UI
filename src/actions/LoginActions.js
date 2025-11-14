import { LOGIN_DATA,LOGIN_SUCCESS,LOGIN_FAILURE ,REGISTRATION_DATA,REGISTRATION_FAILURE,REGISTRATION_SUCCESS,USER_DETAILS,USER_DETAILS_SUCCESS,USER_DETAILS_FAILURE} from "../actionTypes/loginActionTypes";
import { DeployedURL } from "../interceptor/interceptor";
import { apis } from "../utils/config";
import { STATIC_USERS, STATIC_AUTH_MESSAGES } from "../utils/constatnts";
export const fetchLoginData=()=>({
type:LOGIN_DATA
})
export const fetchLoginDataSuccess=(data)=>({
type : LOGIN_SUCCESS,
action : data
})
export const fetchLoginDataFailure=(error)=>({    
    type : LOGIN_FAILURE,
    action : error
})
export const registrationData =()=>({
    type : REGISTRATION_DATA
})
export const fetchUserDetails =()=>({
    type : USER_DETAILS
})

export const fetchUserDetailsSuccess =(data)=>({
    type : USER_DETAILS_SUCCESS,
    action : data
})

export const fetchUserDetailsFailure =(error)=>({
    type : USER_DETAILS_FAILURE,
    action : error
})


export const registrationFailure =(error)=>({
    type :REGISTRATION_FAILURE,
    action : error
})
export const registrationSuccess=(data)=>({
    type : REGISTRATION_SUCCESS,
    action : data
})
export const userLogin=(payload)=>{
    return(dispatch)=>{
        dispatch(fetchLoginData())
        
        // Extract username and password from FormData
        const username = payload.get('username');
        const password = payload.get('password');
        
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // Find user in static users array
                const user = STATIC_USERS.find(u => 
                    u.username === username && u.password === password
                );
                
                if (user) {
                    // Create mock response similar to backend response
                    const mockResponse = {
                        status: 200,
                        data: {
                            id: user.id,
                            full_name: user.full_name,
                            role: user.role,
                            access_token: user.access_token,
                            username: user.username
                        }
                    };
                    
                    dispatch(fetchLoginDataSuccess(mockResponse));
                    resolve(mockResponse);
                } else {
                    const errorMessage = STATIC_AUTH_MESSAGES.INVALID_CREDENTIALS;
                    dispatch(fetchLoginDataFailure(errorMessage));
                    resolve(errorMessage);
                }
            }, 1000); // 1 second delay to simulate network request
        });
    }
}

export const userDetails = (token) => {
    return async (dispatch) => {
      try {
        dispatch(fetchUserDetails());
  
        // Find user by token in static users
        const user = STATIC_USERS.find(u => u.access_token === token);
        
        if (user) {
            const mockResponse = {
                data: {
                    id: user.id,
                    full_name: user.full_name,
                    role: user.role,
                    username: user.username,
                    access_token: user.access_token
                }
            };
            
            dispatch(fetchUserDetailsSuccess(mockResponse.data));
            return mockResponse;
        } else {
            const errorMsg = STATIC_AUTH_MESSAGES.AUTHENTICATION_REQUIRED;
            dispatch(fetchUserDetailsFailure(errorMsg));
            return errorMsg;
        }
      } catch (error) {
        const errorMsg = "Something went wrong";
        dispatch(fetchUserDetailsFailure(errorMsg));
        return errorMsg;
      }
    };
  };
export const userRegistration =(payload)=>{
    return(dispatch)=>{
        dispatch(registrationData())
        return DeployedURL
        .post(apis.REGISTER,payload)
        .then((response)=>{            
            const registartionResponse = response;
           dispatch(registrationSuccess(registartionResponse));
           return response;
        }).catch((error)=>{
            dispatch(registrationFailure(error?.response?.data?.detail));
           return error?.response?.data?.detail;
        })
    }
}