"use strict";

var Consolejs = function (win, winstyle) {
  var inp, inptxt, button, respond, divwin, sub;
  divwin = '<div id="input">'
        + '<form onsubmit="return false;">'
        + '<input id="inp" autofocus class="black" autocomplete="off"></input>'
        + '<br />'
        + '<input id="sub" type="submit" value=">" class="black"></input>'
        + '</form></div>';
  win.innerHTML = divwin;
  inp = document.getElementById("inp");
  inptxt = document.getElementById("tmp");
  sub = document.getElementById("sub");
  sub.addEventListener('click', function () { cons.button(cons, rep); }, false);
  return {
    button: function (self, cb) {
// get value and escape some html
      var inptc, pos;
      inptc = inp.value.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&apos;');
      // window.alert(inptc);
      win.insertAdjacentHTML('beforeend',
          "<span class=\"usertxt\">> "
          + inptc
          + "<br /></span>");
      pos = win.scrollTop;
      win.scrollTop = pos + win.clientHeight;
      inp.value = '';
      self.respond(inptc, cb);
    },
    respond: function (inp, cb) {
      var pos, resp;
      if (typeof cb !== 'undefined') {
        resp = cb(inp);
      } else {
        resp = inp;
      }
      //    + win.lastChild.textContent
      win.insertAdjacentHTML('beforeend',
          "<span class=\"bottxt\">"
          + resp
          + "<br /></span>");
      pos = win.scrollTop;
      win.scrollTop = pos + win.clientHeight;
    }
  };
};

var rep = function(inp) {
  return "foo: " + inp;
}

document.addEventListener('DOMContentLoaded', function () {
// scroll to bottom of div
// init stuff
  var sub, cons, win;
  // sub = document.getElementById("sub");
  win  = document.getElementById("cons");
  cons = new Consolejs(win);
});
