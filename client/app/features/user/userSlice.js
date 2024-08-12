import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        message: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        registerUser(state, payload) {
            state.message = payload.message
        },
        setRegisterLoading(state, action) {
            state.isLoading = action.payload;
        },
        setRegisterError(state, action) {
            state.error = action.payload.data;
        },
    }
})

export const {registerUser, setRegisterError, setRegisterLoading} = userSlice.actions
export default userSlice.reducer