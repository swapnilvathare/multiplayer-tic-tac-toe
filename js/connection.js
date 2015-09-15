  var db = new PouchDB('tictac2');
  var remoteCouch = 'http://10.0.0.127:5984/tictac2';
PouchDB.sync('tictac2', 'http://10.0.0.127:5984/tictac2');
 