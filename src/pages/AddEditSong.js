
import React, {useState, useEffect} from 'react';
import {Storage} from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import {ScaleLoader} from 'react-spinners';
import '../components/css/add-edit.css'
import { ref, uploadBytesResumable} from 'firebase/storage'

const initialState = {
    title: "",
    artist: ""
};

const initialErrors = {
    title: "",
    artist: ""
}

const AddEditSong = (e) => {
    const [data, setData] = useState(initialState);
    const {title, artist} = data;
    console.log(data.title);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState(initialErrors);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        const uploadFile = (e) => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(Storage(), file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

        }
    }, [file])

    // Take input (title, artist) and store in DATA..
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value});
    }

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
    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length)
        console.log(errors);


        return setErrors(errors);
    };

    return (
        <div className='add_edit_container'>
            <div className='add_Edit_Song_container'>
                <div className='add_edit_wrapper'>
                    {   isSubmit ? <ScaleLoader className='isSubmit_loader' color="#36d7b7"/>
                    /* {   isSubmit ? <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" wrapperStyle wrapperClass/> */
                        :
                        (
                            <>
                            <h2>Add Song</h2>
                            <form className='form_wrapper' onSubmit={handleSubmit}>
                                <input
                                    className='input_text'
                                    autoFocus 
                                    error = {
                                        errors.title ? { content: errors.title } : null}
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
                                    <label for="uploadinput" className='upload_file_label'>Upload File</label>
                                    <input  
                                        id='uploadinput'
                                        name='uploadinput'
                                        className='input_file'
                                        type="file" 
                                        label="Upload" 
                                        accept='audio/*'

                                        onChange={(e) => setFile(e.target.files[0])} />
                                    <button className='add_edit_submit_btn' primary type="submit">Submit</button>
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