import {useEffect} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login.js"
import { getTokenFromUrl } from "./components/spotify.js";
import { useDataLayerValue } from "./components/DataLayer.js";
import Player from "./components/Player.js";

const spotify = new SpotifyWebApi();

function App() {
  
  // creates the token variable and the setToken state. Setting it to null

  const [{token}, dispatch] = useDataLayerValue();
  /* uses use effect to set a new variable named hash, which uses the getTokenFromUrl() 
      function from spotifyjs. This function strips the   
  */

  //run code based on a given condition
  useEffect(() => {
    
    // sets a new variable named hash which uses the fucntion we import from spotify.js
    const hash = getTokenFromUrl()
    
    // sets the current windows location hash to "" to prevent our id from being coped
    window.location.hash = "";
    
    //sets token to the hash's access token
    const _token = hash.access_token;
    
    // if there is an access token available, set the spotify, access token prop _token 
    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
    })
    
      spotify.setAccessToken(_token)
    
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
      })
    })

    spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: 'SET_PLAYLISTS',
        playlists: playlists
    })
  })

  spotify.getPlaylist('37i9dQZEVXcQanvTAUQiir').then(response => {
    dispatch({
      type: 'SET_DISCOVER_WEEKLY',
      discover_weekly: response,
  })
})

dispatch({
  type: "SET_SPOTIFY",
  spotify: spotify,
});
  }
}, [token, dispatch]);

  const style = {
    app: "bg-black h-fit"
  }
  return (
    <div className={style.app}>
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
          <Login/>
        )
      }
      
    </div>
  );
}

export default App;
