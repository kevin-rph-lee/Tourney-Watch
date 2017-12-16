"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //creates new tournament
  router.post("/new", (req, res) => {
    const name = req.body.name;
    const noOfTeams = req.body.no_of_teams;
    const description = req.body.description;

    if(!name){
      res.sendStatus(400);
      return;
    }
    //Checking if tournament already exists, if user exists, DO NOT create it
    knex
      .select("name")
      .from("tournaments")
      .where({name : name})
      .then((results) => {
        console.log('Results ',results);
        if(results.length === 0){
          knex
          .insert({name: name, no_of_teams: noOfTeams, description: description})
          .into('tournaments')
          .then(()=>{});
          res.sendStatus(200);
        } else{
          res.sendStatus(400);
        }
    });
  });

 //starts a tournament
  router.post("/start", (req, res) => {
    const name = req.body.name;
     if(!name){
      res.sendStatus(400);
      return;
    }
    //Checking if tournament already exists, if user exists, DO NOT create it
    knex
      .select("name")
      .from("tournaments")
      .where({name : name})
      .then((results) => {
        console.log('Results ',results);
        if(results.length === 0){
          res.sendStatus(404);
        } else{
          //run sorting algorithm there
          res.sendStatus(200);
        }
    });
  });

  return router;
}
