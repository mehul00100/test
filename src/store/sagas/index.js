/* eslint-disable import/prefer-default-export */
import { all } from "redux-saga/effects";

import dummySagas from "./dummy/dummy";
import authSagas from "./auth/auth";
import toggleSaga from "./toggle/toggle";
import auctionCenterRootSagas from "./auction/auction";
import saleSagas from "./sale/sale";
import teaType from "./teaType/TeaType";
import { watchFetchWarehouseUser } from "./warehouse/warehouse";
import { watchFetchGrade } from "./grade/Grade";
import { watchFetchCategory } from "./bindCategory/bindcategory";
import {
  watchAddInvoiceDetails,
  watchDeleteInvoiceDetails,
  watchFetchInvoiceDetails,
  watchFetchInvoiceDetailsById,
  watchUpdateInvoiceDetails,
} from "./invoice/invoice";
import markData from "./mark/Mark";

export default function* rootSaga() {
  yield all([
    dummySagas(),
    authSagas(),
    toggleSaga(),
    auctionCenterRootSagas(),
    saleSagas(),
    teaType(),
    markData(),
    watchFetchWarehouseUser(),
    watchFetchGrade(),
    watchFetchCategory(),
    watchFetchInvoiceDetails(),
    watchFetchInvoiceDetailsById(),
    watchAddInvoiceDetails(),
    watchUpdateInvoiceDetails(),
    watchDeleteInvoiceDetails()
  ]);
}
