import React, { useEffect, useState } from 'react';
import '../components/css/home/home.css';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase'
import { useNavigate } from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
import wavesurfaudio from "../components/wave"
import "../components/script.js"



const Home = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        const retrieveSongs = onSnapshot(
            collection(db, "songs"), 
            (snapshot) => {
                let arrayList = [];
                snapshot.docs.forEach((doc) => {
                    arrayList.push({ id: doc.id, ...doc.data() });
                });
                setSongs(arrayList);
                setLoading(false);

            }, 
            (error) => {
                console.log(error);
            }
        );

        return () => {
            retrieveSongs();
        };
        
    }, []);
    
    return (
        <div className='home_wrapper'>
            <>
                {loading ? 
                    <ClipLoader color="#36d7b7" />
                :

                    <div className='homepage_container'>
                        {   songs.map((data) => {
                            return (
                                <article key={data.id} className='card'>
                                    <div className='card_content'>
                                        <img className='card_image' src={data.image} />

                                        <h2>{data.title}</h2>
                                        <h4>{data.artist}</h4>
                                        {wavesurfaudio(data.audio)}
                                        {/* <Waveform className="audio_file" audio={data.audio}/> */}
                                    </div>

                                    <div className='card_content_extra'>
                                        <button onClick={() => navigate('/update/${data.id}')}>Edit</button>
                                        <button >Listen</button>
                                    </div>

                                    <div id="waveform"></div>
                                        <button class="btn btn-primary" onclick="wavesurfer.playPause()">
                                        <i class="glyphicon glyphicon-play"></i>Play/Pause
                                        </button>
                                </article>
                            )
                        })}
                    </div>
                }
            </>
        </div>
    )
}

export default Home
