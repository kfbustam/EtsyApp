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

const { MongoClient, ObjectId } = require('mongodb');

app.use(cors());
// set the view engine to ejs
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// set the directory of views
app.set('views', './src/client');
app.use(express.static('dist'));
app.get('/api/getUsername', async (req, res) => res.status(200).send({ username: os.userInfo().username }));

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

const JWT_SECRET_KEY = 'SECRETKEYJWTLOGIN';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';
let users;
let items;
let shops;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  users = db.collection('users');
  items = db.collection('items');
  shops = db.collection('shops');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(async () => {
    await users.insertMany([{
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
    }]);
    await items.insertMany([
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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

    ]);
    await shops.insertMany([{
      admirerCount: 2,
      dateJoined: Date.now(),
      name: 'The kitten 6',
      saleCount: 3,
      src: 'https://placekitten.com/400/500',
      items: [],
      ownerInfo: {
        username: 'admin',
        password: 'admin',
        region: 'United States',
        currency: 'USD',
        language: 'English',
      }
    }]);
  })
  .catch(console.error)
  .finally(() => client.close());

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

const cartItems = [
  {
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
  {
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
];

const purchaseHistory = [
  {
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
];

let isShopNameAvailable = null;

let errorMessages = {};
let messages = {};

const schema = buildASTSchema(gql`
  type Query {
    shops: [Shop],
    user(jwtString: String): User
  }

  type Shop {
    admirerCount: Int,
    dateJoined: String,
    name: String,
    saleCount: Int,
    src: String,
    items: [Item],
    ownerInfo: User
  }

  type User {
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
  user: async (jwtString) => {
    await client.connect();
    // query shops here
    const userObj = jwt.decode(jwtString.jwtString);
    const filteredDocs = await users.find({ username: userObj.username }).toArray();
    return filteredDocs;
  },
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

app.post('/search', async (req, res) => {
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
      res.status(200).send({ searchResult });
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = 'Invalid search string';
      res.status(200).send({ errorMessages });
    }
  }
});

app.get('/createShopItem', async (req, res) => {
  const {
    admirerCount,
    dateJoined,
    name,
    saleCount,
    src,
    userID
  } = req.body;
  await client.connect();
  // insert new row into shops table
  await shops.insertMany([{
    admirerCount,
    dateJoined,
    name,
    saleCount,
    src,
    items: []
  }]);
  const newShop = await shops.findOne({});
  res.status(200).send({ myShopInfo: newShop });
});


app.get('/shops', async (req, res) => {
  res.status(200).send({ shops });
});


app.get('/items', async (req, res) => {
  await client.connect();
  const allItems = await items.find().toArray();
  res.status(200).send({ items: allItems });
});

app.get('/cartItems', async (req, res) => {
  res.status(200).send({ cartItems });
});

app.post('/checkShopName', async (req, res) => {
  const { shopName } = req.body;
  const shopsWithShopName = Object.values(shops).filter(shop => shop.name === shopName);
  if (shopsWithShopName.length === 1) {
    isShopNameAvailable = false;
  } else if (shopsWithShopName.length === 0) {
    isShopNameAvailable = true;
  }
  res.status(200).send({ isShopNameAvailable });
});

app.post('/createShop', async (req, res) => {
  const { shopName } = req.body;
  await client.connect();
  // insert new row into shops table
  await shops.insertMany([{
    admirerCount: 2,
    dateJoined: Date.now(),
    name: shopName,
    saleCount: 3,
    src: 'https://placekitten.com/400/500',
    items: [],
    ownerInfo: {
      username: 'admin',
      password: 'admin',
      region: 'United States',
      currency: 'USD',
      language: 'English',
    }
  }]);
  const newShop = await shops.findOne({});
  res.status(200).send({ myShopInfo: newShop });
});

app.get('/purchaseHistory', async (req, res) => {
  res.status(200).send({ purchaseHistory });
});

app.post('/signup', async (req, res) => {
  await client.connect();
  messages = {};
  if (req.session.user) {
    res.render('Dashboard', {
      messages,
    });
  } else {
    console.log('Req Body : ', req.body);
    const userThatMatches = await users.find({ username: req.body.username });
    if (
      userThatMatches.length === 1
    ) {
      console.log('user already exists');
      errorMessages.DUPLICATE_USER = 'Unfortunately, that username is already taken. Please choose another username.';
      res.status(404).send({ errorMessages });
    } else if (userThatMatches.length > 1) {
      console.log('Duplicate users in the DB found!');
    } else {
      errorMessages = {};
      messages.VALID_DELETED_BOOK = 'You have successfully signed up!';
      await users.insertMany([{
        username: req.body.username,
        password: req.body.password,
      }]);
      res.status(404).send({ messages, errorMessages });
    }
  }
});

app.post('/login', async (req, res) => {
  await client.connect();
  messages = {};
  if (req.session.user) {
    res.render('Dashboard', {
      messages,
    });
  } else {
    console.log('Req Body : ', req.body);
    const userThatMatches = await users.find({ username: req.body.username, password: req.body.password }).toArray();
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
      res.status(404).send({ token, errorMessages });
    } else if (userThatMatches.length > 1) {
      console.log('Duplicate users in the DB found!');
    } else {
      console.log('user not found');
      messages = {};
      errorMessages.INVALID_LOGIN_CREDENTIALS = 'Invalid login credentials';
      res.status(404).send({ errorMessages });
    }
  }
});

app.post('/logout', async (req, res) => {
  errorMessages = {};
  req.session.user = null;
  res.redirect('/');
});

app.post('/favoriteItem', async (req, res) => {
  await client.connect();
  if (
    req.body
    && req.body.itemID != null
  ) {
    const { itemID } = req.body;
    const item = await items.find({ _id: ObjectId(itemID) }).toArray();
    if (item.length === 1) {
      items.updateOne({ _id: ObjectId(itemID) }, { $set: { isFavorited: true } }, (err, res) => {
        if (err) throw err;
        console.log('1 object updated');
      });
      const updatedItems = await items.find().toArray();
      const updatedItem = await items.find({ _id: ObjectId(itemID) }).toArray();
      res.send({ items: updatedItems, item: updatedItem[0] }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = `Item with ID: "${
        itemID
      }" does not exist`;
      res.status(200).send({ errorMessages });
    }
  }
});

app.post('/addCartItem', async (req, res) => {
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
      res.status(200).send({ errorMessages });
    }
  }
});

app.post('/removeCartItem', async (req, res) => {
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
      res.status(200).send({ errorMessages });
    }
  }
});

app.post('/unFavoriteItem', async (req, res) => {
  await client.connect();
  if (
    req.body
    && req.body.itemID != null
  ) {
    const { itemID } = req.body;
    const item = await items.find({ _id: ObjectId(itemID) }).toArray();
    if (item.length === 1) {
      items.updateOne({ _id: ObjectId(itemID) }, { $set: { isFavorited: false } }, (err, res) => {
        if (err) throw err;
        console.log('1 object updated');
        console.log(res);
      });
      const updatedItems = await items.find().toArray();
      const updatedItem = await items.find({ _id: ObjectId(itemID) }).toArray();
      res.send({ items: updatedItems, item: updatedItem[0] }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = `Item with ID: "${
        itemID
      }" does not exist`;
      res.status(200).send({ errorMessages });
    }
  }
});

app.post('/updateUserInfo', async (req, res) => {
  await client.connect();
  if (
    req.body
  ) {
    const { jwtKey, userInfo } = req.body;
    const userObj = jwt.decode(jwtKey);
    const userThatMatches = await users.find({ username: userObj.username }).toArray();
    if (userThatMatches.length === 1) {
      const updateResult = await users.updateOne(
        { username: userObj.username },
        {
          $set: {
            about: userInfo.about,
            birthday: userInfo.birthday,
            city: userInfo.city,
            gender: userInfo.gender,
            username: userInfo.username,
            password: userInfo.password,
            region: userInfo.region,
            currency: userInfo.currency,
            language: userInfo.language,
            src: userInfo.src,
          }
        }
      );
      const updatedUser = await users.find({ _id: ObjectId(updateResult.upsertedId) }).toArray();
      res.send({ userInfo: updatedUser[0] }, 200);
    } else {
      errorMessages = {};
      errorMessages.INVALID_BOOK_ID_ALREADY_IN_USE = 'User has issues';
      res.status(404).send({ errorMessages });
    }
  }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
