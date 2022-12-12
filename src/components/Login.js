import React from 'react'
import { loginUrl } from './spotify'

const Login = () => {
    const style = {
        login: "w-screen flex flex-col items-center bg-black text-white h-screen justify-between",
        logo: "mt-24",
        loginButton: "p-4 bg-green-500 rounded-3xl w-60 text-center font-bold mb-72 no-underline",
    }
  return (
    <div className={style.login}>
      {/*spotify banner*/}
        <img 
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt=""
            className={style.logo}>
        </img>
        {/*login button*/}
        <a href={loginUrl} className={style.loginButton}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login