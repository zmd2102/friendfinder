var path = require("path");
var friends = require("../data/friends");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		var userInfo = req.body;
		var userData = userInfo.scores;
		var matchName = "";
		var matchImage = "";
		var totalDifference = 999999999;

		for (var i = 0; i < friends.length; i++) {
			var diff = 0;
			for (var j = 0; j < userData.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userData[j]);
			}

			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		friends.push(userInfo);
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};