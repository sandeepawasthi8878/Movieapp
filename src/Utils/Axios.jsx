
import axios from "axios"
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "5a5879d46ec7b322ba95df496fb79f9f"  // API key as a parameter
  },
  headers: {
    accept: "application/json",  // Correct accept header
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTU4NzlkNDZlYzdiMzIyYmE5NWRmNDk2ZmI3OWY5ZiIsIm5iZiI6MTcyNjgzNDgwNi41Nzg0NzIsInN1YiI6IjY2ZWQyY2Y3YjIzNmM3MDAwNmJkYzFiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.069Q2lsuH68d7o1GdodAph4ojLPrhVaX3dNPBTb5Z80"
  }
});

export default instance;

