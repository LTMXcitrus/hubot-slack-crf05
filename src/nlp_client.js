request = require('request').defaults({
  headers: {
    'Authorization':'Basic YWRtaW5AdnNjdC5mcjpwYXNzd29yZA=='
}
});

var nlp_url = process.env.NLP_URL;

module.exports.parse = function(sentence, callback) {
  console.log(nlp_url);
  var req = request.post(nlp_url+'/rest/nlp/parse', {form: parseObject(sentence)},
    function (error, response, body) {
    console.log(body);
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

