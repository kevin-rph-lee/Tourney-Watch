"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
/**
 * This assigns each player to a team based off their skill level
 * 
 * @param {array} playersArray 
 * @param {array} teamArray 
 * @returns {array}
 */
  function assignPlayersToTeams(playersArray, teamArray) {
    const teamAssignments = [];
    const playerCount = playersArray.length;
    const teamCount = teamArray.length;
    const maxPlayerOffset = playerCount - (playerCount % teamCount);
    let ascending = true;
  
    for (let p = 0; p < maxPlayerOffset; p += teamCount) {
      if(ascending) {
        for (let t = 0; t < teamCount; t++) {
         teamAssignments.push({ 'id': playersArray[p + t].id, 'team_id' : t })
  
        }
      } else {
        for (let t = teamCount - 1; t >= 0; t--) {
          teamAssignments.push({'id' : playersArray[p - (t - (teamCount - 1))].id, 'team_id' : t})
        }
      }
      ascending = !ascending  
    }
    return teamAssignments;
  }

  // FIGURE OUT BETTER WORD FOR roleChoiceNo
  function countSupport(data, roleChoiceNo) {
    let count = 0;
    data.forEach((key) => {
      if (key[roleChoiceNo] === 'support') {
        return count ++;
      } 
    })
    return count;
  }
  
/**
 * This updates database to show team assignments
 * 
 * @param {array} teamAssigned 
 */
  function assignToTeams(teamAssigned) {
   teamAssigned.forEach((p) => {
     knex("tournament_enrollments")
     .where({"id" : p.id})
     .update({"team_id" : p.team_id})
     .then(() => {
       console.log('stuff inserted');
     })
   })
  }

  // Creates new tournament
  router.post("/new", (req, res) => {
    const name = req.body.name;
    const teamCount = req.body.no_of_teams;
    const description = req.body.description;

    if(!name){
      res.sendStatus(400);
      return;
    }
    knex
      .select("name")
      .from("tournaments")
      .where({name : name})
      .then((results) => {
        // If the tournament name does not exist, create new line in tournaments
        // and creates new lines in teams (based on # of teams needed)
        if(results.length === 0) {
          knex
          .insert({name: name, no_of_teams: teamCount, description: description})
          .into('tournaments')
          .returning('id')
          .then((tournamentID)=> {
            for (let i = 0; i < teamCount; i++) {
              knex("teams")
                .insert({"tournament_id" : tournamentID[0]})
                .then(() => {})
            }
            res.sendStatus(200);
          })
        } else {
          // STRETCH: Show 'Tournament name taken' error page
          res.sendStatus(400);
        };
      });
  })

  // Starts seeding the registered players in to balanced teams
  router.post("/start", (req, res) => {
    const tournamentID = req.body.tournID;
    const name = req.body.name;

    if(!name){
      // STRETCH: Show 'You did not enter a tournament name' error page
      res.sendStatus(400);
      return;
    }
    // Lists players from highest level to lowest, then assigns a team ID # 
    // to each player via an array
    knex
      .select("name")
      .from("tournaments")
      .where({name : name})
      .then((results) => {
        if(results.length === 0) {
          // STRETCH: Show 'No tournament of that name found' error page
          res.sendStatus(404);
        } else {
          knex
            .select("id", "level")
            .from("tournament_enrollments")
            .where({tournament_id : tournamentID})
            .orderBy("level", "desc")
            .then((playersArray) => {
              knex
                .select("id")
                .from("teams")
                .where({tournament_id : tournamentID})
                .then((teamArray) => {
                  const teamAssigned = assignPlayersToTeams(playersArray, teamArray);
                  assignToTeams(teamAssigned)
                  res.sendStatus(200);
                })  
            })
        }
      })
  });
  return router;
}