"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  //Goes to new tournaments page
  router.get('/new', (req, res) => {
    res.render('create_tournament');
  });

  //creates new tournament
  router.post("/new", (req, res) => {
    //Checking if tournament already exists, if user exists, DO NOT create it
    knex
      .select("name")
      .from("tournaments")
      .where({name : req.body.name})
      .then((results) => {
        console.log('Results ',results);
        if(results.length === 0){
          knex
          .insert({name: req.body.name, no_of_teams: req.body.no_of_teams, description: req.body.description})
          .into('tournaments')
          .then(()=>{});
          res.sendStatus(200);
        } else{
          res.sendStatus(400);
        }
    });
  });

  return router;
}
