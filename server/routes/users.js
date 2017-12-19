"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, bcrypt, cookieSession) => {

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

    const email = req.body.email;
    const password = req.body.password;
    const battlenetID = req.body.battlenet_id;
    //error checking
    if(!email || !password || !battlenetID){
      console.log('empty param!');
      res.sendStatus(400);
      return;
    }
    //Checking if user already exists, if user exists, DO NOT create it
    knex
      .select("email")
      .from("users")
      .where({email:email})
      .then((results) => {
        console.log(results);
        if(results.length === 0){
          knex
          .insert({email: email, password: bcrypt.hashSync(password, 10), battlenet_id: battlenetID})
          .into('users')
          .then(()=>{});
          req.session.email = email;
          res.sendStatus(200);
        } else{
          res.sendStatus(400);
        }
    });
  });

  //logs a user in
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //error checking
    if(!email || !password){
      res.sendStatus(400);
      return;
    }

    //Checking if user already exists, if user does not exist, throw back a 404
    knex
      .select("email", "password")
      .from("users")
      .where({email:email})
      .then((results) => {
        console.log(results);
        console.log(password);
        if(results.length === 0){
          res.sendStatus(404);
        } else if (bcrypt.compareSync(password, results[0].password)){
          req.session.email = email;
          res.redirect("/");
        } else {
          res.sendStatus(403);
        }
    });
  });


  //user logs out
  router.post("/logout", (req, res) => {
      console.log('Logging out')
      req.session.email = null;
      req.session = null;
      res.send({result:true});
      //res.sendStatus(200);
      //res.redirect("/")
  });

  return router;
}