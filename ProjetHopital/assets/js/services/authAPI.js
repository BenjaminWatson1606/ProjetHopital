import axios from "axios";
import jwtDecode from "jwt-decode";

//Au démarrage de l'application et donc de authAPI,
//on regarde si il faut mettre un faux token
if (window.localStorage.getItem("authToken") == null) {
  setFakeToken();
}

//L'application plante s'il n'y a pas de token 'authToken' dans le localStorage
//Cette fonction met dans le localStorage un token bidon
function setFakeToken() {
  window.localStorage.setItem(
    "authToken",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NDE3MjcwMjMsImV4cCI6MTY0MTcyNjczOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.SNVcCBxHYxRIM7C-TwUVz2gK6GTREU57D8ZttbkvLxo"
  );
}

function logout() {
  delete axios.defaults.headers["Authorization"];
  setFakeToken();
}

function authenticate(credentials) {
  return axios
    .post("http://localhost:8000/api/login_check", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      //stockage du token dans le local storage
      window.localStorage.setItem("authToken", token);
      //on previent axios qu'on a mtn un header par défaut sur toutes les futures requetes http
      setAxiosToken(token);
      
    });
    
}

function setAxiosToken(token) {
  if (token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  }
}

function setup() {
  //voir si on a un token
  const token = window.localStorage.getItem("authToken");
  if (!token) {
    setFakeToken();
  }
  //voir si il est encore valide
  if (token) {
    try {
      const { exp: expiration } = jwtDecode(token);
      if (expiration * 1000 > new Date().getTime()) {
        setAxiosToken(token);
      }
    } catch (error) {
      console.log(`error with token: ${error}`);
    }
  }
}

function isAuthenticated() {
  //voir si on a un token
  const token = window.localStorage.getItem("authToken");
  if (!token) {
    setFakeToken();
  }
  //voir si il est encore valide
  if (token != null) {
    try {
      const { exp: expiration } = jwtDecode(token);
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
  isAuthenticated,
};
