require("dotenv").config();

const fs = require("fs");
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const moment = require("moment")

const spotify = new Spotify(keys.spotify);

const omdb = keys.omdb;

// inputs: concert-this, spotify-that-song, movie-this, do-what-it-says

// Switch cases for each of the different inputs

const action = process.argv[2]
const request = process.argv.slice(3).join(" ")


switch (action) {
    case "concert-this":
        var artist = request;
        var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

        axios.get(url).then(
            function (response) {
                console.log(`Artist: ${artist}`);

                // Error handler
                if (typeof response.data[0] === "undefined") {
                    return console.log("Artist has no upcoming events or is not in database");
                }

                // loop through the first 5 venues 
                let i = 0
                while (typeof response.data[i] != "undefined") {
                    // only display first 5 results
                    if(i>4){
                        break
                    }

                    console.log(`\n-------------\n Event ${i + 1} \n-------------`)

                    // Venue
                    console.log(`Venue: ${response.data[i].venue.name}`)

                    // Venue Location
                    console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}`)

                    // Date of event using moment "MM/DD/YYYY"
                    console.log(`Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`);

                    i++
                };
            }
        )
        break;

    case "spotify-this-song":

        break;

    case "movie-this":
        var t = request;
        var url = `http://www.omdbapi.com/?apikey=${omdb.key}&t=${t}`;

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

            console.log(data);
        });

}


