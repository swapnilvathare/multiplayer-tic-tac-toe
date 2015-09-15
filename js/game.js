function createGame () {
	console.log(getCookie("username"));
	var firstUser = getCookie("username");

	var gameCreator = {
		type: "game",
		_id: new Date().toISOString(),
		user: firstUser,
		join: false,
		playerMove: true,
		finished: false
	};
	db.put(gameCreator, function callback(err, result) {
		if (!err) {
		console.log('Successfully added a swapnil!');
	}
	});

};
function createdGames() {
	//var sync = PouchDB.sync('tictac1', 'http://10.0.0.127:5984/tictac1')
	PouchDB.sync('tictac2', 'http://10.0.0.127:5984/tictac2');
	db.replicate.from(remoteCouch);
	console.log('hi');
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
  	console.log(doc.rows);
    redrawGame(doc.rows);
  });
};
function createUserList(user){
	//return "<li>"+ user.name +"</li>";
	return "<tr><td>"+user.user+"</td><td> <button class='btn btn-primary'>Join</button></td></tr>";
};
function redrawGame(users) {
	var ul = $('#game-list tbody');
	ul.html('');
	users.forEach(function(user) {
		//console.log(user.doc.type);
		if(user.doc.type == "game"){
	    	$('#game-list tbody').append(createUserList(user.doc));
			
		}
	});
};
createdGames();
 db.changes({
    since: 'now',
    live: true,
    retry: true
  }).on('change', createdGames);
var sync = PouchDB.sync('tictac2', 'http://10.0.0.127:5984/tictac2', {
  live: true,
  retry: true
}).on('change',  createdGames);