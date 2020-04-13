const express = require('express');
const app = express();
var bodyParser = require("body-parser");
/* const path = require('path');
const router = express.Router();
const https = require('https');
const fs = require('fs');  */
const Deck = require('./js/deck.js');
var gamestarted = false;
var game;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;


app.get('/port',function(req,res){
  res.writeHead(200);
  res.end(port.toString());
})

app.get('/app',function(req,res){
  
  res.sendFile((__dirname+'/app/index.html'));
});
app.get('*',function(req,res){
  res.send("<center><h1>Page not found</h1></center>");
});

app.post('/initgame',function(req,res){
  var body = JSON.parse(JSON.stringify(req.body))
  var gameName =  body['game'];
  var players = body['players[]'];
  game = new Deck(gameName,players);
  game.initPlayers();
  res.end('initiated');
})
app.post('/dropcard',function(req,res){
  var user=req.body.user;
  var index=parseInt(req.body.index);
  var dropCard = JSON.stringify(game.dropCard(user,index));
  res.end(dropCard);
})
app.post('/loadcard',function(req,res){
  try{
  var user=req.body.user;
  var loadCard = JSON.stringify(game.loadCard(user));
  res.end(loadCard);
  }
  catch(err){
    res.end("Error")
  }
})
app.post('/log',function(req,res){
  try{
  var log = JSON.stringify(game.log());
  res.end(log);
  }
  catch(err){
    res.end("Error")
  }
})
app.post('/started',function(req,res){
  try{
  var gamestatus = JSON.stringify(game.gamestarted);
  res.end(gamestatus);
  }
  catch(err){
    res.end("Error")
  }
});
app.listen(port, function(){
console.log("server running in " + port)
});