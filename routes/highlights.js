"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  /**
   * Gets the youtube ID from a youtube URL
   * @param  {[STRING]} url youtube URL
   * @return {[STRING]}     youtube ID
   */
  function getYoutubeID(url){
    VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    return (url.match(VID_REGEX)[1]);
  }

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

  router.post("/:id/", (req, res) => {
    knex
      .select('id')
      .from("tournaments")
      .where({id : req.params.id})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else {
          knex
            .insert({name: req.body.name, url: req.body.url, tournament_id: req.params.id})
            .into('highlights')
            .returning('id')
            .then((results)=>{
              res.sendStatus(200);
            });
        }
      });
  });

  router.post("/:id/new", (req, res) => {
    knex
      .select('id')
      .from("tournaments")
      .where({id : req.params.id})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else {
          knex
            .insert({name: req.body.name, url: req.body.url, tournament_id: req.params.id})
            .into('highlights')
            .returning('id')
            .then((results)=>{
              res.sendStatus(200);
            });
        }
      });
  });

  router.post("/:id/delete", (req, res) => {
    knex
      .select('id')
      .from("tournaments")
      .where({id : req.params.id})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else {
          knex('highlights')
            .where({name: req.body.name})
            .del()
            .then(()=>{
              res.sendStatus(200);
            });
        }
      });
  });



  return router;
};
