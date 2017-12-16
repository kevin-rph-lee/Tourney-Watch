"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  /**
   * Checks the # of players enrolled in a tournament. Returns true if it's full, false if there is still room
   *
   * @param  string no_of_teams  the # of teams in this tournament
   * @return boolean             true if the tournament
   */
  function checkUserCount(noOfTeams, tournamentID){
     knex
      .select("id")
      .from("tournament_enrollments")
      .where({id : tournamentID})
      .then((result) => {
        if((noOfTeams * 6) === result.length){
          return true;
        } else {
          return false;
        }
    });
  }

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

    //creates new tournament
  router.post("/:id", (req, res) => {
    //Checking if tournament already exists, it doens't, send 404
    //TO DO: check with front end to see what data they send down
    knex
      .select("name", "no_of_teams")
      .from("tournaments")
      .where({id : req.params.id})
      .then((results) => {
        console.log('Results ',results);
        if(results.length === 0){
          res.sendStatus(400);
        } else{

        }
    });
  });

  return router;
}
