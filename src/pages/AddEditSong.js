
import React, {useState, useEffect} from 'react';
import {Storage, db} from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import {ScaleLoader} from 'react-spinners';
import { getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

const initialState = {
    title: "",
    artist: ""
};



const AddEditSong = (e) => {
    const [data, setData] = useState(initialState);
    const {title, artist} = data;
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    // after merge,   NEW FEATURE == new button for IMG..
    const [imageFile, setImageFile] = useState(null);
    // Run on state change for image upload...




    useEffect(() => {
        let authToken = localStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/add')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, []);




    useEffect(() => {
        id && getSingleUser()
    }, [id]);

    const getSingleUser = async () => {
        const documentRef = doc(db, "songs", id);
        const snapshot = await getDoc(documentRef);
        if (snapshot.exists()) {
            setData({...snapshot.data()});
        }
    };


    useEffect(() => {

        // Should run only when a file is being set.. Run only when file is being uploaded. 
        const uploadFile = (e) => {
            if(!title) {
                alert("No input fields filled.");
                return;
            };

            const name = new Date().getTime() + imageFile.name;
            const storageRef = ref(Storage, 'audioVisualizer/images/'+ name);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);


            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);


                switch(snapshot.state) {
                    case "paused":
                        console.log("Uploading image paused..");
                        break;
                    case "running":
                        console.log("Upload image is running");
                        break;


                    default:
                        break; 
                    
                }
                }, (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURLimage) => {
                        console.log("link to image-file:", downloadURLimage);
                        // save link to firestore database
                        setData((prev) => ({...prev, image: downloadURLimage}));
                        setIsSubmit(false);

                    });
                })



            // Start loader as the file is uploading to database / storage..
            /// Do something....

        };
        // triggers when file is SET
        imageFile && uploadFile()


    }, [imageFile]);




    useEffect(() => {

        // Should run only when a file is being set.. Run only when file is being uploaded. 
        const uploadFile = (e) => {
            if(!title) {
                alert("No input fields filled.");
                navigate("/add");
            };
            const name = new Date().getTime() + file.name;
            const storageRef = ref(Storage, 'audioVisualizer/audio/'+ name);
            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);


                switch(snapshot.state) {
                    case "paused":
                        console.log("Uploading paused..");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;


                    default:
                        break; 
                    
                }
                }, (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("link to file:::", downloadURL);
                        // save link to firestore database
                        setData((prev) => ({...prev, audio: downloadURL}));
                        setIsSubmit(false);



                    });
                })



            // Start loader as the file is uploading to database / storage..
            /// Do something....

        };
        // triggers when file is SET
        
        file && uploadFile()


    }, [file]);

    // Take input (title, artist) and store in DATA..
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value});
    };

    const validate = () => {
        let errors = {};
        
        if (!artist ) {
            errors.artist = "Artist is required";
            alert("Artist is required")
            return
        }

        if (artist) {
            if (!title) {
                alert("Title is required")
            }
        }
        return errors;
    };

    // Handle the submit + upload file... loading..
    const handleSubmit = async (event) => {
        event.preventDefault();
        let errors = validate();
        if(Object.keys(errors).length) return setErrors(errors);

        setIsSubmit(true);

        if(!id) {
            try {
                await addDoc(collection(db, "songs"), {
                    ...data,
                    timestamp: serverTimestamp()
                })
            } catch (error) {
                console.log(error);
            }
            
        } else {
            try {
                await updateDoc(doc(db, "songs", id), {
                    ...data,
                    timestamp: serverTimestamp()
                })
            } catch (error) {
                console.log(error);
            }
        }
        
        navigate("/home");
    };

    return (
        <div className='add_edit_container'>
            <div className='add_Edit_Song_container'>
                <div className='add_edit_wrapper'>
                    
                    {  
                        
                        isSubmit ? <ScaleLoader className='isSubmit_loader' color="#36d7b7"/>

                        :
                        (
                            <>
                            <h2>{ id ? "Update Song" : "Add song"}</h2>
                            <form className='form_wrapper' onSubmit={handleSubmit}>
                                <input
                                    className='input_text'
                                    autoFocus 
                                    error = {
                                        errors.artist ? { content: errors.artist } : null}
                                    type="text" 
                                    label="Title" 
                                    placeholder="Enter title.." 
                                    name='title' 
                                    value={title} 
                                    onChange={handleChange} />
                                <input  
                                    className='input_text'                                
                                    errors = {errors.artist ? {content: errors.artist} : null}
                                    type="text" 
                                    label="Arist" 
                                    placeholder="Enter artist name.." 
                                    name='artist' 
                                    value={artist} 
                                    onChange={handleChange} />
                                <div className='wrap_upload_submit'>
                                    <div className='input_files_btns'>
                                        <label for="uploadinput" className='upload_file_label'>Audio File</label>
                                        <input  
                                            id='uploadinput'
                                            name='uploadinput'
                                            className='input_file'
                                            type="file" 
                                            label="Upload" 
                                            accept='audio/*'

                                            onChange={(e) => {setFile(e.target.files[0]); setIsSubmit(true);}} />


                                            {/* IMG file */}
                                        <label for="uploadimageinput" className='upload_file_label'>Cover photo</label>
                                        <input  
                                            id='uploadimageinput'
                                            name='uploadinput'
                                            className='input_file'
                                            type="file" 
                                            label="Upload" 
                                            accept='image/*'

                                            onChange={(e) => {setImageFile(e.target.files[0]); setIsSubmit(true);}} />
                                    </div>

                                    <button primary type="submit" disabled={progress !== null && progress < 100} className='add_edit_submit_btn' >Submit</button>
                                </div>
                            </form>
                            </>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default AddEditSong