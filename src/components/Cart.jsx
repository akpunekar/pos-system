import React from "react";
import Bottom from "./Bottom";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseItem, removeFromCart } from "../features/cartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <table className="cart-table">
        <thead>
          <tr>
            <td>PRODUCTS</td>
            <td>PRICE</td>
            <td>QUANTITY</td>
            <td>TOTAL</td>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 && (
            <tr>
              <td rowSpan={4} colSpan={4} className="blank-cart">
                THERE ARE NO PRODUCTS
              </td>
            </tr>
          )}
          {cartItems?.map((item) => (
            <tr key={item?.id}>
              <td className="product-name">
                <button
                  onClick={() => dispatch(removeFromCart(item))}
                  className="close-button"
                >
                  <span className="close-icon">🗙</span>
                </button>
                <span>{item?.name}</span>
              </td>
              <td>
                <span>{item?.price}</span>
              </td>
              <td>
                <span className="edit-item">
                  <button
                    onClick={() => dispatch(decreaseItem(item))}
                    className="handle-item"
                  >
                    ‒
                  </button>
                  <input placeholder={item?.cartQuantity} readOnly />
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="handle-item"
                  >
                    +
                  </button>
                </span>
              </td>
              <td>
                <span>{item?.price * item?.cartQuantity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Bottom />
    </>
  );
};

export default Cart;
