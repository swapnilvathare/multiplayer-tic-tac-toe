  var db = new PouchDB('tictac');
  var remoteCouch = 'http://10.0.0.127:5984/tictac';

/*  db.changes({
    since: 'now',
    live: true
  }).on('change', showTodos);*/