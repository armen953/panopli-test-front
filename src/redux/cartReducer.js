import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  nbElementInCart: 0
}

const cartSlice = createSlice({
  name: "cart",
  
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload
      const selectedQuantity = action.payload.selectedQuantity

      const prod = state.products.find((p) => {
       return  p._id === product._id && p.color._id === product.color._id && p.size === product.size
      })
      if (prod === undefined) {
        state.products.push(product)
      } else {
        prod.selectedQuantity += selectedQuantity
      }
      state.nbElementInCart += selectedQuantity
    },
    changeProductQuantityIn: (state, action) => {
      const { product, quantityChange } = action.payload
      const productIndex = state.products.findIndex((p) => {
        return (p._id === product._id && p.color._id === product.color._id && p.size === product.size)
      })
      const stateProduct = state.products[productIndex]
      stateProduct.selectedQuantity += quantityChange
      state.nbElementInCart += quantityChange
    },
    removeProduct: (state, action) => {
      const product = action.payload
      // find the index of the product to delete
      const productIndex = state.products.findIndex((p) => {
        return (p._id === product._id && p.color._id === product.color._id && p.size === product.size)
      })
      if (productIndex !== -1) {
        const removedItem = state.products.splice(productIndex, 1);
        state.nbElementInCart -= removedItem[0].selectedQuantity
      } else {
        console.error("Une erreur est survenue lors de la suppression du produit: produit non trouvé");
      }
    },
    resetState: () => initialState
  }
});

export const { addProduct, changeProductQuantityIn, removeProduct, resetState } = cartSlice.actions;
export default cartSlice.reducer;
