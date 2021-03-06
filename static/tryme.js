var Spinner = require('spin');
var overlay = require('ios-overlay');
var eio = require('engine.io-stream');

function xmlreq() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function fetch_files() {
  window.location.reload();
  return;

  // TODO(shtylman) we can just request the new page
  // and swap it for this one
}

var opts = {
  lines: 13, // The number of lines to draw
  length: 11, // The length of each line
  width: 5, // The line thickness
  radius: 17, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#FFF', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};
var target = document.createElement("div");
document.body.appendChild(target);
var spinner = new Spinner(opts).spin();

var status = overlay({
  spinner: spinner,
  text: 'Loading App'
});

var prj_path = window.location.pathname.split(/\//).slice(0,3).join('/');

var stream = eio(prj_path + '/status');
stream.on('data', function(chunk) {
  if (chunk === 'ready') {
    status.update({ text: 'loading assets' });
    fetch_files();
    return;
  }

  status.update({ text: chunk });
});

