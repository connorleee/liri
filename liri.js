require("dotenv").config();

const fs = require("fs");
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

const omdb = keys.omdb;

// inputs: concert-this, spotify-that-song, movie-this, do-what-it-says

// Switch cases for each of the different inputs

const input = process.argv.slice(2).join(" ")

switch (input) {
    case "movie-this":
        axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=" + omdb.key).then(
            function (response) {
                // Then we print out the imdbRating
                console.log("The movie's rating is: " + response.data.imdbRating);
            }
        );
        break;

    default:
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            };

            console.log(data)
        })
        break;
}


