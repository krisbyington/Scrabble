var express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
var router = express.Router();
const { removeSocket } = require('../utils/socket_store');
const UserModel = require('../models/Users');
const e = require('express');
const { emptyQuery } = require('pg-protocol/dist/messages');


router.post("/register", async (req, res, next) => {
  console.log(req.body[0]);
  console.log(req.body[1]);
  console.log(req.body[2]);
  let username = req.body[0];
  let password = req.body[1];
  let confirmPassword = req.body[2];
  
  if(password == confirmPassword){
    UserModel.usernameExists(username)
    .then((userDoesExist) => {
      if (userDoesExist) {
        res.set("content-type","text/plain").send("user-exists")
        console.log("USER ALREADY EXISTS");
      } else {
        return UserModel.create(username, password);
      }
    })
    .then((createUserId) => {
      res.set("content-type","text/plain").send("success");
    })
    .catch(err => {
      console.log(err);
    });
  }else{
    res.set("content-type","text/plain").send("fail");
  }
});

router.post("/login", async (req, res, next) => {
  console.log("in login")
  let username = req.body[0];
  let password = req.body[1];
  console.log(username);
  console.log(password)

  let userId = -1
  if (req.session.user_id) {
    //no idea what this does
    res.redirect("/lobby")
  } else {
    UserModel.authenticate(username, password)
      .then((results => {
        if (results) {
          return db.one("SELECT id FROM users WHERE username=$1;", [username])
            .then((result) => {
              userId = result.id
              return Promise.resolve(userId > 0);
            })
            .then((result) => {
              if (result) {
                req.session.user_id = userId
                res.set("content-type","text/plain").send("success");
              } else {
                res.set("content-type","text/plain").send("fail");
              }
            })
        } else {
          res.set("content-type","text/plain").send("incorrect credentials");
          console.log("user id was not valid.")
        }
      }))
      .catch(err => {
        console.log(err);
        console.log("failed authentication.")
        next(err);
      })
  }
});

router.post("/logout", (req, res, next) => {
  const user_id = req.session.user_id;
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      removeSocket(user_id);
      res.redirect("/")
    }
  })
})

module.exports = router;
