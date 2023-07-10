export interface UserRegister {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
}

export function GetDefault(): UserRegister {
    return {
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
    };
}