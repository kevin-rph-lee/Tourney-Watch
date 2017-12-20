"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, _) => {


  //Goes to new tournaments page
  router.get('/new', (req, res) => {
    res.render('create_tournament',{email: req.session.email});
  });


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
      knex("tournament_enrollments")
        .where({"id": p.id})
        .update({"team_id": p.team_id})
        .then(() => {});
    });
  }

  /**
   * Intializes the brackets json object based on the no of teams and updates the tournaments table
   * @param  {array} teamArray    Array of team ID objects
   * @param  {int} no_of_teams  No of teams in the tournament
   * @param  {int} tournamentID Tournament ID
   */
  function initializeBrackets(teamArray, no_of_teams, tournamentID){
    let brackets = '';
    if(no_of_teams === 8){
      brackets =
      `{
        "teams": [
            [
                { name: ${teamArray[0].id}, flag: "in" },
                { name: ${teamArray[1].id}, flag: "in" },
            ],
            [
                { name: ${teamArray[2].id}, flag: "in" },
                { name: ${teamArray[3].id}, flag: "in" },
            ],
            [
                { name: ${teamArray[4].id}, flag: "in" },
                { name: ${teamArray[5].id}, flag: "in" }
            ],
            [
                { name: ${teamArray[6].id}, flag: "in" },
                { name: ${teamArray[7].id}, flag: "in" },
            ],


        ],

        results: [[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]],
      }`
    } else {
      brakets =
      `{"teams": [
                [
                    { name: ${teamArray[0].id}, flag: 'in' },
                    { name: ${teamArray[1].id}, flag: 'in' },
                ],
                [
                    { name: ${teamArray[2].id}, flag: 'in' },
                    { name: ${teamArray[3].id}, flag: 'in' },
                ],
                [
                    { name: ${teamArray[4].id}, flag: 'in' },
                    { name: ${teamArray[5].id}, flag: 'in' }
                ],
                [
                    { name: ${teamArray[6].id}, flag: 'in' },
                    { name: ${teamArray[7].id}, flag: 'in' },
                ],
                [
                    { name: ${teamArray[8].id}, flag: 'in' },
                    { name: ${teamArray[9].id}, flag: 'in' },
                ],
                [
                    { name: ${teamArray[10].id}, flag: 'in' },
                    { name: ${teamArray[11].id}, flag: 'in' },
                ],
                [
                    { name: ${teamArray[12].id}, flag: 'in' },
                    { name: ${teamArray[13].id}, flag: 'in' },
                ],
                [
                    { name: ${teamArray[14].id}, flag: 'in' },
                    { name: ${teamArray[15].id}, flag: 'in' },
                ],

            ],

            results: [[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]],
        }`
    }
    knex("tournaments")
      .where({"id": tournamentID})
      .update({"brackets": JSON.stringify(brackets)})
      .then(() => {});
  }


  //tournament bracket and teams page
  router.get('/test', (req, res) => {
    res.render('brackets',{email: req.session.email});
  });


  router.get("/cards", (req, res) => {
    const tournamentID = req.params.id;

    // if(!tournamentID) {
    //   // STRETCH: Show 'This tournament does not exist' error page
    //   res.sendStatus(400);
    //   return;
    // }
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
        console.log(teamRoster)
        res.render("tournament_view", {teamRoster: teamRoster, email: req.session.email});
      });
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
          knex
            .insert({name: name, no_of_teams: teamCount, description: description})
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

  // Starts seeding the registered players in to balanced teams
  router.post("/start", (req, res) => {
    // GET PARAMS CORRECTLY
    const name = req.body.name;

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
      .where({name: name})
      .then((results) => {
        const tournamentID = results[0].id;
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
                  initializeBrackets(teamArray, results[0].no_of_teams, tournamentID);
                  const teamAssigned = assignPlayersToTeams(playersArray, teamArray);
                  assignToTeams(teamAssigned);
                  res.sendStatus(200);
                });
            });
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
        console.log(teamRoster);
        res.send(teamRoster);
      });
  });


  //Updates bracket data in the DB
  router.post("update/", (req, res) => {
    knex("tournaments")
        .where({"id": req.params.id})
        .update({"brackets": req.params.bracketData})
        .then(() => {console.log('Bracket data updated')});
  });



  return router;
};
