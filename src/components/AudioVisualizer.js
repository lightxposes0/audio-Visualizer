import React from 'react';
import { useState, useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";





const AudioVisualizer = (props) => {
    // const [playing, setPlay] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.5);
    
    const [icon, setIcon] = useState(faCirclePlay);
    
    const playButton = faCirclePlay;
    const pauseButton = faCirclePause;
    
    
    const audioRef = useRef(null);
    const audioTrackRef= useRef(undefined);


    useEffect(()=>{
        if (audioRef.current){
                audioTrackRef.current = wavesurfer.create({
                container: audioRef.current,
                progressColor: "#13AEA2",
                waveColor: "#eeee",
                cursorColor: "OrangeRed",
                preload: true,
                backend: "MediaElement",
                barWidth: 2,
                barHeight: 1, // the height of the wave
                fillParent: true,
                hideScrollbar: true,
                responsive: true,
                
            });
            audioTrackRef.current.load(props.audio);

        

            // audioTrack.load(props.audio);
        }
    }, [])   
    




    // Change volume form input-slider
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

    // FontAwesomeIcon => onClick change icon + pause/play audio. 
    
    return (
        <>
            <div  className='audio'  ref={audioRef}>
            </div> 
            <div className='audioKnobs'>
                
                <button  className="playpausewrapper" onClick={handlePlayPause}>
                        <FontAwesomeIcon className={ isPlaying ? 'playButton activeButton' : 'playButton notActiveButton'} icon={ isPlaying ? pauseButton : playButton} />
                </button>

                <input type="range" id="volume" name="volume" min="0.01" max="1" step=".025" onChange={onVolumeChange} defaultValue={volume}/>
            </div>
        </>
    )
}


export default AudioVisualizer;