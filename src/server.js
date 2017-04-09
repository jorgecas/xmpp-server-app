'use strict';

var xmpp = require('node-xmpp-server');
var Client = require('node-xmpp-client');

var server = null;

var startServer = done => {
  // Sets up the server.
  server = new xmpp.C2S.BOSHServer({
    port: 5222,
    domain: 'localhost'
  });

  // On connection event. When a client connects.
  server.on('connection', function (client) {
    // That's the way you add mods to a given server.

    // Allows the developer to register the jid against anything they want
    client.on('register', function (opts, cb) {
      console.log('REGISTER');
      cb(true);
    });

    // Allows the developer to authenticate users against anything they want.
    client.on('authenticate', function (opts, cb) {
      console.log('server:', opts.username, opts.password, 'AUTHENTICATING')
      var hashedPassword = 'lucy'
      if (opts.password === hashedPassword) {
        console.log('server:', opts.username, 'AUTH OK')
        cb(null, opts)
      } else {
        console.log('server:', opts.username, 'AUTH FAIL')
        cb(false)
      }
    })

    client.on('online', function () {
      //console.log('server:', client.jid.local, 'ONLINE')
      console.log('server:', client.jid._local, 'ONLINE')
    })

    // Stanza handling
    client.on('stanza', function (stanza) {
      //console.log('server:', client.jid.local, 'stanza', stanza.toString())
      console.log('server:', client.jid._local, 'stanza')
      var from = stanza.attrs.from
      stanza.attrs.from = stanza.attrs.to
      stanza.attrs.to = from
      client.send(stanza)
    })

    // On Disconnect event. When a client disconnects
    client.on('disconnect', function () {
      //console.log('server:', client.jid.local, 'DISCONNECT')
      console.log('server:', client.jid ? client.jid._local : '', 'DISCONNECT')
    })
  })

  server.on('listening', function() {
      console.log('server:', 'listening');
  })
}

startServer(function () {})