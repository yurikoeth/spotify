import React from 'react'
import { Avatar } from '@mui/material'
import { useDataLayerValue } from "./DataLayer.js"
const Header = () => {

    const [{user}] = useDataLayerValue();

    const styles = {
      headerContainer: "flex justify-between w-full",
      headerLeft: "bg-white flex items-center rounded-full text-gray-600 mr-4 w-fit",
      search:"border-none w-full ml-1 p-2 rounded-full",
      searchIcon: "w-6 h-6",
      headerRight: "flex items-center",
      user: "ml-1 text-white flex"

    }
    
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
      <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input className={styles.search} placeholder="Search" type="text"></input>
      </div>
      <div className={styles.headerRight}>
        <Avatar src={user?.images[0]?.url}/>
        <h4 className={styles.user}>{user?.display_name}</h4>
      </div>
    </div>
  )
}

export default Header