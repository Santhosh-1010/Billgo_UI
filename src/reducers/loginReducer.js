import { LOGIN_DATA, LOGIN_FAILURE, LOGIN_SUCCESS } from "../actionTypes/loginActionTypes";
const initialState = {
    loading: false,
    loginData: null,
    successMessage: null,
    error: null
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DATA:
            return {
                ...state,
                loading: true,
                loginData:null,
                successMessage: null,
                error: null,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loginData: action.action,
                successMessage: 'Logged in Successfully',
                error: null
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                loginData:null,
                successMessage: null,
                error: action.action || 'Something went wrong'
            }
        default:
            return state;
    }
}
export default loginReducer;