"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, _) => {

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
          teamAssignments.push({ 'id': playersArray[p + t].id, 'team_id': (t + 1) });
        }
      } else {
        for (let t = teamCount - 1; t >= 0; t--) {
          teamAssignments.push({'id': playersArray[p - (t - (teamCount - 1))].id, 'team_id': (t + 1)});
        }
      }
      ascending = !ascending;
    }
    return teamAssignments;
  }

  /**
   * Counts how many support type players
   *
   * @param {array} data result of overwatch api
   * @param {string} roleChoiceNo can either 'first_role' or 'second_role'
   * @returns
   */
  function countSupport(data, roleChoice) {
    let count = 0;
    data.forEach((key) => {
      if (key[roleChoice] === 'support') {
        return count ++;
      }
    });
    return count;
  }

  /**
   * This updates database to show team assignments
   *
   * @param {array} teamAssigned
   */
  function assignToTeams(teamAssigned) {
    teamAssigned.forEach((p) => {
      return knex("tournament_enrollments")
        .where({"id": p.id})
        .update({"team_id": p.team_id})
        .then(() => {});
    });
  }

  /**
   * Intializes the brackets json object based on the no of teams and updates the tournaments table
   * @param  {array} teamArray    Array of team ID objects
   * @param  {int} teamCount  No of teams in the tournament
   * @param  {int} tournamentID Tournament ID
   */
  function initializeBrackets(teamArray, teamCount, tournamentID){
    let data = {"teams": [], "results":[]};
    for (let b = 0; b < teamArray.length; b+=2 ) {
      data.teams.push(
        [{ name: teamArray[b].id    , flag: "in" },
         { name: teamArray[b + 1].id, flag: "in" },]
      );
      data.results.push(
        [0,0], [0, 0]
      );
    }
    return knex("tournaments")
      .where({"id": tournamentID})
      .update({"brackets": JSON.stringify(data), is_started: true})
      .then(() => {});
  }

  function getTeamRoster(tournamentID){
    return knex
     .select("tournaments.name", "users.battlenet_id", "team_id", "level", "games_won", "medal_gold", "medal_silver", "medal_bronze")
     .from("tournament_enrollments")
     .innerJoin("users", "users.id", "tournament_enrollments.user_id")
     .innerJoin("tournaments", "tournaments.id", "tournament_enrollments.tournament_id")
     .where({tournament_id: tournamentID})
     .orderBy("team_id", "ascd")
     .then((playerStats) => {
       return _.groupBy(playerStats, "team_id");
     });
  }

  function countPlayersEnrolled(tournamentID){
    return knex("tournament_enrollments")
      .where({tournament_id: tournamentID})
      .count("id")
      .then((result) => {
        // ASK KEVIN: instead of going through array, we can just do result.length?
        console.log('i am result in counter', result)
        console.log('i should be returning', result[0].count)
        return result[0].count;
      });
  }

  // Tournament bracket and teams page
  router.get('/brackets.json', (req, res) => {
    knex
      .select("brackets")
      .from("tournaments")
      .where({id: 1})
      .then((results) => {
        console.log(results[0]);
        res.json(results[0]);
      });
  });

  // Goes to new tournaments page
  router.get('/new', (req, res) => {
    res.render('create_tournament',{email: req.session.email});
  });

  // Creates new tournament
  router.post("/new", (req, res) => {
    // GET PARAMS CORRECTLY
    const name = req.body.name;
    const teamCount = req.body.no_of_teams;
    const description = req.body.description;

    if(!name){
      // STRETCH: Show 'That name has been taken' error page
      res.sendStatus(400);
      return;
    }
    knex
      .select("name")
      .from("tournaments")
      .where({name: name})
      .then((results) => {
        // If the tournament name does not exist, create new line in tournaments
        // and creates new lines in teams (based on # of teams needed)
        if(results.length === 0) {
          console.log(req.session)
          knex
            .insert({name: name, no_of_teams: teamCount, description: description, creator_user_id: req.session.userID, is_started: false})
            .into('tournaments')
            .returning('id')
            .then((tournamentID)=> {
              for (let i = 0; i < teamCount; i++) {
                knex("teams")
                  .insert({"tournament_id": tournamentID[0]})
                  .then(() => {});
              }
              res.sendStatus(200);
            });
        } else {
          // STRETCH: Show 'Tournament name taken' error page
          res.sendStatus(400);
        }
      });
  });

  router.get("/cards.json", (req, res) => {
    const tournamentID = req.params.id;
    // Gets player stats for each team in a specific tournament
    knex
      .select("tournaments.name", "users.battlenet_id", "team_id", "level", "games_won", "medal_gold", "medal_silver", "medal_bronze")
      .from("tournament_enrollments")
      .innerJoin("users", "users.id", "tournament_enrollments.user_id")
      .innerJoin("tournaments", "tournaments.id", "tournament_enrollments.tournament_id")
      .where({tournament_id: 1})
      .orderBy("team_id", "ascd")
      .then((playerStats) => {
        const teamRoster = _.groupBy(playerStats, "team_id");
        // console.log(teamRoster);
        res.send(teamRoster);
      });
  });

  //Updates bracket data in the DB
  router.post("/update", (req, res) => {
    console.log('Updating DB brackets');
    console.log(req.body.tournamentID + req.body.bracketData);
    knex("tournaments")
        .where({"id": req.body.tournamentID})
        .update({"brackets": req.body.bracketData})
        .then(() => {console.log('Bracket data updated')});
  });

  //TODO : get a coutn of enrolled ppl and pass it down
  router.get("/:id", (req, res) => {
    const tournamentID = parseInt(req.params.id);
    // TODO: FIX, WILL NOT CONSOLE LOG, BUUUT DOES NOT ERROR OUT ANYMORE WHEN A STRING IS USED
    if (!Number.isInteger(tournamentID)) {
      console.log('not a vaid id')
      return res.sendStatus(404);
    } else {
      return knex
      .select("id", "is_started", "creator_user_id")
      .from("tournaments")
      .where({id: tournamentID})
      .then(async (results) => {
        if(results.length === 0){
          console.log("inside selct")
          return res.sendStatus(400);
        } else {
            const playerCount = await countPlayersEnrolled(tournamentID);
            console.log('HEEEEEEEEY', playerCount);
            return res.render("tournament_view", {
              teamRoster: getTeamRoster(tournamentID), 
              playerCount: playerCount, 
              email: req.session.email,
              creatorUserId: req.session.id
            });
        }
      });
    }
  });

  router.post("/:id/start", (req, res) => {
  const tournamentID = req.params.id
    if(!name){
      // STRETCH: Show 'You did not enter a tournament name' error page
      res.sendStatus(400);
      return;
    }
    // Lists players from highest level to lowest, then assigns a team ID #
    // to each player via an array
    knex
      .select("id", "name", "no_of_teams")
      .from("tournaments")
      .where({id: tournamentID})
      .then((results) => {
        
        // console.log('Tournament ID, ' + results[0].id);

        if(results.length === 0) {
          // STRETCH: Show 'No tournament of that name found' error page
          res.sendStatus(404);
        } else {
          knex
            .select("id", "level")
            .from("tournament_enrollments")
            .where({tournament_id: tournamentID})
            .orderBy("level", "desc")
            .then((playersArray) => {
              knex
                .select("id")
                .from("teams")
                .where({tournament_id: tournamentID})
                .then((teamArray) => {
                  // console.log(teamArray);
                  initializeBrackets(teamArray, results[0].no_of_teams, tournamentID);
                  const teamAssigned = assignPlayersToTeams(playersArray, teamArray);
                  assignToTeams(teamAssigned);
                  res.sendStatus(200);
                });
            });
        }
      });
  });


  return router;
};
