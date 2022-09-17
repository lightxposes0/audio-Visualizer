import React from 'react'
import Waveform from './waveform';
<Waveform audio={audioClip}/>
import audioClip from './final.wav';

export const audioComp = () => {
    return (
        <div>
            <h1>Wavesurfer</h1>
            <Waveform audio={audioClip}/>
        </div>
    )
}
