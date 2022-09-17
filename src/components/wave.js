import { useEffect } from "react";
import {WaveSurfer} from "wavesurfer.js";


export default function wavesurfaudio(props) {
    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
        container: "#waveform"
      // backend: specify webAudio, mediaelement etc
      // scrollParent: true,
      // waveColor: "violet"
      // progressColor: "purple",
      // audioRate: 1, // playback speed
      // audioCenter: true, // centers scrollable waveform around curr progress
      // backgroundColor: "red",
      // barGap: 5,
      // barHeight: 1,
      // barMinHeight: 0.1,
      // barRadius: 2,
      // barWidth: 5,
      // cursorColor: "green",
      // cursorWidth: 5
      // fillParent: true,
      // forceDecode: true, // forces decoding of audio using webAudio when zooming for more detailed waveform
      // height: 200, // in px
      // hideScrollbar: false,
      // loopSelection: allows looping of regions with regions plugin
      // mediaControls: false, // use with backend: mediaelement for native controls
      // normalize: true, // normalise by max peak instead of 1.0
      // partialRender: true, // use peak cache to improve rendering of large waveforms
      // pixelRatio: 1, // can be set to 1 for faster rendering
      // plugins: [], // arr of plugin definitions
      // responsive: true,
      // skipLength: 2 // nr secs to skip with skip methods
      // xhr: { // xhr opts
      //   cache: "default",
      //   mode: "cors",
      //   method: "GET",
      //   credentials: "same-origin",
      //   redirect: "follow",
      //   referrer: "client",
      //   headers: [{ key: "Authorization", value: "my-token" }]
      // }
      // splitChannels: true, // render 2 split channels
      // splitChannelsOptions: { // only if split is true
      //   overlay: true,
      //   relativeNormalization: false, // normalise split channels seperately
      //   filterChannels: [], // channels to exclude, 0 index
      //   channelColors: { 0: { progressColor: 'green', waveColor: 'pink' }, 1: { progressColor: 'orange', waveColor: 'purple' } }
      // }
    });

    // wavesurfer.load('../audio/song.mp3');
    wavesurfer.load(
        toString(props)
      // "http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
    );

    wavesurfer.on("ready", function () {
        wavesurfer.play();
    });
}, []);

    return (
        <div className="App">
            <h1>Play</h1>
            <h2>Start editing to see some magic happen!</h2>
            <div id="waveform"></div>
        </div>
    );
}
