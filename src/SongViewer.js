import { useState, useEffect } from 'react';
import './songviewer.css';
import {  db  } from './firebase_config'
import {  collection,   doc,   getDocs, addDoc  } from 'firebase/firestore'
import { cloudStorage}  from "./firebase_config.js"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

function SongViewer() {

  // Create a list of the songs from Firebase DB
  const [songs, setSongs] = useState([]); 

  // Hold the info from inputs on new song.. 


  // Store input title
  const [newTitle, setNewTitle] = useState("");

  // Store input Artist
  const [newArtist, setNewArtist] = useState("");

  // Store input cover photo
  const [coverPhoto, setCoverPhoto] = useState("");

  // Store input audio file
  const [audioFile, setAudioFile] = useState("");

  // Store upload percentage..
  const [percent, setPercent] = useState(0);
  const [percentAudio, setPercentAudio] = useState(0);

  // store reference to audio and cover photo
  const [audioRef, setAudioRef] = useState("");
  const [coverPhotoRef, setCoverPhotoRef] = useState("");




  // Set the collection | database for our songs as reference.
  const songsCollectionReference = collection(db, "Sanger");

  // Create User:



  const createSongInstance = async () => {
    if ((!audioFile) & (!coverPhoto)) {
      alert("No file chosen.");
      
    };
    

    await addDoc(songsCollectionReference, {title: newTitle, artist: newArtist, audio_file: audioRef, cover_photo: coverPhotoRef});
    setAudioRef("");
    setCoverPhotoRef("");
    await alert("Song has been created and saved to our servers...")

  };

function add_photo_audio_storage() {
  handleAudioUpload();
  handleImageUpload();
};

  

  // Create a function that loads the songs and elements in our database when our site is loading. 
  useEffect(  ()  => {

  // Create the funtion that grab´s the data from our database, logs them to console, and pushes the data into our useState. 
    const getSongs = async () => {
        const data = await getDocs(songsCollectionReference);
        // console.log("Data retrieved from the firebase firestore database:" + data)
        setSongs(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };  


  // On page load, our function will run, and our data will sync asap on our website. 
    getSongs()
  }, [])
  

  // save the image from the input to be used for uploading..
  function handleChangeImage(event) {
    
      setCoverPhoto(event.target.files[0]);
      // Set reference to cloud storage into object in firebase DB. 
      // link + filename... => ..
  }
  // save the audio from the input to be used for uploading..

  function handleChangeAudio(event) {
    
      setAudioFile(event.target.files[0]);
      // Set reference to cloud storage into object in firebase DB. 
      // link + filename... => ..
  }


  // Upload the selected audio file to firebase cloud storage DB
  function handleAudioUpload() {
    if (!audioFile) {
      alert("No Audio File was selected!")
    }

    const storageReferenceForAudio = ref(cloudStorage, '/audioVisualizer/' + audioFile.name);
    const uploadTaskAudio = uploadBytesResumable(storageReferenceForAudio, audioFile);


    // Create progress-bar, and get download URL to file in firebase storage. 
    uploadTaskAudio.on (
      "state_changed",
        (snapshot) => {
            const percentAudio = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            setPercentAudio(percentAudio);
        },
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTaskAudio.snapshot.ref).then((urlAudio) => {
                console.log("Download-URL audio-file: " + urlAudio);


                // set the url (save it), to be used for updating the firebase firestore database object referencng this file. 
                setAudioRef(urlAudio);


                

            });
      }
    );

  }


  // Handle upload of cover photo..
  function handleImageUpload() {
    if (!coverPhoto) {
      alert("No file chosen"); // Check if file was selected when button pressed. 
    }

    const storageReference = ref(cloudStorage, '/audioVisualizer/' + coverPhoto.name);
    const uploadTask = uploadBytesResumable(storageReference, coverPhoto);

    uploadTask.on (
      "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            setPercent(percent);
        },
        (err) => console.log(err),
        () =>  {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log("Download-URL for the photo: " + url);
                setCoverPhotoRef(url);
            });
        }
    );
  }

  return (
    <div className="App">
      <div className='fileSelectionPanel'>
        
          {/*  Inputs */}
          <div className='input_title_artist'>
            <input placeholder='Title...' onChange={(event) => {setNewTitle(event.target.value)}}></input>
            <input placeholder='Artist..' onChange={(event) => {setNewArtist(event.target.value)}}></input>
          </div>

          <div className='input_files'>
          <label htmlFor="files">Cover photo</label>
          <input type="file" onChange={handleChangeImage} accept="image/*"/>
          <label htmlFor="files">Audio Files</label>
          <input type="file" onChange={handleChangeAudio} accept="audio/*"/>
          </div>

          <div className='progress_upload'>
          <p>Cover photo upload: {percent} "% done"</p>
          <p>Audio file upload: {percentAudio} "% done"</p>
          </div>

          {/*   Button   ==>   create a song object.
                Button  ==> upload files before creating the instance in db.
          */}
          <button onClick={add_photo_audio_storage}>Upload files</button>   
          <button onClick={createSongInstance}>Create Song</button>   
      </div>

      {/* Grab the useState list with our data, from our database. and MAP them out in the correct elements == html. */}
        <div className='songLibrary'>
            {songs.map((song) => {
                return (
                    <div className='songInstance'>

                        <img className='song_cover_img' src={song.cover_photo} alt="" />

                        <h1>
                          title: {song.title}
                        </h1>

                        <h4>
                          artist: {song.artist}
                        </h4>

                        <audio src={song.audio_file}></audio>

                    </div>
                );
            })}
          </div>
    </div>
  );
}

export default SongViewer;
