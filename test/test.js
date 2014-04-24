var expect = require("chai").expect;
var path   = require("path");

var Robot       = require("hubot/src/robot");
var TextMessage = require("hubot/src/message").TextMessage;

// new Robot creates some j
//process.setMaxListeners(0);


describe("Hubot-Read-Tweet Functionality", function() {
    var robot;
    var user;
    var adapter;

    beforeEach(function(done) {
        // create new robot, without http, using the mock adapter
        robot = new Robot(null, "mock-adapter", false, "TestBot");

        robot.adapter.on("connected", function() { 
            // only load scripts we absolutely need, like auth.coffee
            process.env.HUBOT_AUTH_ADMIN = "1";
            robot.loadFile(
                path.resolve(
                    path.join("node_modules/hubot/src/scripts")
                ),
                "auth.coffee"
            );

            // load the module under test and configure it for the
            // robot.  This is in place of external-scripts
            require("../index")(robot);

            // create a user
            user = robot.brain.userForId("1", {
                name: "mocha",
                room: "#mocha"
            });

            // create a user
            user2 = robot.brain.userForId("2", {
                name: "chai",
                room: "#mocha"
            });

            adapter = robot.adapter;

            setTimeout(done, 250);
        });
        robot.run();
    });

    afterEach(function() {
        robot.shutdown();
    });

    describe("Get Tweet", function() { 
      /*
      * Get Tweet
      */
      // Try grabbing a tweet in various forms
      //
      it("correctly grabs https tweet text", function(done) {
          adapter.on("send", function(envelope, strings) {
              try { 
                expect(strings[0]).to.equal("@rlph: Snapchatting my super mario 3d world final level struggle.");
                done();
              } catch(e) { 
                done(e);
              }
          });
        adapter.receive(new TextMessage(user, "https://twitter.com/rlph/status/457610846462418944"));
      });

      it("correctly grabs http tweet text", function(done) {
          adapter.on("send", function(envelope, strings) {
              try { 
                expect(strings[0]).to.equal("@rlph: Snapchatting my super mario 3d world final level struggle.");
                done();
              } catch(e) { 
                done(e);
              }
          });
        adapter.receive(new TextMessage(user, "http://twitter.com/rlph/status/457610846462418944"));
      });

      it("correctly grabs www https tweet text", function(done) {
          adapter.on("send", function(envelope, strings) {
              try { 
                expect(strings[0]).to.equal("@rlph: Snapchatting my super mario 3d world final level struggle.");
                done();
              } catch(e) { 
                done(e);
              }
          });
        adapter.receive(new TextMessage(user, "https://www.twitter.com/rlph/status/457610846462418944"));
      });

      it("correctly grabs www http tweet text", function(done) {
          adapter.on("send", function(envelope, strings) {
              try { 
                expect(strings[0]).to.equal("@rlph: Snapchatting my super mario 3d world final level struggle.");
                done();
              } catch(e) { 
                done(e);
              }
          });
        adapter.receive(new TextMessage(user, "http://www.twitter.com/rlph/status/457610846462418944"));
      });
    });
});
