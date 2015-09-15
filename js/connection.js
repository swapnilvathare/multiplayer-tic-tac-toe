  var db = new PouchDB('tictac3');
  var remoteCouch = 'http://10.0.0.127:5984/tictac3';
PouchDB.sync('tictac3', 'http://10.0.0.127:5984/tictac3');
 