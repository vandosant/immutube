/* global define */
define([
  'jquery'
, 'ramda'
, 'pointfree'
, 'Maybe'
, 'player'
, 'bacon'
, 'io'
], function($, _, P, Maybe, Player, bacon, io) {
  'use strict';

  // HELPERS ///////////////////////////////////////////////////////////////////////////
  var compose = P.compose;
  var map = P.map;
  var log = function(x) { console.log(x); return x; }
  var fork = _.curry(function(f, future) { return future.fork(log, f); })
  var setHtml = _.curry(function(sel, x) { return $(sel).html(x); });
  io.extendFn();

  // PURE //////////////////////////////////////////////////////////////////////////////
  var listen = _.curry(function(type, el) {
    return Bacon.fromEventTarget(el, type);
  });
  // getDom :: String -> IO Dom
  var getDom = $.toIO();

  // keypressStream :: Dom -> EventStream DomEvent
  var keypressStream = listen('keyup');

  // valueStream :: Dom -> EventStream String
  var valueStream = compose(map(compose(_.get('value'), _.get('target'))), keypressStream);

  // IMPURE ////////////////////////////////////////////////////////////////////////////
  getDom('#search').map(valueStream).runIO().onValue(log);
});
