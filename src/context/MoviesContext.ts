import React from "react";
import { Movie, Movie2 } from "../constants/models/Movies";
// import { movies } from "../constants/movies";
import { useGetMovies } from "../services/movies";



export default React.createContext<MovieContextModal>({ movies: []  });

interface MovieContextModal {
  movies: Movie2[],
  setMovies?: Function
}