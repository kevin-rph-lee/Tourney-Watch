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

  // FOR IF WE HARD CODE THE SORTING #s
  function teamCreator(data, teamNo) {

  }


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
          const sorted = sortPlayersDesc(results, 'first_role_time_played')
          if(countSupport(results, 'first_role') > (results.length/6)) {
            if((results.length/6) === 2) {
              res.send(console.log( { 
              'Team_1': [sorted[0].id, sorted[3].id, sorted[4].id, sorted[7].id, sorted[8].id, sorted[11].id],
              'Team_2': [sorted[1].id, sorted[2].id, sorted[5].id, sorted[6].id, sorted[9].id, sorted[10].id],
              'Team_3': [sorted[14] || null ],
              'Team_4': [sorted[14] || null ],
              'Team_5': [sorted[14] || null ],
              'Team_6': [sorted[14] || null ],
              'Team_7': [sorted[14] || null ],
              'Team_8': [sorted[14] || null ],
              'Team_9': [sorted[14] || null ],
              'Team_10': [sorted[14] || null ],
              'Team_11': [sorted[14] || null ],
              'Team_12': [sorted[14] || null ],
              'Team_13': [sorted[14] || null ],
              'Team_14': [sorted[14] || null ],
              'Team_15': [sorted[14] || null ],
              'Team_16': [sorted[14] || null ]
              }
            ))
            }

            
          } else {
            res.send('fix algo');
          }
            
        })
    })

  return router;
}
