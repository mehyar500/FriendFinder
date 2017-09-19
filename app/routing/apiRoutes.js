// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends list
// ===============================================================================

var friendsArray = require("./data/friends");

//Routing
module.exports = function(app) {
	//api get request
	app.get("/api/friends", function(req, res) {
		res.json(friendsArray);
	});
	
	//api post requests
	app.post("/api/friends", function(req, res) {
    	// to compare the scores
    	var newFriendScoreArray =req.body.scores;
	    var scoresArray = [];
	    var bestMatch = 0;
	    var count = 0;
	    // for current friend 
	    for(var i=0; i<friendsArray.length; i++){
		    var totalDifference = 0;
			// compare the friend with existing friend
		    for(var j=0; j<newFriendScoreArray.length; j++){
			        totalDifference += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(newFriendScoreArray[j])));
		    }
		    // then add the json the user sent to the friendsData array 
		    scoresArray.push(totalDifference);
	    }
		// find best match after comparision  with all friends
	    for(var i=0; i<scoresArray.length; i++){
	      if(scoresArray[i] <= scoresArray[bestMatch]){
	        bestMatch = i;
	      }
	    }
	    //return data
	    var yourMatch = friendsArray[bestMatch];
	    res.json(yourMatch);
	    friendsArray.push(req.body);
	});
}

	