import React from 'react';
import { useState, useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";



const AudioVisualizer = (props) => {
    const audioRef = useRef(null);
    // const [playing, setPlay] = useState(null);
    const [volume, setVolume] = useState(0.5);

    let audioTrack;

    useEffect(()=>{
        if (audioRef.current){
                audioTrack = wavesurfer.create({
                container: audioRef.current,
                progressColor: "orangeRed",
                waveColor: "#eeee",
                cursorColor: "OrangeRed",
                preload: true,
                backend: "MediaElement",
                barWidth: 2,
                barHeight: 1, // the height of the wave
                fillParent: true,
                
            });
            audioTrack.load(props.audio);
            

            // audioTrack.load(props.audio);
        }
    }, [])        
    const handlePlayPause = () => {
        audioTrack.playPause();
    };

    const onVolumeChange = e => {
        const { target } = e;
        const newVolume = +target.value;
    
        if (newVolume) {
            console.log("new volume true,,, volume: " + volume)
            setVolume(newVolume);
            audioTrack.current.setVolume(newVolume || 1);
        }
    };


    return (
        <div  className='audio' ref={audioRef}>
        {/* <button className='playPause' onClick={handlePlayPause}>Play</button> */}
            <div className='audioKnobs'>
            <FontAwesomeIcon className='playButton' onClick={handlePlayPause} icon={faCirclePlay} />
                    <input
                    type="range"
                    id="volume"
                    name="volume"
                    min="0.01"
                    max="1"
                    step=".025"
                    onChange={onVolumeChange}
                    defaultValue={volume}
                />
                </div>
        </div> 
    )
}


export default AudioVisualizer;