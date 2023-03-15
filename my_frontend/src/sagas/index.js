import { all } from "redux-saga/effects";
import { TempSaga } from "./temperatureSaga";
import { UserSaga } from "./userSaga";
function* rootSaga() {
  yield all([...TempSaga, ...UserSaga]);
}
export default rootSaga;
