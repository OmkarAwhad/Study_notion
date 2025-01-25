import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { IoMdStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cart.slice";

function CartCourses() {
	const { cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	return (
		<div>
			{cartItems.map((item, index) => (
				<div key={index}>
					<img src={item?.thumbNail} alt="" />
					<div>
						<h1>{item?.courseName}</h1>
						<p>{item?.instructor}</p>
						<div>
							{/* Get avg rating */}
							<ReactStars
								count={5}
								size={20}
								value={item?.ratingAndReviews?.length}
								edit={false}
								activeColor={"#ffd700"}
								emptyIcon={<IoMdStarOutline />}
								filledIcon={<IoMdStar />}
							/>
							<span>
								{item?.ratingAndReview.length} Ratings
							</span>
						</div>
					</div>
					<div>
						<button
							onClick={() =>
								dispatch(removeFromCart(item._id))
							}
						>
							<RiDeleteBin5Line />
							Remove
						</button>
						<h1>Rs.{item?.price}</h1>
					</div>
				</div>
			))}
		</div>
	);
}

export default CartCourses;
