require("dotenv").config();

const fs = require("fs");
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

const omdb = keys.omdb;

// inputs: concert-this, spotify-that-song, movie-this, do-what-it-says

// Switch cases for each of the different inputs

const action = process.argv[2]
const request = process.argv.slice(3).join(" ")


switch (action) {
    case "movie-this":
        let t = request
        let url = `http://www.omdbapi.com/?apikey=${omdb.key}&t=${t}`

        axios.get(url).then(
            function (response) {
                // Movie title
                console.log(`Movie title: ${response.data.Title}`);

                // Release year
                console.log(`Release year: ${response.data.Year}`)

                // IMDB Rating of the movie.
                console.log(`IMDb rating is: ${response.data.imdbRating}`);
                
                // Rotten Tomatoes Rating of the movie.
                console.log(`Rotten Tomatoes rating is: ${response.data.Ratings[1].Value}`);

                // Country where the movie was produced.
                console.log(`Produced in: ${response.data.Country}`)

                // Language of the movie.
                console.log(`Language: ${response.data.Language}`)

                // Plot of the movie.
                console.log(`Plot: ${response.data.Plot}`)

                // Actors in the movie.
                console.log(`Actors: ${response.data.Actors}`)
            }
        );
        break;



    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            };

            console.log(data)
        });

}


