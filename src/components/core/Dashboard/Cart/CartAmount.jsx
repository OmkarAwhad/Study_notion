import React from "react";
import { useSelector } from "react-redux";

function CartAmount() {
	const { total, cartItems } = useSelector((state) => state.cart);

	const handleBuyCourse = () => {
		const courses = cartItems.map((course) => course._id);
		console.log("Bought these courses : ", courses);
		// TODO : payment integration
	};

	return (
		<div>
			<p>Total</p>
			<h1>Rs.{total}</h1>
			<p>Rs.{total - total * (20 / 100)}</p>
			<div className="w-[80%] mx-auto h-[1px] bg-richblack-600 "></div>
			<button
				onClick={handleBuyCourse}
				className=" bg-yellow-100 text-richblack-900 px-10 py-2 rounded-md border-b border-b-richblack-200 "
			>
				Buy Now
			</button>
		</div>
	);
}

export default CartAmount;
