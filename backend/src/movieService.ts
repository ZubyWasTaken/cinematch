import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3";

interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
}

const getRandomMovies = async (): Promise<Movie[]> => {
    const randomMovies: Movie[] = [];
    const totalPages = 500; // TMDB API allows page numbers from 1 to 500

    // Function to get a random integer between min (inclusive) and max (inclusive)
    const getRandomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    while (randomMovies.length < 9) {
        const randomPage = getRandomInt(1, totalPages);
        const response = await axios.get(`${TMDB_API_URL}/movie/popular`, {
            params: {
                api_key: TMDB_API_KEY,
                page: randomPage,
            },
        });

        const movies = response.data.results;

        // Shuffle the array to get random movies
        for (const movie of movies) {
            if (randomMovies.length < 9) {
                randomMovies.push(movie);
            } else {
                break;
            }
        }
    }

    return randomMovies;
};

export { getRandomMovies };
