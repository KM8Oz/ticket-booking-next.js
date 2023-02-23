import type { AppProps } from 'next/app'

import '../styles/globals.scss'
import Layout from '../components/Layout'
import MoviesContext from '../context/MoviesContext'
import { useState } from 'react';
import { Movie, Movie2 } from '../constants/models/Movies';
import { useGetMovies } from '../services/movies';
// import { movies as mockMovies } from './../constants/movies';

function MyApp({ Component, pageProps }: AppProps|any) {
  const { movies } = useGetMovies()
  const [_movies, setMovies] = useState<Movie2[]>(movies);
  return (
    <Layout>
      <MoviesContext.Provider value={{movies:_movies, setMovies}}>
        <Component {...pageProps} />
      </MoviesContext.Provider>
    </Layout>
  )
}

export default MyApp
