import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { getGrandTotal, getTotals, removeAll } from "../features/cartSlice";
import Receipt from "./Receipt";

const Bottom = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [inputDiscount, setInputDiscount] = useState(0);
  const [inputVat, setInputVat] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getTotals());
    dispatch(getGrandTotal({ inputDiscount, inputVat }));
  }, [cart, inputDiscount, inputVat]);

  return (
    <div className="bottom">
      {show && (
        <Receipt
          setShow={setShow}
          inputDiscount={inputDiscount}
          inputVat={inputVat}
        />
      )}
      <table className="bottom-table">
        <tbody>
          <tr>
            <th>SubTotal</th>
            <td>
              <span>{cart.cartTotalAmount.toFixed(3)} EUR</span>
              <span className="last">{cart.cartTotalQuantity} items</span>
            </td>
          </tr>
          <tr>
            <th>VAT tax</th>
            <td>
              <input
                onChange={(e) => setInputVat(e.target.value)}
                value={inputVat}
                type="text"
                required
              />
              <span className="last">
                {(cart.cartTotalAmount * (inputVat / 100)).toFixed(3)} EUR
              </span>
            </td>
          </tr>
          <tr>
            <th>Discount</th>
            <td>
              <input
                onChange={(e) => setInputDiscount(e.target.value)}
                value={inputDiscount}
                type="text"
                required
              />
              <span className="last">
                {(cart.cartTotalAmount * (inputDiscount / 100)).toFixed(3)} EUR
              </span>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{cart.cartGrandTotal.toFixed(3)} EUR</td>
          </tr>
        </tbody>
      </table>
      <div className="bottom-button">
        <button onClick={() => dispatch(removeAll())} className="first">
          CANCEL SALE
        </button>
        <button onClick={() => setShow(true)} className="last">
          PROCESS SALE
        </button>
      </div>
    </div>
  );
};

export default Bottom;
