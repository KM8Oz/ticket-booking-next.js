import { Grid, Button, Card, CardMedia, Link, CardContent, CardActions, CardHeader, IconButton, Typography, Collapse } from '@mui/material';
import Head from 'next/head'

import styles from '../styles/Home.module.scss'
import { useGetMovies } from '../services/movies'
import { Movie, Movie2 } from '../constants/models/Movies';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image"
import React from 'react';
import { ExpandLess, ExpandLessRounded, ExpandMore, ExpandOutlined, ExpandRounded, FavoriteRounded, ShareRounded, ShoppingBasketRounded } from '@mui/icons-material';
export default function Home() {
  const { movies, isLoading, isError } = useGetMovies();
  const renderCard = (movie: Movie2) => {
    const [expanded, setExpanded] = React.useState(false);
    console.log({ movie });

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return (
      <Card sx={{ maxWidth: 345, minWidth: 200 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
            </IconButton>
          }
          titleTypographyProps={{
            style: {
              fontSize: 17,
              fontWeight: "bold",
              minHeight: 65
            }
          }}
          title={movie.title + " " + movie.year}
          subheader={movie.russia_start_date}

        />
        <CardMedia
          component="img"
          height="194"
          image={movie.poster}
          alt={movie.title}
        />
        <CardContent style={{
          minHeight: 80
        }} >
          <Typography variant="body2" color="text.secondary">
            {
              movie?.genres?.map(s => s?.title).join(', ')
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {
              movie?.formats?.map(s => s?.title).join(', ')
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {
              movie?.cinema_start_date
              + " -> " +
              movie?.cinema_next_date
            }
          </Typography>
        </CardContent>
        <CardActions style={{
          display: "flex",
          gap: 3,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <Link href={"/details/" + movie.id}>
            <Button aria-label="share" style={{
              display: "flex",
              gap: 3,
              flexDirection: "column",
            }} >
              <ShoppingBasketRounded />
              <span>
                ₽{movie?.seances[0]?.price?.max / 100 || movie.ticketCost}
              </span>
            </Button>
          </Link>
          <Button
            // expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            {expanded ? <ExpandRounded /> : <ExpandLess />}
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography paragraph>{movie.age_rating}</Typography>
        </Collapse>
      </Card>
    )
  }
  const RenderMoviesList = () => {

    if (movies) {
      return movies.map((movie: Movie2, index: number) => (
        <Grid item xs={10} md={4} key={index}>
          {
            renderCard(movie)
          }
        </Grid>
      ))
    } else if (isLoading) {
      return <>Загрузка фильмов...</>
    } else {
      return <>Никаких Фильмов Для Просмотра...</>
    }
  }

  return (
    <>
      <Head>
        <title>Закажите мой билет | Домой</title>
      </Head>
      <div className={styles.moviesContainer}>
        <h1 className={styles.title}>Рекомендуемые фильмы</h1>
        <p>Добро пожаловать на страницу бронирования Tockit для Астраханского Большого Кино! Современные технологии, комфортабельные кресла и разнообразный выбор фильмов ждут вас по адресу: Boyevaya, 25, Astrakhan 414024. Отличное место для свиданий, семейного досуга и вечеринок с друзьями. Расслабьтесь и наслаждайтесь волшебством кино!</p>
        <Grid container spacing={1} justifyContent={"center"}>
          <RenderMoviesList />
        </Grid>
      </div>
    </>
  )
}
