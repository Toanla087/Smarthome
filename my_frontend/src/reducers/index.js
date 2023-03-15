import { combineReducers } from 'redux';
import TempReducer from './temperatureReducer';
import LedReducer from './ledReducer'
import userReducer from './userReducer';
export default combineReducers({
    tempstate: TempReducer,
    ledState: LedReducer,
    userState:userReducer
});
