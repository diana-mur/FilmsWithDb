import express, { request, response } from "express"
import sql from "./db.js"
import path from 'path'
import { error } from "console"

const app = express()
const port = 3000
const __dirname = path.resolve()
const urlencodedParser = express.urlencoded({ extended: false })

async function getFilms() {
    const films = await sql`
    SELECT 
    id,
    title,
    genres,
    country
    FROM
    films
    `

    return films
}

async function postFilms({ title, genres, country }) {
    const films = await sql`
    INSERT INTO films 
    (title,
    genres,
    country)
    VALUES
    (${title}, ${genres}, ${country})
    `

    return films
}

app.get("/films", async (request, response) => {
    //response.sendFile(__dirname + "/index.html")
    try {
        const films = await getFilms();
        response.send(films);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

// app.use(express.static('public'));

app.get("/film", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.post("/film", urlencodedParser, async (request, response) => {
    if (!request.body) return response.sendStatus(400);

    let title = request.body.title;
    let genres = request.body.genres;
    let country = request.body.country;

    try {
        const post = await postFilms({ title, genres, country });
        response.send(post + "Добавлена запись: " + title + " - " + genres + " - " + country);
    } catch {
        response.status(500).send(error.message);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})