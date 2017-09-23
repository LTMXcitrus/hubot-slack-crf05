request = require('request');
var url = "https://sheets.googleapis.com/v4/spreadsheets/1Qre169f6PABUH90UR3fIOmK4FCA7-roI3LOh9rR9iZ0/values/A1:H500?key=AIzaSyD3rkOZwXP3Y3LRX6tGP_R8wCTnbMdlrxw";

var retrieveSheet = function(callback) {
  request.get(url, function (error, response, body) {
    callback(JSON.parse(body));
  });
};

module.exports.retrieveObject = function(object, info, callback){
  object = object.toLowerCase();
  info = info.toLowerCase();
  retrieveSheet(function(sheet){
    var values = sheet.values;
    var lines = values.length;
    var j=-1;
    if(info) {
      j=0;
      var found = false;
      while (j < values[0].length && !found) {
        if (values[0][j].toLowerCase().indexOf(info) !== -1) {
          found = true;
        } else {
          j++;
        }
      }
    }
    var indexOfInfo = j;
    var result = [];
    for(var i=1; i<lines;i++){
      if(values[i][0]) {
        if (values[i][0].toLowerCase().indexOf(object) !== -1 || object.indexOf(values[i][0].toLowerCase()) !== -1) {
          result.push(displayLine(values[0], values[i], indexOfInfo));
        }
      }
    }
    result.forEach(function(line){
      callback(line)
    });
  });
};


var displayLine = function(headers, line, indexOfInfo){
  var result = "";
  if(indexOfInfo === -1) {
    for (var i = 0; i < line.length - 1; i++) {
      result += headers[i] + ": " + line[i] + ", "
    }
    result += headers[line.length - 1] + ": " + line[line.length - 1];
  } else {
    result += headers[0] + ": " + line[0];
    result += " - " + headers[indexOfInfo] + ": " + line[indexOfInfo];
  }
  return result;
};
