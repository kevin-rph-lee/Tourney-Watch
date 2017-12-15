"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Add new tournament
  router.post("/new", (req, res) => {
    knex
    .insert({no_of_teams: req.body.no_of_teams, description: req.body.description})
    .into('tournaments')
    .then(()=>{res.sendStatus(200)});
  });
  return router;
}
