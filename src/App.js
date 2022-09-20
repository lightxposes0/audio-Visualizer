import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddEditSong from './pages/AddEditSong';
import Home from './pages/Home';
import NavBar from './components/NavBar';



const App = () => {
    return (
        <BrowserRouter>
            <div className='app'>

                <NavBar/>

                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/add" element={<AddEditSong/>} />
                    <Route path="/update/:id" element={<AddEditSong/>} />
                    <Route path="/audio-Visualizer" element={<Home/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
