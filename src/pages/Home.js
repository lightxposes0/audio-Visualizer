import React, { useEffect, useState } from 'react';
import '../components/css/home.css';
import {getDoc} from 'firebase/firestore';
import db from '../firebase'

const Home = () => {
    // const [songs, setSongs] = useState()
    // useEffect((event) => {
    //     const dataFromDatabase = getDoc(db, 'songs/')
    //     dataFromDatabase.map()

    // }, [songs])
    return (
        <div className='home_wrapper'>
        
        
            test of home
        </div>
    )
}

export default Home
