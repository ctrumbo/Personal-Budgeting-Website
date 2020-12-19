const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');
const route = express.Router();
const app = express();

route.post('/', async (req, res) => {
  const { label, data } = req.body;
  console.log(req.body);
  let user ={};
  user.label = label;
  user.data = data;
  let userModel = new User(user);
  await userModel.save();
  res.json(userModel);
});
