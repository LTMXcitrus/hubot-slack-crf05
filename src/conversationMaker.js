var gSheetsClient = require('../src/gSheetsClient');

module.exports.getAnswer = function(body, callback){
  var intent = body.intent;
  var entity = body.entities.length > 0
    ? body.retainedQuery.substring(body.entities[0].start, body.entities[0].end)
    : null;
  var answer = "";
  if(intent === "hello") {
    callback(oneOf(["salut toi", "oh, salut !", "Coucou!"]))
  }
  else if(intent === "whoareyou"){
    callback(oneOf(["Je suis le bot du mot !", "Moi ? je suis un bot! et toi ?"]))
  }
  else if(intent === "whatabout"){
    callback("Je regarde ça...");
    gSheetsClient.retrieveObject("compresses", null, callback);
  }
  else if(intent === "whereis"){
    callback("Je regarde ça...");
    gSheetsClient.retrieveObject(entity, "Etagere", callback);
  }
  else {
    callback("Quelqu'un me parle ?")
  }
};

var oneOf = function(list) {
  return list[Math.floor(Math.random() * list.length)];
};