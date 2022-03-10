const express = require('express');
const os = require('os');

const app = express();
const cors = require('cors');
// require express middleware body-parser
const bodyParser = require('body-parser');
// require express session
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors());
// set the view engine to ejs
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// set the directory of views
app.set('views', './src/client');
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());
// use session to store user data between HTTP requests
app.use(
  session({
    secret: 'cmpe_273_secure_string',
    resave: false,
    saveUninitialized: true,
  })
);

// Only user allowed is admin
const Users = [
  {
    username: 'admin',
    password: 'admin',
  },
];
// By Default we have 3 books
const books = {
  1: { Title: 'Book 1', Author: 'Author 1' },
  2: { Title: 'Book 2', Author: 'Author 2' },
  3: { Title: 'Book 3', Author: 'Author 3' },
};

let errorMessages = {};
let messages = {};

app.get('/getBooks', (req, res) => {
  res.send({ books });
});

app.post('/signup', (req, res) => {
  messages = {};
  if (req.session.user) {
    res.render('Dashboard', {
      books,
      messages,
    });
  } else {
    console.log('Req Body : ', req.body);
    const userThatMatches = Users.filter(user => user.username === req.body.username);
    if (
      userThatMatches.length === 1
    ) {
      console.log('user already exists');
      errorMessages.DUPLICATE_USER = 'Unfortunately, that username is already taken. Please choose another username.';
      res.send({ errorMessages });
    } else if (userThatMatches.length > 1) {
      console.log('Duplicate users in the DB found!');
    } else {
      errorMessages = {};
      messages.VALID_DELETED_BOOK = 'You have successfully signed up!';
      Users.push({ username: req.body.username, password: req.body.password });
      res.send({ messages, errorMessages });
    }
  }
});

app.post('/login', (req, res) => {
  messages = {};
  if (req.session.user) {
    res.render('Dashboard', {
      books,
      messages,
    });
  } else {
    console.log('Req Body : ', req.body);
    const userThatMatches = Users.filter(user => user.username === req.body.username
    && user.password === req.body.password);
    if (
      userThatMatches.length === 1
    ) {
      const user = userThatMatches[0];
      console.log('user found');
      console.log(userThatMatches);
      errorMessages = {};
      req.session.user = userThatMatches;
      const token = jwt.sign({
        id: user.username,
        username: user.username
      }, process.env.JWT_SECRET_KEY);
      res.send({ token, errorMessages });
    } else if (userThatMatches.length > 1) {
      console.log('Duplicate users in the DB found!');
    } else {
      console.log('user not found');
      messages = {};
      errorMessages.INVALID_LOGIN_CREDENTIALS = 'Invalid login credentials';
      res.send({ errorMessages });
    }
  }
});

app.post('/logout', (req, res) => {
  errorMessages = {};
  req.session.user = null;
  res.redirect('/');
});

app.post('/createBook', (req, res) => {
  if (
    req.body
    && req.body.bookID
    && req.body.bookTitle
    && req.body.bookAuthor
  ) {
    const reqBody = req.body;
    if (reqBody.bookID) {
      if (books[reqBody.bookID]) {
        errorMessages = {};
        errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = `Book could not be created because the Book ID: "${
          reqBody.bookID
        }" already exists`;
        res.send({ errorMessages }, 400);
      } else {
        books[reqBody.bookID] = {
          Title: req.body.bookTitle,
          Author: req.body.bookAuthor,
        };
        messages = {};
        messages.VALID_CREATED_BOOK = `Book with ID: ${reqBody.bookID} created!`;
        res.send({ messages }, 200);
      }
    }
  }
});

app.post('/deleteBook', (req, res) => {
  console.log(req.body);
  if (req.body && req.body.bookID) {
    const reqBody = req.body;
    if (reqBody.bookID) {
      if (books[reqBody.bookID]) {
        delete books[reqBody.bookID];
        messages = {};
        messages.VALID_DELETED_BOOK = `Book with ID: ${reqBody.bookID} deleted.`;
        res.send({ books, messages }, 200);
      } else {
        errorMessages = {};
        errorMessages.INVALID_DELETE_BOOK_ID_NOT_FOUND = `Book could not be deleted because the Book ID: "${
          reqBody.bookID
        }" could not be found`;
        res.send({ errorMessages }, 400);
      }
    }
  }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
