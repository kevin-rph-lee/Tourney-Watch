"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, owjs, _) => {

  //user registers
  router.post("/new", (req, res) => {
    const firstHero = 'tracer'
    const secondHero = req.body.secondHero
    //TO DO!!!!!!!!!!!!!!! get params properly
    //Checking if user already exists, if user exists, DO NOT create it
    console.log('before', firstHero);
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
                // prints array of all player's hero information listed
                // let playerHeroStats = Object.keys(data.quickplay.heroes).map((key) => {
                //     return {
                //       'hero' : key,
                //       'tot_dmg': data.quickplay.heroes[key].all_damage_done,
                //       'tot_heals': data.quickplay.heroes[key].healing_done || 0,
                //       'tot_time': data.quickplay.heroes[key].time_played
                //     };
                //   })
                return knex('tournament_enrollments').insert({
                  'id': params,
                  'user_id': params,
                  'team_id': params,
                  'tournament_id': params,
                  'first_hero_stat': data.quickplay,
                  'first_hero_rank': null,
                  'second_hero_stat': data.quickplay,
                  'second_hero_rank': null
                })
              })
          )
        }
    });
  });


  return router;
}
