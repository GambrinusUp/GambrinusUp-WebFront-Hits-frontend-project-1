// Requiring module
const express = require('express');
 
// Creating express object
const app = express();
 
var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static('C:/Users/Andrey/Documents/GitHub/WebFront-Hits-frontend-project-1/'))

// Handling GET request
 
app.get('/([1-9][0-9]{0,})?', (req, res) => {
    res.render('C:/Users/Andrey/Documents/GitHub/WebFront-Hits-frontend-project-1/main.html');
     //C:\Users\Andrey\Documents\GitHub\WebFront-Hits-frontend-project-1/main.html
})

app.get('/movie/(*)', (req, res) => {
    res.render('C:/Users/Andrey/Documents/GitHub/WebFront-Hits-frontend-project-1/movies_page.html');
})

app.get('/favorites(\/?)', (req, res) => {
    res.render('C:/Users/Andrey/Documents/GitHub/WebFront-Hits-frontend-project-1/favorite_movies.html');
})

app.get('/registration(\/?)', (req, res) => {
    res.render('C:/Users/Andrey/Documents/GitHub/WebFront-Hits-frontend-project-1/registration_page.html');
})

app.get('/login(\/?)', (req, res) => {
    res.render('C:/Users/Andrey/Documents/GitHub/WebFront-Hits-frontend-project-1/authorization_page.html');
})

app.get('/profile(\/?)', (req, res) => {
    res.render('C:/Users/Andrey/Documents/GitHub/WebFront-Hits-frontend-project-1/profile_page.html');
})

// Port Number
const PORT = process.env.PORT ||5000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));