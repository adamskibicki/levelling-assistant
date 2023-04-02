import './App.scss';
import {
    BrowserRouter,
    Route,
    Link,
    Routes
} from "react-router-dom";
import UserCharacters from './UserCharacters/UserCharacters';
import Home from './Home';
import CharacterPanel from './CharacterPanel/CharacterPanel';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <div className='app__navbar'>
                    <Link className='app__link' to="/">Home</Link>
                    <Link className='app__link' to="/characters">Characters</Link>
                </div>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/characters" element={<UserCharacters />} />
                    <Route path="/character/:statusId" element={<CharacterPanel />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
