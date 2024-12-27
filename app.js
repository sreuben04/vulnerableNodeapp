const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Specify the location of the views folder

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

// Serve Login Page (render the login.ejs file)
app.get('/', (req, res) => {
  res.render('login');  // Render login.ejs
});

// Handle Login Logic
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    req.session.user = username;
    res.redirect('/form');
  } else {
    res.send('Invalid credentials');
  }
});

// Serve Form Page (render the form.ejs file)
app.get('/form', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.render('form');  // Render form.ejs
});

// Handle Form Submission
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, ssn, email } = req.body;

  // Log the submitted data (you can modify this to store in a database or something else)
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`SSN: ${ssn}`);
  console.log(`Email: ${email}`);

  // Send a response back after submission
  res.send('Form submitted successfully!');
});

// Serve Shopping Cart Page (render the cart.ejs file)
app.get('/cart', (req, res) => {
  res.render('cart');  // Render cart.ejs
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
