"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, bcrypt, cookieSession, owjs) => {

  /**
   * Checks a string for special characters. Returns false if one is found
   * @param  {string} string string to be checked
   * @return {boolean}        returns false if invalid characters found
   */
  function checkInvalidCharacters(string){
    return !(/^[a-zA-Z0-9-#]*$/.test(string));
  }

  function checkInvalidbnetID(bnetID){
    owjs.getAll('pc', 'us', bnetID)
      .then(() => {
        return false;
      })
      .catch((err) => {
        return true;
      })
  }

  function getPlayerInfo(bnetID){
    return owjs.getAll('pc', 'us', convertBnetID(bnetID))
  }

  /**
   * Converts a BNET ID into a string that Overwatch-js can handle
   * @param  {String} bnetID the BNET ID to convert
   * @return {String}        Bnet ID that Overwatch-js can handle
   */
  function convertBnetID(bnetID) {
    let name = bnetID.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name.replace('#','-');
  }


   //Goes to registration page
  router.get('/new', (req, res) => {
    res.render('register', {email: req.session.email});
  });

  //Goes to login page
  router.get('/login', (req, res) => {
    res.render('login',{email: req.session.email});
  });

  //user registers
  router.post("/new", (req, res) => {
    console.log(req.body);
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    const battlenetID = req.body.battlenet.trim();

    //Converting bnet ID into a format that owjs can take


    if(checkInvalidCharacters(battlenetID)){
      return res.sendStatus(400);
    }

    knex
      .select("email")
      .from("users")
      .where({email: email})
      .then((results) => {
        console.log(results);
        if(results.length === 0){
          owjs.getAll('pc', 'us', convertBnetID(battlenetID))
            .then(() => {
              knex
                .insert({email: email, password: bcrypt.hashSync(password, 10), battlenet_id: battlenetID})
                .into('users')
                .returning('id')
                .then((results)=>{
                  req.session.userID = results[0];
                  req.session.email = email;
                  req.session.battlenetID = battlenetID;
                  console.log('just registered, am results', results)
                  console.log('IN /NEW', req.session)
                  res.redirect("/");
                });
            })
            .catch((err) => {
              res.sendStatus(400);
            })
          //stuff tha relies on it
        } else {
          res.sendStatus(400);
        }
    });
  });


  // logs a user in
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // error checking
    if(!email || !password){
      res.sendStatus(400);
      return;
    }

    // Checking if user already exists, if user does not exist, throw back a 404
    knex
      .select("password", "id")
      .from("users")
      .where({email: email})
      .then((results) => {
        if(results.length === 0){
          res.sendStatus(404);
        } else if (bcrypt.compareSync(password, results[0].password)){
          req.session.email = email;
          req.session.userID = results[0].id;
          console.log(results);
          console.log(req.session);
          res.redirect("/");
        } else {
          res.sendStatus(403);
        }
    });
  });

  // User logs out
  router.post("/logout", (req, res) => {
      req.session = null;
      res.send({result:true});
  });


     //Goes to registration page
  router.get('/:id/profileinfo.json', (req, res) => {
    knex
    .select('battlenet_id')
    .from('users')
    .where({id:req.params.id})
    .then((results) => {
      getPlayerInfo(results[0].battlenet_id)
      .then((results) => {
        const profileInfo = {avatar:results.profile.avatar}
        res.json(profileInfo);

      })
    })
  });


  return router;
}
