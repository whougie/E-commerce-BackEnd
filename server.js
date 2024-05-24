const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false })
.then( () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
})

// Be able to connect using the .env file
//XX Be able to run the schema file
// Be able to run the seeds
// Setup Express to use Sequelize
// Setup Sequelize to use the Models with correct attributes
// The routes for products or tags should work
// Able to used CRUD for routes