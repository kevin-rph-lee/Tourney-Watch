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

  /**
   * Creates teams and seeds players
   * @param  array players an array of players in the tournament
   * @return {[type]}         [description]
   */
  function seedPlayers(tournamentID, players, noOfTeams){
    sortPlayers(players);
    for(let i = 0; i < noOfTeams; i ++){
      knex
        .insert({tournament_id: tournamentID})
        .into('teams')
        .then(()=>{
          //TO DO, SEED THE ALYERS TO THIS TEAM
        });
    }
  }

  function sortPlayers(players){
    //TO DO: sort the players
  }



  //Shows dashboard
  router.get("/:id", (req, res) => {
    //Checking if tournament already exists, it doens't, send 404
    //TO DO: check with front end to see what data they send down
    knex
      .select("name", "no_of_teams")
      .from("tournaments")
      .where({id : req.params.id})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else {
          //TO DO: render front end dashboard
        }
    });
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


  //Starts tournament
  router.post("/:id/start", (req, res) => {
    //Checking if tournament already exists, it doens't, send 404
    //TO DO: check with front end to see what data they send down
    knex
      .select("id")
      .from("tournaments")
      .where({id : req.params.id})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else {

          //TO DO: start tournament
          //knex state to get the players
          //of those players, run seedPlayers(players)


        }
      });
  });









  return router;
}
