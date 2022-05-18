# EtsyApp

```bash
# install packages
npm install

# Start development server (client and server)
yarn dev (or npm run dev)

# MongoDB

# Delete all DBs
mongo --quiet --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'

```

The foundation for the underlying stack (e.g., webpack config, initial package.json, etc.) is a fork of: https://github.com/crsandeep/simple-react-full-stack 
All other packages can be found in https://www.npmjs.com/