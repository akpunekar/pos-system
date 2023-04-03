import React from "react";
import Data from "../../Data.json";
import Item from "./Item";
import "./Item.scss";

const ItemList = () => {
  return (
    <div className="product-list">
      {Data?.map((item) => (
        <Item key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
