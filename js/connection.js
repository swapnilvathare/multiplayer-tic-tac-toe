  var db = new PouchDB('tictac5');
  var remoteCouch = 'http://10.0.0.127:5984/tictac5';
PouchDB.sync('tictac5', 'http://10.0.0.127:5984/tictac5');
 