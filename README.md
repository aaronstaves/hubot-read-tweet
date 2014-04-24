# Hubot: hubot-read-tweet

[![Build Status](https://travis-ci.org/aaronstaves/hubot-read-tweet.svg?branch=master)](https://travis-ci.org/aaronstaves/hubot-read-tweet)

Outputs a twitter status when hubot hears a twitter url

See [`src/.read-tweet.coffee`](src/read-tweet.coffee) for full documentation.

## Installation

Add **hubot-read-tweet** to your `package.json` file:

```json
"dependencies": {
  "hubot": ">= 2.5.1",
  "hubot-scripts": ">= 2.4.2",
  "hubot-read-tweet": ">= 0.0.0",
  "hubot-hipchat": "~2.5.1-5",
}
```

Add **hubot-read-tweet** to your `external-scripts.json`:

```json
["hubot-read-tweet"]
```

Run `npm install hubot-read-tweet`

## Sample Interaction

```
aaron> https://www.twitter.com/rlph/status/457610846462418944
Hubot> @rlph: Snapchatting my super mario 3d world final level struggle.
```
