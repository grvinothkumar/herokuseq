const express = require('express');
const app = express();
var bodyParser = require("body-parser");
/* const path = require('path');
const router = express.Router();
const https = require('https');
const fs = require('fs');  */
const Deck = require('./js/deck.js');
var game;


app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.PORT || 2020;


app.get('/port',function(req,res){
  res.writeHead(200);
  res.end(port.toString());
})

app.post('/join',function(req,res){

  var body = JSON.parse(JSON.stringify(req.body))
  var playerName =  body['playername'];

  players = game.getPlayers().players;

  if (players.indexOf(playerName) == -1){
    game.setPlayers(playerName);
    res.end("Player Joined")
  }
  else{
    res.end("Player name already exists");
  }
  
})

app.get('/app',function(req,res){
  //res.sendFile((__dirname+'/app/index.html'));
});

app.get('*',function(req,res){
  res.send("<center><h1>Page not found</h1></center>");
});

app.post('/initgame',function(req,res){
  var body = JSON.parse(JSON.stringify(req.body))
  var gameName =  body['game'];
  game = new Deck(gameName);
  res.end('Game Started');
})

app.post('/initplayers',function(req,res){
 
  game.initPlayers();
  res.end('Players initiated');
})

app.post('/killgame',function(req,res){
  game = null;
  res.end('killed');
})

app.post('/getplayers',function(req,res){
    try{
    res.end(JSON.stringify(game.getPlayers()));
  }
  catch(err){
    res.end("Players are not set");
  }
})


app.post('/setplayers',function(req,res){
  try{
  let users=(req.body.list);
  let players = users.split(",");
  game.setPlayers(players);
  res.end('Players Set');
  }
  catch(err){
    res.end("Players are not set");
  }
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
app.post('/getboard',function(req,res){
  try{
  var boardlog = JSON.stringify(game.getBoard());
  res.end(boardlog);
  }
  catch(err){
    res.end("Error")
  }
})
app.post('/setboard',function(req,res){
  try{
  var boarddata=JSON.parse(req.body.boardcoins);
  var boardlog = JSON.stringify(game.setBoard(boarddata));
  res.end(boardlog);
  }
  catch(err){
    res.end("Error")
  }
})
app.post('/started',function(req,res){
  try{
  var gamestatus = (game.gamestatus());
  res.end(gamestatus);
  }
  catch(err){
    res.end("Error")
  }
});
app.listen(port, function(){
console.log("server running in " + port)
});