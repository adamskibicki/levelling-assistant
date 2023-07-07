import { GetDefault, UserData } from "./UserData";

export const initialState: UserIdentitySliceState = {
    loggedIn: false,
    registeredSuccessfully: false,
    userData: GetDefault(),
};

export interface UserIdentitySliceState {
    loggedIn: boolean;
    registeredSuccessfully: boolean;
    userData: UserData;
}
