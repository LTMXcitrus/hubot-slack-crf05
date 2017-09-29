request = require('request');

var SHEETS_URL = process.env.SHEETS_URL;

var retrieveSheet = function (callback) {
  request.get(SHEETS_URL, function (error, response, body) {
    callback(JSON.parse(body));
  });
};

module.exports.retrieveObject = function (objects, info, callback) {
  objects.map(function(object){
    return object.toLowerCase();
  });
  info = info ? info.toLowerCase() : info;
  retrieveSheet(function (sheet) {
    var values = sheet.values;
    var linesNumber = values.length;
    var headers = values[0];
    var indexOfInfo = getInfoColumn(headers, info);
    var result = [];
    if(objects.length > 0) {
      for (var i = 1; i < linesNumber; i++) {
        if (isInteresting(objects, values[i])) {
            result.push(displayLine(headers, values[i], indexOfInfo));
        }
      }
    }
    result.forEach(function (line) {
      callback(line)
    });
    if (result.length === 0) {
      callback("Désolé je n'ai rien trouvé pour '" + objects + "', mauvaise orthographe ?");
    }
  });
};

var getInfoColumn = function(headers, info){
  var j = -1;
  if (info) {
    j = 0;
    var found = false;
    while (j < headers.length && !found) {
      if (headers[j] && headers[j].toLowerCase().indexOf(info) !== -1) {
        found = true;
      } else {
        j++;
      }
    }
  }
  return j;
};

/**
 * Check if the line is what is being looked for
 * @param objects
 * @param line
 * @returns {boolean}
 */
var isInteresting = function(objects, line){
  var found = false;
  if(line.length > 0 && line[8]) {
    // retrieve 'tags' column of the line
    var tags = line[8].split(", ");
    var objectWords = [];
    objects.forEach(function (object) {
      var words = object.split(" ");
      words.forEach(function (word) {
        objectWords.push(word.toLowerCase())
      })
    });
    var j = 0;
    while (j < objectWords.length && !found) {
      found = (tags.indexOf(objectWords[j]) !== -1); // if the word is present in the tag list
      j++;
    }
  }
  return found;
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
