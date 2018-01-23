require('dotenv').config();

const port = process.env.PORT || 8080;
const env = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[env]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const cookieSession = require('cookie-session');
const owjs = require('overwatch-js');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mailGun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API, domain: process.env.MAILGUN_DOMAIN });
const moment = require('moment');

const multer = require('multer');

var path = require('path')

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads')
  },
  filename: function(req, file, callback) {
    console.log(file)
    callback(null, req.session.userID + path.extname(file.originalname))
  }
})

const app = express();

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
  maxAge: 24 * 60 * 60 * 1000,
}));

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));



// Mount all resource routes
app.use('/users', usersRoutes(knex, bcrypt, cookieSession, owjs, _, path, multer));
app.use('/enrollments', enrollmentsRoutes(knex, owjs, _, moment));
app.use('/tournaments', tournamentsRoutes(knex, _, env, mailGun, owjs));
app.use('/highlights', highlightsRoutes(knex));

function playersEnrolled(tournamentID) {
  return knex
    .select('users.battlenet_id', 'level', 'games_won', 'medal_gold', 'medal_silver', 'medal_bronze')
    .from('enrollments')
    .innerJoin('users', 'users.id', 'enrollments.user_id')
    .where({ tournament_id: tournamentID })
    .then((result) => {
      return result;
    });
}




// Home page, passes along whis logged in as the 'login' variable
app.get('/', async (req, res) => {
  const email = req.session.email;
  if (!email) {
    res.render('index', { email: email });
  } else {
    const asPlayerList = [];
    const asOwnerList = [];
    knex
      .select('tournament_id', 'tournaments.name', 'tournaments.is_started')
      .from('enrollments')
      .innerJoin('tournaments', 'tournaments.id', 'enrollments.tournament_id')
      .innerJoin('users', 'users.id', 'enrollments.user_id')
      .where({ email: email })
      .then(async (asPlayer) => {
        for (let t = 0; t < asPlayer.length; t++) {
          const playerRosterCount = await playersEnrolled(asPlayer[t].tournament_id);
          asPlayer[t].enrolledPlayers = playerRosterCount.length;
          asPlayerList.push(asPlayer[t]);
        }
        knex
          .select('tournaments.id', 'name', 'is_started', 'no_of_teams')
          .from('tournaments')
          .innerJoin('users', 'users.id', 'tournaments.creator_user_id')
          .where({ email: email })
          .then(async (asOwner) => {
            for (let t = 0; t < asOwner.length; t++) {
              const ownerRosterCount = await playersEnrolled(asOwner[t].id);
              asOwner[t].enrolledPlayers = ownerRosterCount.length;
              const isReady = (asOwner[t].enrolledPlayers === (asOwner[t].no_of_teams * 6));
              if (!isReady) {
                asOwner[t].status = 'Waiting';
              } else if (isReady && asOwner[t].is_started) {
                asOwner[t].status = 'In Progress';
              } else {
                asOwner[t].status = 'Ready';
              }
              asOwnerList.push(asOwner[t]);
            }

            res.render('index', {
              email: req.session.email,
              userID: req.session.userID,
              asPlayerList: asPlayerList,
              asOwnerList: asOwnerList,
            });
          });
      });
  }
});


// shortened link to redirect to tournaments pages
app.get('/t/:id', (req, res) => {
  const tournamentID = req.params.id;
  res.redirect(`/tournaments/${tournamentID}`);
});

app.get('/faq', (req, res) => {
  res.render('faq', { email: req.session.email, userID: req.session.email });
});

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
