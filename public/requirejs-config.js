require.config({ baseUrl: '/scripts'
               , paths : { 'jquery': 'vendor/jquery/dist/jquery.min'
                         , 'lodash': 'vendor/lodash/dist/lodash'
                         , 'pointfree': 'vendor/pointfree/dist/pointfree.amd'
                         , 'bacon': 'vendor/bacon/dist/Bacon.min'
                         , 'socketio': '/socket.io/socket.io'
                         }
               , shim: { jquery: { exports: '$' }
                       , socketio: { exports: 'io' }
                       , lodash: { exports: '_' }
                       }
                });
require(['io', 'youtube'], function(io, app){
  var x = io.runIO(app("#results", {q: 'cheese'})).map(function(x){ debugger; });
});
