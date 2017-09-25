request = require('request');

var SHEETS_URL = process.env.SHEETS_URL;

var retrieveSheet = function (callback) {
  request.get(SHEETS_URL, function (error, response, body) {
    callback(JSON.parse(body));
  });
};

module.exports.retrieveObject = function (object, info, callback) {
  object = object ? object.toLowerCase() : object;
  info = info ? info.toLowerCase() : info;
  retrieveSheet(function (sheet) {
    var values = sheet.values;
    var lines = values.length;
    var j = -1;
    if (info) {
      j = 0;
      var found = false;
      while (j < values[0].length && !found) {
        if (values[j][0] && values[0][j].toLowerCase().indexOf(info) !== -1) {
          found = true;
        } else {
          j++;
        }
      }
    }
    var indexOfInfo = j;
    var result = [];
    if(object) {
      for (var i = 1; i < lines; i++) {
        if (values[i][0]) {
          if (values[i][0].toLowerCase().indexOf(object) !== -1 || object.indexOf(values[i][0].toLowerCase()) !== -1) {
            result.push(displayLine(values[0], values[i], indexOfInfo));
          }
        }
      }
    }
    result.forEach(function (line) {
      callback(line)
    });
    if (result.length === 0) {
      callback("Désolé je n'ai rien trouvé pour '" + object + "', mauvaise orthographe ?");
    }
  });
};


var displayLine = function (headers, line, indexOfInfo) {
  var result = "";
  if (indexOfInfo === -1) {
    for (var i = 0; i < line.length - 1; i++) {
      result += headers[i] + ": " + line[i] + ", "
    }
    result += headers[line.length - 1] + ": " + line[line.length - 1];
  } else {
    result += headers[0] + ": " + line[0];
    if (line[1]) {
      result += " - " + line[1]
    }
    result += " - " + headers[indexOfInfo] + ": " + line[indexOfInfo];
  }
  return result;
};
