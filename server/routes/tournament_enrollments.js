"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, owjs) => {
  // overwatch api insists on all lowercase
  const offenseHeroes = ['doomfist', 'genji', 'mccree', 'pharah', 'soldier:_76', 'sombra', 'tracer'];
  const defenseHeroes = ['bastion', 'hanzo', 'junkrat', 'mei', 'torbjörn', 'widowmaker'];
  const tankHeroes = ['d.va', 'orisa', 'reinhardt', 'roadhog', 'winston', 'zarya'];
  const supportHeroes = ['ana', 'lúcio', 'mercy', 'moira', 'symmetra', 'zanyatta'];

  function roleTimePlayed(data, heroNames) {
    return Object.keys(data.quickplay.heroes).reduce((sum, key) => {
      const arrayOfTimes = [];
      for (const i in heroNames) {
        if (data.quickplay.heroes[`${heroNames[i]}`]) {
          arrayOfTimes.push(data.quickplay.heroes[`${heroNames[i]}`].time_played);
        }
      }
      return arrayOfTimes.reduce((a, b) => a + b);
    }, 0);
  };

  function sortTimePlayed(data) {
    let sorted = '';
    const playerTimeStats = [
      {role: 'offense', time : roleTimePlayed(data, offenseHeroes)},
      {role: 'defense', time : roleTimePlayed(data, defenseHeroes)},
      {role: 'tank', time : roleTimePlayed(data, tankHeroes)},
      {role: 'support', time : roleTimePlayed(data, supportHeroes)}
    ];
   return playerTimeStats.sort((a, b) => { return b.time - a.time });
  }

  function totalTimeHealing(data) {
    return Object.keys(data.quickplay.heroes).reduce((sum, key) => {
      if (data.quickplay.heroes[key].healing_done) {
        return sum + data.quickplay.heroes[key].time_played;
      }
    return sum
    }, 0);
  }

  function healsPerSecond(data) {
    return data.quickplay.global.healing_done / totalTimeHealing * 100;
  }

  function dmgPerSecond(data) {
    return data.quickplay.global.all_damage_done / (data.quickplay.global.time_played - totalTimeHealing);
  }

  // new enrollment to tournament
  router.post("/new", (req, res) => {
    
    //TO DO!!!!!!!!!!!!!!! get params properly
    //Checking if user already exists, if user exists, DO NOT create it
    knex
      .select("battlenet_id")
      .from("users")
      .where({email : req.body.email})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else{
          res.send(owjs.getAll('pc', 'us', results[0].battlenet_id)
              .then((data) => {
                const roleRanks = sortTimePlayed(data);

                console.log('inserting into database');

                return knex('tournament_enrollments').insert({
                  'id': req.body.id,
                  'user_id': req.body.userID,
                  'team_id': null,
                  'tournament_id': req.body.tournID,
                  'level': data.profile.level,                 
                  'first_role': roleRanks[0].role,
                  'first_role_time_played': roleRanks[0].time,
                  'second_role': roleRanks[1].role,
                  'second_role_time_played': roleRanks[1].time,
                  'medal_gold': data.quickplay.global.medals_gold,
                  'medal_silver': data.quickplay.global.medals_silver,
                  'medal_bronze': data.quickplay.global.medals_bronze,
                  'games_won': data.quickplay.global.games_won
                })
              })
          )
        }
    });
  });


  return router;
}
