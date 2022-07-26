const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config.json');


// Require routers
const graphRouter = require("./routers/graphRouter");

// Require other files
const bearerStrategy = require("./middleware/passportB2C");

// Initialize app
const app = express();

// Setup morgan middleware
app.use(morgan('dev'));

// Setup body-parser middleware
// app.use(bodyParser.json());

// Setup CORS
app.use(cors());

// Setup passport middleware
app.use(passport.initialize());
passport.use(bearerStrategy);
app.use(passport.authenticate("oauth-bearer", { session: false }));


app.use("/userinfo", graphRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

module.exports = app;