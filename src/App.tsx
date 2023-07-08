import scss from "./App.module.scss";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import UserCharacters from "./UserCharacters/UserCharacters";
import Home from "./Home";
import CharacterPanel from "./CharacterPanel/CharacterPanel";
import Login from "./Identity/Login/Login";
import { LoginRequiredWrapper } from "./LoginRequiredWrapper";
import { useAppSelector } from "./store/store";

function App() {
    const loggedIn = useAppSelector(
        (state) => state.userIdentity.loggedIn
    );

    //TODO: add register, add auto login with token auto check (need api endpoint)
    return (
        <div className={scss.app}>
            <BrowserRouter>
                <div className={scss.app__navbar}>
                    <Link className={scss.app__link} to="/">
                        Home
                    </Link>
                    {loggedIn && (
                        <Link className={scss.app__link} to="/characters">
                            Characters
                        </Link>
                    )}
                    <Login
                        loginButtonClassName={scss["app__login-button"]}
                        logoutButtonClassName={scss["app__logout-button"]}
                    />
                </div>
                <Routes>
                    <Route index element={<Home />} />
                    <Route
                        path="/characters"
                        element={
                            <LoginRequiredWrapper>
                                <UserCharacters />
                            </LoginRequiredWrapper>
                        }
                    />
                    <Route
                        path="/character/:statusId"
                        element={
                            <LoginRequiredWrapper>
                                <CharacterPanel />
                            </LoginRequiredWrapper>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
