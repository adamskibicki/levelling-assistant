import { useAppSelector } from "./store/store";
import { Children } from "react";
import "./LoginRequiredWrappet.scss";

export function LoginRequiredWrapper(props: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const loggedIn = useAppSelector(
        (state) => state.userIdentity.loggedIn
    );

    return (
        <>
            {loggedIn ? (
                Children.toArray(props.children)
            ) : (
                <div className="login-required-wrapper">
                    <h1>
                        Please login before accessing this page
                    </h1>
                </div>
            )}
        </>
    );
}
