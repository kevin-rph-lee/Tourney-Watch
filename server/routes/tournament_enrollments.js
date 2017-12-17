"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, owjs) => {

  const offenseHeroes = ['doomfist', 'genji', 'mccree', 'pharah', 'soldier:_76', 'sombra', 'tracer'];
  const defenseHeroes = ['bastion', 'hanzo', 'junkrat', 'mei', 'torbjörn', 'widowmaker'];
  const tankHeroes = ['d.va', 'orisa', 'reinhardt', 'roadhog', 'winston', 'zarya'];
  const supportHeroes = ['ana', 'lúcio', 'mercy', 'moira', 'symmetra', 'zanyatta'];

  function roleTimes(data, heroNames) {
    let totalTime = 0;
    Object.keys(data.quickplay.heroes).reduce((sum, key) => {
      const arrayOfTimes = [];
      for (const i in heroNames) {
        if (data.quickplay.heroes[`${heroNames[i]}`]) {
          arrayOfTimes.push(data.quickplay.heroes[`${heroNames[i]}`].time_played);
        }
      }
      return totalTime = arrayOfTimes.reduce((a, b) => a + b);
    }, 0);
    return totalTime;
  };

  function sortTime(data) {
    let sorted = '';
    const playerTimeStats = [
      {role: 'offense', time : roleTimes(data, offenseHeroes)},
      {role: 'defense', time : roleTimes(data, defenseHeroes)},
      {role: 'tank', time : roleTimes(data, tankHeroes)},
      {role: 'support', time : roleTimes(data, supportHeroes)}
    ];
   return playerTimeStats.sort((a, b) => { return b.time - a.time });
  }

  
  //user registers
  router.post("/new", (req, res) => {
    // overwatch api insists on all lowercase
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
                // prints the amount of seconds a person spends as healer
                const totalHealTime = Object.keys(data.quickplay.heroes).reduce((sum, key) => {
                  if (data.quickplay.heroes[key].healing_done) {
                    return sum + data.quickplay.heroes[key].time_played;
                  }
                  return sum;
                }, 0);

                const roleRanks = sortTime(data);

                console.log(roleRanks[0].role)
                console.log(roleRanks[1].role)



                const healsPerSecond = data.quickplay.global.healing_done / totalHealTime * 100;
                // may not be accurate as healers can also damage...could add up all dmg done by 
                // those heros that did not have the healing_done stat ??
                const dmgPerSecond = data.quickplay.global.all_damage_done / (data.quickplay.global.time_played - totalHealTime);

                const playerLevel = data.profile.level;
                // prints array of all player's hero information listed
                // let playerHeroStats = Object.keys(data.quickplay.heroes).map((key) => {
                //     return {
                //       'hero' : key,
                //       'tot_dmg': data.quickplay.heroes[key].all_damage_done,
                //       'tot_heals': data.quickplay.heroes[key].healing_done || 0,
                //       'tot_time': data.quickplay.heroes[key].time_played
                //     };
                //   })
                // knex('tournament_enrollments').insert({
                //   'id': params,
                //   'user_id': params,
                //   'team_id': params,
                //   'tournament_id': params,
                //   'first_role': roleRanks[0].role,
                //   'first_role_rank': null,
                //   'second_role': roleRanks[1].role,
                //   'second_role_rank': null
                // })
              })
          )
        }
    });
  });


  return router;
}
