import React from "react";
import "./Item.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleClick = (item) => {
    const itemAvailable = cartItems.findIndex((i) => i.id === item.id);
    if (itemAvailable === -1) dispatch(addToCart(item));
  };

  const handleDubleClick = (item) => {
    const itemAvailable = cartItems.findIndex((i) => i.id === item.id);
    if (itemAvailable >= 0) dispatch(addToCart(item));
  };

  return (
    <div
      onClick={() => handleClick(item)}
      onDoubleClick={() => handleDubleClick(item)}
      className="card"
      style={{ backgroundImage: `url(${item?.image})` }}
    >
      <div className="product-name">
        <h5>{item.name}</h5>
      </div>
      <div className="product-details">
        <h5>Price: {item?.price}</h5>
        <p>Description</p>
        <p>{(item?.description).slice(0, 30)}...</p>
      </div>
    </div>
  );
};

export default Item;
