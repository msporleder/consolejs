"use strict";

var Consolejs = function (win, cb) {
  var inp, inptxt, outwin, sub, form, winstyle, send, respond;
  send = function (inpt, cb) { //private
// get value and escape some html
    var inptc, pos;
    inptc = inpt.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
      //window.alert(inptc);
    outwin.insertAdjacentHTML('beforeend',
        "<span class=\"usertxt\">> "
        + inptc
        + "<br /></span>");
    pos = outwin.scrollTop;
    outwin.scrollTop = pos + outwin.clientHeight;
    inp.value = '';
    respond(inptc, cb);
  };

  respond = function (inp, cb) { //private
    var pos, resp;
    if (typeof cb !== 'undefined') {
      resp = cb(inp);
    } else {
      resp = inp;
    }
    outwin.insertAdjacentHTML('beforeend',
        "<span class=\"bottxt\">"
        + resp
        + "<br /></span>");
    pos = outwin.scrollTop;
    outwin.scrollTop = pos + outwin.clientHeight;
  };

  this.backdoor = function (way, inp, cb) { //public
    if (way === 'send') {
      send(inp, cb);
    } else if (way === 'respond') {
      respond(inp, cb);
    }
  };
  winstyle = window.getComputedStyle(win);
  outwin = document.createElement("div");
  outwin.setAttribute("id", "outwin");
  outwin.setAttribute("class", 'consolejs');
  outwin.style.width = winstyle.getPropertyValue("width");
  outwin.style.height = winstyle.getPropertyValue("height");
  inp = document.createElement("input");
  inp.setAttribute("id", 'inp');
  inp.setAttribute("autofocus", 'true');
  inp.setAttribute("autocomplete", 'off');
  inp.setAttribute("class", 'consolejs');
  inp.style.borderTopWidth = '1px';
  inp.style.borderLeftWidth = '0px';
  inp.style.borderRightWidth = '0px';
  inp.style.width = outwin.style.width;
  form = document.createElement('form');
  form.setAttribute("onsubmit", 'return false;');
  form.appendChild(inp);
  //kill the existing content and replace with our own
  respond(win.innerHTML);
  win.innerHTML = '';
  win.appendChild(outwin);
  win.appendChild(form);
  form.addEventListener('submit', function () { send(inp.value, cb); }, false);
  return this;
};
