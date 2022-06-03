import axios from "axios";

function findAll() {
  return axios
    .get("http://localhost:8000/api/profils")
    .then((response) => response.data["hydra:member"]);
}

function find(id) {
  return axios
    .get("http://localhost:8000/api/profils/" + id)
    .then((response) => response.data);
}

export default {
  findAll,
  find,
};
