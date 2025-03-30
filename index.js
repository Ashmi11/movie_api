const express= require('express');
const morgan = require('morgan');
const app=express();

app.use(express.static('public')); //serve static file from public folder
// Middleware
app.use(morgan('common')); // Logs all requests

// Data for top 10 movies
const movies = [
    { title: 'Inception', director: 'Christopher Nolan', year: 2010 },
    { title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 },
    { title: 'Interstellar', director: 'Christopher Nolan', year: 2014 },
    { title: 'The Matrix', director: 'Lana & Lilly Wachowski', year: 1999 },
    { title: 'Fight Club', director: 'David Fincher', year: 1999 },
    { title: 'Pulp Fiction', director: 'Quentin Tarantino', year: 1994 },
    { title: 'Forrest Gump', director: 'Robert Zemeckis', year: 1994 },
    { title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 },
    { title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 },
    { title: 'The Lord of the Rings: The Return of the King', director: 'Peter Jackson', year: 2003 }
  ];
  
  // Routes
  app.get('/', (req, res) => {
    res.send('Welcome to My Movie API!');
  });
  
  app.get('/movies', (req, res) => {
    res.json(movies);
  });

  // Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
  //Start server
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });