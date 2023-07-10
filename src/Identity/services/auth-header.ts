import { PROGRESS_API_TOKEN_STORAGE_KEY } from "../slice/userIdentitySlice";

export default function authHeader() {
    const token = localStorage.getItem(PROGRESS_API_TOKEN_STORAGE_KEY);

    if (token) {
        return { Authorization: "Bearer " + token };
    } else {
        return {};
    }
}
