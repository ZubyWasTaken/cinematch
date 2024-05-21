import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getRandomMovies } from "./movieService";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Cinematch API");
});

app.get("/api/random-movies", async (req: Request, res: Response) => {
    try {
        const movies = await getRandomMovies();
        res.json(movies);
    } catch (error) {
        console.error("Error fetching random movies:", error);
        res.status(500).json({ message: "Error fetching random movies" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
