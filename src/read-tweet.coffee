# Description:
#   Returns the status of a tweet when hubot "hears' a twitter url
#
# Dependencies:
#   "cheerio": "0.15.0"
#   "request": "2.30.0"
#
# Configuration:
#   none
#
# Commands:
#   http(s)://(www.)twitter.com/<user>/status/<tweetId> - prints the status of a tweet
#
# Author:
#   https://github.com/aaronstaves/
 
cheerio    = require 'cheerio'
request    = require 'request'

module.exports = (robot) ->

  robot.hear /https*\:\/\/(www\.)*twitter.com\/(.+?)\/status\/(\d+)/i, (msg) ->

    twitterUser = msg.match[2];
    twitterId = msg.match[3];

    # Default to https twitter url for less hassle/redirects
    url = "https://twitter.com/#{twitterUser}/status/#{twitterId}"

    # Grab body
    request(
      url
      (error, response, body) ->

        # If success
        if response.statusCode == 200

          # Parse the body
          $ = cheerio.load(body)

          # Only grab first instance, subsequent instances are replies to the 
          # original tweet
          msg.send "@#{twitterUser}: " + $('.tweet-text').first().text()
    )
