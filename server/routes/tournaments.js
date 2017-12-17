"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  function sortPlayersDesc(data, key) {
    return data.sort((a, b) => {
      return b[key] - a[key]
    })
  };

  // FIGURE OUT BETTER WORD FOR roleChoiceNo
  function countSupport(data, roleChoiceNo) {
    let count = 0;
    data.forEach((key) => {
      if (key[roleChoiceNo] === 'support') {
        return count ++;
      } 
    })
    return count;
  };


  // creates new tournament
  router.post("/new", (req, res) => {
    const name = req.body.name;
    const noOfTeams = req.body.no_of_teams;
    const description = req.body.description;

    if(!name){
      res.sendStatus(400);
      return;
    }
    // Checking if tournament already exists, if user exists, DO NOT create it
    knex
      .select("name")
      .from("tournaments")
      .where({name : name})
      .then((results) => {
        console.log('Results ',results);
        if(results.length === 0){
          knex
          .insert({name: name, no_of_teams: noOfTeams, description: description, isReady: false})
          .into('tournaments')
          .then(()=>{});
          res.sendStatus(200);
        } else{
          res.sendStatus(400);
        }
    });
  });

 // starts a tournament
  // router.post("/start", (req, res) => {
  //   const name = req.body.name;
  //    if(!name){
  //     res.sendStatus(400);
  //     return;
  //   }
  //   //Checking if tournament already exists, if user exists, DO NOT create it
  //   knex
  //     .select("name")
  //     .from("tournaments")
  //     .where({name : name})
  //     .then((results) => {
  //       console.log('Results ',results);
  //       if(results.length === 0){
  //         res.sendStatus(404);
  //       } else{
  //         //run sorting algorithm there
  //         res.sendStatus(200);
  //       }
  //   });
  // });

    router.post("/start", (req, res) => {
      knex
        .select("id", "first_role", "first_role_time_played", 
        "second_role", "second_role_time_played")
        .from("tournament_enrollments")
        .where({tournament_id : req.body.tournID})
        .then((results) => {  
          if(countSupport(results, 'first_role') > (results.length/6)) {

            res.send('ready to sort');
          } else {
            res.send('fix algo');
          }
            
        })
    })

  return router;
}
