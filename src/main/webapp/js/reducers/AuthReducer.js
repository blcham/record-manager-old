import * as ActionConstants from "../constants/ActionConstants";
import {getRole} from "../utils/Utils";
import {ACTION_STATUS} from "../constants/DefaultConstants";

const initialState = {
    authenticated: false,
    isLogging: false,
    isLoaded: false,
    user: {},
    passwordResetStatus: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionConstants.AUTH_USER_PENDING:
            return {
                ...state,
                isLogging: true
            };
        case ActionConstants.AUTH_USER_SUCCESS:
            return {
                ...state,
                error: '',
                authenticated: true,
                isLogging: false
            };
        case ActionConstants.AUTH_USER_ERROR:
            return {
                ...state,
                error: action.error,
                isLogging: false
            };
        case ActionConstants.LOAD_USER_PROFILE_PENDING:
            return {
                ...state,
                isLoaded: false,
                authenticated: false,
                status: ACTION_STATUS.PENDING
            };
        case ActionConstants.LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                authenticated: true,
                status: ACTION_STATUS.SUCCESS,
                user: {
                    ...action.user,
                    role: getRole(action.user)
                }
            };
        case ActionConstants.LOAD_USER_PROFILE_ERROR:
            return {
                ...state,
                isLoaded: false,
                authenticated: false,
                status: ACTION_STATUS.ERROR,
                user: {
                    error: action.error
                }
            };
        case ActionConstants.PASSWORD_RESET_PENDING:
            return {
                ...state,
                passwordResetStatus: ACTION_STATUS.PENDING
            };
        case ActionConstants.PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                passwordResetStatus: ACTION_STATUS.SUCCESS
            };
        default:
            return state;
    }
}