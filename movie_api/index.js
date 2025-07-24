const express = require('express');
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/movies', (req, res) => {
  const movies = [
    { title: "The Shawshank Redemption", year: 1994, director: "Frank Darabont" },
    { title: "The Godfather", year: 1972, director: "Francis Ford Coppola" },
    { title: "The Dark Knight", year: 2008, director: "Christopher Nolan" },
    { title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino" },
    { title: "Forrest Gump", year: 1994, director: "Robert Zemeckis" },
    { title: "Inception", year: 2010, director: "Christopher Nolan" },
    { title: "Fight Club", year: 1999, director: "David Fincher" },
    { title: "The Matrix", year: 1999, director: "The Wachowskis" },
    { title: "Goodfellas", year: 1990, director: "Martin Scorsese" },
    { title: "The Lord of the Rings: The Return of the King", year: 2003, director: "Peter Jackson" }
  ];
  res.json(movies);
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broked! :(');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});