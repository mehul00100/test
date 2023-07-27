import { combineReducers } from "redux";

import dummyReducer from "./dummy/dummy";
import auth from "./auth/auth";
import toggle from "./toggle/toggle";
import auction from "./auction/auctionCentre";
import sale from "./sale/sale";
import teaType from "./teaType/TeaType";
import mark from "./mark/Mark";
import warehouseUser from "./warehouse/warehouse";
import grade from "./grade/Grade";
import category from "./bindCategory/bindcategory";
import invoiceDetails from "./invoice/invoice";

const allReducers = combineReducers({
  dummyReducer,
  auth,
  toggle,
  auction,
  sale,
  teaType,
  mark,
  warehouseUser,
  grade,
  category,
  invoiceDetails,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
