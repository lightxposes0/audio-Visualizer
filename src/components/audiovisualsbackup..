import React from 'react';
import { useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js'

const AudioVisualizer = (props) => {
    const audioRef = useRef(null);

    useEffect(()=>{
        if (audioRef.current){
            let audioTrack = wavesurfer.create({
                container: audioRef.current,
                backgroundColor: "#fffff",
                preload: true,
                backend: "MediaElement",
                barWidth: 2,
                barHeight: 1, // the height of the wave
                barGap: null, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
                minPxPerSec: 10,
                fillParent: false,
                
            });
            audioTrack.load(props.audio);

            // audioTrack.load(props.audio);
        }
    }, [])        

    return <div className='audio' ref={audioRef}></div> 
}


export default AudioVisualizer;