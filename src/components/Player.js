import React from 'react'
import Sidebar from './Sidebar.js'
import Body from './Body.js'
import Footer from './Footer.js'

const Player = ({spotify}) => {
    const styles = {
        player: "flex flex-col h-screen w-screen scrollbar-hide overflow-x-hidden",
        playerBody: "flex h-5/6 w-screen",

    }
  return (
    <div className={styles.player}>
        <div className={styles.playerBody}>
           <Sidebar/>
            <Body spotify={spotify}/>
        </div>
        <div>
          <Footer spotify={spotify}/>
        </div>
    </div>
  )
}

export default Player