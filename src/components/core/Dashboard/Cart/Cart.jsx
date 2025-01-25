import React from 'react'
import { useSelector } from 'react-redux'
import CartCourses from './CartCourses';
import CartAmount from './CartAmount';

function Cart() {
   const {total,totalItems} = useSelector(state => state.cart);
   return (
      <div>
         <h1>Your Cart</h1>
         <p>{totalItems} Courses in Cart</p>
         {
            total > 0 ? (
               <div>
                  <CartCourses/>
                  <CartAmount/>
               </div>
            ) : (
               <div>
                  Your Cart is Empty
               </div>
            )
         }
      </div>
   )
}

export default Cart