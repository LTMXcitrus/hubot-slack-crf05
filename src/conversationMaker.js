var gSheetsClient = require('../src/gSheetsClient');

var TITANE = "vsc:titane";
var TOPAZE = "vsc:topaze";
var FORMAT = "vsc:format";
var ACTION = "vsc:action";

module.exports.getAnswer = function (body, callback) {
  var intent = body.intent;
  var entityValues = getEntityValues(body.entities, body.retainedQuery);
  var entityNames = getEntityNames(body.entities);
  switch (intent) {
    case "hello":  {
      callback(oneOf(["salut toi", "oh, salut !", "Coucou!"]))
      break;
    }
    case "whoareyou": {
      callback(oneOf(["Je suis le bot du mot !", "Moi ? je suis un bot! et toi ?"]))
      break;
    }
    case "whatabout": {
      callback("Je regarde ça...");
      gSheetsClient.retrieveObject("compresses", null, callback);
      break;
    }
    case "whereis": {
      callback("Je regarde ça...");
      gSheetsClient.retrieveObject(entityValues, "Etagere", callback);
      break;
    }
    case "howmany": {
      callback("Je regarde ça...");
      gSheetsClient.retrieveObject(entityValues, "stock", callback);
      break;
    }
    case "expiration": {
      callback("Je regarde ça...");
      gSheetsClient.retrieveObject(entityValues, "expiration date", callback);
      break;
    }
    case "toorder": {
      callback("Je regarde ça...");
      gSheetsClient.retrieveObject(entityValues, "to order", callback);
      break;
    }
    case "joke": {
      callback("et 1 - 0 pour l'humour!")
      break;
    }
    case "howareyou": {
      callback(oneOf(["ça va bien, et toi ?", "ça se passe tranquille... :)", "On s'ennuie vite ici, tu sais..."]))
      break;
    }
    case "thankyou": {
      callback(oneOf(["Y a pas de problème!", "Mais de rien!", "Avec plaisir!"]));
      break;
    }
    case "youarenice": {
      callback(oneOf(["Oh merci !", ":)"]));
      break;
    }
    case "disappointed":
    case "youarenotnice": {
      callback(oneOf(["Je fais de mon mieux :'(", "Désolé... :("]))
      break;
    }
    case "whatareyoufor": {
      callback("Je réponds à la place du MOT quand vous me posez des questions sur le matériel. " +
        "Vous pouvez me demander où est le matériel, quand est-ce qu'il périme, ... Je ferai de mon mieux pour vous répondre!")
      break;
    }
    case "affirmation": {
      callback(oneOf(["¯\\_(ツ)_/¯", ":)"]));
      break;
    }
    case "congrats": {
      callback(oneOf(["Je fais de mon mieux ;)", "Merci :)", "Oh tu sais, je ne fais que lire ce qui est écrit! :)"]));
      break;
    }
    case "shrug": {
      callback("¯\\_(ツ)_/¯");
      break;
    }
    case "whosthebest":
      if(entityNames.indexOf(TITANE) !== -1){
        callback("Je dirais que c'est Motthieu !");
      } else if(entityNames.indexOf(TOPAZE) !== -1){
        callback("Facile, c'est Sophie... :) ")
      } else if(entityNames.indexOf(ACTION) !== -1){
        callback("On me dit que c'est Cécilia !")
      } else if(entityNames.indexOf(FORMAT) !== -1){
        callback("Il me semble que c'est Helena!")
      } else {
        callback("Je ne vois pas de qui tu parles...");
      }
      break;
    default: {
      callback("Quelqu'un me parle ?")
    }
  }
};

var getEntityValues = function(entities, query){
  var entityValues = [];
  entities.forEach(function(entity){
    entityValues.push(query.substring(entity.start, entity.end));
  });
  return entityValues;
};

var getEntityNames = function(entities){
  var entityNames = [];
  entities.forEach(function(entity){
    entityNames.push(entity.entity.entityType.name);
  });
  console.log(entityNames);
  return entityNames
};

var oneOf = function (list) {
  return list[Math.floor(Math.random() * list.length)];
};
