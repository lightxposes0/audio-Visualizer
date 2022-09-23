import React from 'react'
import {useNavigate, Link} from "react-router-dom";
import logo from "../asset/testttt.png"

const NavBar = () => {
    const navigate = useNavigate();
    
    return (
        // Margin bottom: 20px, padding: 0.3rem
        <div className='navBarMenu'>
            <div className="navBarContainer">
            
                <div className='navBarItemWrap'>
                    <div  className="navBarItem">
                    <Link to="/">
                        <img id='logo'  style={{width: "65px"}} src={logo} alt="logo" />
                    </Link>
                    </div>

                    <div className="navBarItem">
                        <h2>Audio Visualizer | Upload audio</h2>
                    </div>
                </div>
                

                <div className="navBarItem">
                    <button className='newSongButton' onClick={() => navigate("/add")}>Add Song</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar