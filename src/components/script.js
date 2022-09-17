const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#D2EDD4',
    progressColor: '#46B54D',
    barWidth: 3,
    barRadius: true
});

wavesurfer.load('https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3');
