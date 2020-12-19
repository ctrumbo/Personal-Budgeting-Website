const express = require('express');
const cors = require('cors');
const connectDB = require('./connection');
const mongoose = require('mongoose');
const User = require('./User');
const route = express.Router();
const dataModel = require("./schema");

let url = 'mongodb+srv://ctrumbo:Trumbo54321@cluster0.hiamm.mongodb.net/PersonalBudget?retryWrites=true&w=majority';
console.log(mongoose.connection.readyState);

const port = 3000;
const app = express();

connectDB();
app.use(express.json({ extended: false }));

app.use('/api/userModel', require('./User'));

app.use(cors());


app.get('/budget', (req, res) => {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
      dataModel.find({})
              .then((data) => {
                  res.json(data);
                  mongoose.connection.close();
              })
              .catch((connectionError) => {
                  console.log(connectionError)
              })
  })
  .catch((connectionError) =>{
      console.log(connectionError)
  })
});
app.post('/budget', (req, res) => {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
          .then(() => {
              var dataStructure = {
                  title: req.body.title,
                  value: req.body.value,
                  color: req.body.color
              };
              dataModel.insertMany(dataStructure)
                  .then((data) => {
                      res.json(data);
                      mongoose.connection.close();
                  })
                  .catch((connectionError) => {
                      console.log(connectionError)
                  })
          })
          .catch((connectionError) => {
              console.log(connectionError);
          })
});
app.get('/budget', (req, res) => {
  res.get('budgetData.json');
});

app.post('/budget', (req, res) => {
  res.sendFile('./budgetData.json', {root: __dirname});
});

app.listen(port, () => {
  console.log('API Served at http://localhost:3000');
});
