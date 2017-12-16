"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, owjs) => {

  function getDamage() {
    
  }

  function print() {
    //run loop over ovwjs adn reutrn an array of results
    players = callPlayers();
    console.log(players);
  }

  router.get("/", (req, res) => {
    knex
    .select("battlenet_id")
    .from("users")
    .then((results) => {
      const damage = getDamage(results);
      res.render('users', { 'results': damage })
    });
    
    
    
    
  });

  return router;
}
