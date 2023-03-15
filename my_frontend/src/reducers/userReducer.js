import * as types from '../commons/index';
const DEFAULT_STATE = {
    user: {},
    dataFetched: false,
    isFetching: false,
    error: false,
    errorMessage: null,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.LOGIN_REQ:
            return {
                ...state,
                isFetching: true
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                user: action.payload
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload.errorMessage
            };
        case types.REGISTER_REQ:
            return {
                ...state,
                isFetching: true
            };
        case types.ADD_HOME_REQ:
            return {
                ...state,
                isFetching: true
            };
        case types.DELETE_HOME_REQ:
            return {
                ...state,
                isFetching: true
            };
        case types.GET_USER_REQ:
            return {
                ...state,
                isFetching: true
            };
        case types.GET_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                user: action.payload
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                user: action.payload
            };
        case types.REGISTER_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload.errorMessage
            };
        case types.GET_USER_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload.errorMessage
            };
        case types.ADD_HOME_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload.errorMessage
            };
        case types.DELETE_HOME_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload.errorMessage
            };
        default:
            return state;
    }
};
