"use strict";
document.addEventListener('DOMContentLoaded', function() {
// scroll to bottom of div
// init stuff
  var win = document.getElementById("cons");
  var pos = win.scrollTop;
  var sub = document.getElementById("sub");
  sub.addEventListener('click', button, false);
});

function button() {
  var win = document.getElementById("cons");
  var inp = document.getElementById("inp");
  var inptxt = document.getElementById("tmp");
// get value and escape some html
  var inptc = inp.value.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;');
  // window.alert(inptc);
  win.insertAdjacentHTML('beforeend',
      "<span class=\"usertxt\">> "
      + inptc
      + "<br /></span>");
  var pos = win.scrollTop;
  win.scrollTop = pos + win.clientHeight;
  inp.value = '';
  respond(inptc);
}

function respond(inp) {
  var win = document.getElementById("cons");
  //    + win.lastChild.textContent
  win.insertAdjacentHTML('beforeend',
      "<span class=\"bottxt\">got: "
      + inp
      + "<br /></span>");
  var pos = win.scrollTop;
  win.scrollTop = pos + win.clientHeight;
}
