import React from 'react'

const SidebarOption = ({option, Icon}) => {
    const style = {
        sidebarOption: "flex space-x-2 text-gray-600 h-12 mt-6 cursor-pointer hover:text-white transition-all  "
    }
  return (
    <div className={style.sidebarOption}>
        {Icon && <Icon></Icon>}
        {Icon ? <h4>{option}</h4> :<p>{option}</p>}
    </div>
  )
}

export default SidebarOption