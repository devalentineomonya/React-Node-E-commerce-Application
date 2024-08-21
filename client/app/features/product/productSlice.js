import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        currentProduct: {},

    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload
        },
        setCurrentProduct(state, action) {
            state.currentProduct = action.payload
        },
        clearCurrentProduct(state) {
            state.currentProduct = null
        }
    }

})
export const {setProducts, setCurrentProduct, clearCurrentProduct} = productSlice.actions
export default productSlice.reducer