import { Action, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state/UserIdentitySliceState";
import { login } from "./thunks/login";
import { register } from "./thunks/register";
import { GetDefault } from "./state/UserData";

export const PROGRESS_API_TOKEN_STORAGE_KEY = "PROGRESS_API_TOKEN";

export const userIdentitySlice = createSlice({
    name: "characterPanel",
    initialState: initialState,
    reducers: {
        logout: (state, action: Action) => {
            localStorage.removeItem(PROGRESS_API_TOKEN_STORAGE_KEY);
            state.userData = GetDefault();
            state.loggedIn = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {
                state.loggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loggedIn = true;

                //copying props manually to exclude copying token to redux state
                state.userData = {
                    email: action.payload.email,
                    id: action.payload.id,
                    userName: action.payload.userName
                };

                localStorage.setItem(
                    PROGRESS_API_TOKEN_STORAGE_KEY,
                    action.payload.token
                );
            })
            .addCase(login.rejected, (state, action) => {
                state.loggedIn = false;
            });

        builder
            .addCase(register.pending, (state, action) => {
                state.registeredSuccessfully = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.registeredSuccessfully = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.registeredSuccessfully = false;
            });
    },
});

export const { logout } = userIdentitySlice.actions;

export default userIdentitySlice.reducer;
