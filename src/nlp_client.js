request = require('request').defaults({
  headers: {
    'Authorization':'Basic YWRtaW5AdnNjdC5mcjpwYXNzd29yZA=='
}
});

module.exports.parse = function(sentence, callback) {
  var req = request.post('http://localhost:8888/rest/nlp/parse', {form: parseObject(sentence)},
    function (error, response, body) {
      callback(JSON.parse(body));
    });
};

parseObject = function(sentence){
  var body = JSON.stringify({
    applicationName: "crfbot",
    namespace: "vsc",
    queries:[sentence],
    context: {
      language: "fr",
      clientId: "",
      dialogId: ""
    }
  });
  console.log(body);
  return body;
};

