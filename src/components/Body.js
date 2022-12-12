import React from 'react'
import Header from "./Header.js"
import { useDataLayerValue } from './DataLayer.js'
import { style } from '@mui/system';
import SongRow from './SongRow.js';

const Body = ({spotify}) => {
  const styles = {
    bodyContainer: "w-3/4 bg-gray-800 text-white overflow-y-scroll overscroll-y-none scrollbar-hide",
    gradient: "h-fit bg-gradient-to-b from-transparent to-black p-6",
    bodyInfo: "mt-6 md:flex items-end",
    image: "h-60 rounded-md shadow-md",
    bodyInfoText: "mt-1 md:mt-0 md:ml-2",
    bodySongs: "mt-1",
    bodyIcons: "flex mt-1 mb-1",
    play: "w-16 h-16 hover:scale-125 hover:ease-in",
    favorite: "w-12 h-12 mt-2 ml-2",
    more: "w-10 h-10 mt-3 ml-2",
}
  const [{discover_weekly}, dispatch] = useDataLayerValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
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
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
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
      });
  };
    
    
  return (
    <div className={styles.bodyContainer}>
        <div className={styles.gradient}>
          <Header spotify={spotify} />
          
          <div className={styles.bodyInfo}>
            <img className={styles.image} src={discover_weekly?.images[0].url} alt=""></img>
            <div className={styles.bodyInfoText}>
              <strong className='text-lg'>PLAYLIST</strong>
              <h2 className='text-4xl'>Discover Weekly</h2>
              <p className='text-md mt-1'>{discover_weekly?.description}</p>
            </div>
          </div>

          <div className={style.bodySongs}>
            <div className={styles.bodyIcons}>
              <svg className={styles.play} onClick={playPlaylist} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
              </svg>  
              <svg className={styles.favorite}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <svg className={styles.more}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
              </svg>
            </div>
            {discover_weekly?.tracks.items.map(item =>{
              return <SongRow key={item} track={item.track}/>
            })}
        </div>
        </div>
    </div>
  )
}

export default Body