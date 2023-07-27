import { all, takeEvery, put, call } from "redux-saga/effects";
import axiosMain from "../../../http/axios/axios_main";
import * as actionTypes from "../../actionLabels";
import * as auctionCenterActions from "../../actions";

function* fetchAuctionCenterSaga() {
  try {
    const response = yield call(axiosMain.get, "Common/BindAuctionCenter");
    yield put(auctionCenterActions.fetchAuctionCenterSuccess(response.data));
  } catch (error) {
    yield put(auctionCenterActions.fetchAuctionCenterFail(error));
  }
}

function* fetchSaleNoSaga() {
  try {
    const response = yield call(axiosMain.get, "Common/BindSaleNo");
    yield put(auctionCenterActions.getSaleNoSuccess(response.data));
  } catch (error) {
    yield put(auctionCenterActions.getSaleNoFailure(error));
  }
}

function* checkSaleNoExistenceSaga(action) {
  try {
    const { saleNo, season } = action.payload;
  
    const response = yield call(axiosMain.post, 'SaleProgram/IsSaleNoExist', {
      saleNo,
      season,
    });

    if (response.status === 200) {
      yield put(auctionCenterActions.checkSaleNoExistenceSuccess(response.data.exists));
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    yield put(auctionCenterActions.checkSaleNoExistenceFailure(error.message));
  }
}

const fetchPromptDatesByAuctionCenterAPI = (auctionCenterId, saleDate) => {
  return axiosMain.post('SaleProgram/GetPromptDateByAuctionCenter', {
    auctionCenterId,
    saleDate,
  });
};

function* fetchPromptDatesByAuctionCenterSaga(action) {
  try {
    // Destructure the payload
    const { auctionCenterId, saleDate } = action.payload;

    // Make the API call using the fetchPromptDatesByAuctionCenterAPI function
    const response = yield call(fetchPromptDatesByAuctionCenterAPI, auctionCenterId, saleDate);
    
    // Dispatch success action with the received prompt dates
    yield put(auctionCenterActions.fetchPromptDatesByAuctionCenterSuccess(response.data));
  } catch (error) {
    // Dispatch failure action with the error message
    yield put(auctionCenterActions.fetchPromptDatesByAuctionCenterFailure(error.message));
  }
}

// checkSaleNoExistenceSaga

export default function* auctionCenterRootSagas() {
  yield takeEvery(actionTypes.FETCH_AUCTION_CENTER, fetchAuctionCenterSaga);
  yield takeEvery(actionTypes.GET_SALE_NO_REQUEST, fetchSaleNoSaga);
  yield takeEvery(actionTypes.CHECK_SALE_NO_EXISTENCE, checkSaleNoExistenceSaga);
  yield takeEvery(actionTypes.FETCH_PROMPT_DATES_BY_AUCTION_CENTER_REQUEST, fetchPromptDatesByAuctionCenterSaga);
}
