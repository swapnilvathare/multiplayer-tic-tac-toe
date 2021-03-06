
var checkRunningGame = function(){
	console.log('hi re');
	db.allDocs({include_docs: true, descending: true}, function(err, doc) {
	  	checkNow(doc.rows);
	});
}
function checkNow(users){
	var firstUser = getCookie("username");
	var giveReturn = false; 
    users.forEach(function(user) {
		if(user.doc.type == "game"){
			if(user.doc.user == firstUser){
				if(user.doc.finished == false){
					giveReturn = true;
    				console.log(giveReturn);
				}
	    	}
		}
	});
    createGame(giveReturn);
}

function createGame (check) {
	if(!check){
		//console.log(getCookie("username"));
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
	}else{
		console.log('exist');
	}

};
function createdGames() {
	//var sync = PouchDB.sync('tictac1', 'http://10.0.0.127:5984/tictac1')
	db.replicate.from(remoteCouch);
	//console.log('hi');
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
  	//console.log(doc.rows);
    redrawGame(doc.rows);
  });
};
function createUserList(user){
	//return "<li>"+ user.name +"</li>";var deleteLink = document.createElement('button');
    var deleteLink = document.createElement('button');
    deleteLink.innerHTML ='Join';
    deleteLink.className = 'destroy';
    deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, user));
    
    var lableLink = document.createElement('lable');
    lableLink.innerHTML = user.user
    var li = document.createElement('li');
    li.appendChild(lableLink);
    li.appendChild(deleteLink);

    return li;
	//return "<tr><td>"+user.user+"</td><td> <button class='btn btn-primary'>Join</button></td></tr>";
};
function deleteButtonPressed(user){
	var secondUser = getCookie("username");
	user.join = true;
	user.sUser = secondUser;
	db.put(user);
}
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
var sync = PouchDB.sync('tictac5', 'http://10.0.0.127:5984/tictac5', {
  live: true,
  retry: true
}).on('change',  createdGames);