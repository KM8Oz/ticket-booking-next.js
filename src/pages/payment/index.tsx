import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

import { Movie, Seats } from '../../constants/models/Movies'
import styles from './Payment.module.scss'
import MoviesContext from '../../context/MoviesContext';
import { useGetMovies } from '../../services/movies';
async function createPaymentLink(amount: any, description: any, orderId: any, custom: any) {
  const response = await fetch('/api/payment/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      description,
      order_id: orderId,
      custom,
    }),
  });

  const data = await response.json();

  return data;
}
const Tickets = () => {
  const { movies } = useGetMovies()
  const { setMovies } = useContext(MoviesContext);
  const router = useRouter();
  const [seconds, setSeconds] = useState(30);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const [_totalCost, setTotalCost] = useState(0)
  let movieSeatDetails: Seats = {};
  let bookingChargePerTicket = 20, ticketCost: number, bookingFee: number, totalCost: number;
  const { movieId, seatDetails }: any = router.query;
  const movie = movies?.find((mov: any) => mov.id === parseInt(movieId));
  if (seatDetails) {
    movieSeatDetails = JSON.parse(seatDetails);
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsTimerCompleted(true);
    }
  });

  const computeSelectedSeats = () => {
    let selectedSeats: string[] = [];
    for (let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex + 1}`)
        }
      })
    }
    return selectedSeats;
  }

  const RenderSeatDetails = ({ selectedSeats }: { selectedSeats: string[] }) => {
    ticketCost = selectedSeats.length * (movie?.ticketCost || 0);
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(', ')} ({selectedSeats.length} Билеты)
        </div>
        <div className={styles.seatCost}>
          ₽{ticketCost}
        </div>
      </div>
    )
  }

  const RenderBookingCharge = ({ selectedSeats }: { selectedSeats: string[] }) => {
    bookingFee = selectedSeats.length * bookingChargePerTicket;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          Плата за бронирование
        </div>
        <div className={styles.seatCost}>
          ₽{bookingFee}
        </div>
      </div>
    )
  }

  const RenderTotalCharge = ({ selectedSeats }: { selectedSeats: string[] }) => {
    totalCost = ticketCost + bookingFee;
    setTotalCost(totalCost)
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          Весь
        </div>
        <div className={styles.seatCost}>
          ₽{totalCost}
        </div>
      </div>
    )
  }

  const modifiedSeatValue = () => {
    let newMovieSeatDetails = { ...movieSeatDetails };
    for (let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          movieSeatDetails[key][seatIndex] = 1;
        }
      })
    }
    return newMovieSeatDetails;
  }

  const onConfirmButtonClick = async () => {
    let movieIndex = movies?.findIndex((mov: any) => mov.id === parseInt(movieId));
    if (movieIndex !== -1 && setMovies) {
      movies[movieIndex].seats = modifiedSeatValue();
      setMovies(movies);
      let payment = await createPaymentLink(_totalCost, movies[movieIndex]?.title, `${movieId}+${(Math.random() * 100).toFixed(0)}`, "Астрахань ТЦ \"Алимпик\", ул. Боевая, 25");
      if (payment && payment?.success) {
        window.open(payment?.link_page_url, '_blank');
      }
      router.push('/');
    }
  }

  const RenderConfirmButton = () => {
    return (
      <div className={styles.paymentButtonContainer}>
        <Button variant="contained" disabled={isTimerCompleted} className={styles.paymentButton} onClick={onConfirmButtonClick}>
          {isTimerCompleted ? 'Подтвердите бронирование' : `Подтвердите бронирование (${seconds})`}
        </Button>
      </div>
    )
  }

  const RenderCard = () => {
    let selectedSeats: string[] = computeSelectedSeats();

    if (!movie) return <div>погрузка...</div>
    return (
      <div className={styles.card}>
        <div className={styles.cardTitleContainer}>
          <Link href={{ pathname: `/seats/${movie?.id}`, query: { seats: isTimerCompleted ? null : JSON.stringify(seatDetails) } }}><ArrowBackIcon /></Link>
          <div className={styles.cardTitle}>
            КРАТКОЕ ОПИСАНИЕ БРОНИРОВАНИЯ
          </div>
        </div>
        <p className={styles.movieName}>{movie.title}</p>
        <RenderSeatDetails selectedSeats={selectedSeats} />
        <RenderBookingCharge selectedSeats={selectedSeats} />
        <hr className={styles.hrStyle} />
        <RenderTotalCharge selectedSeats={selectedSeats} />
        <RenderConfirmButton />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Страница оплаты</title>
      </Head>
      <div className={styles.container}>
        <RenderCard />
      </div>
    </>
  );
}

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}

export default Tickets;