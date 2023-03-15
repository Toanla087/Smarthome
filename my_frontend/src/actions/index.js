import * as types from '../commons/index'

export function getTemperature(payload) {
    return ({
        type: types.GET_TEMPERATURE_REQ,
        payload:payload
    })
};
export function assStateLed(payload){
    return({
        type:types.ADD_STATELED_REQ,
        payload
    })
};
export function addStateDoor(payload){
    return({
        type:types.ADD_STATEDOOR_REQ,
        payload
    })
};
export function updateAir(payload){
    return({
        type:types.UPDATE_AIR_REQ,
        payload
    })
};
export function login(payload){
    return({
        type:types.LOGIN_REQ,
        payload
    })
};
export function register(payload){
    return({
        type:types.REGISTER_REQ,
        payload
    })
};
export function add_home(payload){
    return({
        type:types.ADD_HOME_REQ,
        payload
    })
};
export function get_user_by_id(payload){
    return({
        type:types.GET_USER_REQ,
        payload
    })
};
export function delete_home(payload){
    return({
        type:types.DELETE_HOME_REQ,
        payload
    })
}
