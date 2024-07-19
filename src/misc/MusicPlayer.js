import { useRef, useState, useEffect, useMemo } from "react";
import useDeleteMusic from "../hooks/useDeleteMusic";
import { IconButton, Paper, Slider } from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "../redux/state/volumeReducer";
import shuffleArray from "../util/shuffleArray";
import ShuffleIcon from '@mui/icons-material/Shuffle';

function MusicPlayer({ musics, getMusics, showDelete }) {
    const volumeReducer = useSelector(state => state.volumeReducer);
    const dispatch = useDispatch();
    const { deleteMusic, loading: loadingDeleteMusic } = useDeleteMusic();
    const [currentTrack, setCurrentTrack] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [shuffle, setShuffle] = useState(false);
    const audioRef = useRef(null);

    const shuffledMusics = useMemo(() => {
        if (musics?.length === 0) {
            return [];
        }
        const shuffledArr = shuffleArray(musics);
        if (!currentTrack) {
            return shuffledArr;
        }
        const removedPlayingTrack = shuffledArr.filter(m => m.id !== currentTrack?.id);
        return [currentTrack, ...removedPlayingTrack]
    }, [musics, currentTrack]);

    const nextSongDisabled = useMemo(() => {
        const muziks = shuffle ? shuffledMusics : musics;
        return muziks?.[muziks?.length - 1]?.id === currentTrack?.id || !currentTrack
    }, [currentTrack, musics, shuffledMusics, shuffle]);

    const lastSongDisabled = useMemo(() => {
        const muziks = shuffle ? shuffledMusics : musics;
        return muziks?.[0]?.id === currentTrack?.id || !currentTrack
    }, [currentTrack, musics, shuffledMusics, shuffle]);

    const handlePlayPause = (music) => {
        if (currentTrack?.id === music.id) {
            if (playing) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setPlaying(!playing);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                URL.revokeObjectURL(audioRef.current.src);
            }
            const newAudio = new Audio(URL.createObjectURL(music.file));
            audioRef.current = newAudio;
            audioRef.current.play();
            audioRef.current.volume = volumeReducer.volume;
            setCurrentTrack(music);
            setPlaying(true);

            audioRef.current.ontimeupdate = () => {
                setCurrentTime(audioRef.current.currentTime);
            };

            audioRef.current.onloadedmetadata = () => {
                setDuration(audioRef.current.duration);
            };

            audioRef.current.onended = () => {
                setPlaying(false);
                setCurrentTrack(null);
                setDuration(0);
                setCurrentTime(0);
                URL.revokeObjectURL(audioRef.current.src);
                //Play next
                const muziks = shuffle ? shuffledMusics : musics;
                const currIndex = muziks?.findIndex(m => m.id === music.id);
                const nextSong = muziks?.[currIndex + 1];
                if (nextSong) {
                    handlePlayPause(nextSong);
                }
            };
        }
    };

    const handleDeleteMusic = (id) => {
        deleteMusic(
            id,
            () => {
                getMusics();
            }
        )
    }

    const handleTimeChange = (_, newValue) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newValue;
            setCurrentTime(newValue);
        }
    };

    const handleVolumeChange = (_, newValue) => {
        const newVolume = newValue / 100;
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        dispatch(setVolume(newVolume));
    };

    const onNextSong = () => {
        const muziks = shuffle ? shuffledMusics : musics;
        const currIndex = muziks?.findIndex(m => m.id === currentTrack?.id);
        const nextSong = muziks[currIndex + 1];
        handlePlayPause(nextSong);
    }

    const onLastSong = () => {
        const muziks = shuffle ? shuffledMusics : musics;
        const currIndex = muziks?.findIndex(m => m.id === currentTrack?.id);
        const lastSong = muziks[currIndex - 1];
        handlePlayPause(lastSong);
    }

    const formattedDuration = useMemo(() => {
        if (duration === 0) {
            return "00:00";
        }
        const totalSeconds = duration?.toFixed(0);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }, [duration]);

    const formattedCurrentTime = useMemo(() => {
        if (currentTime === 0) {
            return "00:00";
        }
        const totalSeconds = currentTime?.toFixed(0);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }, [currentTime]);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                URL.revokeObjectURL(audioRef.current.src);
            }
        };
    }, []);

    return (
        <>
            {
                musics && musics?.length !== 0 &&
                <div className="flex-column container-width align-center mt-1 mb-1">
                    <IconButton
                        disabled={musics?.length === 0}
                        onClick={
                            () => handlePlayPause(currentTrack ? currentTrack : musics?.[0])
                        }
                    >
                        {currentTrack && playing ? (
                            <StopIcon sx={{ fontSize: '5rem' }} />
                        ) : (
                            <PlayCircleFilledIcon sx={{ fontSize: '5rem' }} />
                        )}
                    </IconButton>
                    <div>
                        {currentTrack?.name || "---"}
                    </div>
                    <div className="flex-column align-center">
                        <Slider
                            size="small"
                            value={currentTime}
                            max={duration}
                            onChange={handleTimeChange}
                            color="secondary"
                            style={{ width: 200, marginLeft: 10 }}
                        />
                        <div>
                            {formattedCurrentTime} / {formattedDuration}
                        </div>
                    </div>
                    <div className="flex-row align-center gap-1">
                        <IconButton
                            onClick={() => setShuffle(prev => !prev)}
                        >
                            <ShuffleIcon
                                color={shuffle ? "primary" : undefined}
                            />
                        </IconButton>
                        <IconButton onClick={onLastSong} disabled={lastSongDisabled}>
                            <FastRewindRounded sx={{ fontSize: "2rem" }} />
                        </IconButton>
                        <IconButton onClick={onNextSong} disabled={nextSongDisabled}>
                            <FastForwardRounded sx={{ fontSize: "2rem" }} />
                        </IconButton>
                    </div>
                    <div className="flex-row align-center gap-1">
                        <VolumeDownRounded sx={{ fontSize: "1.5rem" }} />
                        <Slider
                            size="small"
                            value={volumeReducer?.volume * 100}
                            onChange={handleVolumeChange}
                            style={{ width: 100 }}
                        />
                        <VolumeUpRounded sx={{ fontSize: "1.5rem" }} />
                    </div>
                </div>
            }
            {musics?.map((m, i) => (
                <Paper
                    elevation={3}
                    key={m.id}
                    className="flex-row justify-center container-width"
                >
                    <div className="flex-row responsive-width justify-between music-item">
                        <div className="flex-row align-center gap-1">
                            <div>{i + 1}.</div>
                            <IconButton onClick={() => handlePlayPause(m)}>
                                {currentTrack && currentTrack.id === m.id && playing ? (
                                    <StopIcon />
                                ) : (
                                    <PlayCircleFilledIcon />
                                )}
                            </IconButton>
                            <div>{m.name}</div>
                        </div>
                        <div className="flex-row align-center">
                            {
                                showDelete &&
                                <IconButton onClick={() => handleDeleteMusic(m.id)} disabled={loadingDeleteMusic}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            }
                        </div>
                    </div>
                </Paper>
            ))
            }
        </>
    )
}

export default MusicPlayer