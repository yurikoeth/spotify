import React, {useEffect, useState} from 'react'
import { useDataLayerValue } from "./DataLayer.js";
import { Grid, Slider } from '@mui/material';

const Footer = ({spotify}) => {
    const styles = {
        footerContainer: "flex justify-between w-full bg-zinc-900 h-40 border border-black",
        footerLeft: "md:w-1/3 flex pl-4 items-center text-white ml-4 mb-6",
        songInfo: "ml-4",
        album: "h-24 ",
        title:"cursor-pointer hover:underline",
        artist:"text-sm cursor-pointer hover:underline",
        footerRight: "hidden md:flex md:w-1/3 text-white flex items-center pl-4 pr-1",
        footerCenter: "w-1/3 mr-2 md:w-60 h-full flex items-center justify-between text-white",
        shuffle: "hidden md:flex w-6 h-6 text-color-green-600 hover:scale-125 transition duration-700 ease-in-out",
        play: "w-16 h-16 hover:scale-125 transition duration-700 ease-in-out",
        back: "w-6 h-6 hover:scale-125 transition duration-700 ease-in-out",
        forward: "w-6 h-6 hover:scale-125 transition duration-700 ease-in-out",
        repeat: "hidden md:flex w-5 h-5 hover:scale-125 transition duration-700 ease-in-out",
        playlist: "hidden md:flex w-6 h-6 mt-1 hover:scale-125 transition duration-700 ease-in-out",
        volume: "w-6 h-6 mt-1 hover:scale-125 transition duration-700 ease-in-out",
    }

    const [{token, item, playing}, dispatch] = useDataLayerValue();

    useEffect(() => {
      spotify.getMyCurrentPlaybackState().then((r) => {
       console.log(r);

       dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing
       });

       dispatch({
        type: "SET_ITEM",
        item: r.item,
       });
      });
    }, [spotify]);

    const handlePlayPause = () => {
      if (playing) {
        spotify.pause();
        dispatch({
          type: "SET_PLAYING",
          playing: false,
        });
      } else {
        spotify.play();
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      }
    };

    const skipNext = () => {
      spotify.skipToNext();
      spotify.getMyCurrentPlayingTrack().then((r) => {
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      });
    };
  
    const skipPrevious = () => {
      spotify.skipToPrevious();
      spotify.getMyCurrentPlayingTrack().then((r) => {
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      });
    };

  return (
    <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <img className={styles.album} src={item?.album.images[0].url} alt={item?.name}/>
          <div className={styles.songInfo}>
            {item ? (
              <div className={styles.songInfo}>
                <h4 className={styles.title}>{item.name}</h4>
                <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
             ) : (
              <div className={styles.songInfo}>
                <h4>No song is playing</h4>
                <p>...</p>
              </div>
             )
            }
          </div>
        </div>
        
        <div className={styles.footerCenter}>
          <svg className={styles.shuffle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#008000" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          
          <svg className={styles.back} onClick={skipPrevious} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
          </svg>
          {playing ? (
            <svg onClick={handlePlayPause} className={styles.play} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ) : (
            <svg onClick={handlePlayPause} className={styles.play} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          </svg>
            
          )}
          

          <svg className={styles.forward} onClick={skipNext}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
          </svg>
          
          <svg className={styles.repeat} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#008000">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
        </div>
        
        <div className={styles.footerRight}>
          <Grid container spacing={1.5}>
            <Grid item>
            <svg className={styles.playlist} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
            </svg>
            </Grid>
            <Grid item>
              <svg className={styles.volume} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            </Grid>
            <Grid item xs>
              <Slider
                size="small"/>
             </Grid>
          </Grid>
        </div>

  </div>
  )
}

export default Footer