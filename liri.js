require("dotenv").config();

const fs = require("fs"); /* accesses read/write package */
const keys = require("./keys.js"); /* accesses keys file */
const axios = require("axios"); /* accesses axios API call package */
const Spotify = require('node-spotify-api'); /* accesses spotify RESTful package */
const moment = require("moment") /* accesses moment package for time */
const spotify = new Spotify(keys.spotify); /* references user's unique spotify's keys  */
const omdb = keys.omdb; /* references user's unique omdb keys */

const action = process.argv[2];
const request = process.argv.slice(3).join(" ");

// Switch cases for each of the different inputs
switch (action) {
    case "concert-this":
        bandsintown(request);
        break;

    case "spotify-this-song":
        spotifySong(request);
        break;

    case "movie-this":
        movie(request);
        break;

    case "do-what-it-says":
        txtRead();
}

function bandsintown(artist) {
    console.log("-------------\n")

    var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    axios.get(url).then(
        function (response) {
            console.log(`Artist: ${artist}`);

            // Error handler
            if (typeof response.data[0] === "undefined") {
                return console.log("Artist has no upcoming events or is not in database");
            };

            // loop through the first 5 venues 
            var i = 0
            while (typeof response.data[i] != "undefined") {
                // only display first 5 results
                if (i > 4) { break; };

                console.log(`\n-------------\n Event ${i + 1} \n-------------`);

                // Venue
                console.log(`Venue: ${response.data[i].venue.name}`);

                // Venue Location
                console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}`);

                // Date of event using moment "MM/DD/YYYY"
                console.log(`Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`);

                i++;
            };
        }
    )
}

function spotifySong(songName) {
    console.log("-------------\n");
    console.log(`Search request: ${songName}`);

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var i = 0;
        // console.log(data.tracks.items[i]);

        // Confirms track exists
        while (data.tracks.items[i] != "undefined") {

            // Return first 5 results
            if (i > 4) { break; }

            console.log(`\n--------------\n Song ${i + 1} \n--------------`)

            // List all artist(s)
            var artistObj = data.tracks.items[i].artists;
            var artistsArr = [];
            for (let j = 0; j < artistObj.length; j++) {
                artistsArr.push(data.tracks.items[i].artists[j].name)
            };
            console.log(`Artist(s): ${artistsArr.join(", ")}`);

            // Song Name
            console.log(`Song name: ${data.tracks.items[i].name}`);

            // Preview link of song from Spotify
            console.log(`Song preview: ${data.tracks.items[i].external_urls.spotify}`);

            // Album 
            console.log(`Album: ${data.tracks.items[i].album.name}`);

            i++;
        }
    });

}

function movie(movie) {
    console.log("-------------\n")

    var url = `http://www.omdbapi.com/?apikey=${omdb.key}&t=${movie}`;

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
}

function txtRead() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        };

        var indexComma = data.indexOf(",");
        var txtRequest = data.slice(indexComma + 2, data.length - 1);

        spotifySong(txtRequest);

    });
}