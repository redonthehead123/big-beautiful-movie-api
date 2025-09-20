const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/Big Beautiful Database', { useNewUrlParser:true, useUnifiedTopology: true});

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(501).send('Error: ' + error);
    });
});

// Get all users
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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