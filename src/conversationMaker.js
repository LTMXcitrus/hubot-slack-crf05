var gSheetsClient = require('../src/gSheetsClient');

module.exports.getAnswer = function (body, callback) {
  var intent = body.intent;
  var entity = body.entities.length > 0
    ? body.retainedQuery.substring(body.entities[0].start, body.entities[0].end)
    : null;
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
      gSheetsClient.retrieveObject(entity, "Etagere", callback);
      break;
    }
    case "howmany": {
      callback("Je regarde ça...");
      gSheetsClient.retrieveObject(entity, "stock", callback);
      break;
    }
    case "expiration": {
      callback("Je regarde ça...");
      gSheetsClient.retrieveObject(entity, "expiration date", callback);
      break;
    }
    case "toorder": {
      callback("Je regarde ça...");
      gSheetsClient.retrieveObject(entity, "to order", callback);
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
    default: {
      callback("Quelqu'un me parle ?")
    }
  }
};

var oneOf = function (list) {
  return list[Math.floor(Math.random() * list.length)];
};
