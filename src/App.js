import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddEditSong from './pages/AddEditSong';
import Home from './pages/Home';
import NavBar from './components/NavBar';

import { createContext, useState, useEffect } from 'react';
import './components/css/App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";




export const ThemeContext = createContext(null);
export const ColorContext = createContext(null)

const App = () => {
    const [theme, setTheme] = useState("dark")




    const toggleTheme = () => {
        setTheme((current) => (current === "light" ? "dark" : "light"))
    }
    
    // React useEffect hook that will fire up
    // when "darkTheme" changes
    useEffect(() => {
        // Accessing scss variable "--background-color"
        // and "--text-color" using plain JavaScript
        // and changing the same according to the state of "darkTheme"
        const root = document.documentElement;
        root?.style.setProperty(
            "--color-page-background",
            theme === "light" ? "#fff" : "#06041E"
        );
        root?.style.setProperty("--color-text", theme === "light" ? "#06041E" : "#fff");
    }, [theme]);


    return (
        <BrowserRouter>
                <ThemeContext.Provider value = {{theme, toggleTheme}}>
                    <div className='app' id={theme}>
                        <div className='buttonToggleDarkmode' >
                            <input type="checkbox" class="checkbox" id="checkbox"/>
                            <label for="checkbox" class="label" onClick={toggleTheme}>
                                <FontAwesomeIcon className='fa-sun' icon={faSun}/>
                                <FontAwesomeIcon className='fa-moon' icon={faMoon}/>
                                <div class='ball'/>
                            </label>
                        </div>

                        
                        <NavBar/>

                        <Routes>
                            <Route path="/" element={<Home theme = {theme} />} />
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
