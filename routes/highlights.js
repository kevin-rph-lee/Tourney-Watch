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
    //TO DO - get a better function
    const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

    return (url.match(VID_REGEX)[1]);
  }

  router.get("/:id/", (req, res) => {
    knex
      .select('id', 'name', 'url')
      .from("highlights")
      .where({tournament_id : req.params.id})
      .then((results) => {
        // console.log(playerStats[0]);
        res.send(results);
      });
  });

  router.post("/:id/new", (req, res) => {
    //TO-DO-Refactor to a promise chain
    //error checking
    if(!req.body.name || !req.body.url){
      return res.sendStatus(400);
    }
    knex
      .select('id')
      .from("tournaments")
      .where({id : req.params.id})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else {
          knex
            .select('name')
            .from('highlights')
            .where({name:req.body.name, tournament_id:req.params.id})
            .then((results)=>{
              if(results.length === 0){
                console.log(req.body);
                knex
                  .insert({name: req.body.name, url: getYoutubeID(req.body.url), tournament_id: req.params.id})
                  .into('highlights')
                  .then(()=>{
                    res.redirect("/tournaments/" + req.params.id + "/");
                  });
                } else{
                  res.sendStatus(400);
                }
            })
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
            .where({id: req.body.id})
            .del()
            .then(()=>{
              res.sendStatus(200);
            });
        }
      });
  });



  return router;
};
