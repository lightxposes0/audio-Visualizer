import React, { useEffect,  useState } from 'react';
import {collection,  onSnapshot} from 'firebase/firestore';
import {db} from '../firebase'
import { useNavigate} from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
import AudioVisualizer from "../components/AudioVisualizer"





const Home = (props) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    // 1. Check if the user is signed in.. 
    // 2. If user is signed in, => navigate to this /home screen. ELSE: go to log in page..
    useEffect(() => {
        let authToken = localStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')

        
        }

        if (!authToken) {
            navigate('/login')
        }
    }, []);



    // 1. Set loader when data is being collected.. (dynamic loader / spinner)
    // 2. Retrieve data from database, and push them to an useState Array "songs"
    // 3. stop loader / spinner, handle errors..
    useEffect(() => {
        setLoading(true);
        const retrieveSongs = onSnapshot(
            collection(db, "songs"), 
            (snapshot) => {
                let arrayList = [];
                snapshot.docs.forEach((doc) => {
                    arrayList.push({ id: doc.id, ...doc.data() });
                });
                arrayList.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
                setSongs(arrayList);
                setLoading(false);

            }, 
            (error) => {
                console.log("Error while retrieving songs...: " + error);
            }

        );

        return () => {
            try {retrieveSongs()} 
            catch(error) {console.log("Error while retrieving songs...: " + error);}
            
        };
        
    }, []);






    // Log out
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    
    return (
        <div className='home_wrapper'>
            <>
            
                {loading ? 
                    <ClipLoader color="#36d7b7" />
                :

                    <div className='homepage_container'>
                    <h1 className='homeTitleSongs'>Songs</h1>
                    <button className='logOutButton' onClick={handleLogout}>Logout</button>


                    {/* // Map through our song library and display all items on homepage */}

                        {   songs.map((data) => {

                            return (


                                <article key={data.id} className='card'> 
                                    <div className='card_content'>
                                        <img className='card_image' src={data.image} alt=""/>

                                        <div className='song_info'>
                                        <h2>{data.title}</h2>
                                        <h4>{data.artist}</h4>
                                        </div>


                                        <div className='audio_wrapper'>
                                        <AudioVisualizer audio={data.audio}/>
                                        </div>

                                    </div>
                                

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
