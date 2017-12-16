"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, owjs) => {

  //user registers
  router.post("/tournament/new", (req, res) => {
    //TO DO!!!!!!!!!!!!!!! get params properly
    //Checking if user already exists, if user exists, DO NOT create it
    knex
      .select("battlenet_id")
      .from("users")
      .where({email: req.body.email})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else{
          owjs.getAll('pc', 'us', results[0].battlenet_id)
              .then((data) => {
                //pull out required information from data
                const damage = data.damage
                const healing = data.healing

                //knex thing
                //insert new row, insert 3 foriegn keys, then damage, insert kealing,
              });

        }
    });
  });


  return router;
}
