import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	totalItems: localStorage.getItem("totalItems")
		? JSON.parse(localStorage.getItem("totalItems"))
		: 0,

	cartItems: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		setTotalItems(state, value) {
			state.totalItems = value.payload;
		},
		//add to cart
		addToCart(state, value) {
			state.cartItems.push(value.payload);
			state.totalItems += 1;
			localStorage.setItem(
				"totalItems",
				JSON.stringify(state.totalItems)
			);
			localStorage.setItem(
				"cartItems",
				JSON.stringify(state.cartItems)
			);
			toast.success("Item added to cart");
		},
		//remove from cart
		removeFromCart(state, value) {
			state.cartItems = state.cartItems.filter(
				(prev) => prev.id !== value.payload.id
			);
			state.totalItems -= 1;
			localStorage.setItem(
				"totalItems",
				JSON.stringify(state.totalItems)
			);
			localStorage.setItem(
				"cartItems",
				JSON.stringify(state.cartItems)
			);
			toast.success("Item removed from cart");
		},
		//reset cart
		resetCart(state) {
			state.cartItems = [];
			state.totalItems = 0;
			localStorage.removeItem("cartItems");
			localStorage.removeItem("totalItems");
			toast.success("Cart reset");
		},
	},
});

export const { setTotalItems, addToCart, removeFromCart, resetCart } =
	cartSlice.actions;

export default cartSlice.reducer;
