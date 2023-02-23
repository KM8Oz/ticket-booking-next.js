import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Button } from '@mui/material';

import { Movie, Movie2 } from '../../constants/models/Movies'
import styles from './Details.module.scss'
import MoviesContext from '../../context/MoviesContext';
import { useContext } from 'react';
import { useGetMovies } from '../../services/movies';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image"

const Details = () => {
  const { movies, isLoading, isError } = useGetMovies();

  const router = useRouter()
  const { id }: any = router.query
  const movie: Movie2 = movies?.find((mov: Movie2) => mov.id == id);

  const RenderBookTicketsButton = () => {
    return (
      <Link href={`/seats/${movie?.id}`}>
        <div className={styles.paymentButtonContainer}>
          <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
            Забронировать билет
          </Button>
        </div>
      </Link>
    )
  }

  const RenderCustomizeRowsButton = () => {
    return (
      <Link href={`/customize/${movie?.id}`}>
        <div className={styles.paymentButtonContainer}>
          <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
            Настройка строки
          </Button>
        </div>
      </Link>
    )
  }

  if (!movie) return <div>погрузка...</div>
  return (
    <>
      <Head>
        <title>Подробности</title>
      </Head>
      <div className={styles.seatsContainer}>
        <Carousel dynamicHeight infiniteLoop={true} autoPlay showIndicators={false} showStatus={false}>
          {
            (movie?.screenshots?.length > 0 ? movie?.screenshots : [movie.poster])?.map((screenshot: string) => (
              <Image objectFit="cover" width={400} height={350} src={screenshot} />
            ))
          }
        </Carousel>
        <h1>{movie.title} - {movie.age_rating}</h1>
        <div className={styles.language}>Стоимость билета: ₽{movie.ticketCost}</div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonHolder}>
            <RenderBookTicketsButton />
            <RenderCustomizeRowsButton />
          </div>
        </div>
      </div>
    </>
  );
}

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}

export default Details;