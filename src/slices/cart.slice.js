import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	totalItems: localStorage.getItem("totalItems")
		? JSON.parse(localStorage.getItem("totalItems"))
		: 0,

	cartItems: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],

	total: localStorage.getItem("total")
		? JSON.parse(localStorage.getItem("token"))
		: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		// setTotalItems(state, value) {
		// 	state.totalItems = value.payload;
		// },
		
		//add to cart
		addToCart(state, value) {
			const course = value.payload;
			const ind = state.cartItems.findIndex(
				(item) => item._id === course._id
			);
			if (ind >= 0) {
				toast.error("Course already in cart");
				return;
			}
			state.cartItems.push(course);
			state.totalItems += 1;
			state.total += course.price;
			localStorage.setItem(
				"totalItems",
				JSON.stringify(state.totalItems)
			);
			localStorage.setItem(
				"cartItems",
				JSON.stringify(state.cartItems)
			);
			localStorage.setItem("total", JSON.stringify(state.total));
			toast.success("Item added to cart");
		},
		//remove from cart
		removeFromCart(state, value) {
			const course = value.payload;
			const ind = state.cartItems.findIndex(
				(item) => item._id === course._id
			);
			if (ind >= 0) {
				state.totalItems -= 1;
				state.total -= state.cartItems[ind].price;
				state.cartItems = state.cartItems.filter(
					(prev) => prev._id !== course._id
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
				localStorage.setItem("token", JSON.stringify(state.total));
				toast.success("Item removed from cart");
			}
		},
		//reset cart
		resetCart(state) {
			state.cartItems = [];
			state.total = 0;
			state.totalItems = 0;
			localStorage.removeItem("cartItems");
			localStorage.removeItem("totalItems");
			localStorage.removeItem("total");
			toast.success("Cart reset");
		},
	},
});

export const { setTotalItems, addToCart, removeFromCart, resetCart } =
	cartSlice.actions;

export default cartSlice.reducer;
