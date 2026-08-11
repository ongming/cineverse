// hooks/useYouTubePlayer.js
import { useState, useEffect, useRef, useCallback } from "react";

export function useYouTubePlayer(videoKey, containerId = "yt-player-frame") {
  const playerRef = useRef(null);
  const timerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(100);
  const [isMuted, setIsMutedState] = useState(false);
  const [playbackRate, setPlaybackRateState] = useState(1);

  // Helper to load YouTube IFrame API Script if not present
  useEffect(() => {
    if (!videoKey) return;

    const loadAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    };

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player(containerId, {
        videoId: videoKey,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            setDuration(event.target.getDuration() || 0);
            event.target.playVideo();
            setIsPlaying(true);
          },
          onStateChange: (event) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setDuration(event.target.getDuration() || 0);
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    loadAPI();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setIsReady(false);
    };
  }, [videoKey, containerId]);

  // Interval timer for real-time progress update
  useEffect(() => {
    if (!isReady || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 250);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isReady, isPlaying]);

  // Controls API
  const play = useCallback(() => {
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (playerRef.current && playerRef.current.pauseVideo) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seekTo = useCallback((seconds) => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(seconds, true);
      setCurrentTime(seconds);
    }
  }, []);

  const setVolume = useCallback((val) => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(val);
      setVolumeState(val);
      if (val === 0) {
        playerRef.current.mute();
        setIsMutedState(true);
      } else {
        playerRef.current.unMute();
        setIsMutedState(false);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMutedState(false);
      } else {
        playerRef.current.mute();
        setIsMutedState(true);
      }
    }
  }, [isMuted]);

  const setSpeed = useCallback((rate) => {
    if (playerRef.current && playerRef.current.setPlaybackRate) {
      playerRef.current.setPlaybackRate(rate);
      setPlaybackRateState(rate);
    }
  }, []);

  return {
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    play,
    pause,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    setSpeed,
  };
}
