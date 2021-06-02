import { Reducer } from 'redux'
import { LoginTypeActionTypes, AuthState } from './Types'
// Type-safe initialState!
export const initialState: AuthState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    reOpenaction: null
  }

const reducer: Reducer<AuthState> = (state = initialState, action) => {
    switch (action.type) {
      case LoginTypeActionTypes.LOGIN_REQUEST:
      case LoginTypeActionTypes.SEND_OTP_REQUEST:
      case LoginTypeActionTypes.VERIFY_OTP_REQUEST:
      case LoginTypeActionTypes.confirm_PASSWORD_OTP_REQUEST: 
      case LoginTypeActionTypes.CHECKUSER_REQUEST:
      case LoginTypeActionTypes.LOGOUT_REQUEST:
      {
        return { 
          ...state, 
          loading: true 
        }
      }
      
      case LoginTypeActionTypes.LOGIN_SUCCESS: 
      case LoginTypeActionTypes.confirm_PASSWORD_SUCCESS:
      case LoginTypeActionTypes.VERIFY_OTP_SUCCESS:
      case LoginTypeActionTypes.SEND_OTP_SUCCESS:
      case LoginTypeActionTypes.CHECKUSER_SUCCESS:
      {
        return {
          ...state,
          items: action.payload, 
          isAuthenticated:false,
          loading: false
      };
      }
      
      case LoginTypeActionTypes.LOGOUT_SUCCESS: {
        return {
          ...state,
          loading: false,
          state : initialState
      };
      }
      
      case LoginTypeActionTypes.LOGIN_ERROR:       
      case LoginTypeActionTypes.SEND_OTP_ERROR:
      case LoginTypeActionTypes.confirm_PASSWORD_ERROR:
      case LoginTypeActionTypes.CHECKUSER_ERROR:
      case LoginTypeActionTypes.LOGOUT_ERROR:
      {
        return { 
          ...state, 
          loading: false, 
          reOpenaction: true,
          errors: action.payload 
        }
      }
      

      case LoginTypeActionTypes.VERIFY_OTP_ERROR:
      {
        return { 
          ...state, 
          loading: false, 
          reOpenaction: true,
          errors: action.payload 
        }
      }
      default: {
        return state
      }
    }
  }

  export { reducer as authenticationReducer }