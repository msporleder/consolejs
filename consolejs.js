"use strict";

var Consolejs = function (win, cb, winstyle) {
  var inp, inptxt, outwin, sub, form, button, respond;
  winstyle = getComputedStyle(win);
  outwin = document.createElement("div");
  outwin.setAttribute("id", "outwin");
  outwin.setAttribute("class", 'consolejs');
  outwin.style.width = winstyle.getPropertyValue("width");
  outwin.style.height = winstyle.getPropertyValue("height");;
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
  win.innerHTML = '';
  win.appendChild(outwin);
  win.appendChild(form);
  form.addEventListener('submit', function () { button(cb); }, false);

  var button = function (cb) {
// get value and escape some html
      var inptc, pos;
      inptc = inp.value.replace(/&/g, '&amp;')
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
      //self.respond(inptc, cb);
      respond(inptc, cb);
    };
    var respond = function (inp, cb) {
      var pos, resp;
      if (typeof cb !== 'undefined') {
        resp = cb(inp);
      } else {
        resp = inp;
      }
      //    + win.lastChild.textContent
      outwin.insertAdjacentHTML('beforeend',
          "<span class=\"bottxt\">"
          + resp
          + "<br /></span>");
      pos = outwin.scrollTop;
      outwin.scrollTop = pos + outwin.clientHeight;
    };
};

