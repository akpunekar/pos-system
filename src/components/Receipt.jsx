import React from "react";
import "./Receipt.scss";
import { useSelector, useDispatch } from "react-redux";
import { removeAll } from "../features/cartSlice";

const Receipt = ({ inputVat, inputDiscount, setShow }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h5 className="modal-title">Receipt</h5>
        </div>
        <div className="modal-body">
          <h4>Sale No.: 00102</h4>
          <p className="date">Date:{formattedDate}</p>
          <table className="cart-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Products</th>
                <th>Quantity</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.cartQuantity}</td>
                  <td className="price">
                    {item?.price * item?.cartQuantity} INR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <table className="cart-table">
            <thead>
              <tr>
                <th style={{ textAlignLast: "left" }}>Total Items </th>
                <th> {cart.cartTotalQuantity} Total</th>
                <th style={{ textAlignLast: "right" }}>
                  {cart.cartTotalAmount.toFixed(3)} INR
                </th>
              </tr>
            </thead>
          </table>
          <hr />
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th> Discount</th>
                <th style={{ textAlignLast: "right" }}>{inputDiscount}%</th>
              </tr>
            </thead>
          </table>
          <hr />
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th> VAT</th>
                <th style={{ textAlignLast: "right" }}>{inputVat}%</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              dispatch(removeAll());
              setShow(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
