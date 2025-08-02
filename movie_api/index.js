const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Big Beautiful Movie API! Use /movies to see the top 10 movies or /documentation.html for more info.');
});

// Return a list of ALL movies
app.get('/movies', (req, res) => {
  res.send('Successful GET request returning data on all movies');
});

// Return data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.send(`Successful GET request returning data about the movie: ${req.params.title}`);
});

// Return data about a genre by name
app.get('/genres/:name', (req, res) => {
  res.send(`Successful GET request returning data about the genre: ${req.params.name}`);
});

// Return data about a director by name
app.get('/directors/:name', (req, res) => {
  res.send(`Successful GET request returning data about the director: ${req.params.name}`);
});

// Allow new users to register
app.post('/users', (req, res) => {
  res.send('Successful POST request registering a new user');
});

// Allow users to update their user info (username)
app.put('/users/:username', (req, res) => {
  res.send(`Successful PUT request updating user info for: ${req.params.username}`);
});

// Allow users to add a movie to their list of favorites
app.post('/users/:username/movies/:movieID', (req, res) => {
  res.send(`Successful POST request adding movie ${req.params.movieID} to ${req.params.username}'s favorites`);
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:username/movies/:movieID', (req, res) => {
  res.send(`Successful DELETE request removing movie ${req.params.movieID} from ${req.params.username}'s favorites`);
});

// Allow existing users to deregister
app.delete('/users/:username', (req, res) => {
  res.send(`Successful DELETE request deregistering user: ${req.params.username}`);
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broked! :(');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});