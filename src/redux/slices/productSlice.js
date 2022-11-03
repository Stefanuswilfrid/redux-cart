import {createSlice } from "@reduxjs/toolkit"

export  const initialState = {
    products: [
        {
            "id" : 1,
            "nama":"sepatu nike",
            "quantity":1,
            "img":"https://cdn.pixabay.com/photo/2013/07/13/14/08/apparel-162192_1280.png",
            "size":"M",
            "color":"blue",
            "price":20,

        },
        {
            "id":2,
            "nama":"adidas sepatu",
            "img":"https://cdn.pixabay.com/photo/2013/07/13/14/08/apparel-162192_1280.png",
            "quantity":1,
            "color":"red",
            "size":"S",
            "price":30,
        }
    ],
}
// initialState.products[0].nama

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addQuantity: (state, action) => {
            state.products = state.products.map((product) => {
                if (product.id === action.payload) {
                    product.quantity++;
                }
                return product;
            });
        },

        removeQuantity: (state, action) => {
            state.products = state.products.map((product) => {
                if (product.quantity === 0) {
                    return product
                } 

                if (product.id === action.payload) {
                    product.quantity--;
                }

                
                return product;
            });
        },

        clearQuantity : (state,action) => {
            state.products = state.products.map((product) => {
                if (product.id === action.payload) {
                    product.quantity = 0

                }
            
                return product;
            });

        }

        
    },
})

export const { addQuantity, removeQuantity,clearQuantity} = productSlice.actions
export default productSlice.reducer
