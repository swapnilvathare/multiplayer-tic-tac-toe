	function testResults (form) {
		var tName = form.name.value;
		var tEmail = form.email.value;
		var tMobile = form.mobile.value;
		var tPassword = form.password.value;

		var user = {
			_id: new Date().toISOString(),
			name: tName,
			email: tEmail,
			mobile: tMobile,
			password: tPassword
		};
		db.put(user, function callback(err, result) {
			if (!err) {
			console.log('Successfully added a user!');
		}
		});
	};
	function login(form){
		var tUser = form.name.value;
		var pass = form.password.value;
		db.allDocs({include_docs: true, descending: true}, function(err, doc) {
			var users = doc.rows;
			//console.log(users);
			users.forEach(function(user) {
				if(user.doc.email == tUser){
					//console.log('Username is correct');
					if(user.doc.password == pass){
						setCookie("username", user.doc.name, 2);
						//use push state
						window.location.replace("/tic/index.html");
						return console.log('You have Successfully loged in');
					}
				}else{
					console.log('Incorrect Username or Password');
				}
				//console.log(user.doc.name);
			});
		});
	}

	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function showTodos() {
	  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
	  	console.log(doc.rows);
	    redrawTodosUI(doc.rows);
	  });
	}
	function createUserList(user){
		//return "<li>"+ user.name +"</li>";
		return "<tr><td>"+user.name+"</td><td>"+user.email+"</td><td>"+user.mobile+"</td></tr>";
	}
	function redrawTodosUI(users) {
		var ul = $('#todo-list tbody');
		ul.html('');
		users.forEach(function(user) {
			//console.log(user.doc);
		    $('#todo-list tbody').append(createUserList(user.doc));
		});
	}
	// Initialise a sync with the remote server
	function sync() {
		var opts = {live: true};
		db.replicate.to(remoteCouch, opts, syncError);
		db.replicate.from(remoteCouch, opts, syncError);
	}

	function syncError() {
		//syncDom.setAttribute('data-sync-state', 'error');
	}

	showTodos();
	if (remoteCouch) {
	    sync();
	}