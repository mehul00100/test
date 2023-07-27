// commonSaga.js
import { takeLatest, put, call } from "redux-saga/effects";
import axiosMain from "../../../http/axios/axios_main";
import { fetchCategoryFailure, fetchCategorySuccess } from "../../actions";
import { FETCH_CATEGORY_REQUEST } from "../../actionLabels";

// Worker Saga: Makes the API call when the FETCH_CATEGORY_REQUEST action is dispatched
function* fetchCategorySaga() {
  try {
    const response = yield call(axiosMain.get, "Common/BindCategory");
    yield put(fetchCategorySuccess(response.data));
  } catch (error) {
    yield put(fetchCategoryFailure(error.message));
  }
}

// Watcher Saga: Watches for the FETCH_CATEGORY_REQUEST action and calls the worker saga
export function* watchFetchCategory() {
  yield takeLatest(FETCH_CATEGORY_REQUEST, fetchCategorySaga);
}
