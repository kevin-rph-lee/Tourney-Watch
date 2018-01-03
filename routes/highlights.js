"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id/", (req, res) => {
    knex
      .select('name', 'url')
      .from("highlights")
      .where({tournament_id : req.params.id})
      .then((results) => {
        // console.log(playerStats[0]);
        res.send(results);
      });
  });



  return router;
};
