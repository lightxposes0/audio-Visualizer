import React from 'react';
import { useState, useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faTrash } from "@fortawesome/free-solid-svg-icons";
import {ThemeContext} from '../App'
import { useContext } from 'react';




const AudioVisualizer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.5);
    
    
    const playButton = faCirclePlay;
    const pauseButton = faCirclePause;
    
    
    const audioRef = useRef(null);
    const audioTrackRef= useRef(undefined);

    const audioColor = useContext(ThemeContext)

    // if i want to change the audio waveform color later on, driven by the "theme" darkmode/lightmode switch::
    let  audioColorr = audioColor.theme;


    // Create audio waveform object, and load song from database..
    useEffect(()=>{
        if (audioRef.current){
                audioTrackRef.current = wavesurfer.create({
                container: audioRef.current,
                progressColor: "#13AEA2",
                waveColor: "red",
                cursorColor: "OrangeRed",
                preload: true,
                backend: "WebAudio", // originally = "MediaElement"
                barWidth: 2,
                barHeight: 1, // the height of the wave
                fillParent: true,
                hideScrollbar: true,
                responsive: true,
                
            });
            audioTrackRef.current.load(props.audio);

        
        }
    }, [])   
    

    // DarkMode // LightMode === => Only used if you want to change color... i like the color red for both light an ddark for now..
    // Uncomment down below for theme driven wavform color! :)!
    // useEffect(() => {
    //     audioColorr === "light" ? audioTrackRef.current.backend.params.waveColor = "red" : audioTrackRef.current.backend.params.waveColor = "red";
    // }, []);



    // Change volume from:: form input-slider
    const onVolumeChange = e => {
        const { target } = e;
        const newVolume = +target.value;
        
    
        if (newVolume) {
            console.log("new volume true,,, volume: " + volume)
            setVolume(volume => newVolume);
            audioTrackRef.current.setVolume(newVolume || 1);
        }
    };


    // Handle play pause button
    const handlePlayPause =  (e) => {
        // Get a view of what the "click" registers:

        // if playing == pause
        if ( ! isPlaying ) {
            console.log("not playing.. Start playing");
            audioTrackRef.current.play()
            setIsPlaying(isClicked => true)
            return

        } 
        else {
            console.log("Is playing.. will pause")
            audioTrackRef.current.pause()
            setIsPlaying(isClicked => false);
            
            return
        }


        
    
    };

    
    return (
        <>
            <div  className='audio'  ref={audioRef}>
            </div> 
            <div className='audioKnobs'>
                
                <button  className="playpausewrapper" onClick={handlePlayPause}>
                        <FontAwesomeIcon className={ isPlaying ? 'playButton activeButton' : 'playButton notActiveButton'} icon={ isPlaying ? pauseButton : playButton} />
                </button>

                <input type="range" className='VolumeSlider onPhoneRemoveVolumeSlider' id="volume" name="volume" min="0.01" max="1" step=".025" onChange={onVolumeChange} defaultValue={volume}/>
            </div>
        </>
    )
}


export default AudioVisualizer;