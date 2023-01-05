import {createSlice } from "@reduxjs/toolkit"

export  const initialState = {
    products: [
        {
            "id" : 1,
            "nama":"Fifa 19",
            "quantity":1,
            "img":"https://pngimg.com/d/fifa_game_PNG79.png",
            "category":"Game",
            "detail":"PS4",
            "price":20,

        },
        {
            "id":2,
            "nama":"Red V-neck Shirt",
            "img":"https://cdn.pixabay.com/photo/2013/07/13/14/08/apparel-162192_1280.png",
            "quantity":1,
            "category":"Clothing",
            "detail":"Size S",
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
