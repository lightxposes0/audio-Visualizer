import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddEditSong from './pages/AddEditSong';
import Home from './pages/Home';
import NavBar from './components/NavBar';

import { createContext, useState } from 'react';
import './components/css/App.css'
export const ThemeContext = createContext(null);


const App = () => {
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme((current) => (current === "light" ? "dark" : "light"))
    }

    return (
        <BrowserRouter>
            <ThemeContext.Provider value = {{theme, toggleTheme}}>
                <div className='app' id={theme}>

                    <NavBar/>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add" element={<AddEditSong />} />
                        <Route path="/update/:id" element={<AddEditSong />} />
                        <Route path="/audio-Visualizer" element={<Home />} />
                    </Routes>
                </div>
            </ThemeContext.Provider>
        </BrowserRouter>
    );
}

export default App;
