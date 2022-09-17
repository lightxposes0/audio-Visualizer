import React, { useEffect, useState } from 'react';
import '../components/css/home.css';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase'
import { useNavigate } from 'react-router-dom';
import {ScaleLoader} from 'react-spinners';


const Home = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  //  const songsCollectionReference = collection(db, "songs");
    ///// test
    // useEffect(  ()  => {

    //     // Create the funtion that grab´s the data from our database, logs them to console, and pushes the data into our useState. 
    //     const getSongs = async () => {
    //     const data = await getDocs(songsCollectionReference);
    //     // console.log("Data retrieved from the firebase firestore database:" + data)
    //         setSongs(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    //     };   
    //     // On page load, our function will run, and our data will sync asap on our website. 
        
        
    //     getSongs()
        
    //     }, []);
        


    ////// test


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
                <ScaleLoader className='isSubmit_loader' color="#36d7b7"/>
                :

                    <div className='homepage_container'>
                        {   songs.map((data) => {
                            return (
                                <article key={data.id} className='card'>
                                    <div className='card_content'>
                                        <img className='card_image' src={data.image} />

                                        <h2>{data.title}</h2>
                                        <h4>{data.artist}</h4>

                                        <audio className='audio_file' src={data.audio}></audio>
                                    </div>

                                    <div className='card_content_extra'>
                                        <button onClick={() => navigate('/update/${data.id}')}>Edit</button>
                                        <button >Listen</button>
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
