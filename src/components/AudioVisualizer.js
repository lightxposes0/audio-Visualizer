import React from 'react';
import { useState, useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";



const AudioVisualizer = (props) => {
    const audioRef = useRef(null);
    // const [playing, setPlay] = useState(null);
    const [isClicked, setIsClicked] = useState(false)
    const [volume, setVolume] = useState(0.5);




    let audioTrack;

    useEffect(()=>{
        if (audioRef.current){
                audioTrack = wavesurfer.create({
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
                
            });
            audioTrack.load(props.audio);

        

            // audioTrack.load(props.audio);
        }
    }, [])   
    





    const onVolumeChange = e => {
        const { target } = e;
        const newVolume = +target.value;
        
    
        if (newVolume) {
            console.log("new volume true,,, volume: " + volume)
            setVolume(volume => newVolume);
            audioTrack.current.setVolume(newVolume || 1);
        }
    };


    


    return (
        <>
            <div  className='audio'  ref={audioRef}>
            </div> 
            <div className='audioKnobs'>
                <div className='playpausewrapper'>
                    {/* <FontAwesomeIcon className='playButton' onClick={(e) => {audioTrack.play()}} icon={faCirclePlay} /> */}
                    <FontAwesomeIcon   className="playButton" onClick={(e) => {audioTrack.play()}} icon={faCirclePlay} />
                    <FontAwesomeIcon  className='playButton' onClick={(e) => {audioTrack.pause()}} icon={faCirclePause} />
                </div>
                <input type="range" id="volume" name="volume" min="0.01" max="1" step=".025" onChange={onVolumeChange} defaultValue={volume}/>
            </div>
        </>
    )
}


export default AudioVisualizer;