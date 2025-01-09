import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice";
import profileReducer from "../slices/profile.slice";
import cartReducer from "../slices/cart.slice";

const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	cart: cartReducer,
});

export default rootReducer;
