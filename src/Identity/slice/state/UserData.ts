export interface UserData {
    id: string;
    userName: string;
    email: string;
}

export function GetDefault(): UserData {
    return {
        email: "",
        id: "",
        userName: ""
    };
}