import axios from "axios";
import jwtDecode from "jwt-decode";


function logout() {
  delete axios.defaults.headers["Authorization"];
}
let jwttoken
let connected
function authenticate(credentials) {
  try{axios
    .post("http://localhost:8000/api/login_check", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      //stockage du token dans le local storage
      jwttoken= token;
      //on previent axios qu'on a mtn un header par défaut sur toutes les futures requetes http
      setAxiosToken(token);
      connected = true
      },
      
    )}
    catch(error){
      connected = false
      console.log(error.response.data)
    }
    return [connected,jwttoken] 
}

function setAxiosToken(token) {
  if (token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  }
}

function setup() {
  if (jwttoken) {
    try {
      const { exp: expiration } = jwtDecode(jwttoken);
      if (expiration * 1000 > new Date().getTime()) {
        setAxiosToken(jwttoken);
      }
    } catch (error) {
      console.log(`error with token: ${error}`);
    }
  }
}

function isValid() {
  //voir si il est encore valide
  if (jwttoken != null) {
    try {
      const { exp: expiration } = jwtDecode(jwttoken);
      if (expiration * 1000 > new Date().getTime()) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(`error with token: ${error}`);
    }
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isValid,
};
