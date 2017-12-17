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
    createGames(tournamentID, noOfTeams);

  }

  function sortPlayers(players){

  }

  function createGames(tournamentID, noOfTeams){
    knex
      .select("id")
      .from("teams")
      .where({tournament_id : tournamentID})
      .then((result) => {
        for(let i = 0; i < noOfTeams/2; i ++){
          //TO DO, insert teams TALK TO MENTOR ABOUIT THIS
        }
      });
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
          if (checkUserCount(results[0].no_of_teams, req.params.id)){
            //render the page somehow with big red button
          } else {
            //render it without the big red button
          }
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


  //Starts tournament - hit the big red button
  router.post("/:id/start", (req, res) => {
    //Checking if tournament already exists, it doens't, send 404
    //TO DO: check with front end to see what data they send down
    //
    //TO DO: create another knex sleect statment to get no of teams
    knex
      .select("*")
      .from("tournament_enrollments")
      .where({tournament_id : req.params.id})
      .then((results) => {
        seedPlayers(req.param.id, results, results.length/6);
      });
  });









  return router;
}
