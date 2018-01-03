'use strict';

require('dotenv').config();

const port = process.env.PORT || 8080;
const env = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const app = express();
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[env]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const cookieSession = require('cookie-session');
const owjs = require('overwatch-js');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mailGun = require('mailgun-js')({apiKey: process.env.MAILGUN_API, domain: process.env.MAILGUN_DOMAIN});


// // Seperated Routes for each Resource
const usersRoutes = require('./routes/users');
const enrollmentsRoutes = require('./routes/enrollments');
const tournamentsRoutes = require('./routes/tournaments');
const highlightsRoutes = require('./routes/highlights');
// const gamesRoutes = require('./routes/games');
// const teamsRoutes = require('./routes/teams');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Mount all resource routes
app.use('/users', usersRoutes(knex, bcrypt, cookieSession, owjs));
app.use('/enrollments', enrollmentsRoutes(knex, owjs));
app.use('/tournaments', tournamentsRoutes(knex, _, env, mailGun));
app.use('/highlights', highlightsRoutes(knex));


function playersEnrolled(tournamentID){
  return knex
    .select("users.battlenet_id", "level", "games_won", "medal_gold", "medal_silver", "medal_bronze")
    .from("enrollments")
    .innerJoin("users", "users.id", "enrollments.user_id")
    .where({tournament_id: tournamentID})
    .then((result) => {
      return result
    });
}

// Home page, passes along whis logged in as the 'login' variable
app.get('/', async (req, res) => {
  const email = req.session.email

  if(!email){
    res.render('index', {email: email})
  } else {

  const asPlayerList = [];
  const asOwnerList = [];
  knex
    .select("tournament_id", "tournaments.name", "tournaments.is_started")
    .from("enrollments")
    .innerJoin("tournaments", "tournaments.id", "enrollments.tournament_id")
    .innerJoin("users", "users.id", "enrollments.user_id")
    .where({email: email})
    .then( async (asPlayer) => {
      for (let t = 0; t < asPlayer.length; t++) {
        const playerRosterCount = await playersEnrolled(asPlayer[t].tournament_id);
        asPlayer[t].enrolledPlayers = playerRosterCount.length;
        asPlayerList.push(asPlayer[t]);
      }
      knex
        .select("tournaments.id", "name", "is_started", "no_of_teams")
        .from("tournaments")
        .innerJoin("users", "users.id", "tournaments.creator_user_id")
        .where({email: email})
        .then( async (asOwner) => {
          for (let t = 0; t < asOwner.length; t++) {
            const ownerRosterCount = await playersEnrolled(asOwner[t].id);
            asOwner[t].enrolledPlayers = ownerRosterCount.length;
            const isReady = (asOwner[t].enrolledPlayers === (asOwner[t].no_of_teams * 6));
            if (!isReady) {
              asOwner[t].status = "Waiting";
            } else if (isReady && asOwner[t].is_started) {
              asOwner[t].status = "In Progress";
            } else {
              asOwner[t].status = "Ready";
            }
            asOwnerList.push(asOwner[t]);
          }

          res.render('index', {
            email: req.session.email,
            asPlayerList: asPlayerList,
            asOwnerList: asOwnerList
          });
        });
      })
  }
});

app.get("/faq", (req, res) => {

  res.render("faq", {email: req.session.email})
});

app.get('/json', (req, res) => {
  res.json(['Joel', 'Mel']);
})

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log('Example app listening on port ' + port);
});
