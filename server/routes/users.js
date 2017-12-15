"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/new", (req, res) => {
    console.log('Getting post request...', req.body.email);
    knex
      .insert({email: req.body.email, password: bcrypt.hashSync(req.body.password, 10), battlenet_id: req.body.battlenet_id})
      .into("users")
      .then(() => {
        console.log('inserted user successfully');
        res.sendStatus(200);
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  });

  return router;
}
