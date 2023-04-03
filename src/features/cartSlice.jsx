import { createSlice } from "@reduxjs/toolkit";

const itemsAdded = localStorage.getItem("cartItems");

const initialState = {
  cartItems: itemsAdded ? JSON.parse(itemsAdded) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartGrandTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempItem = { ...payload, cartQuantity: 0 };
        state.cartItems.push(tempItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, { payload }) {
      const filterCart = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
      state.cartItems = filterCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseItem(state, { payload }) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const filterCart = state.cartItems.filter(
          (item) => item.id !== payload.id
        );
        state.cartItems = filterCart;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeAll(state) {
      state.cartItems = [];
    },

    getTotals(state) {
      let { quantity, total } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          cartTotal.total += price * cartQuantity;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          quantity: 0,
          total: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },

    getGrandTotal(state, { payload }) {
      const { inputDiscount, inputVat } = payload;
      const withVat = state.cartTotalAmount * (inputVat / 100);
      const discountValue = state.cartTotalAmount * (inputDiscount / 100);
      state.cartGrandTotal = state.cartTotalAmount + withVat - discountValue;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseItem,
  getTotals,
  getGrandTotal,
  removeAll,
} = cartSlice.actions;
export default cartSlice.reducer;
