import type { NextApiRequest, NextApiResponse } from 'next'
import _ from "lodash"

import { Movie } from '../../../constants/models/Movies'
// import { movies } from '../../../constants/movies'
const additional = {
  ticketCost: 200,
  rows: 20,
  cols: 6,
  seats: {
    A: new Array(20).fill(Math.round(Math.random())),
    B: new Array(20).fill(Math.round(Math.random())),
    C: new Array(20).fill(Math.round(Math.random())),
    D: new Array(20).fill(Math.round(Math.random())),
    E: new Array(20).fill(Math.round(Math.random())),
    F: new Array(20).fill(Math.round(Math.random())),
    G: new Array(20).fill(Math.round(Math.random()))
  }
}
export default async function handler(req: NextApiRequest,res: NextApiResponse<Movie|undefined>) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
    var movies = (await fetch("https://kinokassa.kinoplan24.ru/api/v2/release/playbill?city_id=7&date="+formattedDate, {
      "credentials": "omit",
      "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "X-Application-Token": "6a6Hju8vVvzpiYBIiDvB6dpw76k4oy2f",
        "X-Platform": "widget",
        "Content-Type": "application/JSON",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site"
      },
      "referrer": "https://bolshoekino.com/",
      "method": "GET",
      "mode": "cors"
    }).then(e => {
      console.log(e.json());
      
      return e.json()
    }) || { releases: [] }).releases;
    if(movies.length > 0){
      movies = movies.map((m:any) =>({...m, ...additional}))
      movies = _.uniqWith(movies, (arrVal:any, othVal:any) => arrVal.id === othVal.id)
    }
  const { id } = req.query
  
  if (req.method === 'GET') {
    if (typeof id === 'string') {
      const movie = movies.find((movie: any) => movie.id === parseInt(id))
      res.status(200).json(movie)
    }
  } else if (req.method === 'PUT') {
    if (typeof id === 'string') {
      const movieIndex = movies.findIndex((movie: any) => movie.id === parseInt(id))
      movies[movieIndex].seats = req.body.seatDetails;
      res.status(200).json(movies[movieIndex])
    }
  }
}
