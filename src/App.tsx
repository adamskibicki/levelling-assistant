import "./App.scss";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import UserCharacters from "./UserCharacters/UserCharacters";
import Home from "./Home";
import CharacterPanel from "./CharacterPanel/CharacterPanel";
import Login from "./Identity/Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { LoginRequiredWrapper } from "./LoginRequiredWrapper";

function App() {
    const loggedIn = useSelector(
        (state: RootState) => state.userIdentity.loggedIn
    );

    return (
        <div className="app">
            <BrowserRouter>
                <div className="app__navbar">
                    <Link className="app__link" to="/">
                        Home
                    </Link>
                    {loggedIn && (
                        <Link className="app__link" to="/characters">
                            Characters
                        </Link>
                    )}
                    <Login
                        loginButtonClassName="app__login-button"
                        logoutButtonClassName="app__logout-button"
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
