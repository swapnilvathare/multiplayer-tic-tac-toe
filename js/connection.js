  var db = new PouchDB('tictac4');
  var remoteCouch = 'http://10.0.0.127:5984/tictac4';
PouchDB.sync('tictac4', 'http://10.0.0.127:5984/tictac4');
 