import React from 'react'
import SidebarOption from './SidebarOption'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from './DataLayer';



const Sidebar = () => {
    const styles = {
        sidebarContainer: "h-screen w-1/4 pl-4 pr-4",
        sidebarFlexbox: "w-full flex flex-col",
        logoContainer: "w-fit bg-green-300 m-auto",
        logo: "sm:h-28 md:h-20 object-center",
        playlistHeader: "text-white text-sm mt-4",
        playlists: "text-white text-sm",
        horizontalRow: "mt-2 border-gray-800",
    }
const [{playlists}] = useDataLayerValue();
    
  return (
    <div className={styles.sidebarContainer}>
           <div className={styles.sidebarFlexbox}>
              <div className={styles.logoContainer}>
                <img className={styles.logo} src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"/> 
              </div>
              <SidebarOption Icon={HomeIcon} option="Home"/>
              <SidebarOption Icon={SearchIcon} option="Search"/>
              <SidebarOption Icon={LibraryMusicIcon} option="Your Library"/>
              <br></br>
              <strong className={styles.playlistHeader}>PLAYLISTS</strong>
              <hr className={styles.horizontalRow}></hr>

              {playlists?.items?.map(playlists => (
                <SidebarOption key={playlists} option={playlists.name}/>
              )
            )}
           </div>
    </div>
  )
}

export default Sidebar