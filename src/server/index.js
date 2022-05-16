const express = require('express');
const os = require('os');

const Fuse = require('fuse.js');

const app = express();
const cors = require('cors');
// require express middleware body-parser
const bodyParser = require('body-parser');
// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// require express session
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { graphqlHTTP } = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

app.use(cors());
// set the view engine to ejs
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// set the directory of views
app.set('views', './src/client');
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

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

db.serialize(() => {
  db.run('CREATE TABLE item (id TEXT, src TEXT)');
  db.run('CREATE TABLE cart_item (info TEXT)');
  db.run('CREATE TABLE purchase_history_item (info TEXT)');
  db.run('CREATE TABLE user (info TEXT)');
});
db.close();

const JWT_SECRET_KEY = 'SECRETKEYJWTLOGIN';

// Only user allowed is admin
const Users = {
  1: {
    id: 1,
    about: 'about me',
    birthday: '',
    city: 'Los Angeles',
    gender: 'Male',
    username: 'admin',
    password: 'admin',
    region: 'United States',
    currency: 'USD',
    language: 'English',
    src: '',
  },
};

const items = {
  0: {
    id: 0,
    src: 'https://placekitten.com/258/205',
    isFavorited: true,
    name: 'The kitten 1',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
  },
  1: {
    id: 1,
    src: 'https://placekitten.com/258/205',
    isFavorited: false,
    name: 'The kitten 2',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
  },
  2: {
    id: 2,
    src: 'https://placekitten.com/258/205',
    isFavorited: false,
    name: 'The kitten 3',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
  },
  3: {
    id: 3,
    src: 'https://placekitten.com/258/205',
    isFavorited: false,
    name: 'The kitten 4',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
  },
  4: {
    id: 4,
    src: 'https://placekitten.com/258/205',
    isFavorited: false,
    name: 'The kitten 5',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
  },
  5: {
    id: 5,
    src: 'https://placekitten.com/258/205',
    isFavorited: true,
    name: 'The kitten 6',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
  },
};

const shops = [
  {
    admirerCount: 2,
    dateJoined: Date.now(),
    name: 'The kitten 6',
    saleCount: 3,
    src: 'https://placekitten.com/400/500',
    items: [],
    ownerInfo: {
      id: 1,
      username: 'admin',
      password: 'admin',
      region: 'United States',
      currency: 'USD',
      language: 'English',
    }
  }
];
// {
//   0: {
//     admirerCount: 2,
//     dateJoined: Date.now(),
//     shopName: 'My Shop',
//     saleCount: 20,
//     src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
//     items: [
//       {
//         cost: 12.40,
//         imgURL: 'https://images.unsplash.com/photo-1648493788024-b5c4e31ed225',
//         itemName: 'potion'
//       }
//     ],
//     ownerInfo: {
//       name: 'Fray Bekele',
//       src: 'https://images.unsplash.com/photo-1648484099728-5acd3101b8e6'
//     }
//   }
// };

const cartItems = {
  4: {
    id: 4,
    src: 'https://placekitten.com/258/205',
    isFavorited: false,
    name: 'The kitten 5',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    shopName: 'Shoppe',
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
    quantity: 1
  },
  5: {
    id: 5,
    src: 'https://placekitten.com/258/205',
    isFavorited: true,
    name: 'The kitten 6',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    shopName: 'Shoppe',
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
    quantity: 2
  },
};

const purchaseHistory = {
  6: {
    id: 6,
    createDate: Date.now(),
    src: 'https://placekitten.com/258/205',
    shopSrc: 'https://placekitten.com/10/10',
    isFavorited: true,
    name: 'The kitten 6',
    price: 120.00,
    arrivesByDate: Date.now(),
    doesItemShipFreeInUsersCountry: true,
    peopleWithItemInCartCount: 256,
    description: 'This is a kitten',
    images: [
      { src: 'https://placekitten.com/400/500' },
      { src: 'https://placekitten.com/400/500' },
    ],
    isEtsysPick: true,
    isStarSeller: true,
    saleCount: 46,
    shopName: 'Shoppe',
    sizes: [
      'small',
      'medium',
      'large'
    ],
    stockCount: 36,
    quantity: 5
  },
};

let isShopNameAvailable = null;

let errorMessages = {};
let messages = {};

const schema = buildASTSchema(gql`
  type Query {
    shops: [Shop],
    user(jwtString: String): User
  }

  type Shop {
    id: ID
    admirerCount: Int,
    dateJoined: String,
    name: String,
    saleCount: Int,
    src: String,
    items: [Item],
    ownerInfo: User
  }

  type User {
    id: ID,
    about: String,
    birthday: String,
    city: String,
    gender: String,
    username: String,
    password: String,
    region: String,
    currency: String,
    language: String,
  }

  type Item {
    id: ID,
    src: String,
    isFavorited: Boolean,
    name: String,
    price: Float,
    arrivesByDate: String,
    doesItemShipFreeInUsersCountry: Boolean,
    peopleWithItemInCartCount: Int,
    description: String,
    images: [Image],
    isEtsysPick: Boolean,
    isStarSeller: Boolean,
    saleCount: Int,
    sizes: [String],
    stockCount: Int,   
  }

  type Image {
    src: String
  }
`);
const rootResolvers = {
  shops: () => shops,
  user: (jwtString) => {
    // query shops here
    const userObj = jwt.decode(jwtString.jwtString);
    const decodedUserID = userObj.id;
    return Users[decodedUserID];
  },
  // Users[jwt.decode(userID)],
};

app.use('/graphql',
  graphqlHTTP(
    req => ({
      schema,
      rootValue: rootResolvers,
      graphiql: true,
      context: {
        auth: req.auth,
      }
    })
  ));

app.post('/search', (req, res) => {
  if (
    req.body
    && req.body.searchText
  ) {
    const { searchText } = req.body;
    if (searchText) {
      const fuse = new Fuse(Object.values(items), {
        keys: ['name']
      });
      const searchResults = fuse.search(searchText);
      const searchResult = searchResults.map(searchResult => searchResult.item);
      res.send({ searchResult });
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = 'Invalid search string';
      res.send({ errorMessages }, 200);
    }
  }
});

app.get('/shops', (req, res) => {
  res.send({ shops });
});


app.get('/items', (req, res) => {
  res.send({ items });
});

app.get('/cartItems', (req, res) => {
  res.send({ cartItems });
});

app.post('/checkShopName', (req, res) => {
  const { shopName } = req.body;
  const shopsWithShopName = Object.values(shops).filter(shop => shop.name === shopName);
  if (shopsWithShopName.length === 1) {
    isShopNameAvailable = false;
  } else if (shopsWithShopName.length === 0) {
    isShopNameAvailable = true;
  }
  res.send({ isShopNameAvailable });
});

app.post('/createShop', (req, res) => {
  const { shopName } = req.body;
  // insert new row into shops table
  shops[shops.length + 1] = { name: shopName };
  res.send({ myShopInfo: shops });
});

app.get('/purchaseHistory', (req, res) => {
  res.send({ purchaseHistory });
});

app.post('/signup', (req, res) => {
  messages = {};
  if (req.session.user) {
    res.render('Dashboard', {
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
        id: user.id,
        username: user.username
      }, JWT_SECRET_KEY);
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
    && req.body.itemID != null
  ) {
    const { itemID } = req.body;
    if (items[itemID]) {
      items[itemID].isFavorited = true;
      res.send({ items: Object.values(items), item: items[itemID] }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = `Item with ID: "${
        itemID
      }" does not exist`;
      res.send({ errorMessages }, 200);
    }
  }
});

app.post('/addCartItem', (req, res) => {
  if (
    req.body
    && req.body.itemID
  ) {
    const { itemID } = req.body;
    if (items[itemID]) {
      cartItems[itemID] = items[itemID];
      res.send({ cartItems: Object.values(cartItems), itemID }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = `Item with ID: "${
        itemID
      }" does not exist`;
      res.send({ errorMessages }, 200);
    }
  }
});

app.post('/removeCartItem', (req, res) => {
  if (
    req.body
    && req.body.itemID
  ) {
    const { itemID } = req.body;
    if (cartItems[itemID]) {
      delete cartItems[itemID];
      res.send({ cartItems: Object.values(cartItems), itemID }, 200);
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
    && req.body.itemID != null
  ) {
    const { itemID } = req.body;
    if (items[itemID]) {
      items[itemID].isFavorited = false;
      res.send({ items: Object.values(items), item: items[itemID] }, 200);
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
  ) {
    const { jwtKey, userInfo } = req.body;
    const userObj = jwt.decode(jwtKey);
    if (Users[userObj.id] != null) {
      Users[userObj.id] = {
        ...Users[userObj.id],
        ...userInfo
      };
      console.log(userInfo);
      console.log(Users[userObj.id]);
      res.send({ userInfo: Users[userObj.id] }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = 'User has issues';
      res.send({ errorMessages }, 200);
    }
  }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
