nlpClient = require '../src/nlp_client'
conversationMaker = require '../src/conversationMaker'

module.exports = (robot) ->

  robot.hear /badgers/i, (res) ->
    res.send "badgers ? BADGERS ? WE DONT NEED NO STINKING BADGERS !!"


  robot.respond /(.*)/i, (res) ->
    text = res.match[1]
    text = text.substring text.indexOf ":", text.length
    nlpClient.parse(text, (body) ->
      conversationMaker.getAnswer(body, (text) -> res.send text)
    )
