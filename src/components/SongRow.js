import { style } from '@mui/system'
import React from 'react'

const SongRow = ({track}) => {
  const styles = {
    songRow: "flex items-center p-5 ml-5 z-50 text-white hover:cursor-pointer hover:bg-black hover:opacity-80",
    songRowInfo: "ml-5",
    songRowInfoH1: "text-base",
    songRowInfoP: "text-sm text-gray-400 mt-1",
    songRowAlbum: "h-10 w-10"
  }
  return (
    <div className={styles.songRow}>
        <img className={styles.songRowAlbum} src={track.album.images[0].url} alt={track.album.name}></img>
        <div className={styles.songRowInfo}>
            <h1 className={styles.songRowInfoH1}>{track.name}</h1>
            <p className={styles.songRowInfoP}>
                {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                {track.album.name}
            </p>
        </div>
    </div>
  )
}

export default SongRow