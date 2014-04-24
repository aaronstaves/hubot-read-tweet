# Description:
#   Returns the title when a link is posted
#
# Dependencies:
#   "cheerio": "0.15.0"
#   "request": "2.30.0"
#
# Configuration:
#   HUBOT_URL_TITLE_IGNORE_URLS - RegEx used to exclude Urls
#   HUBOT_URL_TITLE_IGNORE_USERS - Comma-separated list of users to ignore
#
# Commands:
#   http(s)://<site> - prints the title for site linked
#
# Author:
#   ajacksified, dentarg
 
cheerio    = require 'cheerio'
request    = require 'request'
 
module.exports = (robot) ->
 
  robot.hear /https*\:\/\/(www)*twitter.com\/(.+?)\/status\/\d+/i, (msg) ->
 
    url = msg.match[0]
 
    twitterUser = msg.match[2];
    username = msg.message.user.name
    request(
      url
      (error, response, body) ->
        if response.statusCode == 200
          $ = cheerio.load(body)
          msg.send "@#{twitterUser}: " + $('.tweet-text').first().text()
    )
