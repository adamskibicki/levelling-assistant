import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { register } from "../slice/thunks/register";
import { Button } from "../../components/common/Buttons";
import CommonModal from "../../Modal/CommonModal";
import InputText from "../../Inputs/InputText";
import InputPassword from "../../Inputs/InputPassword";
import { GetDefault, UserRegister } from "./UserRegister";

export default function Register(props: { registerButtonClassName?: string }) {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [userRegister, setUserRegister] = useState(GetDefault());
    const loggedIn = useAppSelector((state) => state.userIdentity.loggedIn);
    const dispatch = useAppDispatch();

    const onRegisterModalAccept = () => {
        if (!isValid(userRegister)) return;

        setShowRegisterModal(false);
        dispatch(register(userRegister));
        setUserRegister(GetDefault());
    };

    const isValid = (userRegister: UserRegister) => {
        if (userRegister.password !== userRegister.confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        return true;
    };

    return (
        <>
            {!loggedIn && (
                <Button
                    className={props.registerButtonClassName}
                    onClick={() => setShowRegisterModal(true)}
                >
                    Register
                </Button>
            )}
            <CommonModal
                onAccept={() => onRegisterModalAccept()}
                onClose={() => setShowRegisterModal(false)}
                onHide={() => setShowRegisterModal(false)}
                show={showRegisterModal}
                title="Register"
            >
                <form>
                    <InputText
                        label="Email"
                        value={userRegister.email}
                        autocomplete="email"
                        onChange={(_, value) =>
                            setUserRegister({ ...userRegister, email: value })
                        }
                    />
                    <InputText
                        label="Username"
                        value={userRegister.userName}
                        autocomplete="username"
                        onChange={(_, value) =>
                            setUserRegister({
                                ...userRegister,
                                userName: value,
                            })
                        }
                    />
                    <InputPassword
                        label="Password"
                        value={userRegister.password}
                        autocomplete="new-password"
                        onChange={(_, value) =>
                            setUserRegister({
                                ...userRegister,
                                password: value,
                            })
                        }
                    />
                    <InputPassword
                        label="Confirm password"
                        value={userRegister.confirmPassword}
                        autocomplete="new-password"
                        onChange={(_, value) =>
                            setUserRegister({
                                ...userRegister,
                                confirmPassword: value,
                            })
                        }
                    />
                </form>
            </CommonModal>
        </>
    );
}
