export type Movie = {
  id: number,
  name: string,
  language: string,
  ticketCost?: number,
  rows?: number,
  cols?: number,
  seats?: Seats
}

export type Seats = {
  [key: string]: number[]
}

type Format = {
  id: number;
  title: string;
}

type Genre = {
  id: number;
  title: string;
}

type Country = {
  id: number;
  title: string;
}

export type Movie2 = {
  ticketCost?: number,
  rows?: number,
  cols?: number,
  seats?: Seats,
  id: number;
  rambler_id: number | null;
  title: string;
  age_rating: string;
  formats: Format[];
  genres: Genre[];
  countries: Country[];
  year: number;
  poster: string;
  rating: object;
  thumbnail: string;
  screenshots: string[];
  duration: number;
  qualifiers: string[];
  all_qualifiers: string[];
  russia_start_date: string;
  cinema_start_date: string;
  cinema_next_date: string;
  seances: any[]; // Assuming this can be any type of array for now
}
