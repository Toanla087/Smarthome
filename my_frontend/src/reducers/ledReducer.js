import * as types from '../commons/index';
const DEFAULT_STATE = {
    stateled: {},
    dataFetched: false,
    isFetching: false,
    error: false,
    errorMessage: null,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.ADD_STATELED_REQ:
            return {
                ...state,
                isFetching: true
            };
        case types.ADD_STATELED_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                state: action.payload
            };
        case types.ADD_STATELED_FAIL:
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
