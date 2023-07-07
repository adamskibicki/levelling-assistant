import { useState } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { login } from "../slice/thunks/login";
import { Button } from "../../components/common/Buttons";
import CommonModal from "../../Modal/CommonModal";
import InputText from "../../Inputs/InputText";
import InputPassword from "../../Inputs/InputPassword";
import { useSelector } from "react-redux";
import { logout } from "../slice/userIdentitySlice";

export default function Login(props: {
    loginButtonClassName?: string;
    logoutButtonClassName?: string;
}) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userLogin, setUserLogin] = useState({ email: "", password: "" });
    const loggedIn = useSelector(
        (state: RootState) => state.userIdentity.loggedIn
    );
    const userData = useSelector(
        (state: RootState) => state.userIdentity.userData
    );
    const dispatch = useAppDispatch();

    const onLoginModalAccept = () => {
        setShowLoginModal(false);
        dispatch(login(userLogin));
        setUserLogin({ email: "", password: "" });
    };

    return (
        <>
            {loggedIn ? (
                <Button
                    className={props.logoutButtonClassName}
                    onClick={() => dispatch(logout())}
                >
                    Logout: {userData.userName}
                </Button>
            ) : (
                <Button
                    className={props.loginButtonClassName}
                    onClick={() => setShowLoginModal(true)}
                >
                    Login
                </Button>
            )}
            <CommonModal
                onAccept={() => onLoginModalAccept()}
                onClose={() => setShowLoginModal(false)}
                onHide={() => setShowLoginModal(false)}
                show={showLoginModal}
                title="Login"
            >
                <form>
                    <InputText
                        label="Email"
                        value={userLogin.email}
                        autocomplete="email"
                        onChange={(_, value) =>
                            setUserLogin({ ...userLogin, email: value })
                        }
                    />
                    <InputPassword
                        label="Password"
                        value={userLogin.password}
                        autocomplete="current-password"
                        onChange={(_, value) =>
                            setUserLogin({
                                ...userLogin,
                                password: value,
                            })
                        }
                    />
                </form>
            </CommonModal>
        </>
    );
}
