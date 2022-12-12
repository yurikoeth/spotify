/* exports a new variable called authEndpoint which is set to the spotify authorization link.
    this is where we send the user to spotify for authentification to be handled.
*/
export const authEndpoint = "https://accounts.spotify.com/authorize";

//sets a new variable called redirectUri and sets it to the project's online location
const redirectUri = "http://localhost:3000/";

// the client id provided by spotify for this project
const clientId = "8917fb589ca44da58300475afba215a9"

// sets a an object called scopes, which allows the user the functionalities listed below.
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

// exports the function getTokenFromUrl
export const getTokenFromUrl = () => {
    // goes to the hash within the url and returns the string, using the hash as the beginning.
    return window.location.hash
    // removes the hash
    .substring(1)
    // splits the string wherever there is an '&'
    .split('&')

    .reduce((initial, item) => {
        // splits the provided string at the = sign
        let parts = item.split('=');
        // sets the accessToken to the decodeURI function
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
    }, {});
}
// creates a link for the user to use, utilizing the variables provided.
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;