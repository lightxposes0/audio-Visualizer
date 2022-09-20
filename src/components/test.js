const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: '#ffc600',
    progressColor: '#c79b03',
    cursorColor: '#c79b03',
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 53,
    overflow: 'hidden',
    normalize: true,
    partialRender: true,
    });
    
    export function Player({ className, id, audio, audioPlayId, setAudioPlayId, ...props }: PlayerProps): JSX.Element {
        const waveformRef = useRef(null);
        const wavesurfer = useRef(null);
        const [playing, setPlay] = useState(false);
        const [volume, setVolume] = useState(0.5);
        const [isLoaded, setIsLoaded] = useState(false);
    
        // To pause all other audios if plays current component
        useEffect(() => {
        if (audioPlayId) {
            if (audioPlayId != id) {
            setPlay(false)
            wavesurfer.current.pause()
            }
        }
        }, [audioPlayId])
    
        // create new WaveSurfer instance
        // On component mount and when url changes
        useEffect(() => {
        import('wavesurfer.js').then((m) => {
            const WaveSurfer = m.default;
            setPlay(false);
    
            const options = formWaveSurferOptions(waveformRef.current);
            wavesurfer.current = WaveSurfer?.create(options);
    
    
            wavesurfer.current.load(
            audio
            );
    
            wavesurfer.current.on('ready', function () {
            // https://wavesurfer-js.org/docs/methods.html
            // wavesurfer.current.play();
            // setPlay(true);
    
            // make sure object stillavailable when file loaded
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
            }
    
            setIsLoaded(true)
            });
        });
    
        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => { wavesurfer?.current?.destroy() }
        }, []);
    
    
    
        const handlePlayPause = (e): void => {
        e.preventDefault();
        e.stopPropagation();
        setPlay(!playing);
        wavesurfer.current.playPause();
        setAudioPlayId(id)
        };
    
    
        return (
        <div className={className}>
            <div className={styles.palyer_container}>
            <div id={styles.waveform} ref={waveformRef} />
            {isLoaded ?
                <div className="controls">
                <Button appearance="container" onClick={handlePlayPause}>{!playing ? <PlayIcon /> : <PauseIcon />}</Button>
                </div> : <Loader />}
            </div>
        </div >
    );
}