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
const Users = {
  1: {
    id: 1,
    username: 'admin',
    password: 'admin',
    region: 'United States',
    currency: 'USD',
    language: 'English',
  },
};

const items = {
  1: {
    id: 1, src: 'https://placekitten.com/258/205', isFavorited: true, name: 'The kitten 1', price: 120.00
  },
  2: {
    id: 2, src: 'https://placekitten.com/258/205', isFavorited: false, name: 'The kitten 2', price: 120.00
  },
  3: {
    id: 3, src: 'https://placekitten.com/258/205', isFavorited: false, name: 'The kitten 3', price: 120.00
  },
  4: {
    id: 4, src: 'https://placekitten.com/258/205', isFavorited: false, name: 'The kitten 4', price: 120.00
  },
  5: {
    id: 5, src: 'https://placekitten.com/258/205', isFavorited: false, name: 'The kitten 5', price: 120.00
  },
  6: {
    id: 6, src: 'https://placekitten.com/258/205', isFavorited: true, name: 'The kitten 6', price: 120.00
  },
};

let errorMessages = {};
let messages = {};

app.get('/items', (req, res) => {
  res.send({ items: Object.values(items) });
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
    const userThatMatches = Object.values(Users).filter(user => user.username === req.body.username);
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
      Object.values(Users).push({ username: req.body.username, password: req.body.password });
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
    const userThatMatches = Object.values(Users).filter(user => user.username === req.body.username
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

app.post('/favoriteItem', (req, res) => {
  if (
    req.body
    && req.body.itemID
  ) {
    const { itemID } = req.body;
    if (items[itemID]) {
      items[itemID].isFavorited = true;
      res.send({ items: Object.values(items) }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = `Item with ID: "${
        itemID
      }" does not exist`;
      res.send({ errorMessages }, 200);
    }
  }
});

app.post('/unFavoriteItem', (req, res) => {
  if (
    req.body
    && req.body.itemID
  ) {
    const { itemID } = req.body;
    if (items[itemID]) {
      items[itemID].isFavorited = false;
      res.send({ items: Object.values(items) }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = `Item with ID: "${
        itemID
      }" does not exist`;
      res.send({ errorMessages }, 200);
    }
  }
});

app.post('/updateUserInfo', (req, res) => {
  if (
    req.body
    && req.session.user
  ) {
    const { userInfo } = req.body;
    const { id } = req.session.user;
    if (Users[id]) {
      Users[id] = {
        ...Users[id],
        ...userInfo
      };
      res.send({ userInfo }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = `User with username: "${
        userInfo.username
      }" has issues`;
      res.send({ errorMessages }, 200);
    }
  }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
