import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { login } from "../slice/thunks/login";
import { Button } from "../../components/common/Buttons";
import CommonModal from "../../Modal/CommonModal";
import InputText from "../../Inputs/InputText";
import InputPassword from "../../Inputs/InputPassword";
import { logout } from "../slice/userIdentitySlice";
import { useNavigate } from "react-router-dom";

export default function Login(props: {
    loginButtonClassName?: string;
    logoutButtonClassName?: string;
}) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userLogin, setUserLogin] = useState({ email: "", password: "" });
    const loggedIn = useAppSelector(
        (state) => state.userIdentity.loggedIn
    );
    const userData = useAppSelector(
        (state) => state.userIdentity.userData
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
                    onClick={() => {
                        dispatch(logout());
                        navigate("");
                    }}
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
