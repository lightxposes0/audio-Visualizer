import React from 'react'
import {useNavigate, Link} from "react-router-dom";
import logo from "../asset/homeLinkLogo.png"
import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({toggleTheme, email}) => {
    let navigate = useNavigate();
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => { 
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [windowSize]);

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }
    
    return (
        // Margin bottom: 20px, padding: 0.3rem
        <div className='navBarMenu'>
            <div className="navBarContainer">
            
                <div className='navBarItemWrap'>
                    <div  className="navBarItem">
                    <Link to={email == "stian.larsen@mac.com" || email == "Stian.larsen@mac.com" ? "/adminHome" : "/home"}>
                        <img id='logo'  style={{width: "65px"}} src={logo} alt="logo" />
                    </Link>
                    </div>

                    <div className="navBarItem">
                        <h2>{ windowSize.innerWidth > 750 ?  "Audio Visualizer | Upload audio" : "Audio Visualizer" }</h2>
                    </div>
                </div>
                

                <div className="navBarItem">
                    <button className='newSongButton' onClick={() => navigate("/add")}>Add Song</button>
                </div>
                <div className='buttonToggleDarkmode' >
                    <input type="checkbox" className="checkbox" id="checkbox"/>
                    <label htmlFor="checkbox" className="label" onClick={toggleTheme}>
                        <FontAwesomeIcon className='fa-sun' icon={faSun}/>
                        <FontAwesomeIcon className='fa-moon' icon={faMoon}/>
                        <div className='ball'/>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default NavBar