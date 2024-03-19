// onerfcomponentFactory.js

define("componentFactory", [
    "require",
    "exports",
    "htmlExtensions",
    "utility",
    "stringExtensions",
  ], function (n, t, i, r, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var f = (function () {
      function n() {}
      return (
        (n.create = function (t) {
          for (var i, r = 0, u = t; r < u.length; r++) {
            if (((i = u[r]), !i.c && !i.component))
              throw "factoryInput should has either component or c to tell the factory what component to create.Eg.ComponentFactory.create([{ c: Carousel] or ComponentFactory.create([component: Carousel]))";
            n.createComponent(i.component || i.c, i);
          }
        }),
        (n.createComponent = function (t, r) {
          if (t) {
            var o = r && r.eventToBind ? r.eventToBind : "",
              f = r && r.selector ? r.selector : t.selector,
              s = r && r.context ? r.context : null,
              u = [],
              e = function (n, f, e) {
                var a, c, l, o, h;
                for (
                  a = r.elements
                    ? r.elements
                    : f
                    ? i.selectElementsT(f, s)
                    : [document.body],
                    c = 0,
                    l = a;
                  c < l.length;
                  c++
                )
                  (o = l[c]),
                    o.mwfInstances || (o.mwfInstances = {}),
                    o.mwfInstances[n]
                      ? u.push(o.mwfInstances[n])
                      : ((h = new t(o, e)),
                        (!h.isObserving || h.isObserving()) &&
                          ((o.mwfInstances[n] = h), u.push(h)));
              };
            switch (o) {
              case "DOMContentLoaded":
                if (n.onDomReadyHappened) n.callBindFunction(t, f, e, r, u);
                else {
                  n.domReadyFunctions.push(function () {
                    return n.callBindFunction(t, f, e, r, u);
                  });
                  break;
                }
                break;
              case "load":
              default:
                if (n.onDeferredHappened) n.callBindFunction(t, f, e, r, u);
                else {
                  n.deferredFunctions.push(function () {
                    return n.callBindFunction(t, f, e, r, u);
                  });
                  break;
                }
            }
          }
        }),
        (n.callBindFunction = function (t, i, u, f, e) {
          f === void 0 && (f = null);
          var o = n.getTypeName(t),
            s = o || i || "",
            h = f && f.params ? f.params : {};
          h.mwfClass = o;
          r.createPerfMarker(s + "_Begin");
          u(o, i, h);
          r.createPerfMarker(s + "_End");
          f && f.callback && f.callback(e);
        }),
        (n.getTypeName = function (t) {
          if (t.typeName) return t.typeName;
          if (t.name) return t.name;
          var i = n.typeNameRegEx.exec(t.toString());
          if (i && i.length > 1) return i[1];
        }),
        (n.enumerateComponents = function (n, t) {
          var i, r, u;
          if (n && t) {
            i = n.mwfInstances;
            for (r in i)
              if (i.hasOwnProperty(r) && ((u = i[r]), u && !t(r, u))) break;
          }
        }),
        (n.detach = function (n, t) {
          var i = n,
            r;
          i &&
            i.mwfInstances &&
            !u.isNullOrWhiteSpace(t) &&
            i.mwfInstances.hasOwnProperty(t) &&
            ((r = i.mwfInstances[t]),
            (i.mwfInstances[t] = null),
            r && r.detach && r.detach());
        }),
        (n.typeNameRegEx = /function\s+(\S+)\s*\(/),
        (n.onLoadTimeoutMs = 6e3),
        (n.onDeferredHappened = !1),
        (n.deferredFunctions = []),
        (n.onDomReadyHappened = !1),
        (n.domReadyFunctions = []),
        n
      );
    })();
    (t.ComponentFactory = f),
      (function () {
        i.onDeferred(function () {
          var n, t, r, u;
          if (
            ((f.onDeferredHappened = !0),
            (n = f.deferredFunctions),
            !n || n.length > 0)
          )
            for (t = 0, r = n; t < r.length; t++)
              (u = r[t]),
                typeof u == "function" &&
                  i.SafeBrowserApis.requestAnimationFrame.call(window, u);
          f.deferredFunctions = null;
        }, f.onLoadTimeoutMs);
        i.documentReady(function () {
          var n, t, r, u;
          if (
            ((f.onDomReadyHappened = !0),
            (n = f.domReadyFunctions),
            !n || n.length > 0)
          )
            for (t = 0, r = n; t < r.length; t++)
              (u = r[t]),
                typeof u == "function" &&
                  i.SafeBrowserApis.requestAnimationFrame.call(window, u);
          f.domReadyFunctions = null;
        }, f.onLoadTimeoutMs);
      })();
  });
  define("htmlExtensions", ["require", "exports", "stringExtensions"], function (n, t, i){
    "use strict";
    function e(n, t, i, f) {
      var e, o, s;
      for (f === void 0 && (f = !1), e = 0, o = u(n); e < o.length; e++)
        (s = o[e]), y(s, i, f, r[t]);
    }
    function g(n, t, r, f) {
      var e, s, l, o, h, c;
      if ((f === void 0 && (f = !1), !i.isNullOrWhiteSpace(t)))
        for (e = 0, s = u(n); e < s.length; e++)
          for (l = s[e], o = 0, h = t.split(/\s+/); o < h.length; o++)
            (c = h[o]), i.isNullOrWhiteSpace(c) || y(l, r, f, c);
    }
    function nt(n, t, r, f) {
      var e, s, l, o, h, c;
      for (f === void 0 && (f = !1), e = 0, s = u(n); e < s.length; e++)
        for (l = s[e], o = 0, h = u(t); o < h.length; o++)
          (c = h[o]), i.isNullOrWhiteSpace(c) || d(l, r, f, c);
    }
    function tt(n) {
      n = v(n);
      n && (n.preventDefault ? n.preventDefault() : (n.returnValue = !1));
    }
    function it(n, t, i, r) {
      r === void 0 && (r = 150);
      var f,
        u = 0,
        o = function (n) {
          var t = Date.now();
          f && (clearTimeout(f), (f = undefined));
          !!u && t < u + r
            ? (f = setTimeout(
                function () {
                  u = Date.now();
                  i(n);
                },
                r - (t - u)
              ))
            : ((u = t), i(n));
        };
      return e(n, t, o), o;
    }
    function rt(n, t, r, f, e) {
      function p(n) {
        var i,
          t = 0;
        return function (r) {
          var u = Date.now();
          clearTimeout(i);
          !!t && u < t + e
            ? (i = setTimeout(
                function () {
                  t = u;
                  n(r);
                },
                e - (u - t)
              ))
            : ((t = u), n(r));
        };
      }
      var o, h, a, s, c, l, v;
      if (
        (f === void 0 && (f = !1),
        e === void 0 && (e = 150),
        !i.isNullOrWhiteSpace(t))
      )
        for (o = 0, h = u(n); o < h.length; o++)
          for (a = h[o], s = 0, c = t.split(/\s+/); s < c.length; s++)
            (l = c[s]), i.isNullOrWhiteSpace(l) || ((v = p(r)), y(a, v, f, l));
    }
    function ut(n, t, i, r) {
      r === void 0 && (r = 150);
      var u,
        f = function (n) {
          window.clearTimeout(u);
          u = setTimeout(function () {
            i(n);
          }, r);
        };
      return e(n, t, f), f;
    }
    function ft(n, t) {
      if ((t === void 0 && (t = 5e3), document.readyState === "complete")) {
        n.call(null);
        return;
      }
      if (!document.attachEvent && document.readyState === "interactive") {
        n.call(null);
        return;
      }
      var o,
        i,
        u,
        f = function () {
          clearTimeout(o);
          i && c(document, r.DOMContentLoaded, i);
          u && c(document, r.onreadystatechange, u);
          l.requestAnimationFrame.call(window, n);
        };
      if (
        ((o = setTimeout(function () {
          f("timedout");
        }, t)),
        document.addEventListener)
      ) {
        i = function () {
          f("domcontentloaded");
        };
        e(document, r.DOMContentLoaded, i, !1);
        return;
      }
      document.attachEvent &&
        ((u = function () {
          document.readyState === "complete" && f("readystatecomplete");
        }),
        e(document, r.onreadystatechange, u, !1));
    }
    function et(n, t) {
      t === void 0 && (t = 5e3);
      var i,
        u = setTimeout(function () {
          clearTimeout(u);
          c(window, r.load, i);
          n.call(null);
        }, t);
      i = function () {
        clearTimeout(u);
        l.requestAnimationFrame.call(window, n);
      };
      document.readyState === "complete"
        ? (clearTimeout(u), n.call(null))
        : e(window, r.load, i);
    }
    function p(n, t) {
      !n ||
        i.isNullOrWhiteSpace(t) ||
        b(n, t) ||
        (n.classList
          ? n.classList.add(t)
          : (n.className = i.trim(n.className + " " + t)));
    }
    function w(n, t) {
      var o, e, s, r, f;
      if (!!n && !i.isNullOrWhiteSpace(t))
        for (o = " " + i.trim(t) + " ", e = 0, s = u(n); e < s.length; e++)
          if (((r = s[e]), r.classList)) r.classList.remove(t);
          else if (!i.isNullOrWhiteSpace(r.className)) {
            for (f = " " + r.className + " "; f.indexOf(o) > -1; )
              f = f.replace(o, " ");
            r.className = i.trim(f);
          }
    }
    function ot(n, t) {
      var i, r, u;
      if (t) for (i = 0, r = t; i < r.length; i++) (u = r[i]), w(n, u);
    }
    function st(n, t) {
      var i, r, u;
      if (t) for (i = 0, r = t; i < r.length; i++) (u = r[i]), p(n, u);
    }
    function ht(n, t) {
      var u, f, r;
      if (n && t)
        for (u = 0, f = t; u < f.length; u++)
          (r = f[u]),
            i.isNullOrWhiteSpace(r.name) ||
              i.isNullOrWhiteSpace(r.value) ||
              n.setAttribute(r.name, r.value);
    }
    function b(n, t) {
      return !n || i.isNullOrWhiteSpace(t)
        ? !1
        : n.classList
        ? n.classList.contains(t)
        : (" " + n.className + " ").indexOf(" " + i.trim(t) + " ") > -1;
    }
    function ct(n) {
      return n ? n.parentElement.removeChild(n) : n;
    }
    function lt(n, t) {
      return h(n, t);
    }
    function at(n, t) {
      var i = h(n, t);
      return !i || !i.length ? null : i[0];
    }
    function h(n, t) {
      var r, u;
      if (i.isNullOrWhiteSpace(n) || n === "#") return [];
      if (((r = t || document), /^[\#.]?[\w-]+$/.test(n))) {
        switch (n[0]) {
          case ".":
            return r.getElementsByClassName
              ? o(r.getElementsByClassName(n.slice(1)))
              : o(r.querySelectorAll(n));
          case "#":
            return (u = r.querySelector(n)), u ? [u] : [];
        }
        return o(r.getElementsByTagName(n));
      }
      return o(r.querySelectorAll(n));
    }
    function vt(n, t) {
      var i = h(n, t);
      return !i || !i.length ? null : i[0];
    }
    function yt(n, t) {
      var o = t || document,
        u,
        f,
        i,
        r,
        e;
      for (u = n.split(","), i = 0, r = u; i < r.length; i++)
        (e = r[i]), (f += this.selectElements(e, o));
      return f;
    }
    function o(n) {
      var i, t;
      if (!n) return [];
      for (i = [], t = 0; t < n.length; t++) i.push(n[t]);
      return i;
    }
    function pt(n) {
      for (n === void 0 && (n = document.documentElement); n !== null; ) {
        var t = n.getAttribute("dir");
        if (!t) n = n.parentElement;
        else return t === "rtl" ? s.right : s.left;
      }
      return s.left;
    }
    function a(n) {
      var i, t, r;
      if (n) {
        i = n.getBoundingClientRect();
        t = {};
        for (r in i) t[r] = i[r];
        return (
          typeof t.width == "undefined" && (t.width = n.offsetWidth),
          typeof t.height == "undefined" && (t.height = n.offsetHeight),
          t
        );
      }
    }
    function wt(n) {
      if (n)
        return {
          width:
            parseFloat(a(n).width) +
            parseFloat(f(n, "margin-left")) +
            parseFloat(f(n, "margin-right")),
          height:
            parseFloat(a(n).height) +
            parseFloat(f(n, "margin-top")) +
            parseFloat(f(n, "margin-bottom")),
        };
    }
    function f(n, t, r) {
      if (!n) return null;
      if (!r && r !== "")
        return (
          (r = n.style[t]),
          i.isNullOrWhiteSpace(r) && ((r = getComputedStyle(n)), (r = r[t])),
          r
        );
      n.style[t] = r;
    }
    function c(n, t, i, f) {
      var e, o, s;
      if (n && t && i)
        for (e = 0, o = u(n); e < o.length; e++) (s = o[e]), d(s, i, f, r[t]);
    }
    function k(n) {
      return Array.isArray
        ? Array.isArray(n)
        : {}.toString.call(n) === "[object Array]";
    }
    function u(n) {
      return k(n) ? n : [n];
    }
    function bt(n, t) {
      return !!n && n !== t && n.contains(t);
    }
    function kt(n, t) {
      return !!n && n.contains(t);
    }
    function dt(n) {
      return !n ? "" : n.textContent || n.innerText || "";
    }
    function gt(n, t) {
      !n ||
        t === null ||
        (n.textContent ? (n.textContent = t) : (n.innerHTML = t));
    }
    function ni(n) {
      n && (n.innerHTML = "");
    }
    function ti(n) {
      return (n = v(n)), n.target || n.srcElement;
    }
    function v(n) {
      return n || window.event;
    }
    function y(n, t, i, r) {
      i === void 0 && (i = !1);
      !n ||
        (window.addEventListener
          ? n.addEventListener(r, t, i)
          : n.attachEvent("on" + r, t));
    }
    function d(n, t, i, r) {
      i === void 0 && (i = !1);
      !n ||
        (window.removeEventListener
          ? n.removeEventListener(r, t, i)
          : n.detachEvent("on" + r, t));
    }
    function ii(n, t, i) {
      if ((i === void 0 && (i = {}), !n || !t)) return null;
      var f = typeof t == "string" ? t : r[t],
        u = null;
      if (
        ((i.bubbles = typeof i.bubbles == "undefined" ? !0 : i.bubbles),
        (i.cancelable = typeof i.cancelable == "undefined" ? !0 : i.cancelable),
        window.CustomEvent && typeof CustomEvent == "function")
      )
        (u = new CustomEvent(f, i)),
          i.changedTouches &&
            i.changedTouches.length &&
            (u.changedTouches = i.changedTouches);
      else if (document.createEvent)
        (u = document.createEvent("CustomEvent")),
          u.initCustomEvent(f, i.bubbles, i.cancelable, i.detail),
          i.changedTouches &&
            i.changedTouches.length &&
            (u.changedTouches = i.changedTouches);
      else {
        u = document.createEventObject();
        try {
          n.fireEvent("on" + f, u);
        } catch (e) {
          return undefined;
        }
        return u;
      }
      return n.dispatchEvent(u), u;
    }
    function ri(n) {
      n.stopPropagation ? n.stopPropagation() : (n.returnValue = !1);
    }
    function ui(n) {
      return (
        n === void 0 && (n = window),
        n.scrollY ||
          n.pageYOffset ||
          (n.document.compatMode === "CSS1Compat"
            ? n.document.documentElement.scrollTop
            : n.document.body.scrollTop)
      );
    }
    function fi(n) {
      if (!n) return window.document.documentElement;
      for (
        var i = n.ownerDocument.documentElement, t = n.offsetParent;
        t && f(t, "position") == "static";
  
      )
        t = t.offsetParent;
      return t || i;
    }
    function ei(n, t) {
      if (n && t) {
        var i = t.clientHeight,
          r = t.scrollHeight;
        r > i &&
          (t.scrollTop = Math.min(
            n.offsetTop - t.firstElementChild.offsetTop,
            r - i
          ));
      }
    }
    function oi(n) {
      return typeof n.complete != "undefined" &&
        typeof n.naturalHeight != "undefined"
        ? n && n.complete && n.naturalHeight > 0
        : !0;
    }
    function si(n) {
      return n &&
        typeof n.complete != "undefined" &&
        typeof n.naturalHeight != "undefined"
        ? n && n.complete && n.naturalWidth == 0 && n.naturalHeight == 0
        : !1;
    }
    function hi(n) {
      var i = n.touches && n.touches.length ? n.touches : [n],
        t = (n.changedTouches && n.changedTouches[0]) || i[0];
      return {
        x: t.clientX,
        y: t.clientY,
      };
    }
    function ci(n, t) {
      for (
        var i =
          n.matches ||
          n.webkitMatchesSelector ||
          n.mozMatchesSelector ||
          n.msMatchesSelector;
        n;
  
      ) {
        if (i.call(n, t)) break;
        n = n.parentElement;
      }
      return n;
    }
    function li(n, t) {
      t === void 0 && (t = !0);
      !!n &&
        (window.PointerEvent || window.navigator.pointerEnabled) &&
        f(n, "touchAction", t ? "pan-y" : "pan-x");
    }
    var l, s, r;
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (function (n) {
        n.requestAnimationFrame =
          window.requestAnimationFrame ||
          function (n) {
            typeof n == "function" && window.setTimeout(n, 16.7);
          };
      })((l = t.SafeBrowserApis || (t.SafeBrowserApis = {}))),
      (function (n) {
        n[(n.right = 0)] = "right";
        n[(n.left = 1)] = "left";
      })((s = t.Direction || (t.Direction = {}))),
      (function (n) {
        n[(n.animationend = 0)] = "animationend";
        n[(n.blur = 1)] = "blur";
        n[(n.change = 2)] = "change";
        n[(n.click = 3)] = "click";
        n[(n.DOMContentLoaded = 4)] = "DOMContentLoaded";
        n[(n.DOMNodeInserted = 5)] = "DOMNodeInserted";
        n[(n.DOMNodeRemoved = 6)] = "DOMNodeRemoved";
        n[(n.ended = 7)] = "ended";
        n[(n.error = 8)] = "error";
        n[(n.focus = 9)] = "focus";
        n[(n.focusin = 10)] = "focusin";
        n[(n.focusout = 11)] = "focusout";
        n[(n.input = 12)] = "input";
        n[(n.load = 13)] = "load";
        n[(n.keydown = 14)] = "keydown";
        n[(n.keypress = 15)] = "keypress";
        n[(n.keyup = 16)] = "keyup";
        n[(n.loadedmetadata = 17)] = "loadedmetadata";
        n[(n.mousedown = 18)] = "mousedown";
        n[(n.mousemove = 19)] = "mousemove";
        n[(n.mouseout = 20)] = "mouseout";
        n[(n.mouseover = 21)] = "mouseover";
        n[(n.mouseup = 22)] = "mouseup";
        n[(n.onreadystatechange = 23)] = "onreadystatechange";
        n[(n.resize = 24)] = "resize";
        n[(n.scroll = 25)] = "scroll";
        n[(n.submit = 26)] = "submit";
        n[(n.timeupdate = 27)] = "timeupdate";
        n[(n.touchcancel = 28)] = "touchcancel";
        n[(n.touchend = 29)] = "touchend";
        n[(n.touchmove = 30)] = "touchmove";
        n[(n.touchstart = 31)] = "touchstart";
        n[(n.wheel = 32)] = "wheel";
      })((r = t.eventTypes || (t.eventTypes = {})));
    t.addEvent = e;
    t.addEvents = g;
    t.removeEvents = nt;
    t.preventDefault = tt;
    t.addThrottledEvent = it;
    t.addThrottledEvents = rt;
    t.addDebouncedEvent = ut;
    t.documentReady = ft;
    t.onDeferred = et;
    t.addClass = p;
    t.removeClass = w;
    t.removeClasses = ot;
    t.addClasses = st;
    t.addAttribute = ht;
    t.hasClass = b;
    t.removeElement = ct;
    t.selectElements = lt;
    t.selectFirstElement = at;
    t.selectElementsT = h;
    t.selectFirstElementT = vt;
    t.selectElementsFromSelectors = yt;
    t.nodeListToArray = o;
    t.getDirection = pt;
    t.getClientRect = a;
    t.getClientRectWithMargin = wt;
    t.css = f;
    t.removeEvent = c;
    t.isArray = k;
    t.toArray = u;
    t.isDescendant = bt;
    t.isDescendantOrSelf = kt;
    t.getText = dt;
    t.setText = gt;
    t.removeInnerHtml = ni;
    t.getEventTargetOrSrcElement = ti;
    t.getEvent = v;
    t.customEvent = ii;
    t.stopPropagation = ri;
    t.getScrollY = ui;
    t.getOffsetParent = fi;
    t.scrollElementIntoView = ei;
    t.isImageLoadedSuccessfully = oi;
    t.isImageLoadFailed = si;
    t.getCoordinates = hi;
    t.getParent = ci;
    t.preventDefaultSwipeAction = li;
  });
  define("stringExtensions", ["require", "exports"], function (n, t) {
    "use strict";
    function r(n) {
      return !n || typeof n != "string" || !i(n);
    }
    function i(n) {
      return !n || typeof n != "string"
        ? n
        : n.trim
        ? n.trim()
        : n.replace(/^\s+|\s+$/g, "");
    }
    function u(n, t, i) {
      return (i === void 0 && (i = !0), !n || !t)
        ? !1
        : (i && ((n = n.toLocaleLowerCase()), (t = t.toLocaleLowerCase())),
          n.startsWith)
        ? n.startsWith(t)
        : n.indexOf(t) === 0;
    }
    function f(n, t, i) {
      return (i === void 0 && (i = !0), !n || !t)
        ? !1
        : (i && ((n = n.toLocaleLowerCase()), (t = t.toLocaleLowerCase())),
          n.endsWith)
        ? n.endsWith(t)
        : n.lastIndexOf(t) === n.length - t.length;
    }
    function e(n, t, i) {
      if ((i === void 0 && (i = !0), !n || !t)) return 0;
      var r = 0;
      for (
        i && ((n = n.toLocaleLowerCase()), (t = t.toLocaleLowerCase()));
        n.charCodeAt(r) === t.charCodeAt(r);
  
      )
        r++;
      return r;
    }
    function o(n) {
      for (var i = [], t = 1; t < arguments.length; t++) i[t - 1] = arguments[t];
      return n.replace(/{(\d+)}/g, function (n, t) {
        if (t >= i.length) return n;
        var r = i[t];
        return typeof r != "number" && !r
          ? ""
          : typeof r == "string"
          ? r
          : r.toString();
      });
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    t.isNullOrWhiteSpace = r;
    t.trim = i;
    t.startsWith = u;
    t.endsWith = f;
    t.getMatchLength = e;
    t.format = o;
  });
  define("utility", ["require", "exports", "stringExtensions"], function (n, t, i) {
    "use strict";
    function r(n) {
      return !isNaN(n) && typeof n == "number";
    }
    function e() {
      return window.innerWidth && document.documentElement.clientWidth
        ? Math.min(window.innerWidth, document.documentElement.clientWidth)
        : window.innerWidth || document.documentElement.clientWidth;
    }
    function c() {
      return window.innerHeight && document.documentElement.clientHeight
        ? Math.min(window.innerHeight, document.documentElement.clientHeight)
        : window.innerHeight || document.documentElement.clientHeight;
    }
    function l(n) {
      if (n != null)
        return {
          width: n.clientWidth,
          height: n.clientHeight,
        };
    }
    function a(n) {
      var t;
      if (((n = n || window.event), !n) || ((t = n.key || n.keyIdentifier), !t))
        return t;
      switch (t) {
        case "Left":
          return "ArrowLeft";
        case "Right":
          return "ArrowRight";
        case "Up":
          return "ArrowUp";
        case "Down":
          return "ArrowDown";
        case "Esc":
          return "Escape";
        default:
          return t;
      }
    }
    function v(n) {
      return (
        (n = n || window.event),
        n == null ? null : n.which || n.keyCode || n.charCode
      );
    }
    function y(n, t, i, r, u) {
      var o = "",
        f,
        e;
      r &&
        ((f = new Date()),
        f.setTime(f.getTime() + r * 864e5),
        (o = "; expires=" + f.toUTCString()));
      e = "";
      u && (e = ";domain=" + u);
      window.document.cookie =
        n + "=" + encodeURIComponent(t) + o + ("; path=" + i + ";") + e;
    }
    function p(n) {
      var t, i;
      if (!!n)
        for (t = 0, i = document.cookie.split("; "); t < i.length; t++) {
          var r = i[t],
            f = r.indexOf("="),
            u = o(r.substring(0, f));
          if (u === n) return o(r.substring(u.length + 1));
        }
      return null;
    }
    function o(n) {
      return (
        (n = decodeURIComponent(n.replace("/+/g", " "))),
        n.indexOf('"') === 0 &&
          (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")),
        n
      );
    }
    function w(n) {
      var u;
      if (!!n && n.length === 6) {
        var t = parseInt(n.substring(0, 2), 16),
          i = parseInt(n.substring(2, 4), 16),
          r = parseInt(n.substring(4, 6), 16);
        if (!isNaN(t) && !isNaN(i) && !isNaN(r))
          return (u = (t * 299 + i * 587 + r * 114) / 255e3), u >= 0.5 ? 2 : 1;
      }
      return null;
    }
    function b(n, t, i) {
      return !i ||
        !r(n) ||
        !r(t) ||
        !r(i.left) ||
        !r(i.right) ||
        !r(i.top) ||
        !r(i.bottom)
        ? !1
        : n >= i.left && n <= i.right && t >= i.top && t <= i.bottom;
    }
    function k(n) {
      console && console.warn
        ? console.warn(n)
        : console && console.error && console.error(n);
    }
    function d(n, t) {
      if (
        t ||
        !(s("item").toLowerCase().indexOf("perf_marker_global:true") < 0)
      ) {
        /*!/#IFDEF perf_marker_global || log_define_timing */
        if (
          !i.isNullOrWhiteSpace(n) &&
          window.performance &&
          window.performance.mark
        ) {
          var r = n.split(" ").join("_");
          window.performance.mark(r);
          window.console &&
            window.console.timeStamp &&
            window.console.timeStamp(r);
          /*!/#ENDIF*/
        }
      }
    }
    function g(n) {
      if (
        i.isNullOrWhiteSpace(n) ||
        !window.performance ||
        !window.performance.mark
      )
        return 0;
      var r = n.split(" ").join("_"),
        t = window.performance.getEntriesByName(r);
      return t && t.length ? Math.round(t[t.length - 1].startTime) : 0;
    }
    function nt(n, t) {
      var f;
      if (!r(n)) return "00:00";
      f = n < 0;
      f && (n *= -1);
      var u = Math.floor(n / 3600),
        e = n % 3600,
        o = Math.floor(e / 60),
        i = "";
      return (
        (i = t ? (u > 0 ? u + ":" : "00:") : u > 0 ? u + ":" : ""),
        (n = Math.floor(e % 60)),
        (i += (o < 10 ? "0" : "") + o),
        (i += ":" + (n === 0 ? "00" : (n < 10 ? "0" : "") + n)),
        f ? "-" + i : i
      );
    }
    function tt(n) {
      if (!JSON || !JSON.parse) throw new Error("JSON.parse unsupported.");
      if (!n) throw new Error("Invalid json.");
      return JSON.parse(n);
    }
    function u() {
      for (var e, t, o, n, f, i, r = [], c = 0; c < arguments.length; c++)
        r[c] = arguments[c];
      if (!r || !r.length) return null;
      if (((e = typeof r[0] == "boolean" && r[0]), r.length < 2))
        return e ? null : r[0];
      if (e && r.length < 3) return r[1];
      for (t = e ? r[1] : r[0], o = e ? 2 : 1; o < r.length; o++)
        for (n in r[o])
          if (r[o].hasOwnProperty(n)) {
            if (((f = r[o][n]), e)) {
              var s = Array.isArray
                  ? Array.isArray(f)
                  : {}.toString.call(f) === "[object Array]",
                h =
                  !!t[n] &&
                  (Array.isArray
                    ? Array.isArray(t[n])
                    : {}.toString.call(t[n]) === "[object Array]"),
                l = !s && typeof f == "object",
                a = !h && !!t[n] && typeof t[n] == "object";
              if (s && h) {
                for (i = 0; i < f.length; i++)
                  (s = Array.isArray
                    ? Array.isArray(f[i])
                    : {}.toString.call(f[i]) === "[object Array]"),
                    (h =
                      !!t[n][i] &&
                      (Array.isArray
                        ? Array.isArray(t[n][i])
                        : {}.toString.call(t[n][i]) === "[object Array]")),
                    (l = !s && typeof f[i] == "object"),
                    (a = !h && !!t[n][i] && typeof t[n][i] == "object"),
                    (t[n][i] = s
                      ? u(!0, h ? t[n][i] : [], f[i])
                      : l
                      ? u(!0, a ? t[n][i] : {}, f[i])
                      : f[i]);
                continue;
              } else if (s) {
                t[n] = u(!0, [], f);
                continue;
              } else if (l) {
                t[n] = u(!0, a ? t[n] : {}, f);
                continue;
              }
            }
            t[n] = f;
          }
      return t;
    }
    function it(n, t, i, r, u) {
      var f = !i || i < 0 ? -1 : Number(new Date()) + i;
      (t = t || 100),
        (function e() {
          var i = n();
          if (i && r) r();
          else {
            if (i) return;
            if (f === -1 || Number(new Date()) < f) setTimeout(e, t);
            else if (u) u();
            else return;
          }
        })();
    }
    function s(n, t) {
      return t === void 0 && (t = !0), h(location.search, n, t);
    }
    function rt(n, t, i) {
      return i === void 0 && (i = !0), h(n, t, i);
    }
    function h(n, t, i) {
      if ((i === void 0 && (i = !0), !t || !n)) return "";
      var r = "[\\?&]" + t.replace(/[\[\]]/g, "\\$&") + "=([^&#]*)",
        f = i ? new RegExp(r, "i") : new RegExp(r),
        u = f.exec(n);
      return u === null ? "" : decodeURIComponent(u[1].replace(/\+/g, " "));
    }
    function ut(n, t) {
      var i, r;
      if (!t) return n;
      if (n.indexOf("//") === -1)
        throw 'To avoid unexpected results in URL parsing, url must begin with "http://", "https://", or "//"';
      return (
        (i = document.createElement("a")),
        (i.href = n),
        (i.search = (i.search ? i.search + "&" : "?") + t),
        (r = i.href),
        (i = null),
        r
      );
    }
    function f(n, t, i) {
      try {
        if (!t || (i !== undefined && !i)) return null;
        switch (n) {
          case 1:
            if (!window.localStorage) return null;
            if (i === undefined) return localStorage.getItem(t);
            localStorage.setItem(t, i);
            break;
          case 0:
            if (!window.sessionStorage) return null;
            if (i === undefined) return sessionStorage.getItem(t);
            sessionStorage.setItem(t, i);
        }
      } catch (r) {
        switch (n) {
          case 1:
            console.log("Error while fetching or saving local storage. It could be due to cookie is blocked.");
            break;
          case 0:
            console.log("Error while fetching or saving session storage. It could be due to cookie is blocked.");
        }
      }
    }
    function ft(n, t) {
      f(0, n, t);
    }
    function et(n) {
      return f(0, n);
    }
    function ot(n, t) {
      f(1, n, t);
    }
    function st(n) {
      return f(1, n);
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    t.isNumber = r;
    t.getWindowWidth = e;
    t.getWindowHeight = c;
    t.getDimensions = l;
    t.getVirtualKey = a;
    t.getKeyCode = v;
    t.setCookie = y;
    t.getCookie = p;
    t.detectContrast = w;
    t.pointInRect = b;
    t.apiDeprecated = k;
    t.createPerfMarker = d;
    t.getPerfMarkerValue = g;
    t.toElapsedTimeString = nt;
    t.parseJson = tt;
    t.extend = u;
    t.poll = it;
    t.getQSPValue = s;
    t.getQSPFromUrl = rt;
    t.addQSP = ut;
    t.saveToSessionStorage = ft;
    t.getValueFromSessionStorage = et;
    t.saveToLocalStorage = ot;
    t.getValueFromLocalStorage = st;
    var ht;
    (function (n) {
      function t() {
        var t;
        if (window.matchMedia) {
          for (t = 0; t < n.allWidths.length; ++t)
            if (
              !window.matchMedia("(min-width:" + n.allWidths[t] + "px)").matches
            )
              return t;
        } else
          for (t = 0; t < n.allWidths.length; ++t)
            if (!(e() >= n.allWidths[t])) return t;
        return n.allWidths.length;
      }
      n.allWidths = [320, 540, 768, 1084, 1400, 1779];
      n.vpMin = n.allWidths[0];
      n.vpMax = 2048;
      n.getViewport = t;
    })((ht = t.Viewports || (t.Viewports = {})));
  });
  define("ajaxWithAnimation", ["jqReady!", "jsll"], function (n, t) {
    var i = [
        "<div class='c-progress f-indeterminate-",
        "regional",
        "' style='margin:",
        "0",
        "px auto' tabindex='0' role='progressbar'><span></span><span></span><span></span><span></span><span></span></div>",
      ],
      u = function (t, r) {
        var u = n(t),
          o,
          f,
          e;
        u.length &&
          ((o = (r.loaderType || "").toUpperCase()),
          (i[1] =
            o === "PROGRESS" || o === "PROGRESSBAR"
              ? "regional"
              : o === "SPINNERLARGE"
              ? "local f-progress-large f-center"
              : "local f-progress-small"),
          r.margin && r.margin.length && (i[3] = r.margin),
          (f = i.join("")),
          (e = (r.loaderPosition || "").toUpperCase()),
          e === "TOP" || e === "BOTTOM"
            ? (u.addClass("ajaxloader"),
              e === "BOTTOM" ? u.append(f) : u.prepend(f))
            : (u.parent().addClass("ajaxloader"),
              e === "BEFORE" ? u.before(f) : u.after(f)));
      },
      f = function (t, i) {
        var r = n(t),
          u;
        r.length &&
          ((u = (i.loaderPosition || "").toUpperCase()),
          u !== "TOP" && u !== "BOTTOM" && (r = r.parent()),
          r.removeClass("ajaxloader").children().remove(".c-progress"));
      },
      r = function (i) {
        i.refreshElement && u(i.refreshElement, i);
        var r = n.extend(i, {
          serviceName: "OneRFService",
          serviceType: "WebService",
          operationName: "OneRFAjax",
          addCvToRequestHeader: !0,
        });
        return t.service.post(r).always(function () {
          f(i.refreshElement, i);
        });
      };
    return (
      n.extend(n, {
        ajaxWithAnimation: r,
      }),
      r
    );
  });
  define("advancedHistory", ["window"], function (n) {
    function f(n, t) {
      var u, f, o, e;
      if (i)
        if (((u = r[n]), u))
          if (typeof u == "function") u != t && (r[n] = [u, t]);
          else {
            for (f = !1, e = 0; (o = u[e]); ++e)
              if (o == t) {
                f = !0;
                break;
              }
            f || u.push(t);
          }
        else r[n] = t;
    }
    function e(n, t) {
      var u, e, f;
      if (i && ((u = r[n]), u))
        if (typeof u == "function") u === t && delete r[n];
        else
          for (f = 0; (e = u[f]); ++f)
            if (typeof e == "function" && e === t) {
              u.splice(f, 1);
              break;
            }
    }
    function o(n, r, u, f) {
      if (i) {
        var e = {
          stateType: n,
          stateObject: r,
        };
        typeof u == "undefined"
          ? t.pushState(e, f || "")
          : t.pushState(e, f || "", u);
      }
    }
    function s(n, r, u, f) {
      if (i) {
        var e = {
          stateType: n,
          stateObject: r,
        };
        typeof u == "undefined"
          ? t.replaceState(e, f || "")
          : t.replaceState(e, f || "", u);
      }
    }
    function h() {
      i && t.back();
    }
    function c() {
      i && t.forward();
    }
    function l(n) {
      i && n && t.go(n);
    }
    function a() {
      if (i) {
        var n = t.state;
        if (n) return n.stateType;
      }
    }
    function v() {
      if (i) {
        var n = t.state;
        if (n && n.stateType) return n.stateObject;
      }
    }
    function y(n) {
      var t,
        i = n.state,
        f,
        e;
      if (i)
        (t = i.stateType), t && ((f = r[t]), f && ((e = i.stateObject), u(f, e)));
      else for (t in r) u(r[t], null);
    }
    function u(n, t) {
      if (typeof n == "function") n(t);
      else if (n && n.length > 0)
        for (var i, r = 0; (i = n[r]); ++r) typeof i == "function" && i(t);
    }
    var t = n.history,
      i = !!(t && t.pushState),
      r = {};
    return (
      i && n.addEventListener("popstate", y),
      {
        on: f,
        off: e,
        push: o,
        replace: s,
        back: h,
        forward: c,
        go: l,
        currentType: a,
        currentState: v,
        isSupported: i,
      }
    );
  });
  define("queryParams", [], function () {
    function n(n) {
      return (n = n.replace(/\+/g, " ")), decodeURIComponent(n);
    }
    function t(n, t, r) {
      if (
        n.indexOf("?") === -1 &&
        (n.indexOf("http") === 0 ||
          (n.indexOf("=") === -1 && n.indexOf("&") === -1))
      )
        return {};
      var u = n.indexOf("?") !== -1 ? n.split("?")[1] : n;
      return i(u, t, r);
    }
    function i(t, i, r) {
      var f = {},
        s,
        o;
      if (t && t.length)
        for (t = t.split("#")[0], s = t.split("&"), o = 0; o < s.length; o++) {
          var h = s[o].split("="),
            u = h[0].toLowerCase(),
            e = h[1];
          r && ((u = n(u)), e && (e = n(e)));
          i ? (f[u] || (f[u] = []), f[u].push(e)) : (f[u] = e);
        }
      return f;
    }
    return t;
  });
  define("ajaxEvent", [
    "jqReady!",
    "document",
    "advancedHistory",
    "queryParams",
    "refreshAjaxModuleTelemetry",
    "jsll",
    "ajaxWithAnimation",
  ], function (n, t, i, r, u, f) {
    function h(t, i, u) {
      var f = null,
        e,
        o;
      return (
        typeof i == "string" && ((f = i.split("?")[0]), (i = r(i, !0, !0))),
        (f && f.length) || (f = location.href.split("?")[0]),
        (e = n.param(i, !0)),
        (o = f + (e && e.length ? "?" + e : "")),
        s(t, o, u || {})
      );
    }
    function c(t) {
      var i = {
          ajaxevent: t,
        },
        s = n("meta[name=MarginTopPixels]").attr("content"),
        r,
        u,
        f,
        e,
        o;
      return (
        s !== undefined && (i.MarginTopPixels = s),
        (r = n("meta[name=CurrentTheme]").attr("content")),
        r !== undefined && (i.CurrentTheme = r),
        (u = n("meta[name=AccentColor]").attr("content")),
        u !== undefined && (i.AccentColor = u),
        (f = n("meta[name=X-Flight-Ids]").attr("content")),
        f !== undefined && (i["X-Flight-Ids"] = f),
        (e = n("meta[name=X-FD-FEATURES]").attr("content")),
        e !== undefined && (i["X-FD-FEATURES"] = e),
        (o = n("meta[name=X-FD-FEATURES-IMP]").attr("content")),
        o !== undefined && (i["X-FD-FEATURES-IMP"] = o),
        i
      );
    }
    function l() {
      var t = {},
        o = n("meta[name=hardware]").attr("content"),
        i,
        r,
        u,
        f,
        e;
      return (
        o !== undefined && (t.hardware = o),
        (i = n("meta[name=architecture]").attr("content")),
        i !== undefined && (t.architecture = i),
        (r = n("meta[name=telemetryId]").attr("content")),
        r !== undefined && (t.telemetryId = r),
        (u = n("meta[name=deviceSerialNumber]").attr("content")),
        u !== undefined && (t.deviceSerialNumber = u),
        (f = n("meta[name=timeZone]").attr("content")),
        f !== undefined && (t.timeZone = f),
        (e = n("meta[name=userinfo]").attr("content")),
        e !== undefined && (t.auth = e),
        t
      );
    }
    function s(r, u, e, s) {
      var h = {
          url: u,
          previousUrl: location.href,
          event: r,
          title: t.title,
          scrollTop: n(t).scrollTop(),
          options: {
            complete: null,
            error: "",
            loaderPosition: e.loaderPosition,
            loaderType: e.loaderType,
            refreshElement:
              e.refreshElement && typeof e.refreshElement == "string"
                ? e.refreshElement
                : null,
          },
        },
        a = {
          url: u,
          dataType: "html",
          data: n.extend(e.data, l()),
          additionalHeaders: n.extend(e.additionalHeaders, c(r)),
        };
      return (
        (a = n.extend(a, e)),
        n
          .ajaxWithAnimation(a)
          .done(function (u) {
            var c = t.URL;
            v(u, r, e);
            s ||
              r === o ||
              (i.currentState() ||
                i.push(
                  "ajaxEvent",
                  n.extend({}, h, {
                    url: h.previousUrl,
                  }),
                  h.previousUrl,
                  h.title
                ),
              i.push("ajaxEvent", h, h.url, h.title));
            c !== t.URL ? f.ct.capturePageView() : f.ct.captureContentUpdate();
            e.complete && e.complete(u);
          })
          .fail(function () {
            e.error && e.error();
          })
      );
    }
    function a(t) {
      t &&
        t.event &&
        s(t.event, t.url, t.options, !0).done(function () {
          n("html, body").animate(
            {
              scrollTop: t.scrollTop,
            },
            200
          );
        });
    }
    function v(i, r) {
      var f = n(n.trim(i)),
        e,
        h,
        s;
      y(f);
      e = n("head title");
      e.length && (t.title = e.text());
      h = f.find("[data-module-id]");
      s = [];
      h.each(function () {
        var i = n(this),
          e = i.attr("id"),
          f = n("[id='" + e + "']"),
          t;
        f.length &&
          ((t = n("[data-axp]", f)),
          (t.length || r !== o) &&
            (t.length
              ? (u(t, i),
                t.first().after(i.children()),
                t
                  .parents("section[role=tabpanel]:first")
                  .attr("defercomplete", "true"),
                t.remove())
              : (u(f, i), f.replaceWith(i)),
            s.push(e),
            n.each(i[0].attributes, function (n, t) {
              (t.name !== "class" && f.attr(t.name)) || f.attr(t.name, t.value);
            })));
      });
      p(f);
      w(r, s);
    }
    function y(t) {
      var i = t.filter("link[rel=stylesheet]");
      i.length &&
        i.each(function () {
          var t = this.getAttribute("href");
          e[t] || (n("head").append(this), (e[t] = !0));
        });
    }
    function p(t) {
      var i = t.filter("script");
      i.length &&
        i.each(function () {
          var f, r, o, s, h, i, u, t;
          this.text.indexOf("requirejs.config") === 0 &&
            ((f = "requireJsConfig"),
            (r = e[f]),
            r && r.parentNode && r.parentNode.removeChild(r),
            (o = new RegExp("paths:{(.|\n)*?}")),
            (s = o.exec(this.text)),
            s.forEach(function (n) {
              if (n.indexOf("paths:") === 0)
                return (h = n.replace("paths:", "")), !1;
            }),
            (u = n("head")),
            (t = JSON.parse(h.replace(/\'/g, '"'))),
            t.redtux !== undefined &&
              ((i =
                '<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="redtux" src="' +
                t.redtux +
                '" crossorigin="anonymous"></script>'),
              u.append(i)),
            t.mwf !== undefined &&
              ((i =
                '<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="mwf" src="' +
                t.mwf +
                '" crossorigin="anonymous"></script>'),
              u.append(i)),
            t.partner !== undefined &&
              ((i =
                '<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="partner" src="' +
                t.partner +
                '" crossorigin="anonymous"></script>'),
              u.append(i)),
            t.platform !== undefined &&
              ((i =
                '<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="platform" src="' +
                t.platform +
                '" crossorigin="anonymous"></script>'),
              u.append(i)),
            (e[f] = this));
        });
    }
    function w(n, i) {
      if (n && i && i.length) {
        var r = t.createEvent("CustomEvent");
        r.initCustomEvent("moduleRefreshed", !0, !0, {
          eventName: n,
          modules: i,
        });
        t.dispatchEvent(r);
      }
    }
    var e = {},
      o = "DeferredEvent";
    i.on("ajaxEvent", a);
    return h;
  });
  define("fireDeferredEvent", ["jqReady!", "ajaxEvent", "document"], function (n, t, i) {
    var r = !1;
    return function (u) {
      return r ? n.Deferred().reject() : ((r = !0), t("DeferredEvent", i.URL, u));
    };
  });
  define("refreshAjaxModuleTelemetry", ["window"], function (n) {
    var t =
      n._pageBITags && n._pageBITags.elementTag
        ? n._pageBITags.elementTag
        : "data-m";
    return function (n, i) {
      var r = n && n.attr(t),
        u = i && i.attr(t);
      if (r !== u && r && u) {
        var f = JSON.parse(r),
          e = JSON.parse(u),
          o = new RegExp(e.id, "g");
        i.html(i.get(0).innerHTML.replace(o, f.id));
        i.attr(t, r);
      }
    };
  });
  define("deferExec", function () {
    "use strict";
    function h(n) {
      for (var t = 0; t < n.length; t += 1)
        Number.isInteger(Number(n[t][1]))
          ? setTimeout(n[t][0], n[t][1])
          : n[t][0]();
    }
    function s() {
      window._pageTimings || (window._pageTimings = {});
      window._pageTimings.didDeferExecTimeout = e;
      var n = f;
      n.length && ((f = []), h(n));
    }
    function n() {
      clearTimeout(o);
      u = !0;
      s();
    }
    function c() {
      window.removeEventListener
        ? window.removeEventListener("load", n, !1)
        : window.detachEvent && window.detachEvent("load", n);
      r = !0;
      e = !0;
      s();
    }
    function t(n, i) {
      return (
        u || r
          ? Number.isInteger(Number(i))
            ? setTimeout(n, i)
            : n()
          : f.push([n, i]),
        t
      );
    }
    var i = typeof window != "undefined" && window.document,
      r = !i,
      u = !i,
      f = [],
      e = !1,
      o;
    return (
      (Number.isInteger =
        Number.isInteger ||
        function (n) {
          return typeof n == "number" && isFinite(n) && Math.floor(n) === n;
        }),
      i &&
        (window.addEventListener
          ? window.addEventListener("load", n, !1)
          : window.attachEvent && window.attachEvent("onload", n),
        (u && r) || (o = setTimeout(c, 5e3))),
      (t.load = function (n, i, r, u) {
        u.isBuild ? r(null) : t(r, n);
      }),
      t
    );
  });
  require(["domReady!", "deferExec!"]);
  define("headData", ["evaluate", "document"], function (n, t) {
    var r = t.getElementsByTagName("head")[0],
      i,
      u,
      f,
      e;
    return r
      ? ((i = {}),
        (u = r.getAttribute("data-js")),
        u && (i.jsInfo = n(u)),
        (f = r.getAttribute("data-client-settings")),
        f && (i.clientSettings = n(f)),
        (e = r.getAttribute("data-info")),
        e && (i.debugInfo = n(e)),
        (i.xdid = r.getAttribute("data-xd-id")),
        (i.locale = t
          .getElementsByTagName("html")[0]
          .getAttribute("lang")
          .toLowerCase()),
        i)
      : {};
  });
  define("evaluate", function () {
    return (
      (window.JSON && window.JSON.parse) ||
      function (n) {
        return eval("(" + n + ")");
      }
    );
  });
  require([
    "jqReady!",
    "document",
    "headData",
    "ajaxEvent",
    "fireDeferredEvent",
    "domReady!",
  ], function (n, t, i, r, u) {
    function c() {
      var t = n("[data-ajax]");
      t.each(function () {
        var i = n(this),
          t = i.data("ajax"),
          l,
          u,
          f,
          s,
          c;
        if (t && t.e && t.e.length && t.sel && t.sel.length) {
          l = n(".d_xbox").length >= 1;
          u = !1;
          i.attr("role") === "region" &&
            ((f = n("#pivot-tab-" + i.attr("id"))),
            f.length && ((i = f), (t.sel = "#" + i.attr("id"))));
          var e = i.parents("[data-module-id]:first"),
            r = e.length ? e.attr("id") : i.attr("id"),
            a = e.parents("[data-m]:first").attr("id"),
            o = t.e;
          r && t.pivot === "true"
            ? ((s = n("#" + i.attr("aria-controls"))),
              s.length &&
                ((r = s.attr("id")), (a = r), (t.margin = l ? "50" : "250")),
              (u = !0))
            : (t.id === 1 || t.id === !0) && (o = r + "-" + o);
          var y = t.sel[0] === "#" ? t.sel : "#" + r + " " + t.sel,
            v = ".ajaxevent." + r,
            h = "click" + v;
          u && (h += " focusin" + v);
          c = t.fireonce === "true" ? !0 : !1;
          n("body").on(h, y, function () {
            var i =
              t.usebrowserurl === "true" ? location.href : n(this).attr("href");
            return p(o, i, t, r, "#" + a, c), c && n("body").off(h), !1;
          });
        }
      });
    }
    function l(n) {
      if (!n) return !1;
      var i = n.getBoundingClientRect();
      return (
        i.top < (window.innerHeight || t.documentElement.clientHeight) ||
        i.top <= 0
      );
    }
    function f() {
      var t = n(".ajaxplaceholder:visible"),
        i = t.length;
      !e && i && l(t[0]) && (h(), (e = !0));
    }
    function a() {
      f();
    }
    function v() {
      var i = n(".ajaxplaceholder:visible").not(".c-pivot").length;
      if (i) {
        n(window).on("scroll", f);
        window.staticOverrideDisableReadyEvent || n(t).ready(a);
      }
    }
    function y() {
      n(window).off("scroll", f);
    }
    function p(t, u, f, e, h, c) {
      f = n.extend({}, f, {
        refreshElement: f.wait ? "#" + e + " " + f.wait : "#" + e,
        loaderType: f.waitind || f.waitInd,
        loaderPosition: f.waitpos || f.waitPos,
        margin: f.margin,
        additionalHeaders: n.extend({}, i.debugInfo && i.debugInfo.bh),
        data: n.extend({}, i.debugInfo && i.debugInfo.bh),
      });
      r(t, u, f).done(function () {
        c && s();
        o(t, e);
      });
    }
    function o(n, i) {
      var u = {
          eventName: n,
          moduleId: i,
        },
        r = t.createEvent("CustomEvent");
      r.initCustomEvent("deferredLoadModuleCompleted", !0, !0, u);
      t.dispatchEvent(r);
    }
    function s() {
      var t = n("section.c-pivot section[role=tabpanel][defercomplete]");
      n("[data-axp]", t).removeAttr("data-axp");
      n("[data-deferredevent]", t).removeAttr("data-deferredevent");
      t.each(function () {
        n("body").off(
          "click.ajaxevent." +
            n(this).attr("id") +
            " focusin.ajaxevent." +
            n(this).attr("id")
        );
      });
    }
    function h() {
      var t = n(".ajaxplaceholder[data-axp]").length;
      t &&
        u({
          additionalHeaders: n.extend({}, i.debugInfo && i.debugInfo.bh),
          data: n.extend({}, i.debugInfo && i.debugInfo.bh),
        }).done(function () {
          s();
          o();
          y();
        });
    }
    var e = !1;
    n.ajaxPrefilter(function (n, t) {
      (n.dataType == "script" || t.dataType == "script") && (n.cache = !0);
    });
    c();
    window.staticOverrideDisableScrollEvent || v();
    n("[data-deferredevent]").length > 0 && require(["deferExec!5000"], h);
  });
  require(["jqReady!", "domReady!"], function (n) {
    (window.apiTagging = {}),
      (function (t) {
        var r, i;
        if (
          t !== undefined &&
          ((t.appId = ""),
          (t.awaCheckedTimes = 0),
          (t.postMessage = function (n) {
            window.parent.postMessage(n, "*");
          }),
          (t.awaIsAvailable = function () {
            return !!(
              window.awa &&
              window.awa.ct &&
              window.awa.ct.captureContentPageAction
            );
          }),
          (t.getUrlVars = function () {
            var n = {},
              t = window.location.href.replace(
                /[?&]+([^=&]+)=([^&]*)/gi,
                function (t, i, r) {
                  n[i] = r;
                }
              );
            return n;
          }),
          (t.getUrlParam = function (n, i) {
            var r = i;
            return (
              window.location.href.indexOf(n) > -1 &&
                (r = decodeURIComponent(t.getUrlVars()[n])),
              r
            );
          }),
          (t.setAppId = function () {
            t.awaIsAvailable()
              ? window.awa.extendCoreData({
                  appId: t.appId,
                })
              : t.awaCheckedTimes <= 100 &&
                (t.awaCheckedTimes++,
                setTimeout(function () {
                  t.setAppIda();
                }, 50));
          }),
          (t.setAppIdFromQS = function () {
            var i = t.getUrlParam("jsllappid", undefined);
            n.trim(i) && ((t.appId = n.trim(i)), t.setAppId());
          }),
          (t.setAppIdFromPM = function (i) {
            i.originalEvent.data.setAppId &&
              i.originalEvent.data.appId &&
              ((t.appId = n.trim(i.originalEvent.data.appId)), t.setAppId());
          }),
          (t.getVideoId = function (t) {
            var r = undefined,
              i = n(t).closest(".c-video-player").attr("data-player-data");
            return (
              (i = JSON.parse(i)),
              i.metadata && i.metadata.videoId && (r = i.metadata.videoId),
              r
            );
          }),
          (t.attachVideoEvent = function (i, r) {
            n(i).on(
              "ended pause play playing seeked timeupdate volumechange abort canplay canplaythrough durationchange emptied error progress ratechange seeking stalled suspend waiting",
              function (n) {
                var i = {};
                i.tagging = "video";
                i.targetVideoId = r;
                i.type = n.type;
                i.autoplay = this.autoplay;
                i.controls = this.controls;
                i.currentSrc = this.currentSrc;
                i.currentTime = this.currentTime;
                i.defaultMuted = this.defaultMuted;
                i.defaultPlaybackRate = this.defaultPlaybackRate;
                i.duration = this.duration;
                i.ended = this.ended;
                i.error = this.error;
                i.loop = this.loop;
                i.muted = this.muted;
                i.networkState = this.networkState;
                i.paused = this.paused;
                i.playbackRate = this.playbackRate;
                i.preload = this.preload;
                i.readyState = this.readyState;
                i.seeking = this.seeking;
                i.src = this.src;
                i.volume = this.volume;
                t.postMessage(i);
              }
            );
          }),
          (t.vTaggingHelper = function (i, r) {
            i.tagging = "video";
            i.type = "videostart";
            i.targetVideoId = r.contentTags.vidid;
            i.targetVideoName = r.contentTags.vidnm;
            n("video").each(function () {
              var u = this,
                f = t.getVideoId(u);
              f === r.contentTags.vidid &&
                n(u).attr("videoeventapi") !== "true" &&
                ((i.targetVideoActionType = n(u)[0].autoplay ? "A" : "O"),
                (i.targetVideoDuration = n(u)[0].duration),
                (i.targetVideoIsMuted = n(u)[0].muted || n(u)[0].volume === 0),
                t.attachVideoEvent(u, r.contentTags.vidid),
                u.setAttribute("videoeventapi", !0));
            });
          }),
          (t.turnOnVideoAPI = function (n) {
            if (n.originalEvent.data.videoAPI)
              if (t.awaIsAvailable()) {
                var i = awa.ct.captureContentPageAction;
                awa.ct.captureContentPageAction = function (r) {
                  if (r.behavior === 240) {
                    r.tagging = "behavior";
                    t.postMessage(r);
                    var u = {};
                    t.vTaggingHelper(u, r);
                    t.postMessage(u);
                  } else (r.tagging = "behavior"), t.postMessage(r);
                  n.originalEvent.data.tOffIframeTagging || i(r);
                };
              } else
                t.awaCheckedTimes <= 100 &&
                  setTimeout(function () {
                    t.turnOnVideoAPI(n);
                  }, 50);
          }),
          (r = function (n) {
            var i = !0,
              r;
            if (t.allowedParentDomains) {
              i = !1;
              for (r in t.allowedParentDomains) n === r && (i = !0);
            }
            return i;
          }),
          window.location !== window.parent.location)
        ) {
          try {
            n(window).on("message", function (n) {
              r(n.originalEvent.origin) &&
                n.originalEvent.data &&
                n.originalEvent.data.vTagging &&
                (t.setAppIdFromPM(n), t.turnOnVideoAPI(n));
            });
            i = {};
            i.onePlayerApi = !0;
            t.postMessage(i);
          } catch (u) {}
          t.setAppIdFromQS();
        }
      })(window.apiTagging);
  });
  define("defaultFocus", ["jqReady!", "domReady!"], function () {
    function o(n) {
      return parseInt(n.getAttribute("tabindex")) >= 0
        ? !0
        : e.indexOf(n.tagName) !== -1
        ? !0
        : !1;
    }
    function u(n, t) {
      for (var i, r = 0; r < n.children.length; ++r)
        (i = n.children[r]),
          o(i) && (t.top || (t.top = i), (t.bottom = i)),
          u(i, t);
    }
    function f(n) {
      var f = {
          top: null,
          bottom: null,
        },
        t,
        i,
        r;
      u(n, f);
      t = document.createElement("div");
      i = document.createElement("div");
      t.setAttribute("tabindex", 0);
      i.setAttribute("tabindex", 0);
      t.setAttribute("data-tv-prevent-focus", !0);
      i.setAttribute("data-tv-prevent-focus", !0);
      t.addEventListener("focus", function () {
        f.bottom.focus();
      });
      i.addEventListener("focus", function () {
        f.top.focus();
      });
      n.insertAdjacentElement("afterbegin", t);
      n.insertAdjacentElement("beforeend", i);
      r = 10;
      t.style =
        "width:" +
        document.documentElement.clientWidth +
        "px;height:" +
        r +
        "px;opacity:0;position:fixed;left:0;top:100px;z-index:9999";
      i.style =
        "width:" +
        document.documentElement.clientWidth +
        "px;height:" +
        r +
        "px;opacity:0;position:fixed;left:0;top:" +
        (document.documentElement.clientHeight - r) +
        "px;z-index:9999";
    }
    function r(n) {
      var u, r, f, i;
      if (!n) return !1;
      u = n.querySelectorAll("[" + t + "]:not([disabled]):not([hidden])");
      r = [];
      for (i in u) u.hasOwnProperty(i) && r.push(u[i]);
      for (
        r = r.sort(function (n, i) {
          var u = parseInt(n.getAttribute(t)),
            r;
          return (
            (u = isNaN(u) ? 0 : u),
            (r = parseInt(i.getAttribute(t))),
            (r = isNaN(r) ? 0 : r),
            u - r
          );
        }),
          f = !1,
          i = 0;
        i < r.length;
        ++i
      )
        if ((r[i].focus(), document.activeElement === r[i])) {
          f = !0;
          break;
        }
      return f;
    }
    var e = [
        "A",
        "BUTTON",
        "IFRAME",
        "INPUT",
        "SELECT",
        "TEXTAREA",
        "X-MS-WEBVIEW",
      ],
      t = "data-focus-rank",
      n,
      i = [],
      s = function (t, u, e, o) {
        if (
          (n && (n.disconnect(), (n = null)),
          (t = t || document.body),
          t === document.body || t === document.documentElement)
        )
          r(t);
        else {
          var s = function (t) {
              if (r(t)) {
                n.disconnect();
                n = null;
                u && f(t);
                window.WinStoreClient &&
                  window.WinStoreClient.navigateForwardInternally(e, t);
                return;
              }
              for (
                var i = document.activeElement;
                i && i.nodeType === Node.ELEMENT_NODE;
  
              ) {
                if (i === t) {
                  n.disconnect();
                  n = null;
                  u && f(t);
                  window.WinStoreClient &&
                    window.WinStoreClient.navigateForwardInternally(e, t);
                  return;
                }
                i = i.parentNode;
              }
            },
            h = function (n) {
              for (var i, u, r = 0; r < n.length; ++r)
                if (((i = n[r]), i.type === "childList"))
                  for (u = 0; u < i.addedNodes.length; ++u)
                    i.addedNodes[u].nodeType == 1 && s(t);
                else i.type === "attributes" && i.target.nodeType == 1 && s(t);
            };
          n = new window.MutationObserver(h);
          n.observe(t, {
            childList: !0,
            attributes: !0,
            subtree: !0,
          });
          i.push(o || document.activeElement);
          s(t);
        }
      },
      h = function (n) {
        for (var t; i.length > 0 && t !== document.activeElement; )
          (t = i.pop()),
            t.focus(),
            window.WinStoreClient &&
              window.WinStoreClient.navigateBackwardInternally(n);
        return t === document.activeElement;
      };
    return {
      focus: s,
      tryRestorePreviousFocus: h,
      trySetDefaultFocusInContainer: r,
    };
  });
  define("targeting", ["jqReady!", "domReady!"], function (n) {
    function t() {
      n("body").on("click", function (t) {
        var o = n(t.target),
          e,
          s,
          h;
        return (
          u(o) &&
            ((e = i(o)),
            typeof e == "string" &&
              (f(o)
                ? (s = "click")
                : ((h = o.data("m")), (s = (h && h.cN) || "nonnav")),
              (e = r(e, s)),
              n.ajax(e))),
          !0
        );
      });
    }
    function i(t) {
      var r = t.parents("[data-target]"),
        i;
      if (r.length > 0)
        return (i = n(r.get(0)).data("target")), i && i.trackerUri;
    }
    function r(n, t) {
      if (!n || !t) return n;
      var i = encodeURIComponent(t);
      return n.replace(/click/i, i).replace(/{action}/i, i);
    }
    function u(n) {
      return (
        n.is("a, button, form, select, input, [data-js-href]") ||
        n.parents("a, button, [data-js-href]").length > 0
      );
    }
    function f(n) {
      return (
        n.is("a, [data-js-href]") || n.parents("a, [data-js-href]").length > 0
      );
    }
    return {
      setup: t,
    };
  });
  require(["targeting"], function (n) {
    n.setup();
  });
  require(["jsll", "window"], function (n, t) {
    if (t.performance && performance.mark && t.requestAnimationFrame) {
      var i = !1,
        r = function (r) {
          return function () {
            var s = 0,
              u,
              f = t.performance.getEntriesByName("frame", "mark"),
              h = [],
              l = [],
              e,
              o,
              c;
            if (f && f.length > 0) {
              for (e = 0; e < f.length; e++)
                (o =
                  e === 0
                    ? Math.round(f[0].startTime)
                    : Math.round(f[e].startTime - f[e - 1].startTime)),
                  (o = o === 16 || o === 18 ? 17 : o),
                  h.push(o.toString(36));
              for (u = h[0], c = 0; c < h.length; c++)
                u === h[c]
                  ? s++
                  : (l.push(
                      s === 1 ? u : s === 2 ? u + ";" : u + ";" + s.toString(36)
                    ),
                    (s = 1),
                    (u = h[c]));
              l.length > 0 &&
                (t._pageTimings || (t._pageTimings = {}),
                (t._pageTimings.frameMarkerData = l),
                t._pageTimings.wasPageHidden ||
                  (t._pageTimings.wasPageHidden = !1),
                (t._pageTimings.didUserNavigateAway = r),
                (t._pageTimings.frameMarkerBeaconOffset = Math.round(
                  t.performance.now()
                )),
                n.ct.captureContentUpdate({
                  timings: {
                    frameMarkerData: t._pageTimings.frameMarkerData,
                    wasPageHidden: t._pageTimings.wasPageHidden,
                    didUserNavigateAway: t._pageTimings.didUserNavigateAway,
                    frameMarkerBeaconOffset:
                      t._pageTimings.frameMarkerBeaconOffset,
                  },
                }),
                (i = !0));
            }
          };
        };
      setTimeout(r(!1), 3e4);
      t.addEventListener("unload", function () {
        i || r(!0)();
      });
    }
  });
  require(["jsll", "window", "domReady!"], function (n, t) {
    function u() {
      n.ct.captureContentUpdate({
        timings: t._pageTimings.checkPointMetrics,
      });
    }
    var i, r;
    if (
      t.performance &&
      performance.measure &&
      t.parent === t &&
      (performance.timing.responseStart &&
        performance.timing.domInteractive &&
        (performance.measure("HtmlDuration", "responseStart", "domInteractive"),
        performance.getEntriesByName("HeadEnd").length != 0 &&
          (performance.measure("HeadDuration", "responseStart", "HeadEnd"),
          performance.measure("BodyDuration", "HeadEnd", "domInteractive")),
        performance.getEntriesByName("FooterAreaEnd").length != 0 &&
          performance.measure(
            "PostFooterDuration",
            "FooterAreaEnd",
            "domInteractive"
          )),
      t._pageTimings || (t._pageTimings = {}),
      t._pageTimings.checkPointMetrics || (t._pageTimings.checkPointMetrics = {}),
      (i = performance.getEntriesByType("measure")),
      i.length != 0)
    ) {
      for (r = 0; r < i.length; r++)
        t._pageTimings.checkPointMetrics[i[r].name] = Math.round(i[r].duration);
      t._pageTimings.isPaintTimingSupported && !t._pageTimings.hasFCPFired
        ? setTimeout(u, 5e3)
        : u();
    }
  });
  define("ttml-context", [
    "require",
    "exports",
    "ttml-parser",
    "ttml-settings",
    "htmlExtensions",
    "stringExtensions",
    "utility",
  ], function (n, t, i, r, u, f, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var o = (function () {
      function n() {
        var t = this;
        this.translateToHtml = function (e, o, s) {
          var c,
            h,
            v = t.getTagNameEquivalent(e),
            l = "",
            y = "",
            a,
            p,
            w,
            b;
          switch (v) {
            case "ttml:region":
              y = "cue ";
            case "ttml:rootcontainerregion":
            case "ttml:body":
            case "ttml:div":
              l = "div";
              break;
            case "ttml:p":
              l = "p";
              break;
            case "ttml:span":
              l = "span";
              break;
            case "ttml:br":
              l = "br";
          }
          return (
            (a = i.TtmlParser.getAttributeNS(
              e,
              "role",
              t.settings.ttmlMetaNamespace
            )),
            a && (y += " " + a),
            (p = i.TtmlParser.getAttributeNS(
              e,
              "agent",
              t.settings.ttmlMetaNamespace
            )),
            p && (y += " " + p),
            a === "x-ruby"
              ? (l = "ruby")
              : a === "x-rubybase"
              ? (l = "rb")
              : a === "x-rubytext" && (l = "rt"),
            f.isNullOrWhiteSpace(l) ||
              ((c = n.defaultStyle(t.ownerDocument.createElement(l))),
              u.addClass(c, f.trim(y)),
              (w = i.TtmlParser.getAttributeNS(
                e,
                "title",
                t.settings.ttmlMetaNamespace
              )),
              w && c.setAttribute("title", w),
              (b = i.TtmlParser.getAttributeNS(e, "id", r.xmlNS)),
              b &&
                t.settings.idPrefix &&
                c.setAttribute("id", t.settings.idPrefix + b),
              v === "ttml:region" &&
                ((h = c.appendChild(
                  n.defaultStyle(t.ownerDocument.createElement("div"))
                )),
                u.css(h, "display", "table"),
                u.css(h, "border-spacing", "0"),
                u.css(h, "cell-spacing", "0"),
                u.css(h, "cell-padding", "0"),
                u.css(h, "width", "100%"),
                u.css(h, "height", "100%"),
                (h = h.appendChild(
                  n.defaultStyle(t.ownerDocument.createElement("div"))
                )),
                u.css(h, "display", "table-cell"),
                o.displayAlign &&
                  (t.translateStyle(v, h, {
                    displayAlign: o.displayAlign,
                  }),
                  (o.displayAlign = null))),
              s &&
                v === "ttml:span" &&
                ((h = c.appendChild(
                  n.defaultStyle(t.ownerDocument.createElement("span"))
                )),
                u.css(h, "white-space", "pre")),
              u.css(c, "position", "static"),
              u.css(c, "width", "100%"),
              t.translateStyle(v, c, o)),
            {
              outerNode: c,
              innerNode: h ? h : c,
            }
          );
        };
      }
      return (
        (n.prototype.setOwnerDocument = function (n) {
          this.ownerDocument = n;
        }),
        (n.prototype.updateRelatedMediaObjectRegion = function (n) {
          return !this.settings.relatedMediaObjectRegion ||
            n.width !== this.settings.relatedMediaObjectRegion.width ||
            n.height !== this.settings.relatedMediaObjectRegion.height
            ? ((this.settings.relatedMediaObjectRegion = {
                width: n.width,
                height: n.height,
              }),
              !0)
            : !1;
        }),
        (n.prototype.hasEvents = function () {
          return this.events && !!this.events.length;
        }),
        (n.prototype.resetCurrentEvents = function () {
          this.currentEvents = [];
        }),
        (n.prototype.updateCurrentEvents = function (n) {
          var t = this.getTemporallyActiveEvents(n),
            r = this.currentEvents ? this.currentEvents.length : 0,
            u = t ? t.length : 0,
            i;
          if (r !== u)
            return (this.currentEventsTime = n), (this.currentEvents = t), !0;
          if (this.currentEvents)
            for (i = 0; i < r; i++)
              if (this.currentEvents[i].time !== t[i].time)
                return (this.currentEventsTime = n), (this.currentEvents = t), !0;
          return !1;
        }),
        (n.prototype.getTemporallyActiveEvents = function (n) {
          var t = this;
          return this.events.filter(function (i) {
            return i.element ? t.isTemporallyActive(i.element, n) : !0;
          });
        }),
        (n.prototype.isTemporallyActive = function (n, t) {
          return (
            (parseInt(n.getAttribute("data-time-start"), 10) || 0) <= t &&
            t < (parseInt(n.getAttribute("data-time-end"), 10) || 0)
          );
        }),
        (n.prototype.getCues = function (n) {
          var t = [],
            v,
            tt,
            s,
            y,
            o,
            w,
            h,
            c,
            b,
            l,
            k,
            e,
            d,
            g,
            a,
            nt,
            ut;
          for (
            this.currentEventsTime !== n && this.updateCurrentEvents(n),
              v =
                i.TtmlParser.getAttributeNS(this.root, "space", r.xmlNS) ===
                "preserve",
              tt = this.layout
                ? this.layout.getElementsByTagNameNS(
                    this.settings.ttmlNamespace,
                    "region"
                  )
                : [],
              s = 0,
              y = tt;
            s < y.length;
            s++
          ) {
            var p = y[s],
              it = i.TtmlParser.getAttributeNS(p, "id", r.xmlNS),
              rt = p.getAttribute("data-isanonymous");
            if (
              (rt || it) &&
              ((o = this.translate(
                p,
                this.settings.defaultRegionStyle,
                v,
                n,
                this.translateToHtml
              )),
              o.outerNode)
            ) {
              for (
                w = o.innerNode, h = o.outerNode, c = 0, b = this.events;
                c < b.length;
                c++
              )
                (l = b[c]),
                  l.element &&
                    this.isInRegion(l.element, rt ? null : it) &&
                    ((k = this.prune(
                      l.element,
                      o.inheritableStyleSet,
                      v,
                      n,
                      this.translateToHtml
                    )),
                    (e = k.prunedElement),
                    k.hasPreservedContent ||
                      !e ||
                      f.trim(u.getText(e)).length ||
                      (e = null),
                    e && w.appendChild(e));
              d = h.getAttribute("data-showBackground") === "always";
              (d || w.children.length) &&
                (d && h.removeAttribute("data-showBackground"), t.push(h));
            }
          }
          if (t.length) {
            for (
              g = this.translate(
                this.rootContainerRegion,
                {
                  overflow: "hidden",
                  padding: "0",
                },
                !1,
                n,
                this.translateToHtml
              ),
                a = 0,
                nt = t;
              a < nt.length;
              a++
            )
              (ut = nt[a]), g.innerNode.appendChild(ut);
            t = [];
            t.push(g.outerNode);
          }
          return t;
        }),
        (n.prototype.translate = function (n, t, i, r, u) {
          var f, e, o, s;
          return (this.isTemporallyActive(n, r) &&
            ((o = this.getTagNameEquivalent(n)),
            (e = this.getComputedStyleSet(n, t, o, r)),
            e.display !== "none" &&
              ((s = this.getApplicableStyleSet(e, o)), (f = u(n, s, i)))),
          !f)
            ? {
                outerNode: null,
                innerNode: null,
                inheritableStyleSet: null,
              }
            : {
                outerNode: f.outerNode,
                innerNode: f.innerNode,
                inheritableStyleSet: this.getInheritableStyleSet(e),
              };
        }),
        (n.prototype.translateStyle = function (n, t, i) {
          for (var r in i) i[r] && this.applyStyle(t, n, r, i[r]);
        }),
        (n.prototype.prune = function (n, t, f, e, o, s) {
          var y, a, h, g, v, p, b, l, k, d, w, c;
          if (
            (s === void 0 && (s = !1),
            (a = !1),
            (h = this.translate(n, t, f, e, o)),
            h.outerNode !== null)
          ) {
            for (
              g = this.getTagNameEquivalent(n),
                y = h.outerNode,
                v = h.innerNode,
                p = 0,
                b = u.nodeListToArray(n.childNodes);
              p < b.length;
              p++
            )
              (l = b[p]),
                l.nodeType === Node.COMMENT_NODE ||
                  (l.nodeType === Node.TEXT_NODE
                    ? (v.appendChild(document.createTextNode(l.data)),
                      f && g === "ttml:span" && (a = !0))
                    : ((k = f),
                      (d = i.TtmlParser.getAttributeNS(l, "space", r.xmlNS)),
                      d && (k = d === "preserve"),
                      (w = this.prune(l, h.inheritableStyleSet, k, e, o, !0)),
                      (a = a || w.hasPreservedContent),
                      w.prunedElement && v.appendChild(w.prunedElement)));
            if (!s)
              for (
                c = n.parentNode;
                c !== null && c.nodeType === Node.ELEMENT_NODE && c !== this.body;
  
              ) {
                if (((h = this.translate(c, t, f, e, o)), h.outerNode))
                  (v = h.innerNode), v.appendChild(y), (y = h.outerNode);
                else break;
                c = c.parentNode;
              }
          }
          return {
            prunedElement: y,
            hasPreservedContent: a,
          };
        }),
        (n.prototype.getComputedStyleSet = function (n, t, r, f) {
          var o = e.extend({}, t),
            a,
            s,
            h,
            c,
            l;
          for (
            e.extend(
              o,
              this.styleSetCache[parseInt(n.getAttribute("data-styleSet"), 10)]
            ),
              a = n.getElementsByTagNameNS(this.settings.ttmlNamespace, "set"),
              s = 0,
              h = u.nodeListToArray(a);
            s < h.length;
            s++
          )
            (c = h[s]),
              this.isTemporallyActive(c, f) &&
                i.TtmlParser.applyInlineStyles(this.settings, o, c);
          return (
            r === "ttml:p" &&
              o.lineHeight === "normal" &&
              ((l = this.appendSpanFontSizes(
                n,
                this.getInheritableStyleSet(o),
                f,
                ""
              )),
              l && (o["computed-lineHeight"] = l)),
            o
          );
        }),
        (n.prototype.getApplicableStyleSet = function (n, t) {
          var i = {},
            r;
          n.extent &&
            this.isStyleApplicable(t, "extent") &&
            (i.extent = n.extent);
          n.color && this.isStyleApplicable(t, "color") && (i.color = n.color);
          for (r in n) this.isStyleApplicable(t, r) && (i[r] = n[r]);
          return i;
        }),
        (n.prototype.isStyleApplicable = function (n, t) {
          switch (t) {
            case "backgroundColor":
            case "display":
            case "visibility":
              return (
                "ttml:body ttml:div ttml:p ttml:region ttml:rootcontainerregion ttml:span ttml:br".indexOf(
                  n
                ) >= 0
              );
            case "fontFamily":
            case "fontSize":
            case "fontStyle":
            case "fontWeight":
              return "ttml:p ttml:span ttml:br".indexOf(n) >= 0;
            case "color":
            case "textDecoration":
            case "textOutline":
            case "wrapOption":
              return "ttml:span ttml:br".indexOf(n) >= 0;
            case "direction":
            case "unicodeBidi":
              return "ttml:p ttml:span ttml:br".indexOf(n) >= 0;
            case "displayAlign":
            case "opacity":
            case "origin":
            case "overflow":
            case "padding":
            case "showBackground":
            case "writingMode":
            case "zIndex":
              return "ttml:region ttml:rootcontainerregion".indexOf(n) >= 0;
            case "extent":
              return (
                "ttml:tt ttml:region ttml:rootcontainerregion".indexOf(n) >= 0
              );
            case "computed-lineHeight":
            case "lineHeight":
            case "textAlign":
              return "ttml:p".indexOf(n) >= 0;
            default:
              return !1;
          }
        }),
        (n.prototype.getInheritableStyleSet = function (n) {
          var i = {};
          for (var t in n)
            if (n.hasOwnProperty(t))
              switch (t) {
                case "backgroundColor":
                case "computed-lineHeight":
                case "display":
                case "displayAlign":
                case "extent":
                case "opacity":
                case "origin":
                case "overflow":
                case "padding":
                case "showBackground":
                case "unicodeBidi":
                case "writingMode":
                case "zIndex":
                  break;
                default:
                  i[t] = n[t];
              }
          return i;
        }),
        (n.prototype.appendSpanFontSizes = function (n, t, i, r) {
          for (
            var f, c, s, h, e = 0, o = u.nodeListToArray(n.childNodes);
            e < o.length;
            e++
          )
            (f = o[e]),
              f.nodeType === Node.ELEMENT_NODE &&
                ((c = this.getTagNameEquivalent(f)),
                c === "ttml:span" &&
                  ((s = this.getComputedStyleSet(f, t, "ttml:span", i)),
                  (h = s.fontSize),
                  h && (r += (r ? "," : "") + h),
                  (r = this.appendSpanFontSizes(
                    f,
                    this.getInheritableStyleSet(s),
                    i,
                    r
                  ))));
          return r;
        }),
        (n.prototype.isInRegion = function (n, t) {
          var e, r, o, f, s, h;
          if (
            !t ||
            ((e = i.TtmlParser.getAttributeNS(
              n,
              "region",
              this.settings.ttmlNamespace
            )),
            e === t)
          )
            return !0;
          if (!e) {
            for (
              r = n.parentNode;
              r !== null && r.nodeType === Node.ELEMENT_NODE;
  
            ) {
              if (((o = this.getRegionId(r)), o)) return o === t;
              r = r.parentNode;
            }
            for (
              f = 0, s = u.nodeListToArray(n.getElementsByTagName("*"));
              f < s.length;
              f++
            )
              if (((h = s[f]), this.getRegionId(h) === t)) return !0;
          }
          return !1;
        }),
        (n.prototype.getRegionId = function (n) {
          var t;
          return (
            n.nodeType === Node.ELEMENT_NODE &&
              n.namespaceURI === this.settings.ttmlNamespace &&
              (t =
                i.TtmlParser.getLocalTagName(n) === "region"
                  ? i.TtmlParser.getAttributeNS(n, "id", r.xmlNS)
                  : i.TtmlParser.getAttributeNS(
                      n,
                      "region",
                      this.settings.ttmlNamespace
                    )),
            t
          );
        }),
        (n.prototype.getTagNameEquivalent = function (n) {
          var t = i.TtmlParser.getLocalTagName(n),
            r = n.namespaceURI;
          return r === this.settings.ttmlNamespace
            ? "ttml:" + t
            : r === "http://www.w3.org/1999/xhtml"
            ? t
            : "";
        }),
        (n.prototype.applyStyle = function (t, i, r, o) {
          var s = o,
            p,
            h,
            g,
            nt,
            tt,
            w,
            b,
            d,
            it,
            l,
            a,
            ut;
          switch (r) {
            case "color":
            case "backgroundColor":
              s = n.ttmlToCssColor(o);
              u.css(t, r, s);
              return;
            case "direction":
            case "display":
              u.css(t, r, s);
              return;
            case "displayAlign":
              switch (o) {
                case "before":
                  s = "top";
                  break;
                case "center":
                  s = "middle";
                  break;
                case "after":
                  s = "bottom";
              }
              u.css(t, "vertical-align", s);
              return;
            case "extent":
              p = void 0;
              l = void 0;
              o !== "auto" &&
                ((a = o.split(/\s+/)),
                a.length === 2 &&
                  ((p = this.ttmlToCssUnits(a[0], !0)),
                  (l = this.ttmlToCssUnits(a[1], !1))));
              p ||
                ((p =
                  (this.settings.rootContainerRegionDimensions
                    ? this.settings.rootContainerRegionDimensions.width
                    : this.settings.relatedMediaObjectRegion.width
                  ).toString() + "px"),
                (l =
                  (this.settings.rootContainerRegionDimensions
                    ? this.settings.rootContainerRegionDimensions.height
                    : this.settings.relatedMediaObjectRegion.height
                  ).toString() + "px"));
              u.css(t, "position", "absolute");
              u.css(t, "width", p);
              u.css(t, "min-width", p);
              u.css(t, "max-width", p);
              u.css(t, "height", l);
              u.css(t, "min-height", l);
              u.css(t, "max-height", l);
              return;
            case "fontFamily":
              this.settings.fontMap &&
                this.settings.fontMap[o] &&
                (s = this.settings.fontMap[o]);
              o === "smallCaps" && u.css(t, "fontVariant", "small-caps");
              u.css(t, r, s);
              return;
            case "fontSize":
              h = o.split(/\s+/);
              g = h.length > 1 ? h[1] : h[0];
              s = this.ttmlToCssFontSize(g, !1, 0.75, i === "ttml:region");
              u.css(t, r, s);
              return;
            case "fontStyle":
            case "fontWeight":
              u.css(t, r, s);
              return;
            case "lineHeight":
              nt = o === "normal" ? o : this.ttmlToCssFontSize(o, !1);
              u.css(t, "line-height", nt);
              return;
            case "computed-lineHeight":
              for (tt = o.split(","), w = -1, b = 0, d = tt; b < d.length; b++)
                (it = d[b]),
                  (s = this.ttmlToCssFontSize(it, !1)),
                  s &&
                    s.indexOf("px") === s.length - 2 &&
                    ((l = parseFloat(s.substr(0, s.length - 2))),
                    !isNaN(l) && l > w && (w = l));
              w >= 0 && u.css(t, "line-height", w + "px");
              return;
            case "origin":
              o !== "auto" &&
                ((a = o.split(/\s+/)),
                a.length === 2 &&
                  (u.css(t, "position", "absolute"),
                  u.css(t, "left", this.ttmlToCssUnits(a[0], !0)),
                  u.css(t, "top", this.ttmlToCssUnits(a[1], !1))));
              return;
            case "opacity":
              u.css(t, r, s);
              return;
            case "padding":
              var c = e.getDimensions(t),
                h = o.split(/\s+/),
                v = void 0,
                y = void 0,
                k = void 0,
                rt = void 0;
              switch (h.length) {
                case 1:
                  v = this.ttmlToCssUnits(h[0], !1, c);
                  y = this.ttmlToCssUnits(h[0], !0, c);
                  s = f.format("{0} {1} {0} {1}", v, y);
                  break;
                case 2:
                  v = this.ttmlToCssUnits(h[0], !1, c);
                  y = this.ttmlToCssUnits(h[1], !0, c);
                  s = f.format("{0} {1} {0} {1}", v, y);
                  break;
                case 3:
                  v = this.ttmlToCssUnits(h[0], !1, c);
                  y = this.ttmlToCssUnits(h[1], !0, c);
                  k = this.ttmlToCssUnits(h[2], !1, c);
                  s = f.format("{0} {1} {2} {1}", v, y, k);
                  break;
                case 4:
                  v = this.ttmlToCssUnits(h[0], !1, c);
                  y = this.ttmlToCssUnits(h[1], !0, c);
                  k = this.ttmlToCssUnits(h[2], !1, c);
                  rt = this.ttmlToCssUnits(h[3], !0, c);
                  s = f.format("{0} {1} {2} {3}", v, y, k, rt);
              }
              u.css(t, "box-sizing", "border-box");
              u.css(t, "border-style", "solid");
              u.css(t, "border-color", "transparent");
              u.css(t, "border-width", s);
              return;
            case "textAlign":
              switch (o) {
                case "start":
                  s = "left";
                  break;
                case "end":
                  s = "right";
              }
              u.css(t, "text-align", s);
              return;
            case "textDecoration":
              s = n.ttmlToCssTextDecoration(o);
              u.css(t, "text-decoration", s);
              return;
            case "textOutline":
              ut = u.css(t, "color");
              u.css(t, "text-shadow", this.ttmlToCssTextOutline(s, ut));
              return;
            case "unicodeBidi":
              switch (o) {
                case "bidiOverride":
                  s = "bidi-override";
              }
              u.css(t, "unicode-bidi", s);
              return;
            case "visibility":
              u.css(t, r, s);
              return;
            case "writingMode":
              switch (o) {
                case "lr":
                case "lrtb":
                  u.css(t, "writing-mode", "horizontal-tb");
                  u.css(t, "-webkit-writing-mode", "horizontal-tb");
                  u.css(t, "writing-mode", "lr-tb");
                  return;
                case "rl":
                case "rltb":
                  u.css(t, "writing-mode", "horizontal-tb");
                  u.css(t, "-webkit-writing-mode", "horizontal-tb");
                  u.css(t, "writing-mode", "rl-tb");
                  return;
                case "tblr":
                  u.css(t, "text-orientation", "upright");
                  u.css(t, "writing-mode", "vertical-lr");
                  u.css(t, "-webkit-text-orientation", "upright");
                  u.css(t, "-webkit-writing-mode", "vertical-lr");
                  u.css(t, "writing-mode", "tb-lr");
                  return;
                case "tb":
                case "tbrl":
                  u.css(t, "text-orientation", "upright");
                  u.css(t, "writing-mode", "vertical-rl");
                  u.css(t, "-webkit-text-orientation", "upright");
                  u.css(t, "-webkit-writing-mode", "vertical-rl");
                  u.css(t, "writing-mode", "tb-rl");
                  return;
              }
              return;
            case "wrapOption":
              u.css(
                t,
                "white-space",
                o === "noWrap" ? "nowrap" : o === "pre" ? "pre" : "normal"
              );
              return;
            case "zIndex":
              u.css(t, r, s);
              return;
            default:
              u.css(t, r, s);
              return;
          }
        }),
        (n.defaultStyle = function (t) {
          return (
            u.css(t, "background-color", n.TtmlNamedColorMap.transparent),
            u.css(t, "offset", "0"),
            u.css(t, "margin", "0"),
            u.css(t, "padding", "0"),
            u.css(t, "border", "0"),
            t
          );
        }),
        (n.prototype.ttmlToCssUnits = function (n, t, i) {
          var e = n,
            r,
            h;
          if (n && ((r = n.charAt(n.length - 1)), r === "c" || r === "%")) {
            var o = this.settings.rootContainerRegionDimensions
                ? this.settings.rootContainerRegionDimensions
                : this.settings.relatedMediaObjectRegion,
              s = parseFloat(n.substr(0, n.length - 1)),
              f = t ? o.width : o.height,
              u = void 0;
            r === "c"
              ? ((h = t
                  ? this.settings.cellResolution.columns
                  : this.settings.cellResolution.rows),
                (u = (s * f) / h))
              : r === "%" &&
                (i && (f = t ? i.width : i.height), (u = (f * s) / 100));
            u = Math.round(u * 10) / 10;
            e = u + "px";
          }
          return e;
        }),
        (n.prototype.ttmlToCssFontSize = function (n, t, i, r) {
          var e, u;
          if (
            (i === void 0 && (i = 1),
            r === void 0 && (r = !1),
            (e = n),
            n && ((u = n.charAt(n.length - 1)), u === "c" || (r && u === "%")))
          ) {
            var o = this.settings.rootContainerRegionDimensions
                ? this.settings.rootContainerRegionDimensions
                : this.settings.relatedMediaObjectRegion,
              s = parseFloat(n.substr(0, n.length - 1)),
              h = t ? o.width : o.height,
              c = t
                ? this.settings.cellResolution.columns
                : this.settings.cellResolution.rows,
              f = (s * h) / c;
            u === "%" && (f /= 100);
            f = Math.floor(f * i * 10) / 10;
            e = f + "px";
          }
          return e;
        }),
        (n.prototype.ttmlToCssTextOutline = function (t, i) {
          var u = "none",
            a,
            h,
            v,
            c,
            l;
          if (!f.isNullOrWhiteSpace(t) && t !== "none") {
            var r = t.split(/\s+/),
              s = void 0,
              e = void 0,
              o;
            if (
              (r.length === 1
                ? ((s = i), (e = r[0]), (o = ""))
                : r.length === 3
                ? ((s = r[0]), (e = r[1]), (o = r[2]))
                : r.length === 2 &&
                  ((a = r[0].charAt(0)),
                  a >= "0" && a <= "9"
                    ? ((s = i), (e = r[0]), (o = r[1]))
                    : ((s = r[0]), (e = r[1]), (o = ""))),
              (o = this.ttmlToCssFontSize(o, !1, 0.75)),
              (e = this.ttmlToCssFontSize(e, !1, 0.75)),
              (r = n.lengthRegEx.exec(e)),
              r && r.length === 3)
            ) {
              for (
                h = Math.round(parseFloat(r[1])), v = r[2], u = "", c = -h;
                c <= h;
                c++
              )
                for (l = -h; l <= h; l++)
                  (c !== 0 || l !== 0) &&
                    (u += f.format(
                      "{0}{4} {1}{4} {2} {3}, ",
                      c,
                      l,
                      o,
                      n.ttmlToCssColor(s),
                      v
                    ));
              u && (u = u.substr(0, u.length - 2));
            }
          }
          return u;
        }),
        (n.ttmlToCssTextDecoration = function (n) {
          for (
            var r, e, t, i = "", o = n.split(/\s+/), u = 0, s = o;
            u < s.length;
            u++
          ) {
            t = s[u];
            switch (t) {
              case "none":
              case "noUnderline":
              case "noLineThrough":
              case "noOverline":
                i = "none";
            }
          }
          for (r = 0, e = o; r < e.length; r++) {
            t = e[r];
            switch (t) {
              case "none":
              case "noUnderline":
              case "noLineThrough":
              case "noOverline":
                break;
              case "lineThrough":
                i += " line-through";
                break;
              default:
                i += " " + t;
            }
          }
          return f.trim(i);
        }),
        (n.ttmlToCssColor = function (t) {
          var r = t,
            i;
          if (((t = t.toLowerCase()), t.indexOf("rgba") === 0)) {
            if (((i = n.rgbaRegEx.exec(t)), i && i.length === 5)) {
              var u = i[1],
                e = i[2],
                o = i[3],
                s = parseInt(i[4], 10);
              r = f.format(
                "rgba({0},{1},{2},{3})",
                u,
                e,
                o,
                Math.round((s * 100) / 255) / 100
              );
            }
          } else if (t.charAt(0) === "#" && t.length === 9) {
            var u = parseInt(t.substr(1, 2), 16),
              e = parseInt(t.substr(3, 2), 16),
              o = parseInt(t.substr(5, 2), 16),
              s = parseInt(t.substr(7, 2), 16);
            r = f.format(
              "rgba({0},{1},{2},{3})",
              u,
              e,
              o,
              Math.round((s * 100) / 255) / 100
            );
          } else n.TtmlNamedColorMap[t] && (r = n.TtmlNamedColorMap[t]);
          return r;
        }),
        (n.lengthRegEx = /\s*(\d+\.*\d*)(.*)\s*/),
        (n.rgbaRegEx =
          /\s*rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*/),
        (n.TtmlNamedColorMap = {
          transparent: "rgba(0,0,0,0)",
          black: "rgba(0,0,0,1)",
          silver: "rgba(192,192,192,1)",
          gray: "rgba(128,128,128,1)",
          white: "rgba(255,255,255,1)",
          maroon: "rgba(128,0,0,1)",
          red: "rgba(255,0,0,1)",
          purple: "rgba(128,0,128,1)",
          fuchsia: "rgba(255,0,255,1)",
          magenta: "rgba(255,0,255,1)",
          green: "rgba(0,128,0,1)",
          lime: "rgba(0,255,0,1)",
          olive: "rgba(128,128,0,1)",
          yellow: "rgba(255,255,0,1)",
          navy: "rgba(0,0,128,1)",
          blue: "rgba(0,0,255,1)",
          teal: "rgba(0,128,128,1)",
          aqua: "rgba(0,255,255,1)",
          cyan: "rgba(0,255,255,1)",
        }),
        n
      );
    })();
    t.TtmlContext = o;
  });
  define("ttml-parser", [
    "require",
    "exports",
    "ttml-context",
    "ttml-time-parser",
    "ttml-settings",
    "htmlExtensions",
    "stringExtensions",
  ], function (n, t, i, r, u, f, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var o = (function () {
      function n() {}
      return (
        (n.parse = function (t, f) {
          var e, o, s, h;
          return (
            (t = typeof t == "string" ? n.parseXml(t) : t),
            (e = new i.TtmlContext()),
            (e.settings = new u.TtmlSettings(f)),
            (e.root = n.verifyRoot(t, e)),
            (e.body = n.getFirstElementByTagNameNS(
              e.root,
              "body",
              e.settings.ttmlNamespace
            )),
            (e.events = []),
            (e.styleSetCache = []),
            e.body &&
              (n.parseTtAttrs(e),
              (o = n.ensureRegions(e)),
              (s =
                n.getAttributeNS(
                  e.root,
                  "timeBase",
                  e.settings.ttmlParameterNamespace
                ) || "media"),
              e.settings.supportedTimeBase.indexOf(s) !== -1 &&
                (n.processAnonymousSpans(e, e.body),
                (h = new r.TtmlTimeParser(
                  e.settings.mediaFrameRate,
                  e.settings.mediaTickRate
                )),
                n.applyTiming(
                  e,
                  e.root,
                  {
                    start: n.mediaStart,
                    end: n.mediaEnd,
                  },
                  !0,
                  h
                ),
                n.applyStyling(e, o)),
              e.events.push({
                time: n.mediaEnd,
                element: null,
              }),
              e.events.sort(function (n, t) {
                return n.time - t.time;
              })),
            e
          );
        }),
        (n.parseXml = function (n) {
          var i = null,
            t;
          return (
            window.DOMParser
              ? ((t = new window.DOMParser()),
                (i = t.parseFromString(n, "application/xml")))
              : ((t = new window.ActiveXObject("Microsoft.XMLDOM")),
                (t.async = !1),
                t.loadXML(n),
                (i = t)),
            i
          );
        }),
        (n.verifyRoot = function (t, i) {
          var u,
            r = t.documentElement;
          return (
            n.getLocalTagName(r) === "tt" &&
              (r.namespaceURI !== "http://www.w3.org/ns/ttml" &&
                ((i.settings.ttmlNamespace = r.namespaceURI),
                (i.settings.ttmlStyleNamespace =
                  i.settings.ttmlNamespace + "#styling"),
                (i.settings.ttmlParameterNamespace =
                  i.settings.ttmlNamespace + "#parameter"),
                (i.settings.ttmlMetaNamespace =
                  i.settings.ttmlNamespace + "#metadata")),
              (u = r)),
            u
          );
        }),
        (n.parseTtAttrs = function (t) {
          var h = n.getAttributeNS(
              t.root,
              "cellResolution",
              t.settings.ttmlParameterNamespace
            ),
            u = n.getAttributeNS(t.root, "extent", t.settings.ttmlStyleNamespace),
            f = null,
            r,
            o,
            s,
            i,
            c,
            l;
          h &&
            ((r = e.trim(h).split(/\s+/)),
            r.length === 2 &&
              ((o = Math.round(parseFloat(r[0]))),
              (s = Math.round(parseFloat(r[1]))),
              s > 0 &&
                o > 0 &&
                (f = {
                  rows: s,
                  columns: o,
                })));
          f && (t.settings.cellResolution = f);
          u &&
            u !== "auto" &&
            ((i = u.split(/\s+/)),
            i.length === 2 &&
              i[0].substr(i[0].length - 2) === "px" &&
              i[1].substr(i[1].length - 2) === "px" &&
              ((c = parseFloat(i[0].substr(0, i[0].length - 2))),
              (l = parseFloat(i[1].substr(0, i[1].length - 2))),
              (t.settings.rootContainerRegionDimensions = {
                width: Math.round(c),
                height: Math.round(l),
              })));
        }),
        (n.ensureRegions = function (t) {
          var f, i, o, r;
          return (
            (t.rootContainerRegion = t.root.ownerDocument.createElementNS(
              t.settings.ttmlNamespace,
              "rootcontainerregion"
            )),
            t.root.appendChild(t.rootContainerRegion),
            (f = t.settings.rootContainerRegionDimensions
              ? e.format(
                  "{0}px {1}px",
                  t.settings.rootContainerRegionDimensions.width,
                  t.settings.rootContainerRegionDimensions.height
                )
              : "auto"),
            t.rootContainerRegion.setAttributeNS(
              t.settings.ttmlStyleNamespace,
              "extent",
              f
            ),
            (i = n.getFirstElementByTagNameNS(
              t.root,
              "head",
              t.settings.ttmlNamespace
            )),
            i ||
              ((i = t.root.ownerDocument.createElementNS(
                t.settings.ttmlNamespace,
                "head"
              )),
              t.root.appendChild(i)),
            (t.layout = n.getFirstElementByTagNameNS(
              i,
              "layout",
              t.settings.ttmlNamespace
            )),
            t.layout ||
              ((t.layout = t.root.ownerDocument.createElementNS(
                t.settings.ttmlNamespace,
                "layout"
              )),
              t.root.appendChild(t.layout)),
            (o = t.layout.getElementsByTagNameNS(
              t.settings.ttmlNamespace,
              "region"
            )),
            o.length ||
              ((r = t.root.ownerDocument.createElementNS(
                t.settings.ttmlNamespace,
                "region"
              )),
              r.setAttributeNS(u.xmlNS, "id", "anonymous"),
              r.setAttribute("data-isanonymous", "1"),
              t.layout.appendChild(r),
              t.body.setAttributeNS(
                t.settings.ttmlNamespace,
                "region",
                "anonymous"
              )),
            i
          );
        }),
        (n.processAnonymousSpans = function (t, i) {
          var u, a, o, v, s, y, e, h, c, l, p, r;
          if (n.isTagNS(i, "p", t.settings.ttmlNamespace)) {
            for (
              u = [], a = void 0, o = 0, v = f.nodeListToArray(i.childNodes);
              o < v.length;
              o++
            )
              (r = v[o]),
                r.nodeType === Node.TEXT_NODE &&
                  (a !== Node.TEXT_NODE && u.push([]), u[u.length - 1].push(r)),
                (a = r.nodeType);
            for (s = 0, y = u; s < y.length; s++)
              for (
                e = y[s],
                  h = t.root.ownerDocument.createElementNS(
                    t.settings.ttmlNamespace,
                    "span"
                  ),
                  h.appendChild(e[0].parentNode.replaceChild(h, e[0])),
                  c = 1;
                c < e.length;
                c++
              )
                h.appendChild(e[c]);
          }
          for (l = 0, p = f.nodeListToArray(i.childNodes); l < p.length; l++)
            (r = p[l]), this.processAnonymousSpans(t, r);
        }),
        (n.applyTiming = function (t, i, r, u, e) {
          var b = n.getAttributeNS(i, "begin", t.settings.ttmlNamespace),
            o = b ? e.parse(b) : r.start,
            s = 0,
            d = 0,
            l = 0,
            a = 0,
            v = n.getAttributeNS(i, "dur", t.settings.ttmlNamespace),
            h = n.getAttributeNS(i, "end", t.settings.ttmlNamespace),
            k,
            p,
            y,
            w,
            c;
          for (
            v || h
              ? v && h
                ? ((l = e.parse(v)),
                  (a = e.parse(h)),
                  (k = Math.min(o + l, r.start + a)),
                  (s = Math.min(k, r.end)))
                : h
                ? ((a = e.parse(h)), (s = Math.min(r.start + a, r.end)))
                : ((l = e.parse(v)), (s = Math.min(o + l, r.end)))
              : u &&
                (o <= r.end
                  ? ((d = Math.max(0, r.end - o)), (s = r.end))
                  : (s = 0)),
              s < o && (s = o),
              o = Math.floor(o),
              s = Math.floor(s),
              i.setAttribute("data-time-start", o.toString()),
              i.setAttribute("data-time-end", s.toString()),
              o >= 0 &&
                t.events.filter(function (n) {
                  return n.time === o;
                }).length <= 0 &&
                t.events.push({
                  time: o,
                  element: i,
                }),
              p = o,
              y = 0,
              w = f.nodeListToArray(i.childNodes);
            y < w.length;
            y++
          )
            (c = w[y]),
              c.nodeType === Node.ELEMENT_NODE &&
                (n.getAttributeNS(
                  i,
                  "timeContainer",
                  t.settings.ttmlNamespace
                ) !== "seq"
                  ? this.applyTiming(
                      t,
                      c,
                      {
                        start: o,
                        end: s,
                      },
                      !0,
                      e
                    )
                  : (this.applyTiming(
                      t,
                      c,
                      {
                        start: p,
                        end: s,
                      },
                      !1,
                      e
                    ),
                    (p = parseInt(c.getAttribute("data-time-end"), 10))));
        }),
        (n.applyStyling = function (t, i) {
          for (
            var o,
              u = n.getFirstElementByTagNameNS(
                i,
                "styling",
                t.settings.ttmlNamespace
              ),
              s = u
                ? f.nodeListToArray(
                    u.getElementsByTagNameNS(t.settings.ttmlNamespace, "style")
                  )
                : [],
              r = 0,
              e = f.nodeListToArray(t.root.querySelectorAll("*"));
            r < e.length;
            r++
          )
            (o = e[r]), this.applyStyle(t, o, s);
        }),
        (n.applyStyle = function (t, i, r) {
          var u = {},
            f,
            e;
          this.applyStylesheet(t.settings, u, i, r);
          n.applyInlineStyles(t.settings, u, i);
          f = !0;
          for (e in u)
            if (u.hasOwnProperty(e)) {
              f = !1;
              break;
            }
          f ||
            (i.setAttribute("data-styleSet", t.styleSetCache.length.toString()),
            t.styleSetCache.push(u));
        }),
        (n.applyStylesheet = function (t, i, r, e) {
          for (
            var p,
              s,
              l,
              h,
              a,
              o,
              v = n.getAttributeNS(r, "style", t.ttmlNamespace),
              w = v ? v.split(/\s+/) : [],
              c = 0,
              y = w;
            c < y.length;
            c++
          )
            for (p = y[c], s = 0, l = e; s < l.length; s++)
              (o = l[s]),
                n.getAttributeNS(o, "id", u.xmlNS) === p &&
                  (this.applyStylesheet(t, i, o, e),
                  n.applyInlineStyles(t, i, o));
          if (n.isTagNS(r, "region", t.ttmlNamespace))
            for (
              h = 0,
                a = f.nodeListToArray(
                  r.getElementsByTagNameNS(t.ttmlNamespace, "style")
                );
              h < a.length;
              h++
            )
              (o = a[h]), n.applyInlineStyles(t, i, o);
        }),
        (n.applyInlineStyles = function (t, i, r) {
          for (
            var o, u = 0, s = f.nodeListToArray(r.attributes);
            u < s.length;
            u++
          )
            (o = s[u]),
              o.namespaceURI === t.ttmlStyleNamespace &&
                (i[n.getLocalTagName(o)] = e.trim(o.nodeValue));
        }),
        (n.getLocalTagName = function (n) {
          return n.localName || n.baseName;
        }),
        (n.isTagNS = function (n, t, i) {
          return n.namespaceURI === i && this.getLocalTagName(n) === t;
        }),
        (n.getAttributeNS = function (n, t, i) {
          var e = n.getAttributeNS(i, t),
            u,
            o,
            r;
          if (!e)
            for (u = 0, o = f.nodeListToArray(n.attributes); u < o.length; u++)
              if (
                ((r = o[u]),
                r.localName === t && r.lookupNamespaceURI(r.prefix) === i)
              ) {
                e = r.value;
                break;
              }
          return e;
        }),
        (n.getFirstElementByTagNameNS = function (n, t, i) {
          if (n) {
            var r = n.getElementsByTagNameNS(i, t);
            if (r && r.length) return r[0];
          }
          return null;
        }),
        (n.mediaStart = -1),
        (n.mediaEnd = 99999999),
        n
      );
    })();
    t.TtmlParser = o;
  });
  define("ttml-settings", ["require", "exports", "utility"], function (n, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    t.xmlNS = "http://www.w3.org/XML/1998/namespace";
    var r = (function () {
      function n(n) {
        this.ttmlNamespace = "http://www.w3.org/ns/ttml";
        this.ttmlStyleNamespace = "http://www.w3.org/ns/ttml#styling";
        this.ttmlParameterNamespace = "http://www.w3.org/ns/ttml#parameter";
        this.ttmlMetaNamespace = "http://www.w3.org/ns/ttml#metadata";
        this.idPrefix = "";
        this.mediaFrameRate = 30;
        this.mediaFrameRateMultiplier = 1;
        this.mediaSubFrameRate = 1;
        this.mediaTickRate = 1e3;
        this.supportedTimeBase = "media";
        this.cellResolution = {
          rows: 15,
          columns: 32,
        };
        this.defaultRegionStyle = {
          backgroundColor: "transparent",
          color: "#E8E9EA",
          direction: "ltr",
          display: "auto",
          displayAlign: "before",
          extent: "auto",
          fontFamily: "default",
          fontSize: "1c",
          fontStyle: "normal",
          fontWeight: "normal",
          lineHeight: "normal",
          opacity: "1",
          origin: "auto",
          overflow: "hidden",
          padding: "0",
          showBackground: "always",
          textAlign: "start",
          textDecoration: "none",
          textOutline: "none",
          unicodeBidi: "normal",
          visibility: "visible",
          wrapOption: "normal",
          writingMode: "lrtb",
        };
        this.fontMap = {};
        this.fontMap["default"] =
          "Lucida sans typewriter, Lucida console, Consolas";
        this.fontMap.monospaceSerif = "Courier";
        this.fontMap.proportionalSerif = "Times New Roman, Serif";
        this.fontMap.monospaceSansSerif =
          "Lucida sans typewriter, Lucida console, Consolas";
        this.fontMap.proportionalSansSerif = "Arial, Sans-serif";
        this.fontMap.casual = "Verdana";
        this.fontMap.cursive = "Zapf-Chancery, Segoe script, Cursive";
        this.fontMap.smallCaps = "Arial, Helvetica";
        this.fontMap.monospace =
          "Lucida sans typewriter, Lucida console, Consolas";
        this.fontMap.sansSerif = "Arial, Sans-serif";
        this.fontMap.serif = "Times New Roman, Serif";
        n && i.extend(this, n);
      }
      return n;
    })();
    t.TtmlSettings = r;
  });
  define("ttml-time-parser", ["require", "exports"], function (n, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = (function () {
      function n(n, t) {
        this.mediaFrameRate = n;
        this.mediaTickRate = t;
      }
      return (
        (n.prototype.parse = function (t) {
          var i, r;
          if (!t) return 0;
          if (((i = n.absoluteTimeRegex.exec(t)), i && i.length > 3)) {
            var f = parseInt(i[1], 10) * 3600,
              e = parseInt(i[2], 10) * 60,
              o = parseInt(i[3], 10),
              u = 0;
            return (
              i[5] && (u = parseFloat(i[4]) * 1e3),
              i[6] &&
                (u = Math.round(
                  parseFloat(i[6]) * this.getTimeUnitMultiplier("f")
                )),
              1e3 * (f + e + o) + u
            );
          }
          return ((r = n.relativeTimeRegex.exec(t)), r && r.length > 3)
            ? Math.round(parseFloat(r[1]) * this.getTimeUnitMultiplier(r[3]))
            : 0;
        }),
        (n.prototype.getTimeUnitMultiplier = function (n) {
          switch (n) {
            case "h":
              return 36e5;
            case "ms":
              return 1;
            case "m":
              return 6e4;
            case "s":
              return 1e3;
            case "f":
              return 1e3 / this.mediaFrameRate;
            case "t":
              return 1e3 / this.mediaTickRate;
            default:
              return 0;
          }
        }),
        (n.absoluteTimeRegex =
          /^(\d{1,}):(\d{2}):(\d{2})((\.\d{1,})|:(\d{2,}(\.\d{1,})?))?$/),
        (n.relativeTimeRegex = /^(\d+(\.\d+)?)(ms|[hmsft])$/),
        n
      );
    })();
    t.TtmlTimeParser = i;
  });
  define("video-closed-captions", [
    "require",
    "exports",
    "ttml-parser",
    "htmlExtensions",
    "utility",
    "player-utility",
  ], function (n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var e = (function () {
      function n(n, t) {
        this.element = n;
        this.errorCallback = t;
        this.lastPlayPosition = 0;
        this.ccLanguageId = null;
        this.resetCaptions();
      }
      return (
        (n.prototype.setCcLanguage = function (n, t) {
          if (this.element && n !== this.ccLanguageId) {
            if (((this.ttmlContext = null), this.resetCaptions(), !t)) {
              this.ccLanguageId = null;
              return;
            }
            this.ccLanguageId = n;
            this.loadClosedCaptions(t);
          }
        }),
        (n.prototype.getCurrentCcLanguage = function () {
          return this.ccLanguageId;
        }),
        (n.prototype.loadClosedCaptions = function (n) {
          var t = this;
          f.PlayerUtility.ajax(
            n,
            function (n) {
              return t.onClosedCaptionsLoaded(n);
            },
            function () {
              t.errorCallback &&
                t.errorCallback({
                  errorType: "oneplayer.error.loadClosedCaptions.ajax",
                  errorDesc: "Ajax call failed: " + n,
                });
            }
          );
        }),
        (n.prototype.onClosedCaptionsLoaded = function (t) {
          if (!t) {
            this.errorCallback &&
              this.errorCallback({
                errorType: "oneplayer.error.onClosedCaptionsLoaded.ttmlDoc",
                errorDesc: "No ttmlDocument found",
              });
            return;
          }
          this.element.setAttribute(n.ariaHidden, "false");
          var r = this.element.id ? this.element.id + "-" : "",
            f = {
              idPrefix: r,
              fontMap: {
                default: "Segoe ui, Arial",
              },
              relatedMediaObjectRegion: u.getDimensions(this.element),
            };
          try {
            this.ttmlContext = i.TtmlParser.parse(t, f);
            this.ttmlContext &&
              (this.ttmlContext.setOwnerDocument(this.element.ownerDocument),
              this.ttmlContext.hasEvents()
                ? this.updateCaptions(this.lastPlayPosition)
                : this.element.setAttribute(n.ariaHidden, "true"));
          } catch (e) {
            this.errorCallback &&
              this.errorCallback({
                errorType: "oneplayer.error.onClosedCaptionsLoaded.ttmlParser",
                errorDesc: "TtmlDocument parser error: " + e.message,
              });
          }
        }),
        (n.prototype.showSampleCaptions = function () {
          var t = new DOMParser().parseFromString(
              "<?xml version='1.0' encoding='utf-8'?>\n<tt xml:lang='en-us' xmlns='http://www.w3.org/ns/ttml' xmlns:tts='http://www.w3.org/ns/ttml#styling' \nxmlns:ttm='http://www.w3.org/ns/ttml#metadata'>\n    <head>\n    <metadata>\n        <ttm:title>Media.wvx.aib</ttm:title>\n        <ttm:copyright>Copyright (c) 2013 Microsoft Corporation.  All rights reserved.</ttm:copyright>\n    </metadata>\n    <styling>\n        <style xml:id='Style1' tts:fontFamily='proportionalSansSerif' tts:fontSize='0.8c' tts:textAlign='center' \n        tts:color='white' />\n    </styling>\n    <layout>\n        <region style='Style1' xml:id='CaptionArea' tts:origin='0c 12.6c' tts:extent='32c 2.4c' \n        tts:backgroundColor='rgba(0,0,0,160)' tts:displayAlign='center' tts:padding='0.3c 0.5c' />\n    </layout>\n    </head>\n    <body region='CaptionArea'>\n    <div>\n        <p begin='00:00:01.140' end='99:99:99.999'>EXAMPLE CAPTIONS!</p>\n    </div>\n    </body>\n</tt>",
              "text/xml"
            ),
            n;
          this.onClosedCaptionsLoaded(t);
          n = u.getDimensions(this.element);
          this.ttmlContext.updateRelatedMediaObjectRegion(n);
          this.element.style.bottom = "44px";
        }),
        (n.prototype.updateCaptions = function (t) {
          var e, s, i, o, f;
          if (
            ((this.lastPlayPosition = t),
            this.ttmlContext &&
              this.ttmlContext.hasEvents() &&
              ((e = Math.floor(t * 1e3)),
              this.element.setAttribute(n.ariaHidden, "false"),
              (s = u.getDimensions(this.element)),
              this.ttmlContext.updateRelatedMediaObjectRegion(s) &&
                this.resetCaptions(),
              this.ttmlContext.updateCurrentEvents(e)))
          ) {
            for (
              this.element.setAttribute(n.ariaHidden, "true"),
                r.removeInnerHtml(this.element),
                i = 0,
                o = this.ttmlContext.getCues(e);
              i < o.length;
              i++
            )
              (f = o[i]),
                this.applyUserPreferencesOverrides(f),
                r.css(f, "background-color", ""),
                this.element.appendChild(f);
            this.element.setAttribute(n.ariaHidden, "false");
          }
        }),
        (n.prototype.resetCaptions = function () {
          this.ttmlContext && this.ttmlContext.resetCurrentEvents();
          this.element &&
            (this.element.setAttribute(n.ariaHidden, "true"),
            r.removeInnerHtml(this.element));
        }),
        (n.prototype.getCcLanguage = function () {
          return this.ccLanguageId;
        }),
        (n.prototype.applyUserPreferencesOverrides = function (t) {
          var u, f, o, e, i;
          if (n.userPreferences) {
            if (n.userPreferences.text)
              for (
                u = 0, f = r.selectElements("span, br", t);
                u < f.length;
                u++
              ) {
                o = f[u];
                for (i in n.userPreferences.text)
                  n.userPreferences.text.hasOwnProperty(i) &&
                    r.css(o, i, n.userPreferences.text[i]);
              }
            if (
              n.userPreferences.window &&
              ((e = r.selectFirstElement("p", t)), e)
            )
              for (i in n.userPreferences.window)
                n.userPreferences.window.hasOwnProperty(i) &&
                  r.css(e, i, n.userPreferences.window[i]);
          }
        }),
        (n.ariaHidden = "aria-hidden"),
        (n.userPreferences = {
          text: {},
          window: {},
        }),
        n
      );
    })();
    t.VideoClosedCaptions = e;
  });
  define("video-closed-captions-settings", [
    "require",
    "exports",
    "video-closed-captions",
    "stringExtensions",
    "utility",
  ], function (n, t, i, r, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    t.closedCaptionsSettingsOptions = {
      font: {
        pre: "cc_font_name_",
        map: {
          casual: "Verdana;font-variant:normal",
          cursive: "Zapf-Chancery,Segoe script,Cursive;font-variant:normal",
          monospacedsansserif:
            "Lucida sans typewriter,Lucida console,Consolas;font-variant:normal",
          monospacedserif: "Courier;font-variant:normal",
          proportionalsansserif: "Arial,Sans-serif;font-variant:normal",
          proportionalserif: "Times New Roman,Serif;font-variant:normal",
          smallcapitals: "Arial,Helvetica,Sans-serif;font-variant:small-caps",
        },
      },
      percent: {
        pre: "cc_percent_",
        map: {
          0: "0",
          50: "0.5",
          75: "0.75",
          100: "1",
        },
      },
      text_size: {
        pre: "cc_text_size_",
        map: {
          small: "75%",
          default: "100%",
          large: "125%",
          extralarge: "150%",
          maximum: "200%",
        },
      },
      color: {
        pre: "cc_color_",
        map: {
          white: "#FFFFFF",
          black: "#000000",
          blue: "#0000FF",
          cyan: "#00FFFF",
          green: "#00FF00",
          grey: "#BCBCBC",
          magenta: "#FF00FF",
          red: "#FF0000",
          yellow: "#FFFF00",
        },
      },
      text_edge_style: {
        pre: "cc_text_edge_style_",
        map: {
          none: "none",
          depressed: "1px 1px 0 #FFF,-1px -1px 0 #000",
          dropshadow: "1px 1px 0 #000",
          raised: "1px 1px 0 #000,-1px -1px 0x #FFF",
          uniform:
            "1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000",
        },
      },
    };
    t.closedCaptionsSettingsMap = {
      text_font: {
        value: "font-family:",
        option: "font",
      },
      text_color: {
        value: "color:",
        option: "color",
      },
      text_size: {
        value: "font-size:",
        option: "text_size",
      },
      text_edge_style: {
        value: "text-shadow:",
        option: "text_edge_style",
      },
      text_opacity: {
        value: "color:",
        option: "percent",
      },
      text_background_color: {
        value: "background:",
        option: "color",
      },
      text_background_opacity: {
        value: "background:",
        option: "percent",
      },
      window_color: {
        value: "background:",
        option: "color",
      },
      window_opacity: {
        value: "background:",
        option: "percent",
      },
    };
    t.closedCaptionsPresetMap = {
      preset1: {
        text_font: "proportionalsansserif",
        text_color: "white",
        text_opacity: "100",
        text_background_color: "black",
        text_background_opacity: "100",
      },
      preset2: {
        text_font: "monospacedserif",
        text_color: "white",
        text_opacity: "100",
        text_background_color: "black",
        text_background_opacity: "100",
      },
      preset3: {
        text_font: "proportionalsansserif",
        text_color: "yellow",
        text_opacity: "100",
        text_background_color: "black",
        text_background_opacity: "100",
      },
      preset4: {
        text_font: "proportionalsansserif",
        text_color: "blue",
        text_opacity: "100",
        text_background_color: "grey",
        text_background_opacity: "100",
      },
      preset5: {
        text_font: "casual",
        text_color: "white",
        text_opacity: "100",
        text_background_color: "black",
        text_background_opacity: "100",
      },
    };
    t.closedCaptionsSettinsDefaults = {
      preset: "preset1",
      text_font: "proportionalsansserif",
      text_color: "white",
      text_opacity: "100",
      text_size: "default",
      text_edge_style: "none",
      text_background_color: "black",
      text_background_opacity: "100",
      window_color: "black",
      window_opacity: "0",
    };
    var f = (function () {
      function n(t) {
        this.onErrorCallback = t;
        n.tempSettings = {};
        n.tempSettings[n.presetKey] = "none";
        this.loadUserPreferences();
        this.applySettings();
      }
      return (
        (n.prototype.saveUserPreferences = function () {
          u.saveToLocalStorage(
            n.storageKeyName,
            JSON.stringify(n.userPreferences)
          );
        }),
        (n.prototype.loadUserPreferences = function () {
          var r = u.getValueFromLocalStorage(n.storageKeyName),
            t,
            i;
          if (r)
            try {
              t = JSON.parse(r);
              for (i in t) t.hasOwnProperty(i) && this.setPreferences(i, t[i]);
            } catch (f) {
              if (this.onErrorCallback)
                this.onErrorCallback({
                  errorType:
                    "oneplayer.error.VideoClosedCaptionsSettings.loadUserPreferences",
                  errorDesc: "UserPrefs parsing error: " + f.message,
                });
            }
        }),
        (n.prototype.reset = function (t) {
          (typeof t == "undefined" || t == null || t) &&
            ((n.userPreferences = {}),
            (n.currentSettings = {}),
            this.saveUserPreferences());
          n.tempSettings = {};
          n.tempSettings[n.presetKey] = "none";
          this.applySettings();
        }),
        (n.prototype.setSetting = function (i, r, f) {
          if (i && r) {
            if (typeof f == "undefined" || f == null || f)
              this.setPreferences(i, r),
                this.saveUserPreferences(),
                (n.tempSettings = {}),
                (n.tempSettings[n.presetKey] = "none");
            else {
              var e = t.closedCaptionsPresetMap[r];
              e && ((n.tempSettings[i] = r), u.extend(n.tempSettings, e));
            }
            this.applySettings();
          }
        }),
        (n.prototype.getCurrentSettings = function (i) {
          return (
            i === void 0 && (i = n.currentSettings),
            u.extend({}, t.closedCaptionsSettinsDefaults, i)
          );
        }),
        (n.prototype.setPreferences = function (i, r) {
          if (i && r)
            if (i === n.presetKey) {
              var f = t.closedCaptionsPresetMap[r];
              f &&
                ((n.userPreferences = {}),
                (n.currentSettings = {}),
                (n.userPreferences[i] = r),
                (n.currentSettings[i] = r),
                u.extend(n.currentSettings, f));
            } else
              this.getOptionValue(i, r) &&
                ((n.userPreferences = u.extend({}, n.currentSettings)),
                delete n.userPreferences[n.presetKey],
                (n.currentSettings[n.presetKey] = "none"),
                (n.userPreferences[i] = r),
                (n.currentSettings[i] = r));
        }),
        (n.prototype.applySettings = function () {
          var u = {},
            f =
              n.tempSettings[n.presetKey] === "none"
                ? this.getCurrentSettings()
                : this.getCurrentSettings(n.tempSettings),
            r,
            e;
          for (r in f)
            f.hasOwnProperty(r) &&
              ((e = this.getOptionValue(r, f[r])),
              e && (u[r] = t.closedCaptionsSettingsMap[r].value + e));
          i.VideoClosedCaptions.userPreferences.text = this.getPrefsCss(
            u,
            "text"
          );
          i.VideoClosedCaptions.userPreferences.window = this.getPrefsCss(
            u,
            "window"
          );
        }),
        (n.prototype.getOptionValue = function (n, i) {
          var u = t.closedCaptionsSettingsMap[n],
            r;
          if (u)
            return (r = t.closedCaptionsSettingsOptions[u.option]), r && r.map[i];
        }),
        (n.prototype.getPrefsCss = function (n, t) {
          var f = {},
            s,
            e,
            o,
            h,
            i,
            u,
            r,
            c,
            l;
          for (i in n)
            if (
              n.hasOwnProperty(i) &&
              ((u = n[i]),
              i.indexOf(t) === 0 && i.indexOf("opacity") < 0 && u && u.length > 0)
            )
              for (s = u.split(";"), e = 0, o = s; e < o.length; e++)
                (h = o[e]),
                  (r = h.split(":")),
                  r.length > 1 && (f[r[0].trim()] = r[1].trim());
          for (i in n)
            n.hasOwnProperty(i) &&
              ((u = n[i]),
              i.indexOf(t) === 0 &&
                i.indexOf("opacity") > 0 &&
                ((r = u.split(":")),
                r.length > 1 &&
                  ((c = f[r[0].trim()]),
                  (l = r[1].trim()),
                  (f[r[0].trim()] = this.formatAsRgba(c, l)))));
          return f;
        }),
        (n.prototype.formatAsRgba = function (n, t) {
          var f = r.format("rgba(0,0,0,{0})", t),
            e = n ? n.indexOf("#") : -1,
            u,
            i;
          if (e >= 0 && ((u = n.substr(e + 1)), (i = u.length / 3), i > 0)) {
            var o = parseInt(u.substr(0, i), 16),
              s = parseInt(u.substr(i, i), 16),
              h = parseInt(u.substr(i * 2, i), 16);
            f = r.format("rgba({0},{1},{2},{3})", o, s, h, t);
          }
          return f;
        }),
        (n.userPreferences = {}),
        (n.currentSettings = {}),
        (n.tempSettings = {}),
        (n.storageKeyName = "mwf-video-player-cc-settings"),
        (n.presetKey = "preset"),
        n
      );
    })();
    t.VideoClosedCaptionsSettings = f;
  });
  define("player-constants", ["require", "exports"], function (n, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    t.MediaEvents = [
      "abort",
      "canplay",
      "canplaythrough",
      "emptied",
      "ended",
      "error",
      "loadeddata",
      "loadedmetadata",
      "loadstart",
      "pause",
      "play",
      "playing",
      "progress",
      "ratechange",
      "readystatechange",
      "seeked",
      "seeking",
      "stalled",
      "suspend",
      "timeupdate",
      "volumechange",
      "waiting",
    ];
    t.PlayerEvents = {
      CommonPlayerImpression: "CommonPlayerImpression",
      PlaybackStatusChanged: "PlaybackStatusChanged",
      Replay: "Replay",
      BufferComplete: "BufferComplete",
      ContentStart: "ContentStart",
      ContentError: "ContentError",
      ContentContinue: "ContentContinue",
      ContentComplete: "ContentComplete",
      ContentCheckpoint: "ContentCheckpoint",
      ContentLoaded3PP: "ContentLoaded3PP",
      Ready: "Ready",
      Play: "Play",
      Pause: "Pause",
      Resume: "Resume",
      Seek: "Seek",
      VideoQualityChanged: "VideoQualityChanged",
      Mute: "Mute",
      Unmute: "Unmute",
      Volume: "Volume",
      InfoPaneOpened: "InfoPaneOpened",
      VideoTimedout: "VideoTimedout",
      VideoTimeUpdate: "VideoTimeUpdate",
      FullScreenEnter: "FullScreenEnter",
      FullScreenExit: "FullScreenExit",
      UserInteracted: "VideoUserInteracted",
      InteractiveOverlayClick: "InteractiveOverlayClick",
      InteractiveBackButtonClick: "InteractiveBackButtonClick",
      InteractiveOverlayShow: "InteractiveOverlayShow",
      InteractiveOverlayHide: "InteractiveOverlayHide",
      InteractiveOverlayMaximize: "InteractiveOverlayMaximize",
      InteractiveOverlayMinimize: "InteractiveOverlayMaximize",
      InviewEnter: "InviewEnter",
      InviewExit: "InviewExit",
      TimeRemainingCheckpoint: "TimeRemainingCheckpoint",
      PlayerError: "PlayerError",
      VideoShared: "VideoShared",
      ClosedCaptionsChanged: "ClosedCaptionsChanged",
      ClosedCaptionSettingsChanged: "ClosedCaptionSettingsChanged",
      PlaybackRateChanged: "PlaybackRateChanged",
      MediaDownloaded: "MediaDownloaded",
      AudioTrackChanged: "AudioTrackChanged",
      AgeGateSubmitClick: "AgeGateSubmitClick",
      SourceErrorAttemptRecovery: "SourceErrorAttemptRecovery",
    };
    t.PlaybackStatus = {
      Ready: "Ready",
      Loading: "Loading",
      Loaded: "Loaded",
      LoadFailed: "LoadFailed",
      PlaybackCompleted: "PlaybackCompleted",
      Playbackerrored: "PlaybackErrored",
      VideoOpening: "VideoOpening",
      VideoPlaying: "VideoPlaying",
      VideoBuffering: "VideoBuffering",
      VideoPaused: "VideoPaused",
      VideoPlayCompleted: "VideoPlayCompleted",
      VideoPlayFailed: "VideoPlayFailed",
      VideoClosed: "VideoClosed",
    };
    t.shareTypes = {
      facebook: "facebook",
      twitter: "twitter",
      linkedin: "linkedin",
      skype: "skype",
      mail: "mail",
      copy: "copy",
    };
    t.videoPerfMarkers = {
      scriptLoaded: "scriptLoaded",
      playerInit: "playerInit",
      metadataFetchStart: "metadataFetchStart",
      metadataFetchEnd: "metadataFetchEnd",
      playerLoadStart: "playerLoadStart",
      playerReady: "playerReady",
      wrapperLoadStart: "wrapperLoadStart",
      wrapperReady: "wrapperReady",
      locLoadStart: "locLoadStart",
      locReady: "locReady",
      playTriggered: "playTriggered",
      ttvs: "ttvs",
    };
    t.videoAdsPerfMarkers = {
      adsScriptLoaded: "adsScriptLoaded",
      adsPlayerInit: "adsPlayerInit",
      adsFetchStart: "adsFetchStart",
      adsPlayerLoadStart: "adsPlayerLoadStart",
      adsPlayerReady: "adsPlayerReady",
      adsPlayTriggered: "adsPlayTriggered",
    };
  });
  define("context-menu", [
    "require",
    "exports",
    "htmlExtensions",
    "utility",
  ], function (n, t, i, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var u = (function () {
      function n(n, t) {
        var u = this;
        this.contextMenuContainer = n;
        this.focusedMenuItemIndex = 0;
        this.onContextMenuEvents = function (n, t) {
          switch (n.type) {
            case "click":
              u.onContextMenuItemClick(n, t);
              break;
            case "keyup":
              var f = r.getKeyCode(n);
              f === 32 && i.preventDefault(n);
              break;
            case "keydown":
              u.onContextMenuKeyPressed(n);
          }
        };
        this.onContextMenuItemClick = function (n) {
          var t;
          n = i.getEvent(n);
          t = i.getEventTargetOrSrcElement(n);
          i.preventDefault(n);
          var r = t.parentElement,
            f = r.id || (r.parentElement && r.parentElement.id),
            e = t.getAttribute("data-info") || r.getAttribute("data-info");
          if (!!u.videoPlayer)
            u.videoPlayer.onPlayerContextMenuItemClick({
              category: t.getAttribute("data-category"),
              id: f,
              data: e,
            });
        };
        this.videoPlayer = t;
      }
      return (
        (n.prototype.initializeCustomPlayerMenus = function () {
          this.contextMenuContainer &&
            ((this.menuItems = i.selectElements(
              n.contextMenuSelector + " ul li",
              this.contextMenuContainer
            )),
            this.menuItems &&
              this.menuItems.length &&
              i.addEvents(
                this.menuItems,
                "click keydown keyup",
                this.onContextMenuEvents
              ));
        }),
        (n.prototype.calcHeightWidthOfContextMenu = function () {
          if (this.contextMenuContainer) {
            var t = i.selectFirstElement(
              n.contextMenuSelector,
              this.contextMenuContainer
            );
            t &&
              (t.setAttribute("aria-hidden", "false"),
              (this.menuHeight = i.getClientRect(t).height),
              (this.menuWidth = i.getClientRect(t).width),
              t.setAttribute("aria-hidden", "true"));
          }
        }),
        (n.prototype.showMenu = function (t, r) {
          var u = t.offsetX,
            f = t.offsetY;
          this.calcHeightWidthOfContextMenu();
          var o = r.offsetHeight + r.offsetTop,
            s = r.offsetWidth + r.offsetLeft,
            h = f + this.menuHeight + 2,
            c = u + this.menuWidth + 2,
            e = i.selectFirstElement(
              n.contextMenuSelector,
              this.contextMenuContainer
            );
          e &&
            (h > o && (f = f - this.menuHeight),
            c > s && (u = u - this.menuWidth),
            i.css(e, "left", u + "px"),
            i.css(e, "top", f + "px"),
            e.setAttribute("aria-hidden", "false"));
        }),
        (n.prototype.checkContextMenuIsVisible = function () {
          if (this.contextMenuContainer) {
            var t = i.selectFirstElement(
              n.contextMenuSelector,
              this.contextMenuContainer
            );
            return t ? t.getAttribute("aria-hidden") === "false" : !1;
          }
          return !1;
        }),
        (n.prototype.setFocusOnFirstElement = function () {
          this.contextMenuContainer &&
            ((this.menuItems = i.selectElements(
              n.contextMenuSelector + " ul li",
              this.contextMenuContainer
            )),
            this.menuItems &&
              this.menuItems.length &&
              this.setFocus(i.selectFirstElement("button", this.menuItems[0])));
        }),
        (n.prototype.onContextMenuKeyPressed = function (t) {
          var f = r.getKeyCode(t),
            e = i.getEventTargetOrSrcElement(t),
            o = e && e.parentElement,
            u;
          switch (f) {
            case 37:
            case 39:
              i.stopPropagation(t);
              i.preventDefault(t);
              break;
            case 13:
            case 32:
              i.preventDefault(t);
              this.onContextMenuItemClick(t, !0);
              break;
            case 38:
            case 40:
              i.stopPropagation(t);
              i.preventDefault(t);
              this.menuItems &&
                this.menuItems.length &&
                (f === 38
                  ? ((this.focusedMenuItemIndex -= 1),
                    this.focusedMenuItemIndex < 0 &&
                      (this.focusedMenuItemIndex = this.menuItems.length - 1))
                  : (this.focusedMenuItemIndex =
                      (this.focusedMenuItemIndex + 1) % this.menuItems.length),
                this.setFocus(
                  i.selectFirstElement(
                    "button",
                    this.menuItems[this.focusedMenuItemIndex]
                  )
                ));
              break;
            case 33:
            case 36:
              i.stopPropagation(t);
              i.preventDefault(t);
              this.menuItems &&
                this.menuItems.length > 0 &&
                this.setFocus(i.selectFirstElement("button", this.menuItems[0]));
              break;
            case 35:
            case 34:
              i.stopPropagation(t);
              i.preventDefault(t);
              this.menuItems &&
                this.menuItems.length > 0 &&
                this.setFocus(
                  i.selectFirstElement(
                    "button",
                    this.menuItems[this.menuItems.length - 1]
                  )
                );
              break;
            case 27:
              u = i.selectFirstElement(
                n.contextMenuSelector,
                this.contextMenuContainer
              );
              u && u.setAttribute("aria-hidden", "true");
              this.videoPlayer.setFocusOnPlayButton();
          }
        }),
        (n.prototype.setupCustomizeContextMenu = function (t) {
          var h = i.selectFirstElement(
              n.contextMenuSelector,
              this.contextMenuContainer
            ),
            u,
            c,
            f,
            e,
            r,
            o,
            l,
            s;
          for (
            h && this.contextMenuContainer.removeChild(h),
              u = "",
              c = 1,
              u = "<ul role='menu' class='c-list f-bare'>",
              f = 0,
              e = t;
            f < e.length;
            f++
          )
            (r = e[f]),
              (o = "c-action-trigger active"),
              (o += r.glyph ? " " + r.glyph : ""),
              (u +=
                "<li id='" +
                r.id +
                "' role='presentation'>\n                    <button class='" +
                o +
                "'  role='menuitem'\n                        aria-setsize='" +
                t.length +
                "' \n                        aria-posinset='" +
                c++ +
                "'\n                        aria-label='" +
                r.label +
                "'\n                        data-category='" +
                r.category +
                "'>\n                        " +
                r.label +
                "\n                    </button>\n                </li>");
          u += "</ul>";
          l =
            "<div class='f-player-context-menu' aria-hidden='true'>\n                    " +
            u +
            "\n                </div>";
          s = document.createElement("div");
          s.innerHTML = l;
          this.contextMenuContainer.appendChild(s.firstChild);
          this.initializeCustomPlayerMenus();
        }),
        (n.prototype.setFocus = function (n) {
          !n ||
            setTimeout(function () {
              n.focus();
            }, 0);
        }),
        (n.contextMenuSelector = ".f-player-context-menu"),
        n
      );
    })();
    t.ContextMenu = u;
  });
  define("video-controls", [
    "require",
    "exports",
    "componentFactory",
    "slider",
    "utility",
    "htmlExtensions",
    "localization-helper",
    "stringExtensions",
    "environment",
  ], function (n, t, i, r, u, f, e, o, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var h = (function () {
      function n(t, o, h, c) {
        var l = this;
        if (
          ((this.videoControls = t),
          (this.localizationHelper = h),
          (this.contextMenu = c),
          (this.closeMenuRequested = !1),
          (this.isEscapeButtonPressed = !1),
          (this.isWindowZoomedIn = !1),
          (this.defaultMenuRight = "90px"),
          (this.focusedMenuItemIndex = 0),
          (this.currentVolume = 0),
          (this.tooltipElements = []),
          (this.reactiveControls = []),
          (this.preventKeyUpOnLastButton = !1),
          (this.reactiveWidths = [100, 430, 540, 650, 768, 926, 1084]),
          (this.userInteractionCallbacks = []),
          (this.activeMenuButton = null),
          (this.xboxControlsEnabled = !1),
          (this.onControlKeyboardEvent = function (t) {
            var e = u.getKeyCode(t),
              i,
              o,
              r,
              s;
            l.triggerUserInteractionCallback();
            switch (e) {
              case 36:
                f.stopPropagation(t);
                f.preventDefault(t);
                l.videoPlayer.seek(l.toAbsoluteTime(0));
                break;
              case 35:
                f.stopPropagation(t);
                f.preventDefault(t);
                l.videoPlayer.seek(l.videoPlayer.getPlayPosition().endTime);
                break;
              case 27:
                l.videoPlayer.isFullScreen() && f.stopPropagation(t);
                l.closeMenuRequested ||
                  window.parent.postMessage(
                    JSON.stringify({
                      eventName: "escape",
                      playerId: u.getQSPValue("pid", !1),
                    }),
                    "*"
                  );
                l.hideAllMenus();
                l.hideVolumeContainer();
                l.closeMenuRequested = !1;
                break;
              case 37:
              case 39:
                f.stopPropagation(t);
                f.preventDefault(t);
                i = l.videoPlayer.getPlayPosition();
                i
                  ? ((o = i.currentTime),
                    (r = e === 37 ? o - n.seekSteps : o + n.seekSteps),
                    (r = Math.min(Math.max(i.startTime, r), i.endTime)),
                    l.videoPlayer.seek(r))
                  : l.videoPlayer.seek(0);
                break;
              case 38:
              case 40:
                f.stopPropagation(t);
                f.preventDefault(t);
                l.showVolumeContainer(!0);
                s = l.videoPlayer.getVolume() * 100;
                e === 38
                  ? l.setVolume(Math.min((s + n.volumeSteps) / 100, 1), !0)
                  : l.setVolume(Math.max((s - n.volumeSteps) / 100, 0), !0);
            }
          }),
          (this.focusTrapHandler = function (n) {
            n = f.getEvent(n);
            var t = f.getEventTargetOrSrcElement(n),
              i = u.getKeyCode(n);
            i === 9 &&
              (t === l.focusTrapStart && n.shiftKey
                ? (n.preventDefault(),
                  l.contextMenu && l.contextMenu.checkContextMenuIsVisible()
                    ? l.contextMenu.setFocusOnFirstElement()
                    : l.setFocus(l.fullScreenButton))
                : t !== l.fullScreenButton ||
                  n.shiftKey ||
                  (n.preventDefault(),
                  l.contextMenu && l.contextMenu.checkContextMenuIsVisible()
                    ? l.contextMenu.setFocusOnFirstElement()
                    : l.setFocus(l.focusTrapStart)));
          }),
          (this.onPlayPauseEvents = function (t) {
            switch (t.type) {
              case "click":
                l.videoPlayer.setUserInteracted(!0);
                l.videoPlayer.isPaused()
                  ? (l.videoPlayer.setUserIntiatedPause(!1), l.play())
                  : (l.videoPlayer.setUserIntiatedPause(!0), l.pause());
                break;
              case "mouseover":
              case "focus":
                s.Environment.isChrome &&
                  (l.videoPlayer.isPaused()
                    ? l.setAriaLabelForPlayButton()
                    : l.playButton.setAttribute(n.ariaLabel, l.locPause));
                l.showElement(l.playTooltip);
                break;
              case "mouseout":
              case "blur":
                l.hideElement(l.playTooltip);
            }
          }),
          (this.onLiveButtonEvents = function (n) {
            switch (n.type) {
              case "click":
                l.videoPlayer &&
                  l.videoPlayer.seek(l.videoPlayer.getPlayPosition().endTime);
                break;
              case "mouseover":
              case "focus":
                l.showElement(l.liveTooltip);
                break;
              case "mouseout":
              case "blur":
                l.hideElement(l.liveTooltip);
            }
          }),
          (this.onVolumeEvents = function (n) {
            switch (n.type) {
              case "click":
                f.getEventTargetOrSrcElement(n) === l.volumeButton &&
                  (l.videoPlayer.isMuted()
                    ? ((l.currentVolume =
                        l.currentVolume === 0 ? 100 : l.currentVolume),
                      l.setMuted(!1, !0),
                      l.setVolume(Math.min(l.currentVolume / 100, 1), !1),
                      l.videoPlayer.updateScreenReaderElement(l.locUnmute))
                    : ((l.currentVolume = l.videoPlayer.getVolume() * 100),
                      l.setMuted(!0, !0),
                      l.setVolume(0, !1),
                      l.videoPlayer.updateScreenReaderElement(l.locMute)));
                break;
              case "mouseover":
              case "focus":
                l.isEscapeButtonPressed
                  ? (l.isEscapeButtonPressed = !1)
                  : l.showVolumeContainer();
                break;
              case "mouseout":
              case "blur":
                l.hideVolumeContainer();
            }
          }),
          (this.onVolumeSliderEvents = function (n) {
            switch (n.type) {
              case "focus":
                l.showVolumeContainer();
                break;
              case "blur":
                l.hideVolumeContainer();
                break;
              case "keydown":
                var t = u.getKeyCode(n);
                l.showVolumeContainer(!0);
                t === 27 &&
                  (f.stopPropagation(n),
                  (l.isEscapeButtonPressed = !0),
                  (l.closeMenuRequested = !0),
                  l.hideVolumeContainer(),
                  l.setFocus(l.volumeButton));
            }
          }),
          (this.onSliderKeyboardEvents = function (n) {
            var t = u.getKeyCode(n);
            switch (t) {
              case 40:
              case 38:
              case 37:
              case 39:
              case 34:
              case 33:
              case 36:
              case 35:
                f.stopPropagation(n);
                f.preventDefault(n);
            }
            l.triggerUserInteractionCallback();
          }),
          (this.onMoreOptionsEvents = function (n) {
            switch (n.type) {
              case "click":
                l.toggleOptionsDialog(!1);
                break;
              case "keyup":
              case "keydown":
                var t = u.getKeyCode(f.getEvent(n));
                (t === 32 || t === 13) &&
                  (f.preventDefault(n),
                  n.type === "keyup" && l.toggleOptionsDialog(!0));
                break;
              case "mouseover":
              case "focus":
                l.activeMenu || l.showElement(l.moreOptionsTooltip);
                break;
              case "mouseout":
              case "blur":
                l.hideElement(l.moreOptionsTooltip);
            }
          }),
          (this.onFullScreenEvents = function (n) {
            switch (n.type) {
              case "click":
                !l.videoPlayer || l.videoPlayer.toggleFullScreen();
                break;
              case "mouseover":
              case "focus":
                l.showElement(l.fullScreenTooltip);
                break;
              case "mouseout":
              case "blur":
                l.hideElement(l.fullScreenTooltip);
            }
          }),
          (this.onMenuButtonClick = function (n) {
            var t = f.getEventTargetOrSrcElement(n),
              r = t.getAttribute("data-menu-id"),
              i;
            switch (n.type) {
              case "click":
                l.toggleMenuById(t, !1, r);
                break;
              case "keyup":
              case "keydown":
                l.videoControls.getAttribute("aria-hidden") === "true" &&
                  l.videoControls.setAttribute("aria-hidden", "false");
                i = u.getKeyCode(f.getEvent(n));
                (i === 32 || i === 13) &&
                  (f.preventDefault(n),
                  n.type !== "keyup" || l.preventKeyUpOnLastButton
                    ? (l.preventKeyUpOnLastButton = !1)
                    : l.toggleMenuById(t, !0, r));
                break;
              case "mouseover":
              case "focus":
                l.activeMenu || l.showElement(f.selectFirstElement("span", t));
                break;
              case "mouseout":
              case "blur":
                l.hideElement(f.selectFirstElement("span", t));
            }
          }),
          (this.onMenuEvents = function (n, t) {
            switch (n.type) {
              case "click":
                l.onMenuItemClick(n, t);
                break;
              case "keyup":
                var i = u.getKeyCode(n);
                i === 32 && f.preventDefault(n);
                break;
              case "keydown":
                l.onMenuKeyPressed(n);
            }
          }),
          (this.onMenuItemClick = function (n, t) {
            var i, r, o, s, h;
            if (
              ((n = f.getEvent(n)),
              (i = f.getEventTargetOrSrcElement(n)),
              (r = i.getAttribute("data-next-menu")),
              f.preventDefault(n),
              r === "back")
            ) {
              if (
                ((o = i.getAttribute("aria-label")),
                (s = l.localizationHelper
                  .getLocalizedValue(e.playerLocKeys.reactive_menu_aria_label)
                  .replace("{0}", "")),
                f.hasClass(i, "closed-caption") &&
                  (s = l.localizationHelper
                    .getLocalizedValue(
                      e.playerLocKeys.reactive_menu_aria_label_closedcaption
                    )
                    .replace("{0}", "")),
                !!o && o.indexOf(s) >= 0)
              ) {
                l.focusOnLastButton();
                l.preventKeyUpOnLastButton = !0;
                return;
              }
              h = l.menuBackStack.pop();
              h && l.showMenu(h, t);
              return;
            }
            if (r) {
              l.activeMenu && l.pushToMenuBackStack(l.activeMenu.id);
              l.showMenu(r, t);
              return;
            }
            if (l.activeMenu) {
              var u = i.parentElement,
                c = u.id || (u.parentElement && u.parentElement.id),
                a = i.getAttribute("data-info") || u.getAttribute("data-info");
              if ((l.updateMenuSelection(l.activeMenu.id, c), !!l.videoPlayer))
                l.videoPlayer.onPlayerMenuItemClick({
                  category: l.activeMenu.getAttribute("data-category"),
                  id: c,
                  data: a,
                });
            }
            i.getAttribute("data-persist") || l.hideAllMenus();
          }),
          (this.hideAllMenus = function (t) {
            for (
              var u,
                e = f.selectElements(n.menuSelector, l.menuContainer),
                i = 0,
                r = e;
              i < r.length;
              i++
            )
              (u = r[i]), l.hideElement(u);
            l.activeMenu = null;
            l.clearMenuBackStack();
            l.updateReactiveControlDisplay();
            l.optionsButton.setAttribute("aria-expanded", "false");
            !l.activeMenuButton ||
              (l.activeMenuButton.setAttribute("aria-expanded", "false"),
              t && l.activeMenuButton.focus(),
              (l.activeMenuButton = null));
            l.menuContainer.setAttribute("aria-hidden", "true");
          }),
          t && o)
        ) {
          if (
            ((this.videoPlayer = o),
            (this.videoTitle = this.videoPlayer.getVideoTitle()),
            this.initializeLocalization(),
            this.initializeComponents(),
            !this.playButton ||
              !this.playTooltip ||
              !this.fullScreenButton ||
              !this.fullScreenTooltip ||
              !this.liveButton ||
              !this.liveTooltip ||
              !this.progressSliderElement ||
              !this.volumeButton ||
              !this.volumeContainer ||
              !this.volumeSliderElement ||
              !this.timeElement ||
              !this.timeCurrent ||
              !this.timeDuration ||
              !this.optionsButton ||
              !this.menuContainer ||
              !!this.xboxControlsEnabled)
          )
            return null;
          this.focusTrapStart = this.playButton;
          this.updatePlayPauseState();
          this.isWindowZoomedIn = Math.round(window.devicePixelRatio * 100) > 100;
          f.addEvent(window, f.eventTypes.resize, function () {
            l.isWindowZoomedIn = Math.round(window.devicePixelRatio * 100) > 100;
            l.hideAllMenus();
          });
          f.addEvent(window, f.eventTypes.scroll, function () {
            l.isWindowZoomedIn || l.hideAllMenus();
          });
          f.addEvent(
            this.videoControls,
            f.eventTypes.keydown,
            this.onControlKeyboardEvent
          );
          f.addEvents(
            this.playButton,
            "click mouseover mouseout focus blur",
            this.onPlayPauseEvents
          );
          f.addEvents(
            this.liveButton,
            "click mouseover mouseout focus blur",
            this.onLiveButtonEvents
          );
          f.addEvents(
            this.fullScreenButton,
            "click mouseover mouseout focus blur",
            this.onFullScreenEvents
          );
          f.addEvents(
            [this.volumeButton, this.volumeContainer],
            "click mouseover mouseout focus blur",
            this.onVolumeEvents
          );
          f.addEvents(
            this.optionsButton,
            "click mouseover mouseout focus blur keydown keyup",
            this.onMoreOptionsEvents
          );
          i.ComponentFactory.create([
            {
              component: r.Slider,
              eventToBind: "DOMContentLoaded",
              elements: [this.progressSliderElement, this.volumeSliderElement],
              callback: function (n) {
                !n ||
                  !n.length ||
                  n.length !== 2 ||
                  ((l.progressSlider = n[0]),
                  (l.volumeSlider = n[1]),
                  l.progressSlider.subscribe({
                    onValueChanged: function (n) {
                      return l.onProgressChanged(n);
                    },
                  }),
                  l.volumeSlider.subscribe({
                    onValueChanged: function (n) {
                      return l.onVolumeChanged(n);
                    },
                  }),
                  f.addEvents(
                    f.selectFirstElement("button", l.volumeSliderElement),
                    "focus blur keydown",
                    l.onVolumeSliderEvents
                  ),
                  f.addEvents(
                    [l.progressSliderElement, l.volumeSliderElement],
                    "keydown",
                    l.onSliderKeyboardEvents
                  ));
              },
            },
          ]);
        }
      }
      return (
        (n.prototype.getSeekSteps = function () {
          return n.seekSteps;
        }),
        (n.prototype.getAriaLabel = function () {
          return n.ariaLabel;
        }),
        (n.prototype.getLocalizationHelper = function () {
          return this.localizationHelper;
        }),
        (n.prototype.getVideoPlayer = function () {
          return this.videoPlayer;
        }),
        (n.prototype.setVideoControls = function (n) {
          this.videoControls = n;
        }),
        (n.prototype.getVideoControls = function () {
          return this.videoControls;
        }),
        (n.prototype.setPlayButton = function (n) {
          this.playButton = n;
        }),
        (n.prototype.getPlayButton = function () {
          return this.playButton;
        }),
        (n.prototype.setLiveButton = function (n) {
          this.liveButton = n;
        }),
        (n.prototype.getLiveButton = function () {
          return this.liveButton;
        }),
        (n.prototype.setTimeElement = function (n) {
          this.timeElement = n;
        }),
        (n.prototype.getTimeElement = function () {
          return this.timeElement;
        }),
        (n.prototype.setTimeCurrent = function (n) {
          this.timeCurrent = n;
        }),
        (n.prototype.getTimeCurrent = function () {
          return this.timeCurrent;
        }),
        (n.prototype.setTimeDuration = function (n) {
          this.timeDuration = n;
        }),
        (n.prototype.getTimeDuration = function () {
          return this.timeDuration;
        }),
        (n.prototype.setProgressSliderElement = function (n) {
          this.progressSliderElement = n;
        }),
        (n.prototype.getProgressSliderElement = function () {
          return this.progressSliderElement;
        }),
        (n.prototype.setOptionsButton = function (n) {
          this.optionsButton = n;
        }),
        (n.prototype.getOptionsButton = function () {
          return this.optionsButton;
        }),
        (n.prototype.setMenuContainer = function (n) {
          this.menuContainer = n;
        }),
        (n.prototype.getMenuContainer = function () {
          return this.menuContainer;
        }),
        (n.prototype.setVolumeButton = function (n) {
          this.volumeButton = n;
        }),
        (n.prototype.getVolumeButton = function () {
          return this.volumeButton;
        }),
        (n.prototype.setFullScreenButton = function (n) {
          this.fullScreenButton = n;
        }),
        (n.prototype.getFullScreenButton = function () {
          return this.fullScreenButton;
        }),
        (n.prototype.setXboxControlsEnabled = function (n) {
          this.xboxControlsEnabled = n;
        }),
        (n.prototype.initializeComponents = function () {
          var r;
          if (this.videoControls) {
            var i = this.localizationHelper.getLocalizedValue(
                e.playerLocKeys.live_caption
              ),
              u = this.localizationHelper.getLocalizedValue(
                e.playerLocKeys.live_label
              ),
              o = this.localizationHelper.getLocalizedValue(e.playerLocKeys.seek),
              t = this.localizationHelper.getLocalizedValue(
                e.playerLocKeys.more_caption
              ),
              s = this.localizationHelper.getLocalizedValue(
                e.playerLocKeys.volume
              );
            this.videoControls.children.length ||
              ((r =
                "<button type='button' class='f-play-pause c-glyph glyph-play' aria-label='" +
                this.locPlay +
                "' role='button'>\n    <span aria-hidden='true'>" +
                this.locPlay +
                "</span>\n</button>\n<button type='button' class='f-live f-live-current c-glyph glyph-view' aria-label='" +
                i +
                "' aria-hidden='true'>\n    <span aria-hidden='true'>" +
                i +
                "</span>\n    " +
                u +
                "\n</button>\n<span class='f-time'>\n    <span class='f-current-time'>00:00</span>\n    /\n    <span class='f-duration'>00:00</span>\n</span>\n<div class='c-slider f-progress'>\n    <input type='range' class='f-seek-bar' aria-label='" +
                o +
                "' value='0' min='0' tabindex='-1' step=" +
                n.seekSteps +
                ">\n</div>\n<button type='button' class='f-options c-glyph glyph-more' aria-label='" +
                t +
                "' aria-expanded='false'>\n    <span aria-hidden='true'>" +
                t +
                "</span>\n</button>\n<div class='f-menu-container'></div>\n<button type='button' class='f-volume-button c-glyph glyph-volume' aria-label='" +
                this.locMute +
                "'></button>\n<div class='f-volume-slider' data-show='false' role='presentation'>\n    <div class='c-slider f-vertical' role='presentation'>\n        <input type='range' class='f-volume-bar f-vertical' aria-label='" +
                s +
                "' \n            min='0' max='100' step='" +
                n.volumeSteps +
                "' value='100' tabindex='-1'>\n    </div>\n</div>\n<button type='button' class='f-full-screen c-glyph glyph-full-screen' aria-label='" +
                this.locFullScreen +
                "'>\n    <span aria-hidden='true'>" +
                this.locFullScreen +
                "</span>\n</button>"),
              (this.videoControls.innerHTML = r));
            this.playButton = f.selectFirstElementT(
              ".f-play-pause",
              this.videoControls
            );
            this.setAriaLabelForPlayButton();
            this.playTooltip = f.selectFirstElement("span", this.playButton);
            f.setText(this.playTooltip, this.locPlay);
            this.tooltipElements.push(this.playTooltip);
            this.liveButton = f.selectFirstElementT(
              ".f-live",
              this.videoControls
            );
            this.liveTooltip = f.selectFirstElement("span", this.liveButton);
            this.tooltipElements.push(this.liveTooltip);
            this.timeElement = f.selectFirstElement(
              ".f-time",
              this.videoControls
            );
            this.timeCurrent = f.selectFirstElement(
              ".f-current-time",
              this.timeElement
            );
            this.timeDuration = f.selectFirstElement(
              ".f-duration",
              this.timeElement
            );
            this.progressSliderElement = f.selectFirstElement(
              ".c-slider.f-progress",
              this.videoControls
            );
            this.optionsButton = f.selectFirstElementT(
              ".f-options",
              this.videoControls
            );
            this.optionsButton.setAttribute(
              n.ariaLabel,
              this.localizationHelper.getLocalizedValue(
                e.playerLocKeys.more_caption
              )
            );
            this.moreOptionsTooltip = f.selectFirstElement(
              "span",
              this.optionsButton
            );
            f.setText(this.moreOptionsTooltip, t);
            this.tooltipElements.push(this.moreOptionsTooltip);
            this.menuContainer = f.selectFirstElement(
              ".f-menu-container",
              this.videoControls
            );
            this.volumeButton = f.selectFirstElementT(
              ".f-volume-button",
              this.videoControls
            );
            this.volumeButton.setAttribute(n.ariaLabel, this.locMute);
            this.volumeContainer = f.selectFirstElement(
              ".f-volume-slider",
              this.videoControls
            );
            this.volumeSliderElement = f.selectFirstElement(
              ".c-slider",
              this.volumeContainer
            );
            this.fullScreenButton = f.selectFirstElementT(
              ".f-full-screen",
              this.videoControls
            );
            this.fullScreenButton.setAttribute(n.ariaLabel, this.locFullScreen);
            this.fullScreenTooltip = f.selectFirstElement(
              "span",
              this.fullScreenButton
            );
            f.setText(this.fullScreenTooltip, this.locFullScreen);
            this.tooltipElements.push(this.fullScreenTooltip);
          }
        }),
        (n.prototype.setAriaLabelForPlayButton = function () {
          this.videoTitle !== ""
            ? this.playButton.setAttribute(
                n.ariaLabel,
                this.locPlay + " " + this.videoTitle
              )
            : this.playButton.setAttribute(n.ariaLabel, this.locPlayVideo);
        }),
        (n.prototype.initializeLocalization = function () {
          this.locPlay = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.play
          );
          this.locPlayVideo = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.play_video
          );
          this.locPlaying = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.playing
          );
          this.locPaused = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.paused
          );
          this.locPause = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.pause
          );
          this.locMute = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.mute
          );
          this.locUnmute = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.unmute
          );
          this.locFullScreen = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.expand
          );
          this.locExitFullScreen = this.localizationHelper.getLocalizedValue(
            e.playerLocKeys.unexpand
          );
        }),
        (n.prototype.setPlayPosition = function (t) {
          var r, s, h;
          if (!this.videoPlayer || !t) {
            this.playPosition = undefined;
            return;
          }
          var i = t.endTime - t.startTime,
            e = this.playPosition
              ? this.playPosition.endTime - this.playPosition.startTime
              : 0,
            o = this.videoPlayer.isLive();
          o &&
            ((r = Math.abs(t.currentTime - t.endTime)),
            (s = r / (t.endTime - t.startTime)),
            r < 20 || s < 0.01
              ? f.addClass(this.liveButton, "f-live-current")
              : f.removeClass(this.liveButton, "f-live-current"));
          isNaN(i) || isNaN(e) || Math.abs(i - e) > 1 || !this.playPosition
            ? (this.progressSlider &&
                this.progressSlider.resetSlider(
                  0,
                  i,
                  t.currentTime - t.startTime,
                  n.seekSteps
                ),
              this.timeDuration &&
                f.setText(this.timeDuration, u.toElapsedTimeString(i, !1)))
            : this.progressSlider &&
              this.progressSlider.setValue(t.currentTime - t.startTime);
          this.timeCurrent &&
            ((h = o ? t.currentTime - t.endTime : t.currentTime),
            f.setText(this.timeCurrent, u.toElapsedTimeString(h, !1)));
          this.playPosition = u.extend({}, t);
        }),
        (n.prototype.addUserInteractionListener = function (n) {
          n && this.userInteractionCallbacks.push(n);
        }),
        (n.prototype.triggerUserInteractionCallback = function () {
          var n, t, i;
          if (
            this.userInteractionCallbacks &&
            this.userInteractionCallbacks.length
          )
            for (n = 0, t = this.userInteractionCallbacks; n < t.length; n++)
              (i = t[n]), i();
        }),
        (n.prototype.setVolume = function (n, t) {
          u.isNumber(n) && !!this.videoPlayer && this.videoPlayer.setVolume(n, t);
        }),
        (n.prototype.setMuted = function (n, t) {
          !this.videoPlayer ||
            (n ? this.videoPlayer.mute(t) : this.videoPlayer.unmute(t));
        }),
        (n.prototype.updateVolumeState = function () {
          var n, t;
          this.updateMuteGlyph();
          !this.videoPlayer ||
            !this.volumeSlider ||
            ((n =
              this.videoPlayer.isMuted() || this.videoPlayer.getVolume() === 0),
            n
              ? this.volumeSlider.setValue(0)
              : ((t = this.videoPlayer.getVolume()),
                this.volumeSlider.setValue(Math.round(t * 100))));
        }),
        (n.prototype.updateMuteGlyph = function () {
          if (!!this.videoPlayer && !!this.volumeButton) {
            f.removeClasses(this.volumeButton, ["glyph-volume", "glyph-mute"]);
            var t =
              this.videoPlayer.isMuted() || this.videoPlayer.getVolume() === 0;
            f.addClass(this.volumeButton, t ? "glyph-mute" : "glyph-volume");
            this.volumeButton.setAttribute(
              n.ariaLabel,
              t ? this.locUnmute : this.locMute
            );
          }
        }),
        (n.prototype.prepareToHide = function () {
          this.hideAllMenus(!0);
          this.hideVolumeContainer();
        }),
        (n.prototype.hideControls = function () {
          var n = this;
          setTimeout(function () {
            for (var r, t = 0, i = n.tooltipElements; t < i.length; t++)
              (r = i[t]), n.hideElement(r);
          }, 0);
        }),
        (n.prototype.onProgressChanged = function (n) {
          var t, i, r;
          return !n || !this.videoPlayer
            ? null
            : ((i = this.videoPlayer.isLive()),
              i
                ? ((r = this.videoPlayer.getPlayPosition()),
                  (t = n.value + r.startTime - r.endTime))
                : ((t = n.value),
                  this.timeCurrent &&
                    f.setText(this.timeCurrent, u.toElapsedTimeString(t, !1))),
              this.videoPlayer &&
                n.userInitiated &&
                this.videoPlayer.seek(this.toAbsoluteTime(n.value)),
              u.toElapsedTimeString(t, !i));
        }),
        (n.prototype.toAbsoluteTime = function (n) {
          return this.videoPlayer && this.videoPlayer.isLive()
            ? n + this.videoPlayer.getPlayPosition().startTime
            : n;
        }),
        (n.prototype.onVolumeChanged = function (n) {
          if (!n) return null;
          !!this.videoPlayer && n.value > 0 && this.setMuted(!1);
          !this.videoPlayer || n.value !== 0 || this.setMuted(!0);
          var t = Math.round(n.value);
          return n.userInitiated && this.setVolume(t / 100, !0), t.toString();
        }),
        (n.prototype.play = function () {
          !this.videoPlayer ||
            (this.videoPlayer.play(),
            this.videoPlayer.updateScreenReaderElement(this.locPlaying));
        }),
        (n.prototype.pause = function () {
          !this.videoPlayer ||
            (this.videoPlayer.pause(!0),
            this.videoPlayer.updateScreenReaderElement(this.locPaused));
        }),
        (n.prototype.updatePlayPauseState = function () {
          !this.videoPlayer ||
            !this.playButton ||
            (this.videoPlayer.isPlayable()
              ? (this.playButton.removeAttribute("disabled"),
                this.videoPlayer.isPaused()
                  ? (!this.playTooltip ||
                      f.setText(this.playTooltip, this.locPlay),
                    f.removeClass(this.playButton, "glyph-pause"),
                    f.addClass(this.playButton, "glyph-play"),
                    this.setAriaLabelForPlayButton())
                  : (!this.playTooltip ||
                      f.setText(this.playTooltip, this.locPause),
                    f.removeClass(this.playButton, "glyph-play"),
                    f.addClass(this.playButton, "glyph-pause"),
                    this.playButton.setAttribute(n.ariaLabel, this.locPause),
                    this.prepareToHide()))
              : (!this.playTooltip || f.setText(this.playTooltip, this.locPlay),
                f.removeClass(this.playButton, "glyph-pause"),
                f.addClass(this.playButton, "glyph-play"),
                this.setAriaLabelForPlayButton(),
                this.playButton.setAttribute("disabled", "disabled")));
        }),
        (n.prototype.setLive = function (t) {
          this.liveButton &&
            this.timeElement &&
            (this.liveButton.setAttribute(n.ariaHidden, t ? "false" : "true"),
            this.timeElement.setAttribute(n.ariaHidden, t ? "true" : "false"));
        }),
        (n.prototype.updateFullScreenState = function () {
          var t, n;
          this.videoPlayer &&
            this.fullScreenButton &&
            ((t = this.videoPlayer.isFullScreen()),
            t
              ? (f.removeClass(this.fullScreenButton, "glyph-full-screen"),
                f.addClass(this.fullScreenButton, "glyph-back-to-window"),
                this.setFocus(this.fullScreenButton))
              : (f.removeClass(this.fullScreenButton, "glyph-back-to-window"),
                f.addClass(this.fullScreenButton, "glyph-full-screen")),
            (n = t ? this.locExitFullScreen : this.locFullScreen),
            this.fullScreenButton.setAttribute("aria-label", n),
            !this.fullScreenTooltip ||
              (f.setText(this.fullScreenTooltip, n),
              this.videoPlayer.updateScreenReaderElement(n)));
        }),
        (n.prototype.setFocusOnControlBar = function () {
          this.setFocus(this.playButton);
        }),
        (n.prototype.setFocusTrap = function (n) {
          n === null && (n = this.playButton);
          this.focusTrapStart = n;
          f.addEvent(
            [n, this.fullScreenButton],
            f.eventTypes.keydown,
            this.focusTrapHandler
          );
        }),
        (n.prototype.removeFocusTrap = function () {
          f.removeEvents(
            [this.focusTrapStart, this.fullScreenButton],
            "keydown",
            this.focusTrapHandler
          );
        }),
        (n.prototype.showVolumeContainer = function (t) {
          var i = this;
          if (!!this.volumeContainer) {
            this.volumeContainer.setAttribute("data-show", "true");
            this.onlyOneDialog(this.volumeContainer);
            clearTimeout(this.volumeAutoHideTimer);
            t &&
              document.activeElement !== this.volumeButton &&
              (this.volumeAutoHideTimer = setTimeout(function () {
                i.hideVolumeContainer();
              }, n.volumeAutoHideTimeout));
          }
        }),
        (n.prototype.hideVolumeContainer = function () {
          this.volumeContainer.setAttribute("data-show", "false");
          clearTimeout(this.volumeAutoHideTimer);
        }),
        (n.prototype.showElement = function (t) {
          t && t.setAttribute(n.ariaHidden, "false");
        }),
        (n.prototype.hideElement = function (t) {
          t && t.setAttribute(n.ariaHidden, "true");
        }),
        (n.prototype.toggleMenuById = function (n, t, i) {
          if (this.activeMenu && this.activeMenu.id === i) this.hideAllMenus();
          else {
            n.setAttribute("aria-expanded", "true");
            this.showMenu(i, t, n);
            var r = f.selectFirstElement("button", this.activeMenu);
            !r || f.removeClass(r, "glyph-chevron-left");
          }
        }),
        (n.prototype.resetMenuPosition = function (n, t) {
          var i = f.selectElements(".f-player-menu", this.videoControls),
            r,
            u;
          if (!!i && i.length > 0)
            for (r = 0; r < i.length; r++)
              (u = f.selectFirstElement("button", i[r])),
                !!u &&
                  u.hasAttribute("data-next-menu") &&
                  f.addClass(u, "glyph-chevron-left");
          !t || (this.menuRight = f.css(t, "right"));
          f.css(n, "right", this.menuRight);
        }),
        (n.prototype.createReactiveButton = function (n, t, i, r, u) {
          var s = this.hasReactiveClass(n),
            e;
          if (!s) {
            var h = "<span aria-hidden='true'>" + r + "</span>",
              c =
                "\n            <button class='f-reactive c-glyph " +
                n +
                " " +
                u +
                "' aria-label='" +
                r +
                "' aria-hidden='true' \n            data-menu-id='" +
                i +
                "' aria-expanded='false'>\n                " +
                h +
                "\n            </button>",
              o = document.createElement("div");
            o.innerHTML = c;
            e = f.selectFirstElementT("button", o);
            this.videoControls.insertBefore(e, this.optionsButton);
            f.setText(e.firstElementChild, r);
            this.tooltipElements.push(e.firstElementChild);
            f.addEvents(
              e,
              "click mouseover mouseout focus blur keydown keyup",
              this.onMenuButtonClick
            );
            this.reactiveControls.push({
              button: e,
              priority: t,
            });
            this.sortReactiveControls();
          }
        }),
        (n.prototype.sortReactiveControls = function () {
          this.reactiveControls.sort(function (n, t) {
            return n.priority < t.priority ? -1 : n.priority > t.priority ? 1 : 0;
          });
        }),
        (n.prototype.hasReactiveClass = function (n) {
          for (var t = 0; t < this.reactiveControls.length; t++)
            if (f.hasClass(this.reactiveControls[t].button, n)) return !0;
          return !1;
        }),
        (n.prototype.toggleReactiveButtonLabelAndHandlers = function (n, t) {
          var c = n.button.getAttribute("data-menu-id"),
            h = document.getElementById(c),
            i,
            s,
            u,
            r;
          if (
            !!h &&
            ((i = h.getElementsByTagName("button")[0]),
            !!i && i.hasAttribute("data-next-menu"))
          ) {
            if (
              ((s = this.localizationHelper
                .getLocalizedValue(e.playerLocKeys.previous_menu_aria_label)
                .replace("{0}", "")),
              (u = this.localizationHelper
                .getLocalizedValue(e.playerLocKeys.reactive_menu_aria_label)
                .replace("{0}", "")),
              f.hasClass(i, "closed-caption") &&
                (u = this.localizationHelper
                  .getLocalizedValue(
                    e.playerLocKeys.reactive_menu_aria_label_closedcaption
                  )
                  .replace("{0}", "")),
              (r = i.getAttribute("aria-label")),
              !r || (r.indexOf(s) !== -1 && r.indexOf(u) !== -1))
            )
              return;
            r = r.replace(s, "").replace(u, "");
            t
              ? i.setAttribute(
                  "aria-label",
                  o.format(
                    this.localizationHelper.getLocalizedValue(
                      e.playerLocKeys.previous_menu_aria_label
                    ),
                    r
                  )
                )
              : f.hasClass(i, "closed-caption")
              ? i.setAttribute(
                  "aria-label",
                  o.format(
                    this.localizationHelper.getLocalizedValue(
                      e.playerLocKeys.reactive_menu_aria_label_closedcaption
                    ),
                    r
                  )
                )
              : i.setAttribute(
                  "aria-label",
                  o.format(
                    this.localizationHelper.getLocalizedValue(
                      e.playerLocKeys.reactive_menu_aria_label
                    ),
                    r
                  )
                );
          }
        }),
        (n.prototype.toggleMoreOptionsItemVisibility = function (t, i) {
          var a = t.button.getAttribute("data-menu-id"),
            r,
            c,
            u,
            s,
            h,
            v,
            l,
            o,
            e;
          if (
            !!a &&
            ((r = document.getElementById(a + "_item")),
            !!r && !!r.parentElement && !!r.parentElement.parentElement)
          ) {
            for (
              c = r.parentElement.parentElement,
                i
                  ? (r.setAttribute(n.ariaHidden, "false"),
                    f.addClass(r.firstElementChild, "active"))
                  : (r.setAttribute(n.ariaHidden, "true"),
                    f.removeClass(r.firstElementChild, "active")),
                u = c.querySelectorAll("li"),
                s = 0,
                h = 0;
              h < u.length;
              h++
            )
              (e = u[h].getAttribute(n.ariaHidden)),
                (e && e !== "false") || (s += 40);
            if (s !== 0)
              for (
                this.optionsButton.setAttribute(n.ariaHidden, "false"),
                  f.css(c, "height", s + 4 + "px"),
                  v = s / 40,
                  l = 1,
                  o = 0;
                o < u.length;
                o++
              )
                (e = u[o].getAttribute(n.ariaHidden)),
                  (e && e !== "false") ||
                    (u[o].firstElementChild.setAttribute(
                      "aria-setsize",
                      v.toString()
                    ),
                    u[o].firstElementChild.setAttribute(
                      "aria-posinset",
                      l.toString()
                    ),
                    l++);
            else this.optionsButton.setAttribute(n.ariaHidden, "true");
          }
        }),
        (n.prototype.updateReactiveControlDisplay = function () {
          var h = parseInt(f.css(this.optionsButton, "padding-right"), 10),
            o = u.getDimensions(this.optionsButton).width + h,
            r,
            i,
            s,
            e,
            t;
          if (
            this.reactiveControls.length > 0 &&
            ((r = u.getDimensions(this.videoControls).width), r !== 0)
          ) {
            for (
              i = o * 3, s = !0, e = this.reactiveControls.length - 1;
              e >= 0;
              e--
            )
              (t = this.reactiveControls[e]),
                r < this.reactiveWidths[t.priority]
                  ? (this.toggleReactiveButtonLabelAndHandlers(t, !0),
                    this.toggleMoreOptionsItemVisibility(t, !0),
                    t.button.setAttribute(n.ariaHidden, "true"))
                  : r > this.reactiveWidths[t.priority] &&
                    (this.toggleReactiveButtonLabelAndHandlers(t, !1),
                    this.toggleMoreOptionsItemVisibility(t, !1),
                    this.optionsButton.getAttribute(n.ariaHidden) === "true" &&
                      s &&
                      ((i = o * 2), (s = !1)),
                    t.button.setAttribute(n.ariaHidden, "false"),
                    f.css(t.button, "right", 2 + i + "px"),
                    f.hasClass(t.button, "f-volume-button") &&
                      f.css(this.volumeContainer, "right", 2 + i + "px"),
                    (i += o));
            f.css(
              this.progressSliderElement,
              "width",
              "calc(100% - " + (i + 140) + "px)"
            );
          }
        }),
        (n.prototype.initializePlayerMenus = function () {
          var t = f.selectElements(n.menuSelector + " ul", this.menuContainer);
          t &&
            t.length &&
            f.addEvents(t, "click keydown keyup", this.onMenuEvents);
        }),
        (n.prototype.disposeReactiveControls = function () {
          for (var i, n = 0, t = this.reactiveControls; n < t.length; n++)
            (i = t[n]), f.removeElement(i.button);
          this.reactiveControls = [];
        }),
        (n.prototype.disposePlayerMenus = function () {
          var t = f.selectElements(n.menuSelector + " ul", this.menuContainer);
          t &&
            t.length &&
            f.removeEvents(t, "click keydown keyup", this.onMenuEvents);
          f.removeInnerHtml(this.menuContainer);
          this.disposeReactiveControls();
        }),
        (n.prototype.toggleOptionsDialog = function (n) {
          this.activeMenu &&
          f.css(this.activeMenu, "right") === this.defaultMenuRight
            ? this.hideAllMenus()
            : (this.showMenu(
                this.optionsButton.getAttribute("data-menu-id"),
                n,
                this.optionsButton
              ),
              this.optionsButton.setAttribute("aria-expanded", "true"));
        }),
        (n.prototype.onlyOneDialog = function (t) {
          !this.activeMenu ||
            !this.volumeContainer ||
            this.activeMenu.getAttribute(n.ariaHidden) !== "false" ||
            this.volumeContainer.getAttribute("data-show") !== "true" ||
            (t === this.activeMenu
              ? this.hideVolumeContainer()
              : this.hideAllMenus());
        }),
        (n.prototype.onMenuKeyPressed = function (n) {
          var h = u.getKeyCode(n),
            o = f.getEventTargetOrSrcElement(n),
            l = o && o.parentElement,
            c,
            t,
            s,
            i,
            r,
            e;
          if (this.activeMenu && l) {
            c = this.activeMenu.id;
            this.triggerUserInteractionCallback();
            switch (h) {
              case 37:
              case 39:
                if (
                  (f.stopPropagation(n),
                  f.preventDefault(n),
                  o.getAttribute("data-next-menu"))
                )
                  this.onMenuItemClick(n, !0);
                break;
              case 13:
              case 32:
                f.preventDefault(n);
                this.onMenuItemClick(n, !0);
                if (
                  !!this.activeMenu &&
                  ((t = this.activeMenu.getElementsByTagName("button")),
                  (s = 0),
                  !!t && t.length > 0)
                )
                  for (i = 0; i < t.length; i++)
                    t[i].getAttribute("data-next-menu") === c
                      ? (this.setFocus(t[i]), (this.focusedMenuItemIndex = s))
                      : f.hasClass(t[i], "active") && s++;
                break;
              case 38:
              case 40:
                f.stopPropagation(n);
                f.preventDefault(n);
                r = f.selectElements(".active", this.activeMenu);
                r &&
                  r.length &&
                  (h === 38
                    ? ((this.focusedMenuItemIndex -= 1),
                      this.focusedMenuItemIndex < 0 &&
                        (this.focusedMenuItemIndex = r.length - 1))
                    : (this.focusedMenuItemIndex =
                        (this.focusedMenuItemIndex + 1) % r.length),
                  this.setFocus(r[this.focusedMenuItemIndex]));
                break;
              case 33:
              case 36:
                f.stopPropagation(n);
                f.preventDefault(n);
                this.setFocus(f.selectFirstElement(".active", this.activeMenu));
                break;
              case 35:
              case 34:
                f.stopPropagation(n);
                f.preventDefault(n);
                e = f.selectElements(".active", this.activeMenu);
                e && e.length && this.setFocus(e[e.length - 1]);
                break;
              case 27:
                this.activeMenu && f.stopPropagation(n);
                this.closeMenuRequested = !0;
                this.focusOnLastButton();
                break;
              case 9:
                this.focusedMenuItemIndex += n.shiftKey ? -1 : 1;
                this.focusOnNextButton(n);
            }
          }
        }),
        (n.prototype.focusOnLastButton = function () {
          var i, t;
          if (!!this.activeMenu) {
            for (i = 0; i < this.reactiveControls.length; i++)
              if (
                ((t = this.reactiveControls[i].button),
                !this.activeMenuButton ||
                  this.activeMenuButton.getAttribute("data-menu-id") !==
                    t.getAttribute("data-menu-id"))
              ) {
                if (this.activeMenu.id === t.getAttribute("data-menu-id")) {
                  this.hideAllMenus();
                  t.getAttribute(n.ariaHidden) !== "true"
                    ? (this.setFocus(t), f.removeClass(t, "x-hidden-focus"))
                    : this.setFocus(this.optionsButton);
                  return;
                }
              } else {
                this.hideAllMenus();
                this.setFocus(t);
                f.removeClass(t, "x-hidden-focus");
                return;
              }
            !this.activeMenu ||
              (this.hideAllMenus(), this.setFocus(this.optionsButton));
          }
        }),
        (n.prototype.focusOnNextButton = function (t) {
          var r, i;
          if (!!this.activeMenu && !!this.activeMenuButton)
            if (
              ((r = f.selectElements(".active", this.activeMenu)),
              this.focusedMenuItemIndex >= r.length)
            ) {
              for (
                f.stopPropagation(t),
                  f.preventDefault(t),
                  i = this.activeMenuButton.nextElementSibling;
                !!i;
  
              ) {
                if (
                  i.nodeName.toLowerCase() === "button" &&
                  i.getAttribute(n.ariaHidden) !== "true"
                ) {
                  this.setFocus(i);
                  break;
                }
                i = i.nextElementSibling;
              }
              i || this.setFocus(this.playButton);
              this.hideAllMenus();
            } else
              this.focusedMenuItemIndex < 0 &&
                (f.stopPropagation(t),
                f.preventDefault(t),
                this.setFocus(this.activeMenuButton),
                this.hideAllMenus());
        }),
        (n.prototype.calcHeight = function (n) {
          if (!n || !this.videoControls) return 0;
          var t = f.getClientRect(n).height,
            r = f.getClientRect(this.videoControls.parentElement),
            u = f.getClientRect(this.videoControls),
            i = r.height - u.height - 10;
          return t > i && (t = i), t;
        }),
        (n.prototype.createMenu = function (n) {
          var h, u, c, t, i, a, l;
          if (
            this.menuContainer &&
            n &&
            n.category &&
            n.id &&
            n.items &&
            n.items.length
          ) {
            var f = "",
              r = n.items.length,
              s = 1;
            for (
              n.label &&
                this.localizationHelper &&
                !n.hideBackButton &&
                ((h = o.format(
                  this.localizationHelper.getLocalizedValue(
                    e.playerLocKeys.previous_menu_aria_label
                  ),
                  n.label
                )),
                (r += 1),
                (f +=
                  n.cssClass === "closed-caption"
                    ? "<li role='presentation'>\n    <button class='c-action-trigger c-glyph glyph-chevron-left active closed-caption' data-next-menu='back'\n    aria-label='" +
                      h +
                      "'aria-setsize='" +
                      r +
                      "' aria-posinset='" +
                      s++ +
                      "' role='menuitem'>\n    " +
                      n.label +
                      "</button>\n</li>"
                    : "<li role='presentation'>\n    <button class='c-action-trigger c-glyph glyph-chevron-left active' data-next-menu='back' aria-label='" +
                      h +
                      "'\n    aria-setsize='" +
                      r +
                      "' aria-posinset='" +
                      s++ +
                      "' role='menuitem'>\n    " +
                      n.label +
                      "</button>\n</li>")),
                u = 0,
                c = n.items;
              u < c.length;
              u++
            )
              (t = c[u]),
                t.subMenu &&
                  ((t.subMenuId = t.subMenu.id), this.createMenu(t.subMenu)),
                (i = "c-action-trigger active"),
                (i += t.subMenuId || t.glyph || t.selectable ? " c-glyph" : ""),
                (i += t.selectable && t.selected ? " glyph-check-mark" : ""),
                (i += t.subMenuId ? " glyph-chevron-right" : ""),
                (i += t.glyph ? " " + t.glyph : ""),
                (f +=
                  "<li id='" +
                  t.id +
                  "' role='presentation'>\n    <button class='" +
                  i +
                  "' " +
                  (t.data ? "data-info='" + t.data + "'" : "") +
                  "\n        role=" +
                  (t.selectable ? "'menuitemradio'" : "'menuitem'") +
                  "\n        aria-setsize='" +
                  r +
                  "' aria-posinset='" +
                  s++ +
                  "'\n        " +
                  (t.selectable && t.selected ? " aria-checked='true'" : "") +
                  " \n        " +
                  (t.selectable ? "data-video-selectable='true'" : "") +
                  "\n        " +
                  (t.subMenuId
                    ? "data-next-menu=" +
                      t.subMenuId +
                      " aria-expanded='false' aria-haspopup='true'"
                    : "") +
                  "\n        " +
                  (t.persistOnClick ? "data-persist='true'" : "") +
                  " " +
                  (t.ariaLabel ? "aria-label='" + t.ariaLabel + "'" : "") +
                  "\n        " +
                  (t.language ? "lang=" + t.language : "") +
                  ">\n            " +
                  (t.image
                    ? "<img src='" +
                      t.image +
                      "' alt='" +
                      (t.imageAlt || "") +
                      "' class='c-image'/>"
                    : "") +
                  "\n            " +
                  t.label +
                  "\n    </button>\n</li>");
            a =
              "<div id='" +
              n.id +
              "' class='f-player-menu' aria-hidden='true' data-category='" +
              n.category +
              "'>\n    <ul role='menu' class='c-list f-bare'>\n        " +
              f +
              "\n    </ul>\n</div>";
            l = document.createElement("div");
            l.innerHTML = a;
            this.menuContainer.appendChild(l.firstChild);
          }
        }),
        (n.prototype.showMenu = function (n, t, i) {
          var r, e, u;
          if (
            n &&
            (!i || (this.activeMenuButton = i),
            this.hideControls(),
            (this.focusedMenuItemIndex = 0),
            this.hideActiveMenu(),
            this.menuContainer.setAttribute("aria-hidden", "false"),
            (r = f.selectFirstElement("#" + n, this.menuContainer)),
            this.resetMenuPosition(r, i),
            r)
          ) {
            e = f.css(r, "height");
            this.showElement(r);
            u = this.calcHeight(r);
            e === "auto" && (u += 2);
            f.css(r, "height", u + "px");
            f.css(r, "right", this.menuRight);
            this.activeMenu = r;
            this.onlyOneDialog(r);
            t = !0;
            t &&
              this.setFocus(
                f.selectFirstElement("li:not([aria-hidden = true]) button", r)
              );
          }
        }),
        (n.prototype.setFocusonPlayButton = function () {
          this.playButton.blur();
          this.setFocus(this.playButton);
        }),
        (n.prototype.setFocusonOptionsButton = function () {
          this.setFocus(this.optionsButton);
        }),
        (n.prototype.setFocus = function (n) {
          !n ||
            setTimeout(function () {
              n.focus();
            }, 0);
        }),
        (n.prototype.hideActiveMenu = function () {
          this.activeMenu &&
            (this.hideElement(this.activeMenu), (this.activeMenu = null));
        }),
        (n.prototype.pushToMenuBackStack = function (n) {
          this.menuBackStack && n && this.menuBackStack.push(n);
        }),
        (n.prototype.popFromMenuBackStack = function () {
          return this.menuBackStack && this.menuBackStack.length
            ? this.menuBackStack.pop()
            : null;
        }),
        (n.prototype.clearMenuBackStack = function () {
          this.menuBackStack = [];
        }),
        (n.prototype.setupPlayerMenus = function (n) {
          var r, i, u, t, f, e;
          if (this.videoControls && n && n.length) {
            for (
              this.disposePlayerMenus(), r = [], i = 0, u = n;
              i < u.length;
              i++
            )
              (t = u[i]),
                r.push({
                  id: t.id + "_item",
                  label: t.label,
                  subMenu: t,
                }),
                !t.glyph ||
                  !t.priority ||
                  this.createReactiveButton(
                    t.glyph,
                    t.priority,
                    t.id,
                    t.label,
                    t.cssClass !== undefined ? t.cssClass : ""
                  );
            f = this.videoPlayer.getPlayerId() + "-options-menu";
            e = {
              id: f,
              items: r,
              category: "options",
            };
            this.createMenu(e);
            this.optionsButton.setAttribute("data-menu-id", f);
            this.initializePlayerMenus();
            this.updateReactiveControlDisplay();
          }
        }),
        (n.prototype.updateMenuSelection = function (n, t) {
          var u, s, r, e, o, i;
          if (
            n &&
            this.menuContainer &&
            ((u = f.selectFirstElement("#" + n, this.menuContainer)), u)
          )
            for (s = f.selectElements("li", u), r = 0, e = s; r < e.length; r++)
              (o = e[r]),
                (i = f.selectFirstElement("button", o)),
                i &&
                  i.getAttribute("data-video-selectable") &&
                  (t && t === o.id
                    ? (f.addClasses(i, ["c-glyph", "glyph-check-mark"]),
                      i.setAttribute("aria-checked", "true"))
                    : (f.removeClass(i, "glyph-check-mark"),
                      i.removeAttribute("aria-checked")));
        }),
        (n.prototype.resetSlidersWorkaround = function () {
          var i = this.videoControls.getBoundingClientRect(),
            t,
            r;
          (this.controlsBounds &&
            this.controlsBounds.height === i.height &&
            this.controlsBounds.width === i.width) ||
            ((this.controlsBounds = i),
            this.progressSlider &&
              this.videoPlayer &&
              ((t = this.videoPlayer.getPlayPosition()),
              (r = t.endTime - t.startTime),
              this.progressSlider.resetSlider(
                0,
                r,
                t.currentTime - t.startTime,
                n.seekSteps
              )),
            this.volumeSlider &&
              this.videoPlayer &&
              this.volumeSlider.resetSlider(
                0,
                100,
                this.videoPlayer.getVolume() * 100,
                n.volumeSteps
              ));
        }),
        (n.selector = ".f-video-controls"),
        (n.ariaHidden = "aria-hidden"),
        (n.ariaLabel = "aria-label"),
        (n.menuSelector = ".f-player-menu"),
        (n.seekSteps = 5),
        (n.volumeSteps = 5),
        (n.volumeAutoHideTimeout = 2e3),
        n
      );
    })();
    t.VideoControls = h;
  });
  define("player-config", [
    "require",
    "exports",
    "player-data-interfaces",
  ], function (n, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var r = (function () {
      function n() {}
      return (
        (n.resourcesUrl = "{0}/videoplayer/lib/localization/{1}.json"),
        (n.resourceHost = "%playerResourceHost%"),
        (n.disableReporting = "%disablePlayerTelemetryReporting%"),
        (n.resourceHash = "%playerResourceHash%"),
        (n.defaultResourceHost = "https://www.microsoft.com"),
        (n.ampUrl = "//amp.azure.net/libs/amp/1.8.0/azuremediaplayer.min.js"),
        (n.ampVersion2Url =
          "//amp.azure.net/libs/amp/2.3.9/azuremediaplayer.min.js"),
        (n.hasPlayerUrl =
          "url(//www.microsoft.com/videoplayer/lib/onerfstatics/sc/76/42277f.js)"),
        (n.hlsPlayerUrl =
          "url(//www.microsoft.com/videoplayer/lib/onerfstatics/sc/5b/8d47f5.js)"),
        (n.shimServiceProdUrl =
          "//prod-video-cms-rt-microsoft-com.akamaized.net/vhs/api/videos/{0}"),
        (n.shimServiceIntUrl =
          "//int-video-cms-rt-microsoft-com.akamaized.net/vhs/api/videos/{0}"),
        (n.adSdkUrl = "//msadsdk.blob.core.windows.net/core/1/latest.min.js"),
        (n.eventCheckpointInterval = 2e4),
        (n.firstByteTimeoutVideoMobile = 15e3),
        (n.firstByteTimeoutVideoDesktop = 1e4),
        (n.defaultVolume = 0.8),
        (n.checkpoints = [25, 50, 75, 95]),
        (n.playbackRates = [2, 1.5, 1.25, 1, 0.75, 0.5]),
        (n.defaultPlaybackRate = 1),
        (n.defaultQualityMobile = i.MediaQuality.SD),
        (n.defaultQualityTV = i.MediaQuality.SD),
        (n.defaultQualityDesktop = i.MediaQuality.HQ),
        (n.defaultAspectRatio = 16 / 9),
        (n.defaultInViewWidthFraction = 0.5),
        (n.defaultInViewHeightFraction = 0.5),
        n
      );
    })();
    t.PlayerConfig = r;
  });
  define("player-data-interfaces", ["require", "exports"], function (n, t) {
    "use strict";
    var i, r, u, f, e;
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (function (n) {
        n[(n.MP4 = "MP4")] = "MP4";
        n[(n.DASH = "DASH")] = "DASH";
        n[(n.SMOOTH = "SMOOTH")] = "SMOOTH";
        n[(n.HLS = "HLS")] = "HLS";
      })((i = t.MediaTypes || (t.MediaTypes = {}))),
      (function (n) {
        n[(n.VTT = "VTT")] = "VTT";
        n[(n.TTML = "TTML")] = "TTML";
      })((r = t.ClosedCaptionTypes || (t.ClosedCaptionTypes = {}))),
      (function (n) {
        n[(n.HD = "HD")] = "HD";
        n[(n.HQ = "HQ")] = "HQ";
        n[(n.SD = "SD")] = "SD";
        n[(n.LO = "LO")] = "LO";
      })((u = t.MediaQuality || (t.MediaQuality = {}))),
      (function (n) {
        n[(n.transcript = "transcript")] = "transcript";
        n[(n.audio = "audio")] = "audio";
        n[(n.video = "video")] = "video";
        n[(n.videoWithCC = "videoWithCC")] = "videoWithCC";
      })((f = t.DownloadableMediaTypes || (t.DownloadableMediaTypes = {}))),
      (function (n) {
        n[(n.BufferingFirstByteTimeout = 2e3)] = "BufferingFirstByteTimeout";
        n[(n.MediaErrorAborted = 2100)] = "MediaErrorAborted";
        n[(n.MediaErrorNetwork = 2101)] = "MediaErrorNetwork";
        n[(n.MediaErrorDecode = 2102)] = "MediaErrorDecode";
        n[(n.MediaErrorSourceNotSupported = 2103)] =
          "MediaErrorSourceNotSupported";
        n[(n.MediaErrorUnknown = 2104)] = "MediaErrorUnknown";
        n[(n.MediaSelectionNoMedia = 2200)] = "MediaSelectionNoMedia";
        n[(n.AmpEncryptError = 2405)] = "AmpEncryptError";
        n[(n.AmpPlayerMismatch = 2406)] = "AmpPlayerMismatch";
      })((e = t.VideoErrorCodes || (t.VideoErrorCodes = {})));
  });
  define("player-options", [
    "require",
    "exports",
    "utility",
    "environment",
    "player-constants",
    "player-config",
  ], function (n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var e = (function () {
      function n(n) {
        this.autoload = !0;
        this.autoplay = !1;
        this.startTime = 0;
        this.mute = !1;
        this.loop = !1;
        this.controls = !0;
        this.lazyLoad = !0;
        this.trigger = !0;
        this.theme = "light";
        this.maskLevel = "40";
        this.useHLS = !0;
        this.useAdaptive = !0;
        this.debug = !1;
        this.reporting = {
          enabled: f.PlayerConfig.disableReporting.toLowerCase() !== "true",
          jsll: !0,
          aria: !1,
          wedcs: !1,
        };
        this.playbackSpeed = !0;
        this.interactivity = !0;
        this.share = !0;
        this.shareOptions = [
          u.shareTypes.facebook,
          u.shareTypes.twitter,
          u.shareTypes.linkedin,
          u.shareTypes.skype,
          u.shareTypes.mail,
          u.shareTypes.copy,
        ];
        this.download = !0;
        this.playFullScreen = !1;
        this.hidePosterFrame = !1;
        this.shimServiceEnv = "prod";
        this.corePlayer = "html5";
        this.autoCaptions = null;
        this.flexSize = !1;
        this.aspectRatio = f.PlayerConfig.defaultAspectRatio;
        this.ageGate = !0;
        this.jsllPostMessage = !0;
        this.userMinimumAge = 0;
        this.playPauseTrigger = !1;
        this.showEndImage = !1;
        this.showImageForVideoError = !1;
        this.inviewPlay = !1;
        this.inviewThreshold = null;
        this.timeRemainingCheckpoint = null;
        this.adsEnabled = !1;
        this.inViewWidthFraction = f.PlayerConfig.defaultInViewWidthFraction;
        this.inViewHeightFraction = f.PlayerConfig.defaultInViewHeightFraction;
        this.controlPanelTimeout = null;
        this.showControlOnLoad = !0;
        this.useAMPVersion2 = !0;
        i.extend(this, n);
        r.Environment.isMobile
          ? (this.autoplay = !1)
          : n &&
            n.autoPlay !== undefined &&
            (this.autoplay = !!n && !!n.autoPlay);
        n && n.autoLoad !== undefined && (this.autoload = !!n && !!n.autoLoad);
        this.autoplay &&
          ((this.playFullScreen = !1),
          !this.mute && r.Environment.isSafari && (this.mute = !0));
        r.Environment.isIPhone && (this.trigger = !1);
        (r.Environment.isOfficeCLView() || r.Environment.isIProduct) &&
          (this.useAdaptive = !1);
        n && n.shareOptions && (this.shareOptions = n.shareOptions);
        (!this.aspectRatio ||
          !i.isNumber(this.aspectRatio) ||
          this.aspectRatio <= 0) &&
          (this.aspectRatio = f.PlayerConfig.defaultAspectRatio);
        (!this.inViewWidthFraction ||
          !i.isNumber(this.inViewWidthFraction) ||
          this.inViewWidthFraction > 1) &&
          (this.inViewWidthFraction = f.PlayerConfig.defaultInViewWidthFraction);
        (!this.inViewHeightFraction ||
          !i.isNumber(this.inViewHeightFraction) ||
          this.inViewHeightFraction > 1) &&
          (this.inViewHeightFraction =
            f.PlayerConfig.defaultInViewHeightFraction);
      }
      return n;
    })();
    t.PlayerOptions = e;
  });
  define("video-shim-data-fetcher", [
    "require",
    "exports",
    "player-data-interfaces",
    "player-utility",
    "player-config",
    "stringExtensions",
  ], function (n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var e = (function () {
      function n(n, t) {
        this.serviceEnv = n;
        this.serviceUrl = t;
      }
      return (
        (n.prototype.getMetadata = function (n, t, i) {
          var u = this,
            f = this.getServiceUrl(n);
          r.PlayerUtility.ajax(
            f,
            function (r) {
              var f, e;
              if (r && r.length) {
                f = null;
                try {
                  f = JSON.parse(r);
                } catch (o) {
                  i && i();
                  return;
                }
                e = u.mapToVideoMetadata(n, f);
                t && t(e);
              } else i && i();
            },
            function () {
              i && i();
            }
          );
        }),
        (n.prototype.getServiceUrl = function (n) {
          return (
            this.serviceUrl ||
              (this.serviceUrl =
                this.serviceEnv === "prod"
                  ? u.PlayerConfig.shimServiceProdUrl
                  : u.PlayerConfig.shimServiceIntUrl),
            f.format(this.serviceUrl, n)
          );
        }),
        (n.prototype.mapToVideoMetadata = function (n, t) {
          var r, l, u, f, o, a, s, h, v, c, y, e;
          if (!n || !t) return null;
          if (
            ((r = {
              videoId: n,
            }),
            t.snippet &&
              ((r.title = t.snippet.title),
              (r.description = t.snippet.description),
              (r.interactiveTriggersEnabled =
                t.snippet.interactiveTriggersEnabled),
              (r.interactiveTriggersUrl = t.snippet.interactiveTriggersUrl),
              (r.minimumAge = t.snippet.minimumAge),
              t.snippet.thumbnails &&
                (r.posterframeUrl = this.removeProtocolFromUrl(
                  t.snippet.thumbnails.medium.url
                ))),
            t.captions)
          ) {
            r.ccFiles = [];
            l = "&vtt=true";
            for (u in t.captions)
              t.captions.hasOwnProperty(u) &&
                (t.captions[u].url.indexOf("?") < 0 && (l = "?vtt=true"),
                r.ccFiles.push({
                  locale: u,
                  url: this.removeProtocolFromUrl(t.captions[u].url),
                  ccType: i.ClosedCaptionTypes.TTML,
                }),
                r.ccFiles.push({
                  locale: u,
                  url: this.removeProtocolFromUrl(t.captions[u].url) + l,
                  ccType: i.ClosedCaptionTypes.VTT,
                }));
          }
          if (t.streams) {
            r.videoFiles = [];
            for (f in t.streams)
              if (t.streams.hasOwnProperty(f)) {
                if (f === "1001") continue;
                o = t.streams[f];
                a = this.getMediaTypeAndQuality(f);
                r.videoFiles.push({
                  height: o.heightPixels,
                  width: o.widthPixels,
                  url: this.removeProtocolFromUrl(o.url),
                  quality: a.quality,
                  mediaType: a.mediaType,
                });
              }
          }
          if (((r.downloadableFiles = []), t.transcripts))
            for (s in t.transcripts)
              t.transcripts.hasOwnProperty(s) &&
                r.downloadableFiles.push({
                  locale: s,
                  url: this.removeProtocolFromUrl(t.transcripts[s].url),
                  mediaType: i.DownloadableMediaTypes.transcript,
                });
          if (r.videoFiles) {
            for (h = void 0, v = 0, c = 0, y = r.videoFiles; c < y.length; c++)
              (e = y[c]),
                e.mediaType === i.MediaTypes.MP4 &&
                  e.width >= v &&
                  ((h = e), (v = e.width));
            h &&
              r.downloadableFiles.push({
                locale: t.snippet.culture,
                url: this.removeProtocolFromUrl(h.url),
                mediaType: i.DownloadableMediaTypes.video,
              });
          }
          return r;
        }),
        (n.prototype.removeProtocolFromUrl = function (n) {
          return n ? n.replace(/(^\w+:|^)\/\//, "//") : n;
        }),
        (n.prototype.getMediaTypeAndQuality = function (n) {
          var t = i.MediaTypes.MP4,
            r = null;
          switch (n.toLowerCase()) {
            case "h.264_320_180_400kbps":
              t = i.MediaTypes.MP4;
              r = i.MediaQuality.LO;
              break;
            case "h.264_640_360_1000kbps":
              t = i.MediaTypes.MP4;
              r = i.MediaQuality.SD;
              break;
            case "h.264_960_540_2250kbps":
              t = i.MediaTypes.MP4;
              r = i.MediaQuality.HQ;
              break;
            case "h.264_1280_720_3400kbps":
              t = i.MediaTypes.MP4;
              r = i.MediaQuality.HD;
              break;
            case "apple_http_live_streaming":
              t = i.MediaTypes.HLS;
              break;
            case "smooth_streaming":
              t = i.MediaTypes.SMOOTH;
              break;
            case "mpeg_dash":
              t = i.MediaTypes.DASH;
          }
          return {
            mediaType: t,
            quality: r,
          };
        }),
        (n.prototype.isUuid = function (n) {
          return /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/gi.test(
            n
          );
        }),
        n
      );
    })();
    t.VideoShimDataFetcher = e;
  });
  define("age-gate-helper", [
    "require",
    "exports",
    "utility",
    "htmlExtensions",
    "selectMenu",
    "componentFactory",
    "environment",
    "localization-helper",
  ], function (n, t, i, r, u, f, e, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var s = (function () {
      function n(n, t, i, u) {
        var f = this;
        this.playerContainer = n;
        this.corePlayer = t;
        this.localizationHelper = i;
        this.onCompleteCallback = u;
        this.ageGateData = {};
        this.contentMinimumAge = 0;
        this.isUserOldEnough = !1;
        this.didUserClickSubmit = !1;
        this.ageGateIsDisplayed = !1;
        this.onAgeGateButtonClick = function (n) {
          var u, v;
          if ((r.preventDefault(n), (u = r.getEventTargetOrSrcElement(n)), u)) {
            var o = r.selectFirstElement(
                ".month-button",
                f.ageGateDialogue.monthSelectMenu
              ),
              s = r.selectFirstElement(
                ".day-button",
                f.ageGateDialogue.daySelectMenu
              ),
              h = r.selectFirstElement(
                ".year-button",
                f.ageGateDialogue.yearSelectMenu
              );
            if (o && s && h) {
              var i = Number(r.getText(o)),
                c = Number(r.getText(s)),
                l = Number(r.getText(h));
              if (i && c && l) {
                f.didUserClickSubmit = !0;
                var t = new Date(),
                  a = t.getFullYear() - l,
                  y = t.getMonth() + 1 < i,
                  p = t.getMonth() + 1 === i && t.getDate() < c;
                (y || p) && a--;
                f.addAgeGateVerifiedToUserSession(a + "");
                f.playerData.options.lazyLoad = !1;
                f.isUserOldEnoughToViewContent(f.contentMinimumAge)
                  ? ((f.isUserOldEnough = !0),
                    f.onCompleteCallback && f.onCompleteCallback())
                  : f.onCompleteCallback && f.onCompleteCallback();
                f.ageGateDialogue.container.setAttribute("aria-hidden", "true");
                f.ageGateIsDisplayed = !1;
                !e.Environment.isIProduct ||
                  ((v = r.selectFirstElement("video", f.playerContainer)),
                  (v.style.visibility = ""),
                  (f.playerContainer.style.backgroundColor = ""));
              }
            }
          }
        };
      }
      return (
        (n.prototype.verifyAgeGate = function () {
          if (
            ((this.playerData = this.corePlayer.getPlayerData()),
            (this.contentMinimumAge = this.playerData.metadata.minimumAge
              ? this.playerData.metadata.minimumAge
              : 0),
            this.contentMinimumAge <= 0 || !this.playerData.options.ageGate)
          )
            return (
              (this.isUserOldEnough = !0),
              this.onCompleteCallback && this.onCompleteCallback(),
              !1
            );
          if (
            (this.addUserAgeFromExternalLogin(), this.isUserAgeAlreadyVerified())
          )
            this.isUserOldEnoughToViewContent(this.contentMinimumAge)
              ? ((this.isUserOldEnough = !0),
                this.onCompleteCallback && this.onCompleteCallback())
              : this.onCompleteCallback && this.onCompleteCallback();
          else return this.displayAgeGateDialogue(), !0;
          return !1;
        }),
        (n.prototype.didUserSubmitAge = function () {
          return this.didUserClickSubmit;
        }),
        (n.prototype.resetAgeGateSubmit = function () {
          this.didUserClickSubmit = !1;
        }),
        (n.prototype.doesUserPassAgeGate = function () {
          return this.isUserOldEnough;
        }),
        (n.prototype.addUserAgeFromExternalLogin = function () {
          var r = i.getCookie(n.xboxDotComAgeGateCookieName),
            t;
          Number(r)
            ? i.saveToSessionStorage(n.ageGateSessionStorageKey, r)
            : ((t = this.playerData.options.userMinimumAge),
              t > 0 &&
                i.saveToSessionStorage(n.ageGateSessionStorageKey, t + ""));
        }),
        (n.prototype.addAgeGateVerifiedToUserSession = function (t) {
          i.saveToSessionStorage(n.ageGateSessionStorageKey, t);
        }),
        (n.prototype.isUserAgeAlreadyVerified = function () {
          return !!i.getValueFromSessionStorage(n.ageGateSessionStorageKey);
        }),
        (n.prototype.isUserOldEnoughToViewContent = function (t) {
          var r = Number(
            i.getValueFromSessionStorage(n.ageGateSessionStorageKey)
          );
          return r >= t ? !0 : !1;
        }),
        (n.prototype.displayAgeGateDialogue = function () {
          if (
            ((this.ageGateIsDisplayed = !0),
            this.getLocalizedAgeGateStrings(),
            this.ageGateDialogue ||
              (this.setDefaultSelectMenuContainer(),
              this.createAgeGateContainer()),
            this.populateDateDropDowns(),
            !!e.Environment.isIProduct)
          ) {
            var n = r.selectFirstElement("video", this.playerContainer);
            n.style.visibility = "hidden";
            this.playerContainer.style.backgroundColor = "black";
          }
        }),
        (n.prototype.setDefaultSelectMenuContainer = function () {
          this.defaultDateSelectMenuContainer =
            '<div class="select-menu-month c-select-menu f-border f-persist">\n        <button href="#" aria-expanded="false" class="month-button" aria-label="' +
            this.ageGateData.monthLabel +
            '">\n        ' +
            this.ageGateData.monthLabel +
            '\n        </button>\n        <ul role="menu" class="c-menu f-scroll" aria-hidden="true">\n        </ul>\n    </div>\n    <div class="select-menu-day c-select-menu f-border f-persist">\n        <button href="#" aria-expanded="false" class="day-button" aria-label="' +
            this.ageGateData.dayLabel +
            '">\n        ' +
            this.ageGateData.dayLabel +
            '\n        </button>\n        <ul role="menu" class="c-menu f-scroll" aria-hidden="true">\n        </ul>\n    </div>\n    <div class="select-menu-year c-select-menu f-border f-persist">\n        <button href="#" aria-expanded="false" class="year-button" aria-label="' +
            this.ageGateData.yearLabel +
            '">\n        ' +
            this.ageGateData.yearLabel +
            '\n        </button>\n        <ul role="menu" class="c-menu f-scroll" aria-hidden="true">\n        </ul>\n    </div>';
        }),
        (n.prototype.getLocalizedAgeGateStrings = function () {
          this.ageGateData.buttonText = this.localizationHelper.getLocalizedValue(
            o.playerLocKeys.agegate_submit
          );
          this.ageGateData.heading = this.localizationHelper.getLocalizedValue(
            o.playerLocKeys.agegate_enterdate
          );
          this.ageGateData.dropDownAriaLabel =
            this.localizationHelper.getLocalizedValue(
              o.playerLocKeys.agegate_enterdate_arialabel
            );
          this.ageGateData.monthLabel = this.localizationHelper.getLocalizedValue(
            o.playerLocKeys.agegate_month
          );
          this.ageGateData.dayLabel = this.localizationHelper.getLocalizedValue(
            o.playerLocKeys.agegate_day
          );
          this.ageGateData.yearLabel = this.localizationHelper.getLocalizedValue(
            o.playerLocKeys.agegate_year
          );
          this.ageGateData.monthDayYearOrder =
            this.localizationHelper.getLocalizedValue(
              o.playerLocKeys.agegate_dateorder
            );
          this.ageGateData.monthAriaLabel =
            this.ageGateData.dropDownAriaLabel.replace(
              "{0}",
              this.ageGateData.monthLabel
            );
          this.ageGateData.dayAriaLabel =
            this.ageGateData.dropDownAriaLabel.replace(
              "{0}",
              this.ageGateData.dayLabel
            );
          this.ageGateData.yearAriaLabel =
            this.ageGateData.dropDownAriaLabel.replace(
              "{0}",
              this.ageGateData.yearLabel
            );
        }),
        (n.prototype.setSelectMenuMonthDayYearOrder = function () {
          var n;
          try {
            var t = "",
              i = this.ageGateData.monthDayYearOrder
                .toLowerCase()
                .split(new RegExp("\\/|\\.|\\. |\\-"), 3),
              r = !0;
            for (n = 0; n < i.length; n++)
              i[n].indexOf("m") > -1
                ? (t +=
                    '<div class="select-menu-month c-select-menu f-border f-persist">\n                    <button href="#" aria-expanded="false" class="month-button" aria-label="' +
                    this.ageGateData.monthAriaLabel +
                    '">\n                    ' +
                    this.ageGateData.monthLabel +
                    '\n                    </button>\n                    <ul role="menu" class="c-menu f-scroll" aria-hidden="true">\n                    </ul>\n                </div>')
                : i[n].indexOf("d") > -1
                ? (t +=
                    '<div class="select-menu-day c-select-menu f-border f-persist">\n                    <button href="#" aria-expanded="false" class="day-button" aria-label="' +
                    this.ageGateData.dayAriaLabel +
                    '">\n                    ' +
                    this.ageGateData.dayLabel +
                    '\n                    </button>\n                    <ul role="menu" class="c-menu f-scroll" aria-hidden="true">\n                    </ul>\n                </div>')
                : i[n].indexOf("y") > -1
                ? (t +=
                    '<div class="select-menu-year c-select-menu f-border f-persist">\n                    <button href="#" aria-expanded="false" class="year-button" aria-label="' +
                    this.ageGateData.yearAriaLabel +
                    '">\n                    ' +
                    this.ageGateData.yearLabel +
                    '\n                    </button>\n                    <ul role="menu" class="c-menu f-scroll" aria-hidden="true">\n                    </ul>\n                </div>')
                : (r = !1);
            return r ? t : this.defaultDateSelectMenuContainer;
          } catch (u) {
            return this.defaultDateSelectMenuContainer;
          }
        }),
        (n.prototype.createAgeGateContainer = function () {
          var t = this,
            s = this.setSelectMenuMonthDayYearOrder(),
            h =
              '\n<div class="theme-dark c-update-dark-theme">\n    <div class="">\n        <h3 aria-hidden="true" class="c-heading-3 c-font-weight-override">' +
              this.ageGateData.heading +
              "</h3>\n        <fieldset>" +
              s +
              ('<button name="button" class="c-button" type="submit" disabled>' +
                this.ageGateData.buttonText +
                "</button>\n        </fieldset>\n    </div>\n</div>\n"),
            i = document.createElement("div"),
            e;
          i.innerHTML = h;
          r.addClass(i, "f-age-gate-dialogue");
          e = r.selectFirstElement(".f-video-cc-overlay", this.playerContainer);
          this.playerContainer.insertBefore(i, e);
          this.ageGateDialogue = {};
          this.ageGateDialogue.container = document.createElement("div");
          this.ageGateDialogue.container = r.selectFirstElement(
            ".f-age-gate-dialogue",
            this.playerContainer
          );
          this.ageGateDialogue.button = r.selectFirstElement(
            ".c-button",
            this.ageGateDialogue.container
          );
          r.addEvent(
            this.ageGateDialogue.button,
            r.eventTypes.click,
            this.onAgeGateButtonClick
          );
          this.ageGateDialogue.button.setAttribute(
            n.ariaLabel,
            this.localizationHelper.getLocalizedValue(
              o.playerLocKeys.agegate_submit
            )
          );
          this.ageGateDialogue.monthSelectMenu = r.selectFirstElement(
            ".select-menu-month",
            this.ageGateDialogue.container
          );
          this.ageGateDialogue.daySelectMenu = r.selectFirstElement(
            ".select-menu-day",
            this.ageGateDialogue.container
          );
          this.ageGateDialogue.yearSelectMenu = r.selectFirstElement(
            ".select-menu-year",
            this.ageGateDialogue.container
          );
          this.ageGateDialogue.monthSelectMenuList = r.selectFirstElement(
            ".c-menu",
            this.ageGateDialogue.monthSelectMenu
          );
          this.ageGateDialogue.daySelectMenuList = r.selectFirstElement(
            ".c-menu",
            this.ageGateDialogue.daySelectMenu
          );
          this.ageGateDialogue.yearSelectMenuList = r.selectFirstElement(
            ".c-menu",
            this.ageGateDialogue.yearSelectMenu
          );
          f.ComponentFactory.create([
            {
              component: u.SelectMenu,
              eventToBind: "DOMContentLoaded",
              elements: [
                this.ageGateDialogue.monthSelectMenu,
                this.ageGateDialogue.daySelectMenu,
                this.ageGateDialogue.yearSelectMenu,
              ],
              callback: function (n) {
                (!n && !n.length) ||
                  ((t.selectMenuMonth = n[0]),
                  (t.selectMenuDay = n[1]),
                  (t.selectMenuYear = n[2]),
                  t.selectMenuDay.subscribe({
                    onSelectionChanged: function (n) {
                      return t.onMonthDayYearDropDownSelect(n);
                    },
                  }),
                  t.selectMenuMonth.subscribe({
                    onSelectionChanged: function (n) {
                      return t.onMonthDayYearDropDownSelect(n);
                    },
                  }),
                  t.selectMenuYear.subscribe({
                    onSelectionChanged: function (n) {
                      return t.onMonthDayYearDropDownSelect(n);
                    },
                  }));
              },
            },
          ]);
        }),
        (n.prototype.populateDateDropDowns = function () {
          var i, u, t, r;
          if (!!this.ageGateDialogue.monthSelectMenuList)
            for (i = void 0, i = 1; i <= 12; i++)
              (t = this.createListItem("month-", i)),
                (r =
                  '<a role="menuitem" href="#" aria-selected="false" tabindex="-1">' +
                  (i + "") +
                  "</a>"),
                (t.innerHTML = r),
                this.ageGateDialogue.monthSelectMenuList.appendChild(t);
          if (!!this.ageGateDialogue.daySelectMenuList)
            for (u = void 0, u = 1; u <= 31; u++)
              (t = this.createListItem("day-", u)),
                (r =
                  '<a role="menuitem" href="#" aria-selected="false" tabindex="-1">' +
                  (u + "") +
                  "</a>"),
                (t.innerHTML = r),
                this.ageGateDialogue.daySelectMenuList.appendChild(t);
          if (!!this.ageGateDialogue.yearSelectMenuList)
            for (
              var e = new Date().getFullYear(),
                o = e - n.numberOfSelectableYears,
                f = void 0,
                f = e;
              f >= o;
              f--
            )
              (t = this.createListItem("year-", f)),
                (r =
                  '<a role="menuitem" href="#" aria-selected="false" tabindex="-1">' +
                  (f + "") +
                  "</a>"),
                (t.innerHTML = r),
                this.ageGateDialogue.yearSelectMenuList.appendChild(t);
        }),
        (n.prototype.createListItem = function (n, t) {
          var i = document.createElement("li");
          return (
            (i.id = n + t),
            r.addClass(i, "c-menu-item"),
            i.setAttribute("role", "presentation"),
            i
          );
        }),
        (n.prototype.onMonthDayYearDropDownSelect = function (n) {
          var h, f, c;
          if (n) {
            var e = r.selectFirstElement(
                ".month-button",
                this.ageGateDialogue.monthSelectMenu
              ),
              o = r.selectFirstElement(
                ".day-button",
                this.ageGateDialogue.daySelectMenu
              ),
              s = r.selectFirstElement(
                ".year-button",
                this.ageGateDialogue.yearSelectMenu
              );
            if (e && o && s) {
              var t = Number(r.getText(e)),
                i = Number(r.getText(o)),
                u = Number(r.getText(s));
              for (
                t &&
                  e.setAttribute(
                    "aria-label",
                    t + " " + this.ageGateData.monthLabel
                  ),
                  i &&
                    o.setAttribute(
                      "aria-label",
                      i + " " + this.ageGateData.dayLabel
                    ),
                  u &&
                    s.setAttribute(
                      "aria-label",
                      u + " " + this.ageGateData.yearLabel
                    ),
                  t &&
                    i &&
                    u &&
                    this.ageGateDialogue.button.removeAttribute("disabled"),
                  i = i ? i : 1,
                  t = t ? t : 1,
                  u = u ? u : new Date().getFullYear(),
                  h = new Date(u, t, 0).getDate(),
                  f = void 0,
                  f = 28;
                31 >= f;
                f++
              )
                (c = r.selectFirstElement("#day-" + f)),
                  f > h
                    ? r.addClass(c, "c-hide-menu-item")
                    : r.removeClass(c, "c-hide-menu-item");
              i > h && this.selectMenuDay.setSelectedItem("day-1");
            }
          }
        }),
        (n.ageGateSessionStorageKey = "UserAge"),
        (n.xboxDotComAgeGateCookieName = "maturityRatingAge"),
        (n.ariaLabel = "aria-label"),
        (n.numberOfSelectableYears = 110),
        n
      );
    })();
    t.AgeGateHelper = s;
  });
  define("interactive-triggers-helper", [
    "require",
    "exports",
    "player-utility",
    "utility",
    "htmlExtensions",
    "player-constants",
    "video-shim-data-fetcher",
    "localization-helper",
  ], function (n, t, i, r, u, f, e, o) {
    "use strict";
    var s, h, l, c;
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (function (n) {
        n[(n.WebLink = 1)] = "WebLink";
        n[(n.StoreOffer = 2)] = "StoreOffer";
        n[(n.VideoBranch = 3)] = "VideoBranch";
        n[(n.Poll = 4)] = "Poll";
        n[(n.Graphic = 5)] = "Graphic";
        n[(n.CustomHtml = 6)] = "CustomHtml";
      })((s = t.OverlayType || (t.OverlayType = {}))),
      (function (n) {
        n.LowerThird = "lowerThird";
        n.UpperThird = "upperThird";
        n.LeftVertical = "leftVertical";
        n.RightVertical = "rightVertical";
        n.Fullscreen = "fullScreen";
        n.Default = "default";
      })((h = t.OverlayTemplate || (t.OverlayTemplate = {}))),
      (function (n) {
        n.VideoBranch = "VideoBranch";
        n.WebLink = "WebLink";
        n.Telemetry = "Telemetry";
      })((l = t.CustomHtmlPostMessageType || (t.CustomHtmlPostMessageType = {})));
    c = (function () {
      function n(n, t, i, e, o) {
        var h = this;
        this.playerContainer = n;
        this.interactivityInfoUrl = t;
        this.telemetryEventCallback = o;
        this.streamLinkBackStack = [];
        this.screenManagerObjects = [];
        this.minimizedOverlays = {};
        this.onScreenOverlays = {};
        this.interactedTriggers = [];
        this.isEndSlateOn = !1;
        this.isStreamLinkBackStackPop = !1;
        this.isInteractivityJSONReady = !1;
        this.preRollDefaultDurationMs = 5e3;
        this.onInteractivityInfoSuccess = function (n) {
          try {
            h.interactivityInfo = JSON.parse(n);
            h.preloadContent();
            u.addThrottledEvent(window, u.eventTypes.resize, h.onResized);
            window.addEventListener("message", h.onCustomHtmlMessageReceived);
            h.isInteractivityJSONReady = !0;
          } catch (t) {
            h.isInteractivityJSONReady = !0;
          }
        };
        this.onCustomHtmlMessageReceived = function (n) {
          var i, r, t;
          if (
            !!n &&
            !!n.data &&
            !!n.data.type &&
            ((i = n.data.customHtmlOverlayId),
            !!i &&
              ((r = i.split("-").pop()), (t = h.onScreenOverlays[r]), !!r && !!t))
          )
            switch (n.data.type) {
              case "VideoBranch":
                !n.data.streamLink ||
                  h.handleClickByOverlayType(t, s.VideoBranch, n.data.streamLink);
                break;
              case "WebLink":
              default:
                !n.data.webLink ||
                  h.handleClickByOverlayType(t, s.WebLink, n.data.webLink);
            }
        };
        this.onInteractivityInfoFailed = function () {
          h.isInteractivityJSONReady = !0;
        };
        this.onMinimizeClick = function (n) {
          var t = u.getEventTargetOrSrcElement(n),
            e,
            i,
            r;
          t &&
            t.parentElement &&
            t.parentElement.parentElement &&
            ((e = t.parentElement.id),
            (i = e.split("-").pop()),
            i &&
              ((r = h.onScreenOverlays[i]),
              h.minimizeOverlay(r),
              h.telemetryEventCallback &&
                h.telemetryEventCallback(
                  f.PlayerEvents.InteractiveOverlayMinimize,
                  r
                )));
        };
        this.onMaximizeButtonClick = function (n) {
          var i = u.getEventTargetOrSrcElement(n),
            e,
            r,
            t;
          i &&
            i.parentElement &&
            i.parentElement.parentElement &&
            ((e = i.id),
            (r = e.split("-").pop()),
            r &&
              ((t = h.minimizedOverlays[r]),
              t &&
                (h.removeMaximizeButton(t),
                delete h.minimizedOverlays[r],
                h.createContainerAndShowOverlay(
                  t.onScreenOverlay.overlay,
                  t.onScreenOverlay.trigger,
                  !0
                ),
                h.telemetryEventCallback &&
                  h.telemetryEventCallback(
                    f.PlayerEvents.InteractiveOverlayMinimize,
                    t.onScreenOverlay
                  ))));
        };
        this.onOverlayClick = function (n) {
          var t = u.getEventTargetOrSrcElement(n);
          if (t && t.parentElement && t.parentElement.parentElement) {
            var r = t.parentElement.parentElement.id,
              f = r.split("-").pop(),
              i = h.onScreenOverlays[f];
            i.trigger.triggerWindowId &&
              h.interactedTriggers.push(i.trigger.triggerWindowId);
            h.handleClickByOverlayType(i);
          }
        };
        this.onBackButtonClick = function () {
          h.streamLinkBackStack.length < 1 ||
            (h.streamLinkBackstackPop(),
            h.telemetryEventCallback &&
              h.telemetryEventCallback(
                f.PlayerEvents.InteractiveBackButtonClick
              ));
        };
        this.onResized = function () {
          var s, n, i, e, o, t, u, f;
          if (
            !(Object.keys(h.onScreenOverlays).length < 1) &&
            h.interactivityInfo
          ) {
            for (
              s = r.getDimensions(h.playerContainer),
                n = 0,
                i = Object.keys(h.onScreenOverlays);
              n < i.length;
              n++
            )
              if (
                ((e = i[n]),
                (o = h.onScreenOverlays[e]),
                r.getDimensions(h.playerContainer).width <
                  r.Viewports.allWidths[1])
              ) {
                h.hideOverlay(o);
                return;
              }
            if (h.screenManagerObjects.length > 0)
              for (t = 0, u = h.screenManagerObjects; t < u.length; t++)
                (f = u[t]),
                  h.corePlayer.screenManagerHelper.updateElementHeight(
                    f,
                    h.getOverlayHeight(f.HtmlObject)
                  );
          }
        };
        this.onPlayerEvent = function (n) {
          switch (n.name) {
            case f.PlayerEvents.ContentComplete:
              h.onContentComplete();
              break;
            case f.PlayerEvents.Seek:
              if (n.data && n.data.seekTo) h.onSeek(n.data.seekTo);
              break;
            case f.PlayerEvents.Resume:
              h.onPlay();
          }
        };
        this.corePlayer = i;
        this.localizationHelper = e;
        this.corePlayer.addPlayerEventListener(this.onPlayerEvent);
        this.createBackButton();
        n && t && this.requestInteractivityJSON();
      }
      return (
        (n.prototype.dispose = function () {
          this.hideAllOverlays();
          u.removeEvent(window, u.eventTypes.resize, this.onResized);
        }),
        (n.prototype.requestInteractivityJSON = function () {
          i.PlayerUtility.ajax(
            this.interactivityInfoUrl,
            this.onInteractivityInfoSuccess,
            this.onInteractivityInfoFailed
          );
        }),
        (n.prototype.createGraphicContainer = function (n) {
          var t = "interactive-graphic-overlay-" + n.overlay.overlayId,
            i;
          u.selectFirstElement("#" + t, this.playerContainer) ||
            ((i =
              "<img aria-hidden='true' alt='' id='" +
              t +
              "' class='f-interactive-overlay \n                interactive-fullscreen interactive-graphic'>\n            <img>"),
            this.appendHtmlToPlayerContainer(i, t, n));
          n.overlayContainer = u.selectFirstElement(
            "#" + t,
            this.playerContainer
          );
        }),
        (n.prototype.createCustomHtmlContainer = function (n) {
          var t = "interactive-fullscreen",
            i,
            r;
          switch (n.trigger.overlayTemplate) {
            case h.LeftVertical:
              t = "interactive-left";
              break;
            case h.RightVertical:
              t = "interactive-right";
              break;
            case h.UpperThird:
              t = "interactive-upper";
              break;
            case h.LowerThird:
              t = "interactive-lower";
          }
          i = "custom-html-overlay-" + n.overlay.overlayId;
          r =
            "<div aria-hidden='true' id='" +
            i +
            "' \n        class='f-interactive-overlay " +
            t +
            " f-interactive-overlay-customhtml'>\n        <iframe src='" +
            n.overlay.overlayData.customHtml +
            "' name='" +
            i +
            "' \n        style='height: 100%; width: 100%; border: none;'></iframe>\n        </div>";
          this.appendHtmlToPlayerContainer(r, i, n);
          this.createScreenManagerObject(n);
        }),
        (n.prototype.createBakedInOverlayContainer = function (n) {
          var i = "interactive-lower",
            r = "f-overlay-minimize-lowerthird",
            t,
            f;
          switch (n.trigger.overlayTemplate) {
            case h.LeftVertical:
              i = "interactive-left";
              break;
            case h.RightVertical:
              i = "interactive-right";
              break;
            case h.UpperThird:
              r = "f-overlay-minimize-upperthird";
              i = "interactive-upper";
          }
          t = "interactive-overlay-" + n.overlay.overlayId;
          u.selectFirstElement("#" + t, this.playerContainer) ||
            ((f =
              "<div aria-hidden='true' id='" +
              t +
              "' class='f-interactive-overlay " +
              i +
              "'>\n<div class='f-overlay-info'>\n    <h2 class='c-headline'></h2>\n    <p class='c-paragraph'></p>\n</div>\n<div class='f-overlay-link'>\n    <button class='c-action-trigger f-heavyweight'></button>\n</div>\n<button type='button' class='f-overlay-minimizeMaximize " +
              r +
              " c-glyph glyph-chevron-left'>\n</button>  \n</div>"),
            this.appendHtmlToPlayerContainer(f, t, n));
          n.overlayContainer = u.selectFirstElement(
            "#" + t,
            this.playerContainer
          );
          n.overlayHeadline = u.selectFirstElement("h2", n.overlayContainer);
          n.overlayText = u.selectFirstElement("p", n.overlayContainer);
          n.overlayButton = u.selectFirstElement("button", n.overlayContainer);
          n.minimizeButton = u.selectFirstElement(
            ".f-overlay-minimizeMaximize",
            n.overlayContainer
          );
          this.createScreenManagerObject(n);
          u.addEvent(n.overlayButton, u.eventTypes.click, this.onOverlayClick);
          u.addEvent(n.minimizeButton, u.eventTypes.click, this.onMinimizeClick);
        }),
        (n.prototype.createOverlayContainer = function (n) {
          switch (n.overlay.overlayType) {
            case s.StoreOffer:
            case s.WebLink:
            case s.VideoBranch:
              this.createBakedInOverlayContainer(n);
              break;
            case s.Graphic:
              this.createGraphicContainer(n);
              break;
            case s.CustomHtml:
              this.createCustomHtmlContainer(n);
          }
        }),
        (n.prototype.appendHtmlToPlayerContainer = function (n, t, i) {
          var r = document.createElement("div"),
            f;
          r.innerHTML = n;
          f = u.selectFirstElement(".f-video-cc-overlay", this.playerContainer);
          this.playerContainer.insertBefore(r.firstChild, f);
          i.overlayContainer = u.selectFirstElement(
            "#" + t,
            this.playerContainer
          );
        }),
        (n.prototype.createScreenManagerObject = function (n) {
          n.trigger.overlayTemplate === h.LowerThird &&
            (this.screenManagerObjects.push(
              this.corePlayer.screenManagerHelper.registerElement({
                HtmlObject: n.overlayContainer,
                Height: this.getOverlayHeight(n.overlayContainer),
                Id: null,
                IsVisible: !1,
                Priority: 1,
                Transition: null,
              })
            ),
            this.screenManagerObjects[this.screenManagerObjects.length - 1] ==
              null && this.screenManagerObjects.pop());
        }),
        (n.prototype.createBackButton = function () {
          var i, t, r;
          this.backButtonContainer ||
            ((i =
              "<button type='button' aria-hidden='true' class='f-interactive-back-button c-glyph glyph-chevron-left'>\n                </button>"),
            (t = document.createElement("div")),
            (t.innerHTML = i),
            (r = u.selectFirstElement(
              ".f-video-cc-overlay",
              this.playerContainer
            )),
            this.playerContainer.insertBefore(t.firstChild, r),
            (this.backButtonContainer = u.selectFirstElement(
              ".f-interactive-back-button",
              this.playerContainer
            )),
            this.backButtonContainer.setAttribute(
              n.ariaLabel,
              this.localizationHelper.getLocalizedValue(
                o.playerLocKeys.close_text
              )
            ));
          u.addEvent(
            this.backButtonContainer,
            u.eventTypes.click,
            this.onBackButtonClick
          );
        }),
        (n.prototype.removeMaximizeButton = function (n) {
          u.removeEvent(
            n.maximizeButton,
            u.eventTypes.click,
            this.onMaximizeButtonClick
          );
          u.removeElement(n.maximizeButton);
        }),
        (n.prototype.updateCurrentOverlay = function (n) {
          this.interactivityInfo && this.updateInteractivity(n);
        }),
        (n.prototype.updateOverlays = function (n) {
          for (
            var t,
              r,
              o,
              u,
              h,
              f,
              l,
              a,
              b = n * 1e7,
              i = {},
              e = 0,
              v = this.interactivityInfo.triggers;
            e < v.length;
            e++
          ) {
            if (((t = v[e]), t.triggerTimeTicks > b)) break;
            t.isOverlayOn !== !0 ||
            this.userAlreadyInteractedWithTrigger(t.triggerWindowId)
              ? delete i[t.triggerWindowId]
              : (i[t.triggerWindowId] = t);
          }
          for (
            r = 0, o = Object.keys(this.minimizedOverlays);
            r < o.length;
            r++
          ) {
            var y = o[r],
              s = this.minimizedOverlays[y],
              p = i[s.onScreenOverlay.trigger.triggerWindowId] ? !0 : !1;
            p
              ? delete i[s.onScreenOverlay.trigger.triggerWindowId]
              : this.hideOverlay(s.onScreenOverlay);
          }
          for (u = 0, h = Object.keys(this.onScreenOverlays); u < h.length; u++) {
            var w = h[u],
              c = this.onScreenOverlays[w],
              p = i[c.trigger.triggerWindowId] ? !0 : !1;
            p ? delete i[c.trigger.triggerWindowId] : this.hideOverlay(c);
          }
          for (f = 0, l = Object.keys(i); f < l.length; f++) {
            var y = l[f],
              t = i[y],
              w = t.overlayId;
            t.zIndex = this.normalizeZIndex(t.zIndex);
            a = this.getOverlayInfo(w);
            !a || this.createContainerAndShowOverlay(a, t);
          }
        }),
        (n.prototype.createContainerAndShowOverlay = function (n, t, i) {
          if (
            !(
              r.getDimensions(this.playerContainer).width <
              r.Viewports.allWidths[1]
            )
          ) {
            var u = {
              overlay: n,
              overlayContainer: null,
              trigger: t,
              hideTimer: null,
              showTimer: null,
            };
            this.createOverlayContainer(u);
            this.setOverlayData(u, t.zIndex);
            this.showOverlay(u, i);
          }
        }),
        (n.prototype.showOverlay = function (n, t) {
          if (n.overlayContainer) {
            this.onScreenOverlays[n.overlay.overlayId] = n;
            switch (n.overlay.overlayType) {
              case s.Graphic:
                n.trigger.overlayTemplate === h.Default &&
                  (n.trigger.overlayTemplate = h.Fullscreen);
                break;
              case s.CustomHtml:
              case s.WebLink:
              case s.StoreOffer:
              case s.VideoBranch:
              default:
                n.trigger.overlayTemplate === h.Default &&
                  (n.trigger.overlayTemplate = h.LowerThird);
                this.isContentStreamLink() ||
                  this.corePlayer.resetFocusTrap(
                    this.findInteractivityFocusTrapStart()
                  );
                n.overlayContainer.setAttribute("role", "alert");
            }
            clearTimeout(n.showTimer);
            this.displayOverlayContainer(n);
            var i = null;
            n && n.overlay && (i = n.overlay.overlayData);
            i &&
              i.headline &&
              n.overlayContainer.setAttribute("aria-label", i.headline);
            t ||
              (this.telemetryEventCallback &&
                this.telemetryEventCallback(
                  f.PlayerEvents.InteractiveOverlayShow,
                  n
                ));
          }
        }),
        (n.prototype.isContentStreamLink = function () {
          return this.streamLinkBackStack.length >= 1;
        }),
        (n.prototype.hideAllOverlays = function () {
          var n, i, u, t, r, f, e;
          if (Object.keys(this.minimizedOverlays).length > 0)
            for (
              n = 0, i = Object.keys(this.minimizedOverlays);
              n < i.length;
              n++
            )
              (u = i[n]), this.removeMaximizeButton(this.minimizedOverlays[u]);
          if (
            !(Object.keys(this.onScreenOverlays).length < 1) &&
            this.interactivityInfo
          )
            for (t = 0, r = Object.keys(this.onScreenOverlays); t < r.length; t++)
              (f = r[t]), (e = this.onScreenOverlays[f]), this.hideOverlay(e);
        }),
        (n.prototype.hideOverlay = function (n) {
          if (n.overlayContainer) {
            switch (n.overlay.overlayType) {
              case s.Graphic:
              case s.CustomHtml:
                n.trigger.overlayTemplate === h.Default &&
                  (n.trigger.overlayTemplate = h.Fullscreen);
                break;
              case s.WebLink:
              case s.StoreOffer:
              case s.VideoBranch:
              default:
                n.trigger.overlayTemplate === h.Default &&
                  (n.trigger.overlayTemplate = h.LowerThird);
            }
            this.removeOverlayFromScreen(n);
            this.telemetryEventCallback &&
              this.telemetryEventCallback(
                f.PlayerEvents.InteractiveOverlayHide,
                n
              );
          }
        }),
        (n.prototype.removeOverlayFromScreen = function (n, t) {
          var i = this.minimizedOverlays[n.trigger.triggerWindowId];
          i
            ? (this.removeMaximizeButton(i),
              delete this.minimizedOverlays[
                i.onScreenOverlay.trigger.triggerWindowId
              ])
            : (this.hideOveralyContainer(n, function () {
                !t || t();
              }),
              delete this.onScreenOverlays[n.overlay.overlayId]);
          this.isContentStreamLink() ||
            this.corePlayer.resetFocusTrap(
              this.findInteractivityFocusTrapStart()
            );
        }),
        (n.prototype.displayOverlayContainer = function (n) {
          var t = this,
            i,
            r;
          n.overlayContainer.setAttribute("aria-hidden", "false");
          i = "f-interactive-overlay-slidein";
          r = "f-interactive-overlay-slideout";
          switch (n.trigger.overlayTemplate) {
            case h.LeftVertical:
            case h.RightVertical:
            case h.UpperThird:
              u.addClass(n.overlayContainer, i);
              u.removeClass(n.overlayContainer, r);
              break;
            case h.Fullscreen:
              break;
            case h.LowerThird:
            default:
              n.showTimer = setTimeout(function () {
                t.corePlayer.screenManagerHelper.updateElementDisplay(
                  t.getScreenManagerObjectByOverlayId(n.overlay.overlayId),
                  !0
                );
              }, 100);
          }
        }),
        (n.prototype.hideOveralyContainer = function (n, t) {
          var i = this;
          switch (n.trigger.overlayTemplate) {
            case h.LeftVertical:
            case h.RightVertical:
            case h.UpperThird:
              u.addClass(n.overlayContainer, "f-interactive-overlay-slideout");
              u.removeClass(n.overlayContainer, "f-interactive-overlay-slidein");
              n.hideTimer = setTimeout(function () {
                n.overlayContainer.setAttribute("aria-hidden", "true");
                n.overlayButton &&
                  u.removeEvent(
                    n.overlayButton,
                    u.eventTypes.click,
                    i.onOverlayClick
                  );
                u.removeElement(n.overlayContainer);
                !t() || t();
              }, 500);
              break;
            case h.Fullscreen:
              n.overlayContainer.setAttribute("aria-hidden", "true");
              u.removeElement(n.overlayContainer);
              break;
            case h.LowerThird:
            default:
              this.screenManagerObjects.length > 0 &&
                (this.corePlayer.screenManagerHelper.deleteElement(
                  this.deleteScreenManagerObjectByOverlayId(n.overlay.overlayId)
                ),
                (n.hideTimer = setTimeout(function () {
                  n.overlayContainer.setAttribute("aria-hidden", "true");
                  n.overlayButton &&
                    u.removeEvent(
                      n.overlayButton,
                      u.eventTypes.click,
                      i.onOverlayClick
                    );
                  u.removeElement(n.overlayContainer);
                  !t() || t();
                }, 500)));
          }
        }),
        (n.prototype.setOverlayData = function (n, t) {
          if (n.overlayContainer && n.overlay)
            switch (n.overlay.overlayType) {
              case s.Graphic:
                this.setGraphicOverlay(n, t);
                break;
              case s.WebLink:
              case s.StoreOffer:
              case s.VideoBranch:
              default:
                this.setBakedInOverlayContainerFields(n, t);
            }
        }),
        (n.prototype.setGraphicOverlay = function (n, t) {
          var r = n.overlay.overlayData,
            i;
          !t || u.css(n.overlayContainer, "z-index", t);
          i = n.overlayContainer;
          i.src = r.graphicUrl;
        }),
        (n.prototype.setBakedInOverlayContainerFields = function (t, i) {
          var r = t.overlay.overlayData;
          t.overlayHeadline && u.setText(t.overlayHeadline, r.headline);
          t.overlayText && u.setText(t.overlayText, r.bodyText);
          !i || u.css(t.overlayContainer, "z-index", i);
          r.imageUrl &&
            u.css(
              t.overlayContainer,
              "background-image",
              "url('" + r.imageUrl + "')"
            );
          t.overlayButton &&
            (u.setText(t.overlayButton, r.buttonText),
            t.overlayButton.setAttribute("aria-label", r.buttonText));
          t.minimizeButton &&
            (typeof t.trigger.isMinimizable == "undefined" ||
            t.trigger.isMinimizable
              ? t.minimizeButton.setAttribute(
                  n.ariaLabel,
                  this.localizationHelper.getLocalizedValue(
                    o.playerLocKeys.interactivity_hide
                  ) +
                    " " +
                    t.overlay.overlayData.headline
                )
              : t.minimizeButton.setAttribute("aria-hidden", "true"));
        }),
        (n.prototype.getOverlayInfo = function (n) {
          var t, i, r;
          if (
            !this.interactivityInfo ||
            !this.interactivityInfo.overlays ||
            !this.interactivityInfo.overlays ||
            !this.interactivityInfo.overlays.length
          )
            return null;
          for (t = 0, i = this.interactivityInfo.overlays; t < i.length; t++)
            if (((r = i[t]), r.overlayId === n)) return r;
          return null;
        }),
        (n.prototype.getScreenManagerObjectByOverlayId = function (n) {
          var t, i, r;
          if (this.screenManagerObjects.length === 0) return null;
          for (t = 0, i = this.screenManagerObjects; t < i.length; t++)
            if (((r = i[t]), r.HtmlObject.id.split("-").pop() === n)) return r;
          return null;
        }),
        (n.prototype.deleteScreenManagerObjectByOverlayId = function (n) {
          if (this.screenManagerObjects.length === 0) return null;
          var i = this.getScreenManagerObjectByOverlayId(n),
            t = this.screenManagerObjects.splice(
              this.screenManagerObjects.indexOf(i),
              1
            );
          return t.length > 0 ? t[0] : null;
        }),
        (n.prototype.getOverlayHeight = function (n) {
          var t = n.clientHeight;
          return (
            t <= 0 &&
              !!n.parentElement &&
              (t = n.parentElement.clientHeight * 0.2),
            t
          );
        }),
        (n.prototype.createMaximizeButton = function (t) {
          var f = t.trigger.triggerWindowId,
            e = "f-overlay-maximize-lowerthird",
            s,
            r,
            c,
            i;
          return (
            t.trigger.overlayTemplate === h.UpperThird &&
              (e = "f-overlay-maximize-upperthird"),
            (s =
              "<button type='button' id='" +
              f +
              "' class='f-overlay-minimizeMaximize " +
              e +
              " c-glyph glyph-chevron-left'>\n        </button>"),
            (r = document.createElement("div")),
            (r.innerHTML = s),
            (c = u.selectFirstElement(
              ".f-video-cc-overlay",
              this.playerContainer
            )),
            this.playerContainer.insertBefore(r.firstChild, c),
            (i = u.selectFirstElement("#" + f, this.playerContainer)),
            i.setAttribute(
              n.ariaLabel,
              this.localizationHelper.getLocalizedValue(
                o.playerLocKeys.interactivity_show
              ) +
                " " +
                t.overlay.overlayData.headline
            ),
            u.addEvent(i, u.eventTypes.click, this.onMaximizeButtonClick),
            i
          );
        }),
        (n.prototype.minimizeOverlay = function (n) {
          var t = this,
            i;
          n &&
            ((i = {
              onScreenOverlay: n,
            }),
            this.removeOverlayFromScreen(n, function () {
              i.maximizeButton = t.createMaximizeButton(n);
              t.corePlayer.resetFocusTrap(t.findInteractivityFocusTrapStart());
            }),
            (this.minimizedOverlays[n.trigger.triggerWindowId] = i));
        }),
        (n.prototype.streamLinkBackstackPop = function () {
          var n;
          n = this.streamLinkBackStack.pop();
          !this.isContentStreamLink() &&
            this.backButtonContainer &&
            (this.backButtonContainer.setAttribute("aria-hidden", "true"),
            this.corePlayer.resetFocusTrap(
              this.findInteractivityFocusTrapStart()
            ));
          this.hideAllOverlays();
          this.isStreamLinkBackStackPop = !0;
          this.corePlayer.load(n.corePlayer);
          this.interactivityInfo = n.interactivityInfo;
          this.interactedTriggers = n.interactedTriggers;
          this.minimizedOverlays = n.minimizedOverlays;
          this.isInteractivityJSONReady = !0;
          this.corePlayer.getPlayerData().options.startTime = 0;
          this.finalizeBackStackPop(n.paused);
        }),
        (n.prototype.finalizeBackStackPop = function (n) {
          var i = this,
            t;
          !n ||
            ((t = this.corePlayer),
            t.playerState === "loading" || t.playerState === "init"
              ? setTimeout(function () {
                  i.finalizeBackStackPop(n);
                }, 50)
              : t.pause());
        }),
        (n.prototype.handleClickByOverlayType = function (n, t, i) {
          if (n) {
            t || (t = n.overlay.overlayType);
            i || (i = n.overlay.overlayData);
            this.hideOverlay(n);
            switch (t) {
              case s.VideoBranch:
                this.navigateToStreamLink(i);
                break;
              case s.WebLink:
              default:
                window.open(i.linkUrl, "_blank");
            }
            this.telemetryEventCallback &&
              this.telemetryEventCallback(
                f.PlayerEvents.InteractiveOverlayClick,
                n
              );
          }
        }),
        (n.prototype.setFocusOnInteractivity = function (n) {
          !n ||
            n.tagName === "IMG" ||
            (n.setAttribute("tabindex", "1"),
            setTimeout(function () {
              n.focus();
            }, 0));
        }),
        (n.prototype.findInteractivityFocusTrapStart = function () {
          var n, i, e, r, t, u, o, f;
          if (this.streamLinkBackStack.length > 0)
            return this.backButtonContainer;
          for (n = 0, i = Object.keys(this.minimizedOverlays); n < i.length; n++)
            if (((e = i[n]), (r = this.minimizedOverlays[e].maximizeButton), r))
              return r;
          for (t = 0, u = Object.keys(this.onScreenOverlays); t < u.length; t++)
            if (
              ((o = u[t]),
              (f = this.onScreenOverlays[o]),
              f.overlayButton !== undefined)
            )
              return f.overlayButton;
          return null;
        }),
        (n.prototype.navigateToStreamLink = function (n) {
          var i = this.corePlayer.getPlayerData(),
            u,
            f,
            e,
            t;
          i.options.startTime = this.corePlayer.getPlayPosition().currentTime;
          i.options.lazyLoad = !1;
          u = {};
          r.extend(u, this.minimizedOverlays);
          f = [];
          r.extend(f, this.interactedTriggers);
          e = {
            corePlayer: i,
            interactivityInfo: this.interactivityInfo,
            minimizedOverlays: u,
            interactedTriggers: f,
            paused: this.corePlayer.isPaused(),
          };
          this.hideAllOverlays();
          this.clearOutInteractedTriggers();
          this.minimizedOverlays = {};
          this.interactivityInfo = null;
          this.streamLinkBackStack.push(e);
          t = {};
          t.options = {};
          r.extend(t.options, i.options);
          t.options.startTime = n.startTime ? n.startTime : 0;
          this.fetchStreamLinkMetadataAndSwitch(t, n.videoId);
        }),
        (n.prototype.clearOutInteractedTriggers = function () {
          this.isStreamLinkBackStackPop
            ? (this.isStreamLinkBackStackPop = !1)
            : (this.interactedTriggers.length = 0);
        }),
        (n.prototype.fetchStreamLinkMetadataAndSwitch = function (n, t) {
          var i = this,
            r = new e.VideoShimDataFetcher(
              n.options.shimServiceEnv,
              n.options.shimServiceUrl
            );
          r.getMetadata(
            t,
            function (t) {
              n.metadata = t;
              i.isInteractivityJSONReady = !1;
              i.corePlayer.stop();
              i.corePlayer.load(n);
              n.metadata.interactiveTriggersEnabled &&
                n.metadata.interactiveTriggersUrl &&
                ((i.interactivityInfoUrl = n.metadata.interactiveTriggersUrl),
                i.requestInteractivityJSON());
              i.backButtonContainer &&
                (i.backButtonContainer.setAttribute("aria-hidden", "false"),
                i.corePlayer.resetFocusTrap(i.backButtonContainer));
            },
            function () {}
          );
        }),
        (n.prototype.userAlreadyInteractedWithTrigger = function (n) {
          for (var r, t = 0, i = this.interactedTriggers; t < i.length; t++)
            if (((r = i[t]), r === n)) return !0;
          return !1;
        }),
        (n.prototype.displayEndSlate = function () {
          for (
            var n, i, u, f = this.interactivityInfo.showOnVideoEnd, t = 0, r = f;
            t < r.length;
            t++
          )
            (n = r[t]),
              (i = this.getOverlayInfo(n.overlayId)),
              !i ||
                ((u = {
                  overlayId: n.overlayId,
                  overlayTemplate: n.overlayTemplate,
                  zIndex: this.normalizeZIndex(n.zIndex),
                }),
                this.createContainerAndShowOverlay(i, u),
                (this.isEndSlateOn = !0));
        }),
        (n.prototype.displayPreRoll = function (n) {
          var r, i, u, t, f, e, o;
          try {
            if (
              !this.interactivityInfo ||
              this.interactivityInfo.showOnVideoStart.length < 1 ||
              this.corePlayer.getPlayerData().options.startTime !== 0
            ) {
              n();
              return;
            }
            if (((r = this.interactivityInfo.showOnVideoStart), r.length < 1)) {
              n();
              return;
            }
            for (i = 0, u = r; i < u.length; i++)
              (t = u[i]),
                (f = this.getOverlayInfo(t.overlayId)),
                !f ||
                  ((e = {
                    overlayId: t.overlayId,
                    overlayTemplate: t.overlayTemplate,
                    zIndex: this.normalizeZIndex(t.zIndex),
                  }),
                  this.createContainerAndShowOverlay(f, e));
            o = this.interactivityInfo.preRollDurationSecs
              ? this.interactivityInfo.preRollDurationSecs * 1e3
              : this.preRollDefaultDurationMs;
            setTimeout(function () {
              n();
            }, o);
          } catch (s) {
            n();
          }
        }),
        (n.prototype.normalizeZIndex = function (n) {
          return isNaN(n) ? 1 : Math.max(1, Math.min(50, n));
        }),
        (n.prototype.onSeek = function (n) {
          !this.interactivityInfo ||
            (this.isStreamLinkBackStackPop
              ? (this.isStreamLinkBackStackPop = !1)
              : this.clearOutInteractedTriggers(),
            this.updateInteractivity(n));
        }),
        (n.prototype.updateInteractivity = function (n) {
          n > 0 && this.updateOverlays(n);
        }),
        (n.prototype.onPlay = function () {
          !this.interactivityInfo ||
            (this.isEndSlateOn &&
              (this.hideAllOverlays(), (this.isEndSlateOn = !1)));
        }),
        (n.prototype.onContentComplete = function () {
          var n = this.streamLinkBackStack.length > 0;
          n
            ? this.streamLinkBackstackPop()
            : !this.interactivityInfo || this.displayEndSlate();
        }),
        (n.prototype.postIFrameMessage = function (n) {
          for (
            var u, i, f, t = 0, r = Object.keys(this.onScreenOverlays);
            t < r.length;
            t++
          )
            (u = r[t]),
              (i = this.onScreenOverlays[u]),
              !i ||
                (i.overlay.overlayType === s.CustomHtml &&
                  ((f = i.overlayContainer.firstElementChild),
                  f.contentWindow.postMessage(n, "*")));
        }),
        (n.prototype.preloadContent = function () {
          for (
            var n, t = [], i = [], r = 0, u = this.interactivityInfo.overlays;
            r < u.length;
            r++
          ) {
            n = u[r];
            switch (n.overlayType) {
              case s.WebLink:
              case s.StoreOffer:
              case s.VideoBranch:
                !n.overlayData ||
                  !n.overlayData.imageUrl ||
                  t.push(n.overlayData.imageUrl);
                break;
              case s.Graphic:
                !n.overlayData ||
                  !n.overlayData.graphicUrl ||
                  t.push(n.overlayData.graphicUrl);
                break;
              case s.CustomHtml:
                !n.overlayData ||
                  !n.overlayData.customHtml ||
                  i.push(n.overlayData.customHtml);
            }
          }
          t.length > 0 && this.cacheImages(t);
          i.length > 0 && this.cacheIFrames(i);
        }),
        (n.prototype.cacheImages = function (n) {
          for (var r, u, t = 0, i = n; t < i.length; t++)
            (r = i[t]), (u = new Image()), (u.src = r);
        }),
        (n.prototype.cacheIFrames = function () {}),
        (n.ariaLabel = "aria-label"),
        n
      );
    })();
    t.VideoPlayerInteractiveTriggersHelper = c;
  });
  define("inview-helper", [
    "require",
    "exports",
    "htmlExtensions",
    "utility",
    "core-player",
  ], function (n, t, i, r, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    t.DocumentVisibility = {
      msHidden: "msvisibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      hidden: "visibilitychange",
    };
    var f = (function () {
      function n() {
        var i = this,
          r;
        this.isAnyPlayerPlaying = !1;
        this.defaultInViewWidthFraction = 0.5;
        this.defaultInViewHeightFraction = 0.5;
        this.onDocumentVisibilityChanged = function () {
          n.isDocumentVisible()
            ? i.triggerInViewPlay(!1)
            : i.isAnyPlayerPlaying && n.currentPlayer
            ? n.currentPlayer.hasUserInteracted() &&
              n.currentPlayer.hasUserIntiatedPause()
              ? n.currentPlayer.pause()
              : i.clearCurrentPlayer()
            : i.triggerInViewPlay(!1);
        };
        this.onInViewPlayHandler = function () {
          setTimeout(i.triggerInViewPlay(!1), 500);
        };
        n.players = [];
        n.currentPlayer = null;
        for (r in t.DocumentVisibility)
          if (r in document) {
            n.hidden = r;
            n.visibilityChange = t.DocumentVisibility[r];
            break;
          }
        this.bindInViewEvents();
      }
      return (
        (n.Instance = function () {
          return (
            (this._instance === null || this._instance === undefined) &&
              (this._instance = new n()),
            this._instance
          );
        }),
        (n.prototype.clearCurrentPlayer = function () {
          n.currentPlayer && n.currentPlayer.pause();
          n.currentPlayer = null;
          this.isAnyPlayerPlaying = !1;
        }),
        (n.prototype.setCurrentPlayer = function (t) {
          t &&
            n.currentPlayer !== t &&
            ((n.currentPlayer = t), (this.isAnyPlayerPlaying = !0));
        }),
        (n.prototype.insertByPosition = function (t) {
          var u = this.getPlayerPosition(t.getPlayerContainer()),
            i,
            r;
          if (!u) {
            n.players.push(t);
            return;
          }
          for (i = 0; i < n.players.length; ) {
            if (n.players[i].getPlayerId() === t.getPlayerId()) return;
            if (
              ((r = this.getPlayerPosition(n.players[i].getPlayerContainer())),
              r && u.top < r.top)
            )
              break;
            i++;
          }
          n.players.splice(i, 0, t);
        }),
        (n.prototype.registerPlayer = function (t) {
          t &&
            (this.insertByPosition(t),
            n.currentPlayer || this.triggerInViewPlay(!0));
        }),
        (n.prototype.disposePlayer = function (t) {
          if (t) {
            n.currentPlayer === t && this.clearCurrentPlayer();
            var i = n.players.indexOf(t);
            i >= 0 && n.players.splice(i, 1);
            n.players.length === 0 && this.dispose();
          }
        }),
        (n.prototype.dispose = function () {
          n.players = [];
          n.currentPlayer = null;
        }),
        (n.isDocumentVisible = function () {
          var n = document[this.hidden];
          return !n;
        }),
        (n.prototype.triggerInViewPlay = function (t) {
          var f, s, e, i, o, r;
          if (
            n.isDocumentVisible() &&
            ((f = !1),
            n.currentPlayer &&
              this.isAnyPlayerPlaying &&
              ((f = this.isPlayerInView(n.currentPlayer)),
              f ||
                (n.currentPlayer.hasUserInteracted() &&
                n.currentPlayer.hasUserIntiatedPause()
                  ? n.currentPlayer.pause()
                  : this.clearCurrentPlayer())),
            !this.isAnyPlayerPlaying ||
              !n.currentPlayer ||
              !(n.currentPlayer.hasUserInteracted() || f)) &&
            ((s = !1), n.players && n.players.length)
          )
            for (e = 0; e < n.players.length; e++)
              if (((i = n.players[e]), n.currentPlayer !== i))
                if (!t && i.hasUserInteracted() && i.hasUserIntiatedPause())
                  i.hasUserInteracted() &&
                    i.hasUserIntiatedPause() &&
                    this.handledUserInteractedPlay(i);
                else if (i.hasUserInteracted() && i.hasUserIntiatedPause())
                  this.handledUserInteractedPlay(i);
                else {
                  if (
                    ((o = this.isPlayerInView(i)),
                    (r = i.getCurrentPlayState()),
                    !o && r === u.PlayerStates.Playing)
                  ) {
                    i.pause();
                    this.clearCurrentPlayer();
                    break;
                  }
                  if (
                    o &&
                    (i.isPaused() || r === u.PlayerStates.Paused) &&
                    r !== u.PlayerStates.Ended
                  ) {
                    i.play();
                    this.setCurrentPlayer(i);
                    s = !0;
                    break;
                  }
                  if (o && r === u.PlayerStates.Playing) {
                    this.setCurrentPlayer(i);
                    break;
                  }
                }
        }),
        (n.prototype.handledUserInteractedPlay = function (n) {
          if (n) {
            var t = this.isPlayerInView(n);
            t ||
              n.getCurrentPlayState() !== u.PlayerStates.Playing ||
              (n.pause(), this.clearCurrentPlayer());
          }
        }),
        (n.prototype.isPlayerInView = function (n) {
          var i = r.getWindowWidth(),
            u = r.getWindowHeight(),
            t,
            f,
            e,
            o,
            s;
          return !i || !u || i <= 0 || u <= 0
            ? !1
            : ((t = this.getPlayerPosition(n.getPlayerContainer())),
              !t || !t.width || !t.height)
            ? !1
            : ((f = this.defaultInViewWidthFraction),
              (e = this.defaultInViewHeightFraction),
              n.getPlayerData().options &&
                (n.getPlayerData().options.inViewWidthFraction &&
                  (f = n.getPlayerData().options.inViewWidthFraction),
                n.getPlayerData().options.inViewHeightFraction &&
                  (e = n.getPlayerData().options.inViewHeightFraction)),
              (o = t.width * Math.abs(f)),
              (s = t.height * Math.abs(e)),
              this.isInView(i, u, t, o, s));
        }),
        (n.prototype.isInView = function (n, t, i, r, u) {
          var f =
              i.bottom < 0 || i.top > t
                ? 0
                : Math.min(t, i.bottom) - Math.max(i.top, 0),
            e =
              i.right < 0 || i.left > n
                ? 0
                : Math.min(n, i.right) - Math.max(0, i.left);
          return f && f >= u && e && e >= r;
        }),
        (n.prototype.listenForInviewThresholdChanges = function (n, t, r) {
          if (n && t && !(t < 0) && !(t > 1)) {
            this.inviewChange = {
              enter: !0,
              exit: !1,
            };
            this.inviewContainer = n;
            this.inviewThreshold = t;
            this.inviewCallback = r;
            var u = this;
            i.addEvents(window, "scroll", function () {
              u.checkInviewThreshold();
            });
          }
        }),
        (n.prototype.checkInviewThreshold = function () {
          this.inviewChange.enter === !0
            ? (this.inviewVerticalThreshold() &&
                this.inviewHorizontalThreshold()) ||
              ((this.inviewChange.enter = !1),
              (this.inviewChange.exit = !0),
              this.inviewCallback("InviewExit"))
            : this.inviewChange.exit === !0 &&
              this.inviewVerticalThreshold() &&
              this.inviewHorizontalThreshold() &&
              ((this.inviewChange.enter = !0),
              (this.inviewChange.exit = !1),
              this.inviewCallback("InviewEnter"));
        }),
        (n.prototype.inviewVerticalThreshold = function () {
          var t = r.getWindowHeight(),
            n = this.getPlayerPosition(this.inviewContainer),
            u = n.top < 0 ? n.top * -1 : n.top,
            f = n.bottom < 0 ? n.bottom * -1 : n.bottom,
            i = this.inviewThreshold * n.height;
          return !n || !n.height
            ? !1
            : n.bottom < 0 || n.top > t
            ? !1
            : (n.top < 0 && u < i) ||
              (n.bottom > t && f - t < i) ||
              (n.top >= 0 && n.bottom <= t)
            ? !0
            : !1;
        }),
        (n.prototype.inviewHorizontalThreshold = function () {
          var t = r.getWindowWidth(),
            n = this.getPlayerPosition(this.inviewContainer),
            u = n.left < 0 ? n.left * -1 : n.left,
            f = n.right < 0 ? n.right * -1 : n.right,
            i = this.inviewThreshold * n.width;
          return !n || !n.width
            ? !1
            : n.right < 0 || n.left > t
            ? !1
            : (n.left < 0 && u < i) ||
              (n.right >= t && f - t < i) ||
              (n.left >= 0 && n.right <= t)
            ? !0
            : !1;
        }),
        (n.prototype.getPlayerPosition = function (n) {
          if (!n || n.childElementCount === 0) return null;
          var i = n.firstElementChild,
            t = i.getBoundingClientRect();
          return !t || !t.width || !t.height ? null : t;
        }),
        (n.prototype.bindInViewEvents = function () {
          i.addEvents(
            document,
            n.visibilityChange,
            this.onDocumentVisibilityChanged
          );
          i.addEvents(window, "scroll", this.onInViewPlayHandler);
          i.addEvents(window, "resize", this.onInViewPlayHandler);
        }),
        (n.hidden = "hidden"),
        (n.visibilityChange = "visibilitychange"),
        n
      );
    })();
    t.InviewManager = f;
  });
  define("localization-helper", [
    "require",
    "exports",
    "stringExtensions",
    "player-config",
    "player-utility",
  ], function (n, t, i, r, u) {
    "use strict";
    var f, e, o;
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    f = {
      audio_tracks: "Audio Tracks",
      closecaption_off: "Off",
      geolocation_error:
        "We're sorry, this video cannot be played from your current location.",
      media_err_aborted: "video playback was aborted",
      media_err_decode: "video is not readable",
      media_err_network: "video failed to download",
      media_err_src_not_supported: "video format is not supported",
      media_err_unknown_error: "unknown error occurred",
      media_err_amp_encrypt:
        "The video is encrypted and we do not have the keys to decrypt it.",
      media_err_amp_player_mismatch:
        "No compatible source was found for this video.",
      browserunsupported:
        "We're sorry, but your browser does not support this video.",
      browserunsupported_download:
        "Please download a copy of this video to view on your device:",
      expand: "Full Screen",
      mute: "Mute",
      nullvideoerror: "We're sorry, this video cannot be played.",
      pause: "Pause",
      play: "Play",
      play_pause_button_tooltip: "Play and Pause Button",
      live_caption: "Skip ahead to live broadcast.",
      live_label: "LIVE",
      playbackerror:
        "We're sorry, an error has occurred when playing video ({0}).",
      standarderror: "We're sorry, this video can't be played.",
      time: "Time",
      more_caption: "More options",
      data_error: "Sorry, this video cannot be played.",
      seek: "Seek",
      unexpand: "Exit Full Screen",
      unmute: "Unmute",
      volume: "Volume",
      quality: "Quality",
      quality_hd: "HD",
      quality_hq: "HQ",
      quality_lo: "LO",
      quality_sd: "SD",
      quality_auto: "Auto",
      closecaption: "Closed captions",
      close_text: "Close",
      playbackspeed: "Playback speed",
      playbackspeed_normal: "Normal",
      sharing_label: "Share",
      sharing_facebook: "Facebook",
      sharing_twitter: "Twitter",
      sharing_linkedin: "LinkedIn",
      sharing_skype: "Skype",
      sharing_mail: "Mail",
      sharing_copy: "Copy link",
      loading_value_text: "Loading...",
      loading_aria_label: "Loading",
      descriptive_audio: "Audio description",
      unknown_language: "Unknown",
      cc_customize: "Customize",
      cc_text_font: "Font",
      cc_text_color: "Text color",
      cc_color_black: "Black",
      cc_color_blue: "Blue",
      cc_color_cyan: "Cyan",
      cc_color_green: "Green",
      cc_color_grey: "Grey",
      cc_color_magenta: "Magenta",
      cc_color_red: "Red",
      cc_color_white: "White",
      cc_color_yellow: "Yellow",
      cc_font_name_casual: "Casual",
      cc_font_name_cursive: "Cursive",
      cc_font_name_monospacedsansserif: "Monospaced Sans Serif",
      cc_font_name_monospacedserif: "Monospaced Serif",
      cc_font_name_proportionalserif: "Proportional Serif",
      cc_font_name_proportionalsansserif: "Proportional Sans Serif",
      cc_font_name_smallcapitals: "Small Capitals",
      cc_text_size: "Text size",
      cc_text_size_default: "Default",
      cc_text_size_extralarge: "Extra Large",
      cc_text_size_large: "Large",
      cc_text_size_maximum: "Maximum",
      cc_text_size_small: "Small",
      cc_appearance: "Appearance",
      cc_preset1: "Preset 1 ",
      cc_preset2: "Preset 2",
      cc_preset3: "Preset 3",
      cc_preset4: "Preset 4",
      cc_preset5: "Preset 5",
      cc_presettings: "Preset {0}: {1}, {2}",
      cc_text_background_color: "Background color",
      cc_text_background_opacity: "Background opacity",
      cc_text_opacity: "Text opacity",
      cc_percent_0: "0%",
      cc_percent_100: "100%",
      cc_percent_25: "25%",
      cc_percent_50: "50%",
      cc_percent_75: "75%",
      cc_text_edge_color: "Text edge color",
      cc_text_edge_style: "Text edge style",
      cc_text_edge_style_depressed: "Depressed",
      cc_text_edge_style_dropshadow: "Drop shadow",
      cc_text_edge_style_none: "No edge",
      cc_text_edge_style_raised: "Raised",
      cc_text_edge_style_uniform: "Uniform",
      cc_window_color: "Window color",
      cc_window_opacity: "Window opacity",
      cc_reset: "Reset",
      download_label: "Download",
      download_transcript: "Transcript",
      download_audio: "Audio",
      download_video: "Video",
      download_videoWithCC: "Video with closed captions",
      agegate_day: "Day",
      agegate_month: "Month",
      agegate_year: "Year",
      agegate_submit: "Submit",
      agegate_fail:
        "This content is not available at this time due to age restrictions.",
      agegate_enterdate: "Enter your date of birth",
      agegate_enterdate_arialabel: "Enter your {0} of birth",
      agegate_verifyyourage:
        "Content not intended for all audiences. Please verify your age.",
      agegate_dateorder: "m/d/yyyy",
      previous_menu_aria_label: "{0} menu - go back to previous menu",
      reactive_menu_aria_label: "{0} menu - close menu",
      reactive_menu_aria_label_closedcaption: "Close {0}",
      interactivity_show: "Show",
      interactivity_hide: "Hide",
      play_video: "Play Video",
      playing: "Video playing",
      paused: "Video paused",
    };
    t.ccCultureLocStrings = {
      "ar-ab": "عربي",
      "ar-xm": "عربي",
      "ar-ma": "عربي",
      "ar-sa": "عربي",
      "eu-es": "Euskara",
      "bg-bg": "Български",
      "ca-es": "Català",
      "zh-cn": "简体中文",
      "zh-hk": "繁體中文",
      "zh-tw": "繁體中文",
      "hr-hr": "Hrvatski",
      "cs-cz": "Čeština",
      "da-dk": "Dansk",
      "nl-be": "Nederlands",
      "nl-nl": "Nederlands",
      "en-ab": "English",
      "en-aa": "English",
      "en-au": "English",
      "en-ca": "English",
      "en-eu": "English",
      "en-hk": "English",
      "en-in": "English",
      "en-id": "English",
      "en-ie": "English",
      "en-jm": "English",
      "en-my": "English",
      "en-nz": "English",
      "en-pk": "English",
      "en-ph": "English",
      "en-sg": "English",
      "en-za": "English",
      "en-tt": "English",
      "en-gb": "English",
      "en-us": "English",
      "et-ee": "Eesti",
      "fi-fi": "Suomi",
      "fr-ab": "Français",
      "fr-be": "Français",
      "fr-ca": "Français",
      "fr-fr": "Français",
      "fr-xf": "Français",
      "fr-ch": "Français",
      "gl-es": "Galego",
      "de-de": "Deutsch",
      "de-at": "Deutsch",
      "de-ch": "Deutsch",
      "el-gr": "Ελληνικά",
      "he-il": "עברית",
      "hi-in": "हिंदी",
      "hu-hu": "Magyar",
      "is-is": "Íslenska",
      "id-id": "Bahasa Indonesia",
      "it-it": "Italiano",
      "ja-jp": "日本語",
      "kk-kz": "Қазақ",
      "ko-kr": "한국어",
      "lv-lv": "Latviešu",
      "lt-lt": "Lietuvių",
      "ms-my": "Bahasa Melayu (Asia Tenggara)‎",
      "nb-no": "Norsk (bokmål)",
      "nn-no": "Norsk (nynorsk)",
      "fa-ir": "فارسی",
      "pl-pl": "Polski",
      "pt-br": "Português (Brasil)‎",
      "pt-pt": "Português (Portugal)‎",
      "ro-ro": "Română",
      "ru-ru": "Русский",
      "sr-latn-rs": "Srpski",
      "sk-sk": "Slovenčina",
      "sl-si": "Slovenski",
      "es-ar": "Español",
      "es-cl": "Español",
      "es-co": "Español",
      "es-cr": "Español",
      "es-do": "Español",
      "es-ec": "Español",
      "es-us": "Español",
      "es-gt": "Español",
      "es-hn": "Español",
      "es-xl": "Español",
      "es-mx": "Español",
      "es-ni": "Español",
      "es-pa": "Español",
      "es-py": "Español",
      "es-pe": "Español",
      "es-pr": "Español",
      "es-es": "Español",
      "es-uy": "Español",
      "es-ve": "Español",
      "sv-se": "Svenska",
      "tl-ph": "Tagalog",
      "th-th": "ไทย",
      "tr-tr": "Türkçe",
      "uk-ua": "Українська",
      "ur-pk": "اردو",
      "vi-vn": "Tiếng Việt",
      "sl-sl": "Slovenian",
    };
    t.ccLanguageCodes = {
      "ar-ab": "ar",
      "ar-xm": "ar",
      "ar-ma": "ar",
      "ar-sa": "ar",
      "eu-es": "eu",
      "bg-bg": "bg",
      "ca-es": "ca",
      "zh-cn": "zh",
      "zh-hk": "zh",
      "zh-tw": "zh",
      "hr-hr": "hr",
      "cs-cz": "cs",
      "da-dk": "da",
      "nl-be": "nl",
      "nl-nl": "nl",
      "en-ab": "en",
      "en-aa": "en",
      "en-au": "en",
      "en-ca": "en",
      "en-eu": "en",
      "en-hk": "en",
      "en-in": "en",
      "en-id": "en",
      "en-ie": "en",
      "en-jm": "en",
      "en-my": "en",
      "en-nz": "en",
      "en-pk": "en",
      "en-ph": "en",
      "en-sg": "en",
      "en-za": "en",
      "en-tt": "en",
      "en-gb": "en",
      "en-us": "en",
      "et-ee": "et",
      "fi-fi": "fi",
      "fr-ab": "fr",
      "fr-be": "fr",
      "fr-ca": "fr",
      "fr-fr": "fr",
      "fr-xf": "fr",
      "fr-ch": "fr",
      "gl-es": "gl",
      "de-de": "de",
      "de-at": "de",
      "de-ch": "de",
      "el-gr": "el",
      "he-il": "he",
      "hi-in": "hi",
      "hu-hu": "hu",
      "is-is": "is",
      "id-id": "id",
      "it-it": "it",
      "ja-jp": "ja",
      "kk-kz": "kk",
      "ko-kr": "ko",
      "lv-lv": "lv",
      "lt-lt": "lt",
      "ms-my": "ms‎",
      "nb-no": "nb",
      "nn-no": "nn",
      "fa-ir": "fa",
      "pl-pl": "pl",
      "pt-br": "pt‎",
      "pt-pt": "pt‎",
      "ro-ro": "ro",
      "ru-ru": "ru",
      "sr-latn-rs": "sr",
      "sk-sk": "sk",
      "sl-si": "sl",
      "es-ar": "es",
      "es-cl": "es",
      "es-co": "es",
      "es-cr": "es",
      "es-do": "es",
      "es-ec": "es",
      "es-us": "es",
      "es-gt": "es",
      "es-hn": "es",
      "es-xl": "es",
      "es-mx": "es",
      "es-ni": "es",
      "es-pa": "es",
      "es-py": "es",
      "es-pe": "es",
      "es-pr": "es",
      "es-es": "es",
      "es-uy": "es",
      "es-ve": "es",
      "sv-se": "sv",
      "tl-ph": "tl",
      "th-th": "th",
      "tr-tr": "tr",
      "uk-ua": "uk",
      "ur-pk": "ur",
      "vi-vn": "vi",
      "sl-sl": "sl",
    };
    t.playerLocKeys = {
      audio_tracks: "audio_tracks",
      closecaption_off: "closecaption_off",
      geolocation_error: "geolocation_error",
      media_err_aborted: "media_err_aborted",
      media_err_decode: "media_err_decode",
      media_err_network: "media_err_network",
      media_err_src_not_supported: "media_err_src_not_supported",
      media_err_unknown_error: "media_err_unknown_error",
      media_err_amp_encrypt: "media_err_amp_encrypt",
      media_err_amp_player_mismatch: "media_err_amp_player_mismatch",
      browserunsupported: "browserunsupported",
      browserunsupported_download: "browserunsupported_download",
      expand: "expand",
      mute: "mute",
      nullvideoerror: "nullvideoerror",
      pause: "pause",
      play: "play",
      play_video: "play_video",
      playing: "playing",
      paused: "paused",
      play_pause_button_tooltip: "play_pause_button_tooltip",
      live_caption: "live_caption",
      live_label: "live_label",
      playbackerror: "playbackerror",
      standarderror: "standarderror",
      time: "time",
      more_caption: "more_caption",
      data_error: "data_error",
      seek: "seek",
      unexpand: "unexpand",
      unmute: "unmute",
      volume: "volume",
      quality: "quality",
      quality_hd: "quality_hd",
      quality_hq: "quality_hq",
      quality_lo: "quality_lo",
      quality_sd: "quality_sd",
      quality_auto: "quality_auto",
      cc_customize: "cc_customize",
      cc_text_font: "cc_text_font",
      cc_text_color: "cc_text_color",
      cc_color_black: "cc_color_black",
      cc_color_blue: "cc_color_blue",
      cc_color_cyan: "cc_color_cyan",
      cc_color_green: "cc_color_green",
      cc_color_grey: "cc_color_grey",
      cc_color_magenta: "cc_color_magenta",
      cc_color_red: "cc_color_red",
      cc_color_white: "cc_color_white",
      cc_color_yellow: "cc_color_yellow",
      cc_font_name_casual: "cc_font_name_casual",
      cc_font_name_cursive: "cc_font_name_cursive",
      cc_font_name_monospacedsansserif: "cc_font_name_monospacedsansserif",
      cc_font_name_proportionalsansserif: "cc_font_name_proportionalsansserif",
      cc_font_name_monospacedserif: "cc_font_name_monospacedserif",
      cc_font_name_proportionalserif: "cc_font_name_proportionalserif",
      cc_font_name_smallcapitals: "cc_font_name_smallcapitals",
      cc_text_size: "cc_text_size",
      cc_text_size_default: "cc_text_size_default",
      cc_text_size_extralarge: "cc_text_size_extralarge",
      cc_text_size_large: "cc_text_size_large",
      cc_text_size_maximum: "cc_text_size_maximum",
      cc_text_size_small: "cc_text_size_small",
      cc_appearance: "cc_appearance",
      cc_preset1: "cc_preset1",
      cc_preset2: "cc_preset2",
      cc_preset3: "cc_preset3",
      cc_preset4: "cc_preset4",
      cc_preset5: "cc_preset5",
      cc_presettings: "cc_presettings",
      cc_text_background_color: "cc_text_background_color",
      cc_text_background_opacity: "cc_text_background_opacity",
      cc_text_opacity: "cc_text_opacity",
      cc_percent_0: "cc_percent_0",
      cc_percent_100: "cc_percent_100",
      cc_percent_25: "cc_percent_25",
      cc_percent_50: "cc_percent_50",
      cc_percent_75: "cc_percent_75",
      cc_text_edge_color: "cc_text_edge_color",
      cc_text_edge_style: "cc_text_edge_style",
      cc_text_edge_style_depressed: "cc_text_edge_style_depressed",
      cc_text_edge_style_dropshadow: "cc_text_edge_style_dropshadow",
      cc_text_edge_style_none: "cc_text_edge_style_none",
      cc_text_edge_style_raised: "cc_text_edge_style_raised",
      cc_text_edge_style_uniform: "cc_text_edge_style_uniform",
      cc_window_color: "cc_window_color",
      cc_window_opacity: "cc_window_opacity",
      cc_reset: "cc_reset",
      closecaption: "closecaption",
      close_text: "close_text",
      playbackspeed: "playbackspeed",
      playbackspeed_normal: "playbackspeed_normal",
      sharing_label: "sharing_label",
      sharing_facebook: "sharing_facebook",
      sharing_twitter: "sharing_twitter",
      sharing_linkedin: "sharing_linkedin",
      sharing_skype: "sharing_skype",
      sharing_mail: "sharing_mail",
      sharing_copy: "sharing_copy",
      loading_value_text: "loading_value_text",
      loading_aria_label: "loading_aria_label",
      descriptive_audio: "descriptive_audio",
      unknown_language: "unknown_language",
      download_label: "download_label",
      download_transcript: "download_transcript",
      download_audio: "download_audio",
      download_video: "download_video",
      download_videoWithCC: "download_videoWithCC",
      agegate_day: "agegate_day",
      agegate_month: "agegate_month",
      agegate_year: "agegate_year",
      agegate_enterdate: "agegate_enterdate",
      agegate_enterdate_arialabel: "agegate_enterdate_arialabel",
      agegate_fail: "agegate_fail",
      agegate_verifyyourage: "agegate_verifyyourage",
      agegate_submit: "agegate_submit",
      agegate_dateorder: "agegate_dateorder",
      previous_menu_aria_label: "previous_menu_aria_label",
      reactive_menu_aria_label: "reactive_menu_aria_label",
      reactive_menu_aria_label_closedcaption:
        "reactive_menu_aria_label_closedcaption",
      interactivity_show: "interactivity_show",
      interactivity_hide: "interactivity_hide",
    };
    e = {
      transcript: "download_transcript",
      audio: "download_audio",
      video: "download_video",
      videoWithCC: "download_videoWithCC",
    };
    o = (function () {
      function n(n, t, i, r) {
        this.market = n;
        this.resHost = t;
        this.resHash = i;
        this.onErrorCallback = r;
      }
      return (
        (n.prototype.getCorrectResourceHost = function () {
          return (
            this.resHost ||
            (r.PlayerConfig.resourceHost.indexOf("%playerResourceHost") === -1
              ? r.PlayerConfig.resourceHost
              : r.PlayerConfig.defaultResourceHost)
          );
        }),
        (n.prototype.getResourceHash = function () {
          return (
            this.resHash ||
            (r.PlayerConfig.resourceHash.indexOf("%playerResourceHash") === -1
              ? r.PlayerConfig.resourceHash
              : "latest")
          );
        }),
        (n.prototype.queueRequest = function (t) {
          var f = this,
            e;
          if (n.requestQueue[this.market]) {
            n.requestQueue[this.market].push(t);
            return;
          }
          n.requestQueue[this.market] = [t];
          e = i.format(
            r.PlayerConfig.resourcesUrl,
            this.getCorrectResourceHost(),
            this.market,
            this.getResourceHash()
          );
          u.PlayerUtility.ajax(
            e,
            function (t) {
              if (t && t.length)
                try {
                  n.resources[f.market] = JSON.parse(t);
                } catch (i) {
                  if (f.onErrorCallback)
                    f.onErrorCallback({
                      errorType:
                        "oneplayer.error.LocalizationHelper.queueRequest.parse",
                      errorDesc: "Parsing error " + e,
                    });
                }
              else if (f.onErrorCallback)
                f.onErrorCallback({
                  errorType:
                    "oneplayer.error.LocalizationHelper.queueRequest.ajaxcall",
                  errorDesc: "No result for file: " + e,
                });
              f.completeRequest();
            },
            this.completeRequest
          );
        }),
        (n.prototype.completeRequest = function () {
          var t, i, r;
          if (n.requestQueue[this.market]) {
            for (t = 0, i = n.requestQueue[this.market]; t < i.length; t++)
              (r = i[t]), this.doCallback(r);
            n.requestQueue[this.market] = null;
          }
        }),
        (n.prototype.doCallback = function (n) {
          n && typeof n == "function" && n();
        }),
        (n.prototype.loadResources = function (t) {
          if (!this.market || n.resources[this.market]) {
            this.doCallback(t);
            return;
          }
          this.queueRequest(t);
        }),
        (n.prototype.getLocalizedValue = function (t) {
          return t
            ? (n.resources[this.market] && n.resources[this.market][t]) ||
                f[t] ||
                ""
            : "";
        }),
        (n.prototype.getLanguageNameFromLocale = function (n) {
          return (
            t.ccCultureLocStrings[n] ||
            this.getLocalizedValue(t.playerLocKeys.unknown_language)
          );
        }),
        (n.prototype.getLanguageCodeFromLocale = function (n) {
          return t.ccLanguageCodes[n] || null;
        }),
        (n.prototype.getLocalizedMediaTypeName = function (t) {
          if (!t || !e[t]) return "";
          var i = e[t];
          return (
            (n.resources[this.market] && n.resources[this.market][i]) ||
            f[i] ||
            ""
          );
        }),
        (n.resources = {}),
        (n.requestQueue = {}),
        n
      );
    })();
    t.LocalizationHelper = o;
  });
  define("screen-manager-helper", ["require", "exports"], function (n, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = (function () {
      function n() {
        this.screenElements = [];
        this.nextScreenElementId = 0;
      }
      return (
        (n.prototype.registerElement = function (n) {
          return n.HtmlObject == null || n.Priority == null || n.Height == null
            ? null
            : (n.Transition == null && (n.Transition = "bottom 0.5s ease-in"),
              n.Height <= 0 && (n.Height = n.HtmlObject.clientHeight),
              (n.Id = this.nextScreenElementId),
              this.nextScreenElementId++,
              (n.HtmlObject.style.bottom = "-" + n.Height + "px"),
              (n.HtmlObject.style.transition = n.Transition),
              this.screenElements.push(n),
              this.sortScreenElements(),
              n);
        }),
        (n.prototype.updateElementDisplay = function (n, t) {
          for (
            var i, r = 0, f = !1, u = this.screenElements.length - 1;
            u >= 0;
            u--
          )
            (i = this.screenElements[u]),
              i.Id === n.Id && i.IsVisible !== t
                ? ((i.IsVisible = t),
                  (f = !0),
                  i.IsVisible
                    ? ((i.HtmlObject.style.bottom = r + "px"), (r += i.Height))
                    : (i.HtmlObject.style.bottom = "-" + n.Height + "px"))
                : i.IsVisible &&
                  (f && (i.HtmlObject.style.bottom = r + "px"), (r += i.Height));
        }),
        (n.prototype.updateElementHeight = function (n, t) {
          for (
            var i, r = 0, f = !1, u = this.screenElements.length - 1;
            u >= 0;
            u--
          )
            (i = this.screenElements[u]),
              i.Id === n.Id && i.Height !== t
                ? ((i.Height = t),
                  (f = !0),
                  i.IsVisible &&
                    ((i.HtmlObject.style.bottom = r + "px"), (r += i.Height)))
                : i.IsVisible &&
                  (f && (i.HtmlObject.style.bottom = r + "px"), (r += i.Height));
        }),
        (n.prototype.deleteElement = function (n) {
          var i, t;
          for (
            this.updateElementDisplay(n, !1), i = -1, t = 0;
            t < this.screenElements.length;
            t++
          )
            if (this.screenElements[t].Id === n.Id) {
              i = t;
              break;
            }
          this.screenElements.splice(i, 1);
        }),
        (n.prototype.sortScreenElements = function () {
          this.screenElements.sort(function (n, t) {
            return n.Priority < t.Priority ? -1 : n.Priority > t.Priority ? 1 : 0;
          });
        }),
        n
      );
    })();
    t.ScreenManagerHelper = i;
  });
  define("sharing-helper", [
    "require",
    "exports",
    "htmlExtensions",
    "localization-helper",
    "player-constants",
  ], function (n, t, i, r, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var f = {
        "zh-cn": [
          u.shareTypes.facebook,
          u.shareTypes.twitter,
          u.shareTypes.linkedin,
          u.shareTypes.skype,
        ],
      },
      e = (function () {
        function n() {}
        return (
          (n.getCurrentPageUrl = function () {
            return window.location.href.replace("&jsapi=true", "");
          }),
          (n.tryCopyTextToClipboard = function (n) {
            var u, t, r;
            if (window.clipboardData) window.clipboardData.setData("text", n);
            else {
              u = 0;
              t = document.createElement("textarea");
              t.value = n;
              r = i.selectFirstElement("body");
              u = r.scrollTop;
              r.appendChild(t);
              t.select();
              try {
                document.execCommand("copy");
              } catch (f) {}
              t.remove();
              r.scrollTop = u;
            }
          }),
          (n.getShareOptionsData = function (t, i, e) {
            var s, h, c, l, o;
            if (!i || !i.share || !i.shareOptions || !t) return null;
            for (
              s = [],
                h = encodeURIComponent(e || n.getCurrentPageUrl()),
                c = 0,
                l = i.shareOptions;
              c < l.length;
              c++
            )
              if (
                ((o = l[c]),
                (o = o.toLowerCase()),
                !i.market || !f[i.market] || !(f[i.market].indexOf(o) >= 0))
              )
                switch (o) {
                  case u.shareTypes.facebook:
                    s.push({
                      url: "//www.facebook.com/share.php?u=" + h,
                      id: o,
                      label: t.getLocalizedValue(
                        r.playerLocKeys.sharing_facebook
                      ),
                      image:
                        "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxzdHlsZT4uc3Qwe2Rpc3BsYXk6bm9uZTt9IC5zdDF7ZGlzcGxheTppbmxpbmU7fSAuc3Qye2ZpbGw6bm9uZTt9IC5zdDN7ZmlsbDojRkZGRkZGO308L3N0eWxlPjxnIGlkPSJSZXN0XzNfIiBjbGFzcz0ic3QwIj48ZyBpZD0iVHdpdHRlcl8zXyIgY2xhc3M9InN0MSI+PHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yOC40IDguNmMtLjkuNC0xLjkuNy0yLjkuOCAxLS42IDEuOC0xLjYgMi4yLTIuOC0xIC42LTIuMSAxLTMuMiAxLjItLjktMS0yLjItMS42LTMuNy0xLjYtMi44IDAtNSAyLjMtNSA1IDAgLjQgMCAuOC4xIDEuMi00LjItLjItNy45LTIuMi0xMC40LTUuMy0uNC44LS43IDEuNy0uNyAyLjYgMCAxLjggMSAzLjMgMi4zIDQuMi0uOCAwLTIuMi0uMy0yLjItLjZ2LjFjMCAyLjQgMS42IDQuNSAzLjkgNS0uNC4xLS45LjItMS40LjItLjMgMC0uNyAwLTEtLjEuNiAyIDIuNSAzLjUgNC43IDMuNS0xLjUgMS4yLTMuNyAyLTYuMSAyLS40IDAtLjggMC0xLjItLjEgMi4yIDEuNCA0LjkgMi4zIDcuNyAyLjMgOS4zIDAgMTQuNC03LjcgMTQuNC0xNC40di0uN2MxLS42IDEuOC0xLjUgMi41LTIuNXoiLz48L2c+PC9nPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDBoMzJ2MzJIMHoiIGlkPSJGYWNlYm9va183XyIvPjxwYXRoIGlkPSJXaGl0ZV8yXyIgY2xhc3M9InN0MyIgZD0iTTMwLjIgMEgxLjhDLjggMCAwIC44IDAgMS44djI4LjVjMCAxIC44IDEuOCAxLjggMS44aDE1LjNWMTkuNmgtNC4ydi00LjhoNC4ydi0zLjZjMC00LjEgMi41LTYuNCA2LjItNi40IDEuOCAwIDMuMy4yIDMuNy4ydjQuM2gtMi42Yy0yIDAtMi40IDEtMi40IDIuNHYzLjFoNC44bC0uNiA0LjhIMjJWMzJoOC4yYzEgMCAxLjgtLjggMS44LTEuOFYxLjhjMC0xLS44LTEuOC0xLjgtMS44eiIvPjwvc3ZnPg==",
                    });
                    break;
                  case u.shareTypes.twitter:
                    s.push({
                      url: "//twitter.com/share?url=" + h + "&text=",
                      id: o,
                      label: t.getLocalizedValue(r.playerLocKeys.sharing_twitter),
                      image:
                        "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxzdHlsZT4uc3Qwe2ZpbGw6I0ZGRkZGRjt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzIgNi4xYy0xLjIuNS0yLjUuOS0zLjggMSAxLjMtLjggMi4zLTIuMSAyLjktMy42LTEuMy44LTIuNyAxLjMtNC4yIDEuNkMyNS44IDMuOCAyNC4xIDMgMjIuMSAzYy0zLjYgMC02LjUgMy02LjUgNi41IDAgLjUgMCAxIC4xIDEuNi01LjQtLjMtMTAuMi0yLjktMTMuNS02LjktLjUgMS0uOSAyLjItLjkgMy40IDAgMi4zIDEuMyA0LjMgMyA1LjUtMSAwLTIuOS0uNC0yLjktLjh2LjFjMCAzLjEgMi4xIDUuOSA1LjEgNi41LS41LjEtMS4yLjItMS44LjItLjQgMC0uOSAwLTEuMy0uMS44IDIuNiAzLjMgNC42IDYuMSA0LjYtMiAxLjYtNC44IDIuNi03LjkgMi42LS41IDAtMSAwLTEuNi0uMSAyLjkgMS44IDYuNCAzIDEwIDMgMTIuMSAwIDE4LjctMTAgMTguNy0xOC43di0uOWMxLjMtLjkgMi40LTIuMSAzLjMtMy40eiIvPjwvc3ZnPg==",
                    });
                    break;
                  case u.shareTypes.skype:
                    s.push({
                      url:
                        "//web.skype.com/share?url=" +
                        h +
                        "&amp;lang=" +
                        i.market,
                      id: o,
                      label: t.getLocalizedValue(r.playerLocKeys.sharing_skype),
                      image:
                        "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxzdHlsZT4uc3Qwe2Rpc3BsYXk6bm9uZTt9IC5zdDF7ZGlzcGxheTppbmxpbmU7fSAuc3Qye2ZpbGw6bm9uZTt9IC5zdDN7ZmlsbDojRkZGRkZGO308L3N0eWxlPjxnIGlkPSJMYXllcl8xXzFfIiBjbGFzcz0ic3QwIj48ZyBpZD0iUmVzdF8zXyIgY2xhc3M9InN0MSI+PGcgaWQ9IlR3aXR0ZXJfM18iPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDBoMzJ2MzJIMHoiLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjguNCA4LjZjLS45LjQtMS45LjctMi45LjggMS0uNiAxLjgtMS42IDIuMi0yLjgtMSAuNi0yLjEgMS0zLjIgMS4yLS45LTEtMi4yLTEuNi0zLjctMS42LTIuOCAwLTUgMi4zLTUgNSAwIC40IDAgLjguMSAxLjItNC4yLS4yLTcuOS0yLjItMTAuNC01LjMtLjQuOC0uNyAxLjctLjcgMi42IDAgMS44IDEgMy4zIDIuMyA0LjItLjggMC0yLjItLjMtMi4yLS42di4xYzAgMi40IDEuNiA0LjUgMy45IDUtLjQuMS0uOS4yLTEuNC4yLS4zIDAtLjcgMC0xLS4xLjYgMiAyLjUgMy41IDQuNyAzLjUtMS41IDEuMi0zLjcgMi02LjEgMi0uNCAwLS44IDAtMS4yLS4xIDIuMiAxLjQgNC45IDIuMyA3LjcgMi4zIDkuMyAwIDE0LjQtNy43IDE0LjQtMTQuNHYtLjdjMS0uNiAxLjgtMS41IDIuNS0yLjV6Ii8+PC9nPjwvZz48ZyBpZD0iRmFjZWJvb2tfN18iIGNsYXNzPSJzdDEiPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDBoMzJ2MzJIMHoiLz48cGF0aCBpZD0iZl82XyIgY2xhc3M9InN0MyIgZD0iTTE4IDI2di05aDIuNmwuNS00SDE4di0xLjljMC0xLS4yLTIuMSAxLjMtMi4xSDIxVjYuMVMxOS43IDYgMTguNCA2QzE1LjcgNiAxNCA3LjcgMTQgMTAuN1YxM2gtM3Y0aDN2OWg0eiIvPjwvZz48L2c+PHBhdGggY2xhc3M9InN0MyIgZD0iTTMwLjkgMTguNmMuMS0uOC4xLTEuOC4xLTIuNiAwLTguMy02LjctMTUtMTUtMTUtMSAwLTEuOCAwLTIuNi4yQzEyLjIuMyAxMC42IDAgOSAwIDQgMCAwIDQgMCA5YzAgMS42LjUgMy4yIDEuMSA0LjUtLjEuNy0uMSAxLjctLjEgMi41IDAgOC4zIDYuNyAxNSAxNSAxNSAxIDAgMS44IDAgMi42LS4yIDEuMy44IDIuOSAxLjEgNC41IDEuMSA1IDAgOS00IDktOS0uMS0xLjYtLjQtMy4xLTEuMi00LjN6bS0xNC43IDYuNWMtNS4xIDAtNy41LTIuNi03LjUtNC41IDAtMSAuOC0xLjYgMS44LTEuNiAyLjIgMCAxLjYgMy4yIDUuOCAzLjIgMi4xIDAgMy40LTEuMyAzLjQtMi40IDAtLjYtLjUtMS40LTEuOC0xLjhsLTQuOC0xYy0zLjctMS00LjMtMy00LjMtNC44IDAtMy44IDMuNS01LjMgNy01LjMgMy4yIDAgNi45IDEuOCA2LjkgNC4yIDAgMS0uOCAxLjYtMS44IDEuNi0xLjkgMC0xLjYtMi42LTUuMy0yLjYtMS45IDAtMi45LjgtMi45IDIuMXMxLjQgMS42IDIuNyAxLjlsMy40LjhjMy43LjggNC42IDMgNC42IDUuMS4xIDIuNy0yLjQgNS4xLTcuMiA1LjF6Ii8+PC9zdmc+",
                    });
                    break;
                  case u.shareTypes.linkedin:
                    s.push({
                      url:
                        "//www.linkedin.com/shareArticle?mini=true&url=" +
                        h +
                        "&title=&summary=&source=",
                      id: o,
                      label: t.getLocalizedValue(
                        r.playerLocKeys.sharing_linkedin
                      ),
                      image:
                        "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxzdHlsZT4uc3Qwe2Rpc3BsYXk6bm9uZTt9IC5zdDF7ZGlzcGxheTppbmxpbmU7fSAuc3Qye2ZpbGw6bm9uZTt9IC5zdDN7ZmlsbDojRkZGRkZGO308L3N0eWxlPjxnIGlkPSJMYXllcl8xXzFfIiBjbGFzcz0ic3QwIj48ZyBpZD0iUmVzdF8zXyIgY2xhc3M9InN0MSI+PGcgaWQ9IlR3aXR0ZXJfM18iPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDBoMzJ2MzJIMHoiLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjguNCA4LjZjLS45LjQtMS45LjctMi45LjggMS0uNiAxLjgtMS42IDIuMi0yLjgtMSAuNi0yLjEgMS0zLjIgMS4yLS45LTEtMi4yLTEuNi0zLjctMS42LTIuOCAwLTUgMi4zLTUgNSAwIC40IDAgLjguMSAxLjItNC4yLS4yLTcuOS0yLjItMTAuNC01LjMtLjQuOC0uNyAxLjctLjcgMi42IDAgMS44IDEgMy4zIDIuMyA0LjItLjggMC0yLjItLjMtMi4yLS42di4xYzAgMi40IDEuNiA0LjUgMy45IDUtLjQuMS0uOS4yLTEuNC4yLS4zIDAtLjcgMC0xLS4xLjYgMiAyLjUgMy41IDQuNyAzLjUtMS41IDEuMi0zLjcgMi02LjEgMi0uNCAwLS44IDAtMS4yLS4xIDIuMiAxLjQgNC45IDIuMyA3LjcgMi4zIDkuMyAwIDE0LjQtNy43IDE0LjQtMTQuNHYtLjdjMS0uNiAxLjgtMS41IDIuNS0yLjV6Ii8+PC9nPjwvZz48ZyBpZD0iRmFjZWJvb2tfN18iIGNsYXNzPSJzdDEiPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDBoMzJ2MzJIMHoiLz48cGF0aCBpZD0iZl82XyIgY2xhc3M9InN0MyIgZD0iTTE4IDI2di05aDIuNmwuNS00SDE4di0xLjljMC0xLS4yLTIuMSAxLjMtMi4xSDIxVjYuMVMxOS43IDYgMTguNCA2QzE1LjcgNiAxNCA3LjcgMTQgMTAuN1YxM2gtM3Y0aDN2OWg0eiIvPjwvZz48L2c+PGcgaWQ9IkxheWVyXzMiIGNsYXNzPSJzdDAiPjxnIGlkPSJTa3lwZV83XyIgY2xhc3M9InN0MSI+PHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgzMnYzMkgweiIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNS4yIDE3LjZjLjEtLjUuMS0xLjEuMS0xLjYgMC01LjItNC4yLTkuNC05LjQtOS40LS42IDAtMS4xIDAtMS42LjEtLjgtLjUtMS44LS43LTIuOC0uNy0zLjEgMC01LjYgMi41LTUuNiA1LjYgMCAxIC4zIDIgLjcgMi44LS4xLjUtLjEgMS4xLS4xIDEuNiAwIDUuMiA0LjIgOS40IDkuNCA5LjQuNiAwIDEuMSAwIDEuNi0uMS44LjUgMS44LjcgMi44LjcgMy4xIDAgNS42LTIuNSA1LjYtNS42IDAtMS4xLS4yLTItLjctMi44ek0xNiAyMS43Yy0zLjIgMC00LjctMS42LTQuNy0yLjggMC0uNi41LTEgMS4xLTEgMS40IDAgMSAyIDMuNiAyIDEuMyAwIDIuMS0uOCAyLjEtMS41IDAtLjQtLjMtLjktMS4xLTEuMWwtMi45LS43Yy0yLjMtLjYtMi43LTEuOS0yLjctMyAwLTIuNCAyLjItMy4zIDQuNC0zLjMgMiAwIDQuMyAxLjEgNC4zIDIuNiAwIC42LS41IDEtMS4xIDEtMS4yIDAtMS0xLjYtMy4zLTEuNi0xLjIgMC0xLjguNS0xLjggMS4zcy45IDEgMS43IDEuMmwyLjEuNWMyLjMuNSAyLjkgMS45IDIuOSAzLjIgMCAxLjctMS42IDMuMi00LjYgMy4yeiIvPjwvZz48L2c+PHBhdGggY2xhc3M9InN0MyIgZD0iTTI5LjYgMEgyLjRDMS4xIDAgMCAxIDAgMi4zdjI3LjRDMCAzMSAxLjEgMzIgMi40IDMyaDI3LjNjMS4zIDAgMi40LTEgMi40LTIuM1YyLjNDMzIgMSAzMC45IDAgMjkuNiAwek05LjUgMjcuM0g0LjdWMTJoNC43djE1LjN6TTcuMSA5LjljLTEuNSAwLTIuOC0xLjItMi44LTIuOCAwLTEuNSAxLjItMi44IDIuOC0yLjggMS41IDAgMi44IDEuMiAyLjggMi44IDAgMS42LTEuMyAyLjgtMi44IDIuOHptMjAuMiAxNy40aC00Ljd2LTcuNGMwLTEuOCAwLTQtMi41LTRzLTIuOCAxLjktMi44IDMuOXY3LjZoLTQuN1YxMkgxN3YyLjFoLjFjLjYtMS4yIDIuMi0yLjUgNC41LTIuNSA0LjggMCA1LjcgMy4yIDUuNyA3LjN2OC40eiIvPjwvc3ZnPg==",
                    });
                    break;
                  case u.shareTypes.mail:
                    s.push({
                      url: "mailto:?subject=Check out this great video&body=" + h,
                      id: o,
                      label: t.getLocalizedValue(r.playerLocKeys.sharing_mail),
                      glyph: "glyph-mail",
                    });
                    break;
                  case u.shareTypes.copy:
                    s.push({
                      url: h,
                      id: o,
                      label: t.getLocalizedValue(r.playerLocKeys.sharing_copy),
                      glyph: "glyph-copy",
                    });
                }
            return s;
          }),
          n
        );
      })();
    t.SharingHelper = e;
  });
  define("core-player", [
    "require",
    "exports",
    "video-controls",
    "video-closed-captions",
    "video-closed-captions-settings",
    "utility",
    "htmlExtensions",
    "stringExtensions",
    "player-data-interfaces",
    "player-options",
    "html5-video-wrapper",
    "amp-wrapper",
    "has-video-wrapper",
    "hls-video-wrapper",
    "native-video-wrapper",
    "environment",
    "stopwatch",
    "player-utility",
    "player-constants",
    "jsll-reporter",
    "localization-helper",
    "player-config",
    "sharing-helper",
    "player-constants",
    "interactive-triggers-helper",
    "screen-manager-helper",
    "age-gate-helper",
    "inview-helper",
    "video-shim-data-fetcher",
    "context-menu",
  ], function (
    n,
    t,
    i,
    r,
    u,
    f,
    e,
    o,
    s,
    h,
    c,
    l,
    a,
    v,
    y,
    p,
    w,
    b,
    k,
    d,
    g,
    nt,
    tt,
    it,
    rt,
    ut,
    ft,
    et,
    ot,
    st
  ) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    t.PlayerStates = {
      Init: "init",
      PlayerLoaded: "playerLoaded",
      Loading: "loading",
      Ready: "ready",
      Playing: "playing",
      Paused: "paused",
      Buffering: "buffering",
      Seeking: "seeking",
      Ended: "ended",
      Error: "error",
      Stopped: "stopped",
    };
    var ht = {
        AudioTracks: "audio-tracks",
        ClosedCaption: "close-caption",
        ClosedCaptionSettings: "cc-settings",
        PlaybackSpeed: "playback-speed",
        Quality: "quality",
        Share: "share",
        Download: "download",
      },
      ct = {
        PlayPause: "play-pause",
        MuteUnMute: "mute-unMute",
      },
      lt = [
        s.MediaQuality.HD,
        s.MediaQuality.HQ,
        s.MediaQuality.SD,
        s.MediaQuality.LO,
      ],
      at = (function () {
        function n(i, r) {
          var u = this;
          ((this.videoComponent = i),
          (this.videoElementIsFocus = !1),
          (this.canPlay = !1),
          (this.isFallbackVideo = !1),
          (this.playerData = {}),
          (this.wrapperLoadCalled = !1),
          (this.errorMessageDisplayed = !1),
          (this.isInFullscreen = !1),
          (this.isAudioTracksDoneSwitching = !0),
          (this.videoMetadata = null),
          (this.playerOptions = null),
          (this.isBuffering = !1),
          (this.isWindowClosing = !1),
          (this.isFirstTimePlayed = !0),
          (this.showcontrolFirstTime = !0),
          (this.isVideoMuted = !1),
          (this.commonPlayerImpressionReported = !1),
          (this.areMediaEventsBound = !1),
          (this.areControlsInitialized = !1),
          (this.areControlsVisible = !1),
          (this.seekFrom = null),
          (this.volumeStart = null),
          (this.playerTechnology = null),
          (this.nextCheckpoint = null),
          (this.stopwatchBuffering = new w.Stopwatch()),
          (this.stopwatchLoading = new w.Stopwatch()),
          (this.stopwatchPlaying = new w.Stopwatch()),
          (this.currentVideoStopwatchPlaying = new w.Stopwatch()),
          (this.firstByteTimer = null),
          (this.lastVolume = nt.PlayerConfig.defaultVolume),
          (this.currentVideoFile = null),
          (this.reporters = []),
          (this.playOnDataLoad = !1),
          (this.startTimeOnDataLoad = 0),
          (this.locReady = !1),
          (this.playerId = null),
          (this.playTriggered = !1),
          (this.playPauseTrigger = !1),
          (this.hasProgressive = !1),
          (this.hasAdaptive = !1),
          (this.useAdaptive = !1),
          (this.hasHLS = !1),
          (this.hasInteractivity = !1),
          (this.isVideoPlayerSupported = !0),
          (this.hasDataError = !1),
          (this.dataErrorShown = !1),
          (this.playerEventCallbacks = []),
          (this.isContentStartReported = !1),
          (this.showEndImage = !1),
          (this.wasUserInteracted = !1),
          (this.wasUserIntiatedPause = !1),
          (this.timeRemainingCheckpointReached = !1),
          (this.inviewManager = null),
          (this.registedInviewManagerAlready = !1),
          (this.showingPosterImage = !1),
          (this.setAutoPlayNeeded = !1),
          (this.playerContainerEventHandler = function (n) {
            switch (n.type) {
              case "contextmenu":
                if ((n.preventDefault(), !window.storeApi))
                  switch (u.playerState) {
                    case t.PlayerStates.Ready:
                    case t.PlayerStates.Playing:
                    case t.PlayerStates.Paused:
                    case t.PlayerStates.Ended:
                    case t.PlayerStates.Stopped:
                      u.setupCustomizeContextMenu();
                      u.contextMenu.showMenu(n, u.playerContainer);
                  }
            }
          }),
          (this.documentEventHandler = function (n) {
            n = e.getEvent(n);
            switch (n.type) {
              case "click":
                u.customizedContextMenu &&
                  u.customizedContextMenu.setAttribute("aria-hidden", "true");
            }
          }),
          (this.videoControlsContainerEventHandler = function (n) {
            n = e.getEvent(n);
            switch (n.type) {
              case "contextmenu":
                u.customizedContextMenu.setAttribute("aria-hidden", "true");
                n.preventDefault();
                n.stopPropagation();
            }
          }),
          (this.playPauseButtonEventHandler = function (n) {
            n = e.getEvent(n);
            switch (n.type) {
              case "mouseover":
              case "focus":
                u.showElement(u.playPauseTooltip);
                p.Environment.isChrome &&
                  (u.isPaused()
                    ? u.setAriaLabelForButton(u.playPauseButton)
                    : u.playPauseButton.setAttribute(
                        "aria-label",
                        u.locPause.toLowerCase()
                      ));
                break;
              case "mouseout":
              case "blur":
                u.hideElement(u.playPauseTooltip);
            }
          }),
          (this.triggerPlayEventHandler = function (n) {
            n = e.getEvent(n);
            switch (n.type) {
              case "mouseover":
              case "focus":
                u.showElement(u.triggerTooltip);
                break;
              case "mouseout":
              case "blur":
                u.hideElement(u.triggerTooltip);
            }
          }),
          (this.triggerContainerEventHandler = function (n) {
            var t, i;
            n = e.getEvent(n);
            t = function (t) {
              u.onVideoPlayerClicked(n);
              t && u.videoControls && u.videoControls.setFocusOnControlBar();
              u.playerOptions &&
                u.playerOptions.playFullScreen &&
                u.enterFullScreen();
              u.playerOptions && u.playerOptions.showEndImage && u.hideImage();
              u.updateScreenReaderElement(u.locPlaying, !0);
              u.setFocusOnPlayButton();
              n.preventDefault && n.preventDefault();
              e.removeEvents(
                u.triggerContainer,
                "click keyup",
                u.triggerContainerEventHandler,
                !0
              );
            };
            switch (n.type) {
              case "click":
                t(!1);
                break;
              case "keyup":
                i = f.getKeyCode(e.getEvent(n));
                i === 32 && t(!1);
            }
          }),
          (this.triggerPlayPauseContainerEventHandler = function (n) {
            var t, i;
            n = e.getEvent(n);
            t = function () {
              u.isPlayable() &&
                (u.setUserInteracted(!0),
                u.isPaused()
                  ? (u.play(),
                    u.setUserIntiatedPause(!1),
                    !u.playPauseButton ||
                      (e.removeClass(u.playPauseButton, "glyph-play"),
                      e.addClass(u.playPauseButton, "glyph-pause"),
                      u.updateScreenReaderElement(u.locPlaying),
                      u.playPauseButton.setAttribute("aria-label", u.locPause),
                      e.setText(u.playPauseTooltip, u.locPause)))
                  : (u.pause(!0),
                    u.setUserIntiatedPause(!0),
                    !u.playPauseButton ||
                      (e.removeClass(u.playPauseButton, "glyph-pause"),
                      e.addClass(u.playPauseButton, "glyph-play"),
                      u.updateScreenReaderElement(u.locPaused),
                      u.setAriaLabelForButton(u.playPauseButton),
                      e.setText(u.playPauseTooltip, u.locPlay))));
            };
            switch (n.type) {
              case "click":
                t();
                break;
              case "keydown":
                i = f.getKeyCode(e.getEvent(n));
                i === 32 && t();
            }
          }),
          (this.onResourcesLoaded = function () {
            if (
              (b.PlayerUtility.createVideoPerfMarker(
                u.playerId,
                it.videoPerfMarkers.locReady
              ),
              u.videoMetadata && u.videoMetadata.geoFenced === !0)
            ) {
              u.playerState = t.PlayerStates.Error;
              u.hideSpinner();
              u.playerOptions.showImageForVideoError === !0 &&
              u.videoMetadata &&
              u.videoMetadata.posterframeUrl
                ? (u.hideTrigger(),
                  u.disablePlayPauseTrigger(),
                  u.displayImage(u.videoMetadata.posterframeUrl))
                : u.displayErrorMessage({
                    title: u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.geolocation_error
                    ),
                  });
              return;
            }
            u.locPlay = u.localizationHelper.getLocalizedValue(
              g.playerLocKeys.play
            );
            u.locPlayVideo = u.localizationHelper.getLocalizedValue(
              g.playerLocKeys.play_video
            );
            u.locPause = u.localizationHelper.getLocalizedValue(
              g.playerLocKeys.pause
            );
            u.locMute = u.localizationHelper.getLocalizedValue(
              g.playerLocKeys.mute
            );
            u.locUnmute = u.localizationHelper.getLocalizedValue(
              g.playerLocKeys.unmute
            );
            u.locPlaying = u.localizationHelper.getLocalizedValue(
              g.playerLocKeys.playing
            );
            u.locPaused = u.localizationHelper.getLocalizedValue(
              g.playerLocKeys.paused
            );
            u.setSpinnerProperties();
            u.setTriggerProperties();
            u.locReady = !0;
            u.initializeAgeGating();
            var n = u.ageGateHelper.verifyAgeGate();
            n && (u.hideTrigger(), u.hideSpinner());
            u.hasDataError &&
              !u.dataErrorShown &&
              (u.showDataError(), (u.hasDataError = !1));
          }),
          (this.onMediaEvent = function (n) {
            var t, i, r;
            if (!!n) {
              if (
                (e.customEvent(u.videoComponent, n.type, {
                  bubbles: n.bubbles,
                  cancelable: n.cancelable,
                }),
                u.playerEventCallbacks && u.playerEventCallbacks.length)
              )
                for (t = 0, i = u.playerEventCallbacks; t < i.length; t++)
                  (r = i[t]),
                    r &&
                      r({
                        name: n.type,
                      });
              switch (n.type.toLowerCase()) {
                case "canplay":
                case "canplaythrough":
                  u.onVideoCanPlay(n);
                  break;
                case "error":
                  u.onVideoError(n);
                  break;
                case "play":
                  u.onVideoPlay(n);
                  break;
                case "pause":
                  u.onVideoPause(n);
                  break;
                case "seeking":
                  u.onVideoSeeking(n);
                  break;
                case "seeked":
                  u.onVideoSeeked(n);
                  break;
                case "waiting":
                  u.onVideoWaiting(n);
                  break;
                case "loadedmetadata":
                  u.onVideoMetadataLoaded();
                  break;
                case "loadeddata":
                  u.onVideoLoadedData();
                  break;
                case "timeupdate":
                  u.onVideoTimeUpdate();
                  break;
                case "ended":
                  u.onVideoEnded();
                  break;
                case "playing":
                  u.onVideoPlaying();
                  break;
                case "volumechange":
                  u.onVideoVolumeChange(n);
              }
            }
          }),
          (this.onVideoPlaying = function () {
            u.updateState(t.PlayerStates.Playing);
            u.checkReplacedVideoTag();
            !u.videoControls ||
              !u.videoWrapper ||
              (u.videoControls.setLive(u.isLive()),
              u.videoControls.setPlayPosition(u.videoWrapper.getPlayPosition()),
              u.videoControls.resetSlidersWorkaround());
            u.setNextCheckpoint();
            u.reportContentStart();
            p.Environment.isAndroid &&
              (u.logMessage("re-invoking play for Android only"),
              u.videoWrapper.play());
            u.playerOptions &&
              u.playerOptions.inviewPlay &&
              (u.registedInviewManagerAlready ||
                (u.inviewManager ||
                  (u.inviewManager = et.InviewManager.Instance()),
                u.inviewManager &&
                  (u.inviewManager.registerPlayer(u),
                  (u.registedInviewManagerAlready = !0))));
          }),
          (this.onVideoWrapperLoaded = function () {
            u.checkReplacedVideoTag();
            b.PlayerUtility.createVideoPerfMarker(
              u.playerId,
              it.videoPerfMarkers.wrapperReady
            );
            u.loadVideo();
            u.showingPosterImage
              ? (u.posterImageUrl
                  ? u.videoWrapper.setPosterFrame(u.posterImageUrl)
                  : u.videoMetadata && u.videoMetadata.posterframeUrl
                  ? u.videoWrapper.setPosterFrame(u.videoMetadata.posterframeUrl)
                  : console.log(
                      "no poster image passed in parameter or video metadata"
                    ),
                (u.showingPosterImage = !1))
              : u.playerOptions.autoplay && u.displayPreRollAndPlayContent();
          }),
          (this.onBeforeUnload = function () {
            u.isWindowClosing = !0;
          }),
          (this.onWindowResize = function () {
            u.closedCaptions &&
              (u.closedCaptions.resetCaptions(),
              u.closedCaptions.updateCaptions(u.getPlayPosition().currentTime));
          }),
          (this.onVideoWrapperLoadFailed = function () {
            u.playerOptions &&
            u.playerOptions.showImageForVideoError === !0 &&
            u.videoMetadata &&
            u.videoMetadata.posterframeUrl
              ? (u.hideTrigger(),
                u.disablePlayPauseTrigger(),
                u.displayImage(u.videoMetadata.posterframeUrl))
              : u.displayErrorMessage({
                  title: u.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.standarderror
                  ),
                });
          }),
          (this.onMouseEvent = function (n) {
            if (((n = e.getEvent(n)), n.type === "mousemove"))
              (u.showcontrolFirstTime = !1),
                !u.playPauseTrigger &&
                  u.videoControls &&
                  u.showControlsBasedOnState(),
                u.playPauseTrigger && u.showPlayPauseTrigger(!0);
            else if (n.type === "mouseout") {
              u.showcontrolFirstTime = !1;
              u.playPauseTrigger && u.showPlayPauseTrigger(!1);
              for (
                var t = n.toElement || n.relatedTarget;
                t && t.parentNode && t.parentNode !== window;
  
              ) {
                if (t.parentNode === u || t === u) {
                  e.preventDefault(n);
                  return;
                }
                t = t.parentNode;
              }
            }
          }),
          (this.onKeyboardEvent = function (n) {
            var t = f.getKeyCode(n);
            switch (t) {
              case 9:
                u.showControlsBasedOnState();
            }
          }),
          (this.onVideoMetadataLoaded = function () {
            u.setupPlayerMenus();
          }),
          (this.onVideoLoadedData = function () {
            u.updateState(t.PlayerStates.Ready);
            var n = u.getPlayPosition();
            !u.videoControls ||
              (u.videoControls.setLive(u.isLive()),
              u.videoControls.setPlayPosition(n));
            u.startTimeOnDataLoad &&
              u.startTimeOnDataLoad > n.startTime &&
              u.startTimeOnDataLoad < n.endTime &&
              (u.seek(u.startTimeOnDataLoad), (u.startTimeOnDataLoad = null));
            u.playOnDataLoad && (u.play(), (u.playOnDataLoad = !1));
          }),
          (this.onVideoTimeUpdate = function () {
            var n, i, r, f, e;
            u.videoWrapper &&
              ((n = u.getPlayPosition()),
              u.videoControls && u.videoControls.setPlayPosition(n),
              n.startTime !== n.endTime) &&
              (u.closedCaptions && u.closedCaptions.updateCaptions(n.currentTime),
              u.interactiveTriggersHelper &&
                u.interactiveTriggersHelper.updateCurrentOverlay(n.currentTime),
              u.isPaused() ||
                (u.playerState === t.PlayerStates.Buffering &&
                  u.updateState(t.PlayerStates.Playing),
                (i = n.endTime - n.startTime),
                u.checkTimeRemainingCheckpoint(i - n.currentTime),
                (r =
                  u.nextCheckpoint &&
                  i > 0 &&
                  Math.round(n.currentTime * 100) / 100 >=
                    Math.round((i * u.nextCheckpoint) / 1) / 100),
                (f = u.stopwatchPlaying.hasReached(
                  nt.PlayerConfig.eventCheckpointInterval
                )),
                r
                  ? ((e = u.nextCheckpoint),
                    u.reportEvent(k.PlayerEvents.ContentCheckpoint, {
                      checkpoint: e,
                      checkpointType: "quartile",
                    }),
                    u.setNextCheckpoint(),
                    u.stopwatchBuffering.reset())
                  : f &&
                    u.reportEvent(k.PlayerEvents.ContentCheckpoint, {
                      checkpointType: "interval",
                    })));
          }),
          (this.onVideoCanPlay = function () {
            u.canPlay = !0;
            u.videoControls && u.videoControls.updatePlayPauseState();
          }),
          (this.onVideoError = function () {
            var i, r, n, f;
            if (
              !u.isWindowClosing &&
              u.playerState !== t.PlayerStates.Init &&
              u.playerState !== t.PlayerStates.Error
            )
              if (((i = u.videoWrapper.getError()), i && i.errorCode)) {
                if (
                  i.errorCode ===
                    s.VideoErrorCodes.MediaErrorSourceNotSupported &&
                  ((r = u.getFallbackVideoFile()),
                  u.currentVideoFile &&
                    u.currentVideoFile.mediaType !== s.MediaTypes.MP4 &&
                    r &&
                    r.mediaType === s.MediaTypes.MP4)
                ) {
                  u.reportEvent(k.PlayerEvents.PlayerError, {
                    errorType: k.PlayerEvents.SourceErrorAttemptRecovery,
                    errorDesc:
                      "Playback using media type " +
                      u.currentVideoFile.mediaType +
                      " failed. Attempting to fallback to MP4 source.",
                  });
                  u.setVideoSrc(r);
                  u.playerOptions.autoplay && ((u.playOnDataLoad = !0), u.play());
                  u.isFallbackVideo = !0;
                  return;
                }
                if (
                  u.playerOptions &&
                  u.playerOptions.showImageForVideoError &&
                  u.videoMetadata &&
                  u.videoMetadata.posterframeUrl
                ) {
                  u.hideControlPanel();
                  u.videoControls = null;
                  u.stopMedia();
                  u.hideTrigger();
                  u.disablePlayPauseTrigger();
                  u.displayImage(u.videoMetadata.posterframeUrl);
                  return;
                }
                u.updateState(t.PlayerStates.Error);
                n = void 0;
                switch (i.errorCode) {
                  case s.VideoErrorCodes.MediaErrorAborted:
                    n = u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.media_err_aborted
                    );
                    break;
                  case s.VideoErrorCodes.MediaErrorNetwork:
                    n = u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.media_err_network
                    );
                    break;
                  case s.VideoErrorCodes.MediaErrorDecode:
                    n = u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.media_err_decode
                    );
                    break;
                  case s.VideoErrorCodes.MediaErrorSourceNotSupported:
                    n = u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.media_err_src_not_supported
                    );
                    break;
                  case s.VideoErrorCodes.AmpEncryptError:
                    n = u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.media_err_amp_encrypt
                    );
                    break;
                  case s.VideoErrorCodes.AmpPlayerMismatch:
                    n = u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.media_err_amp_player_mismatch
                    );
                    break;
                  default:
                    n = u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.media_err_unknown_error
                    );
                }
                n = o.format(
                  u.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.playbackerror
                  ),
                  n
                );
                f = b.PlayerUtility.formatContentErrorMessage(
                  i.errorCode,
                  n,
                  i.message
                );
                u.stopMedia(n, f);
              } else u.stopMedia();
          }),
          (this.onErrorCallback = function (n, t) {
            u.reportEvent(k.PlayerEvents.PlayerError, {
              errorType: n,
              errorDesc: t,
            });
          }),
          (this.onVideoPlay = function () {
            u.hideTrigger();
            u.playTriggered
              ? u.reportEvent(k.PlayerEvents.Resume)
              : ((u.playTriggered = !0),
                b.PlayerUtility.createVideoPerfMarker(
                  u.playerId,
                  it.videoPerfMarkers.playTriggered
                ));
            u.firstByteTimer && window.clearTimeout(u.firstByteTimer);
            var n = p.Environment.isMobile
              ? nt.PlayerConfig.firstByteTimeoutVideoMobile
              : nt.PlayerConfig.firstByteTimeoutVideoDesktop;
            n > 0 &&
              (u.firstByteTimer = setTimeout(function () {
                if (
                  !u.getBufferedDuration() &&
                  u.playerState === t.PlayerStates.Buffering
                ) {
                  if (
                    (u.logMessage("Buffering stuck detected"),
                    u.updateState(t.PlayerStates.Error),
                    u.playerOptions &&
                      u.playerOptions.showImageForVideoError &&
                      u.videoMetadata &&
                      u.videoMetadata.posterframeUrl)
                  ) {
                    u.hideControlPanel();
                    u.videoControls = null;
                    u.stopMedia();
                    u.hideTrigger();
                    u.disablePlayPauseTrigger();
                    u.displayImage(u.videoMetadata.posterframeUrl);
                    return;
                  }
                  u.stopMedia(
                    u.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.standarderror
                    ),
                    b.PlayerUtility.formatContentErrorMessage(
                      s.VideoErrorCodes.BufferingFirstByteTimeout,
                      "Time out waiting for first byte."
                    )
                  );
                }
              }, n));
          }),
          (this.onVideoPause = function () {
            (u.videoWrapper && u.videoWrapper.isSeeking()) ||
              u.playerState === t.PlayerStates.Ended ||
              u.updateState(t.PlayerStates.Paused);
          }),
          (this.onVideoSeeking = function () {
            u.playerState !== t.PlayerStates.Ended &&
            u.videoWrapper &&
            u.videoWrapper.isSeeking()
              ? ((u.nextCheckpoint = null),
                u.seekFrom === null &&
                  (u.seekFrom = u.getPlayPosition().currentTime),
                u.updateState(t.PlayerStates.Seeking))
              : (u.seekFrom = null);
          }),
          (this.onVideoSeeked = function () {
            var n = u.getPlayPosition().currentTime;
            u.playerState !== t.PlayerStates.Ended &&
              u.videoWrapper &&
              !u.videoWrapper.isSeeking() &&
              u.seekFrom !== null &&
              u.seekFrom !== n &&
              (u.setNextCheckpoint(),
              u.reportEvent(k.PlayerEvents.Seek, {
                seekFrom: u.seekFrom,
                seekTo: n,
              }),
              (u.seekFrom = null),
              u.updateState(
                u.isPaused() ? t.PlayerStates.Paused : t.PlayerStates.Playing
              ));
          }),
          (this.onVideoWaiting = function () {
            u.updateState(t.PlayerStates.Buffering);
          }),
          (this.onVideoVolumeChange = function (n) {
            n &&
              n.target &&
              (u.videoWrapper.isMuted()
                ? (u.isVideoMuted = !0)
                : u.isVideoMuted &&
                  ((u.isVideoMuted = !1),
                  p.Environment.isMobile && u.videoWrapper.unmute()));
            !u.videoControls || u.videoControls.updateVolumeState();
          }),
          (this.onCcPresetFocus = function (n) {
            var r, i, t;
            if (u.videoControls && u.closedCaptions && u.closedCaptionsSettings) {
              if (
                (u.closedCaptions.getCurrentCcLanguage() ||
                  u.closedCaptions.showSampleCaptions(),
                (r = e.getEventTargetOrSrcElement(n)),
                (i = r.getAttribute("data-info")),
                i === "reset")
              )
                u.closedCaptionsSettings.reset();
              else {
                if (((t = i.split(":")), !t && t.length < 0)) return;
                u.closedCaptionsSettings.setSetting(t[0], t[1], !1);
              }
              u.closedCaptions.resetCaptions();
              u.closedCaptions.updateCaptions(u.getPlayPosition().currentTime);
            }
          }),
          (this.onCcPresetBlur = function () {
            var r, t, i, n;
            if (u.videoControls && u.closedCaptions && u.closedCaptionsSettings) {
              if (
                (u.closedCaptions.getCurrentCcLanguage() ||
                  u.closedCaptions.setCcLanguage("off", null),
                (r = e.selectFirstElement(
                  "#" + u.ccSettingsMenuId,
                  u.videoControlsContainer
                )),
                (t = e.selectFirstElement(".glyph-check-mark", r)),
                t != null)
              )
                if (((i = t.getAttribute("data-info")), i === "reset"))
                  u.closedCaptionsSettings.reset();
                else {
                  if (((n = i.split(":")), !n && n.length < 0)) return;
                  u.closedCaptionsSettings.setSetting(n[0], n[1]);
                }
              else u.closedCaptionsSettings.reset(!1);
              u.closedCaptions.resetCaptions();
              u.closedCaptions.updateCaptions(u.getPlayPosition().currentTime);
            }
          }),
          (this.onVideoPlayerClicked = function () {
            (u.playerOptions.useAMPVersion2 && u.isFallbackVideo) ||
              (u.playerOptions && u.playerOptions.lazyLoad && !u.wrapperLoadCalled
                ? ((u.playOnDataLoad = !1),
                  u.playerOptions.adsEnabled
                    ? ((u.playerOptions.adsEnabled = !1),
                      (u.playerOptions.autoplay = !1))
                    : (u.playerOptions.autoplay = !0),
                  u.hasInteractivity
                    ? u.loadVideoWrapper(!1)
                    : u.loadVideoWrapper(u.playerOptions.autoplay),
                  u.isFirstTimePlayed && u.displayPreRollAndPlayContent())
                : u.isFirstTimePlayed
                ? u.displayPreRollAndPlayContent()
                : u.isPaused()
                ? (u.play(), u.setUserInteracted(!0), u.setUserIntiatedPause(!1))
                : (u.pause(!0),
                  u.setUserInteracted(!0),
                  u.setUserIntiatedPause(!0)),
              u.hideTrigger(),
              u.showSpinnerBasedOnState(),
              u.videoControls &&
                u.isInFullscreen &&
                u.videoControls.setFocusOnControlBar());
          }),
          (this.onVideoEnded = function () {
            u.updateState(t.PlayerStates.Ended);
            u.reportEvent(k.PlayerEvents.ContentComplete);
            p.Environment.useNativeControls || u.stop();
          }),
          (this.onFullscreenChanged = function () {
            var t = n.getElementInFullScreen(),
              i = u.getFullscreenContainer();
            t
              ? i !== t || u.isInFullscreen || u.onFullscreenEnter()
              : u.isInFullscreen && u.onFullscreenExit();
          }),
          (this.onIOSFullscreenEnter = function () {
            u.play();
            u.onFullscreenEnter();
          }),
          (this.onIOSFullscreenExit = function () {
            u.onFullscreenExit();
          }),
          (this.onFullscreenError = function () {
            u.isInFullscreen = !1;
          }),
          (this.onSetAudioCallback = function () {
            u.isAudioTracksDoneSwitching = !0;
          }),
          i) &&
            ((this.isVideoPlayerSupported =
              p.Environment.isVideoPlayerSupported()),
            this.createComponents(r),
            this.load(r));
        }
        return (
          (n.prototype.createComponents = function (t) {
            var u, f, s, h, i;
            this.playPauseTrigger = t && t.options && t.options.playPauseTrigger;
            this.showEndImage = t && t.options && t.options.showEndImage;
            this.playerContainer = e.selectFirstElement(
              n.playerContainerSelector,
              this.videoComponent
            );
            var r =
                t && t.options && t.options.maskLevel
                  ? this.sanitize(t.options.maskLevel)
                  : "40",
              c =
                t && t.options && t.options.theme
                  ? this.sanitize(t.options.theme)
                  : "light",
              l = t && t.options && t.options.trigger;
            this.setAutoPlayNeeded =
              t &&
              t.options &&
              t.options.autoplay &&
              (p.Environment.isChrome || p.Environment.isMobile);
            u =
              t &&
              t.options &&
              t.options.controls &&
              this.isVideoPlayerSupported &&
              !this.playPauseTrigger &&
              !p.Environment.useNativeControls;
            this.playerContainer ||
              ((f =
                '<div class="f-core-player" tabindex="-1">\n    ' +
                (this.setAutoPlayNeeded
                  ? '<video class="f-video-player" preload="metadata" muted autoplay playsinline tabindex="-1"></video>'
                  : '<video class="f-video-player" preload="metadata" tabindex="-1"></video>') +
                "\n    " +
                (l
                  ? '<div class="f-video-trigger" aria-hidden="true" >\n                        <div class="f-mask-' +
                    r +
                    " theme-" +
                    c +
                    '" >\n                            <button class="c-action-trigger f-play-trigger c-glyph glyph-play" aria-label="Play" role="button">\n                            </button>\n                            <span aria-hidden="true" role="presentation">Play</span>\n                        </div>\n                    </div>'
                  : "") +
                '    \n    <div class="f-customize-context-menu-container"></div> \n    <div class="f-video-cc-overlay" aria-hidden="true"></div>\n    <div class="f-screen-reader" aria-live="polite"></div>\n    ' +
                (u
                  ? '<div class="f-video-controls" dir="ltr" aria-hidden="true" role="group"></div>'
                  : "") +
                '\n    <div aria-hidden="true" class="c-progress f-indeterminate-local f-progress-large" role="progressbar" tabindex="0">\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n    </div>\n    ' +
                (this.playPauseTrigger
                  ? '<div role="presentation" class="f-play-pause-trigger">\n            <button type="button" class="f-play-pause c-action-trigger c-glyph glyph-pause f-play-pause-hide" aria-label="pause">\n            </button>\n            <span aria-hidden="true" role="presentation">Pause</span>\n         </div>'
                  : "") +
                "\n</div>"),
              (this.videoComponent.innerHTML = f),
              (this.playerContainer = e.selectFirstElement(
                n.playerContainerSelector,
                this.videoComponent
              )));
            this.checkReplacedVideoTag();
            this.spinner = e.selectFirstElement(
              ".c-progress",
              this.playerContainer
            );
            this.triggerContainer = e.selectFirstElement(
              ".f-video-trigger",
              this.videoComponent
            );
            this.triggerPlayPauseContainer = e.selectFirstElement(
              ".f-play-pause-trigger",
              this.videoComponent
            );
            this.screenReaderElement = e.selectFirstElement(
              ".f-screen-reader",
              this.videoComponent
            );
            this.customizedContextMenuContainer = e.selectFirstElement(
              ".f-customize-context-menu-container",
              this.videoComponent
            );
            e.addEvents(
              this.playerContainer,
              "contextmenu",
              this.playerContainerEventHandler,
              !0
            );
            e.addEvents(document, "click", this.documentEventHandler, !0);
            !this.triggerContainer ||
              ((s = e.selectFirstElement("div", this.triggerContainer)),
              (h = o.format(
                "background-color: rgba(0,0,0,{0})",
                Number(r) / 100
              )),
              s.setAttribute("style", h),
              (this.trigger = e.selectFirstElement(
                ".c-action-trigger",
                this.triggerContainer
              )),
              (this.triggerTooltip = e.selectFirstElement(
                "span",
                this.triggerContainer
              )),
              e.addEvents(
                this.trigger,
                "mouseover mouseout focus blur",
                this.triggerPlayEventHandler,
                !0
              ),
              t &&
                t.options &&
                !t.options.autoplay &&
                (this.showTrigger(),
                this.hideControlPanel(),
                this.hideSpinner()));
            this.triggerPlayPauseContainer &&
              t &&
              t.options &&
              ((this.playPauseButton = e.selectFirstElementT(
                ".f-play-pause",
                this.triggerPlayPauseContainer
              )),
              this.playPauseButton.setAttribute("aria-label", "pause"),
              (this.playPauseTooltip = e.selectFirstElement(
                "span",
                this.triggerPlayPauseContainer
              )),
              e.addEvents(
                this.playPauseButton,
                "mouseover mouseout focus blur",
                this.playPauseButtonEventHandler,
                !0
              ),
              e.addEvents(
                this.triggerPlayPauseContainer,
                "click keydow",
                this.triggerPlayPauseContainerEventHandler,
                !0
              ));
            p.Environment.isInIframe &&
              ((i = document.getElementsByTagName("body")),
              i && i[0].setAttribute("tabindex", "-1"));
          }),
          (n.prototype.initializeLocalization = function () {
            b.PlayerUtility.createVideoPerfMarker(
              this.playerId,
              it.videoPerfMarkers.locLoadStart
            );
            this.localizationHelper
              ? this.onResourcesLoaded()
              : (this.playerOptions.market ||
                  (this.playerOptions.market =
                    this.videoComponent.getAttribute("data-market")),
                (this.localizationHelper = new g.LocalizationHelper(
                  this.playerOptions.market,
                  this.playerOptions.resourceHost,
                  this.playerOptions.resourceHash,
                  this.onErrorCallback
                )),
                this.localizationHelper.loadResources(this.onResourcesLoaded));
          }),
          (n.prototype.initializeAgeGating = function () {
            var n = this;
            this.ageGateHelper = new ft.AgeGateHelper(
              this.playerContainer,
              this,
              this.localizationHelper,
              function () {
                n.finishPlayerLoad();
              }
            );
          }),
          (n.prototype.initializeReporting = function (n) {
            if (
              n &&
              n.options &&
              n.options.reporting &&
              n.options.reporting.enabled &&
              this.reporters.length < 1 &&
              (n.options.reporting.jsll &&
                this.reporters.push(
                  new d.JsllReporter(
                    this.videoComponent,
                    n.options.jsllPostMessage
                  )
                ),
              n &&
                n.options &&
                n.options.inviewThreshold &&
                (this.inviewManager ||
                  (this.inviewManager = et.InviewManager.Instance()),
                this.inviewManager))
            ) {
              var t = this;
              this.inviewManager.listenForInviewThresholdChanges(
                this.playerContainer,
                n.options.inviewThreshold,
                function (n) {
                  t.reportEvent(n);
                }
              );
            }
          }),
          (n.prototype.getPlayerId = function () {
            return this.playerId || this.videoComponent.id;
          }),
          (n.prototype.sanitize = function (n) {
            var t = {
              "<": "&lt;",
              ">": "&gt;",
              "(": "%28",
              ")": "%29",
              '"': "%22",
            };
            return n.replace(/[<>()"]/gi, function (n) {
              return t[n];
            });
          }),
          (n.prototype.getPlayerData = function () {
            return this.playerData;
          }),
          (n.prototype.getPlayerContainer = function () {
            return this.playerContainer;
          }),
          (n.prototype.hasUserInteracted = function () {
            return this.wasUserInteracted;
          }),
          (n.prototype.setUserInteracted = function (n) {
            this.wasUserInteracted = n;
          }),
          (n.prototype.hasUserIntiatedPause = function () {
            return this.wasUserIntiatedPause;
          }),
          (n.prototype.setAutoPlay = function () {
            !!this.videoWrapper &&
              this.wrapperLoadCalled &&
              this.videoWrapper.setAutoPlay();
          }),
          (n.prototype.setUserIntiatedPause = function (n) {
            this.wasUserIntiatedPause = n;
          }),
          (n.prototype.getCurrentPlayState = function () {
            return this.playerState;
          }),
          (n.prototype.load = function (n) {
            if (n) {
              this.playerData = n;
              this.currentVideoFile = null;
              this.playerId = this.videoComponent.getAttribute("id");
              this.updateState(t.PlayerStates.Init);
              this.hideErrorMessage();
              this.videoMetadata = n.metadata;
              this.playerOptions = n.options || new h.PlayerOptions();
              this.screenManagerHelper = new ut.ScreenManagerHelper();
              this.startTimeOnDataLoad = this.playerOptions.startTime;
              (this.playerOptions.autoplay ||
                (this.playerOptions.lazyLoad && !this.playerOptions.trigger)) &&
                (this.playerOptions.lazyLoad = !1);
              try {
                this.initializeLocalization();
                this.initializeReporting(n);
              } catch (i) {
                this.reportEvent(k.PlayerEvents.PlayerError, {
                  errorType: "initializeError",
                  errorDesc:
                    "InitializeError with loc, reporting, age-gating : " +
                    i.message,
                });
              }
              if (
                !this.videoMetadata ||
                !this.videoMetadata.videoFiles ||
                !this.videoMetadata.videoFiles.length
              ) {
                this.hasDataError = !0;
                this.locReady && this.showDataError();
                return;
              }
            }
          }),
          (n.prototype.finishPlayerLoad = function () {
            var n = this.ageGateHelper.doesUserPassAgeGate(),
              i = !1;
            if (
              (this.ageGateHelper.didUserSubmitAge() &&
                (this.reportEvent(k.PlayerEvents.AgeGateSubmitClick, {
                  ageGatePassed: n,
                }),
                this.ageGateHelper.resetAgeGateSubmit(),
                (i = !0)),
              !n)
            ) {
              this.displayErrorMessage({
                title: this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.agegate_fail
                ),
              });
              return;
            }
            try {
              if (
                (!this.triggerPlayPauseContainer ||
                  this.playerData.options.autoplay ||
                  !this.playPauseButton ||
                  (e.removeClass(this.playPauseButton, "glyph-pause"),
                  e.addClass(this.playPauseButton, "glyph-play"),
                  this.setAriaLabelForButton(this.playPauseButton),
                  e.setText(this.playPauseTooltip, this.locPlay)),
                (this.contextMenu = new st.ContextMenu(
                  this.customizedContextMenuContainer,
                  this
                )),
                this.initializeVideoControls(),
                !this.isVideoPlayerSupported)
              ) {
                this.displayErrorWithDownloadLink();
                return;
              }
              this.analyzeVideoFiles();
              this.initializeClosedCaptions();
              this.hasInteractivity =
                !p.Environment.isMobile &&
                this.playerOptions.interactivity &&
                this.videoMetadata.interactiveTriggersEnabled &&
                !!this.videoMetadata.interactiveTriggersUrl;
              this.interactiveTriggersHelper ||
                this.initializeInteractiveTriggers();
            } catch (r) {
              this.reportEvent(k.PlayerEvents.PlayerError, {
                errorType: "initializeError",
                errorDesc:
                  "InitializeError with video files, CC, interactiveTrigger: " +
                  r.message,
              });
            }
            this.videoTag
              ? ((this.videoTag.title = this.videoMetadata.title),
                (this.videoTag.loop = this.playerOptions.loop),
                this.videoMetadata.posterframeUrl &&
                  !this.playerOptions.hidePosterFrame &&
                  (this.videoTag.poster = this.videoMetadata.posterframeUrl))
              : this.reportEvent(k.PlayerEvents.PlayerError, {
                  errorType: "videoTagNotAvailable",
                  errorDesc: "VideoTag not available",
                });
            this.videoWrapper = this.getVideoWrapper();
            this.playerTechnology =
              "OnePlayer_" + this.videoWrapper.getWrapperName();
            this.commonPlayerImpressionReported ||
              (this.reportEvent(k.PlayerEvents.CommonPlayerImpression),
              (this.commonPlayerImpressionReported = !0));
            p.Environment.isIPhone &&
              !this.playerOptions.autoplay &&
              (this.playerOptions.lazyLoad = !0);
            this.playerOptions.lazyLoad ||
              (i
                ? this.hasInteractivity
                  ? this.loadVideoWrapper(!1)
                  : this.loadVideoWrapper(!0)
                : this.hasInteractivity
                ? this.loadVideoWrapper(!1)
                : this.loadVideoWrapper(this.playerOptions.autoplay));
            this.reportEvent(k.PlayerEvents.Ready);
            this.updateState(t.PlayerStates.PlayerLoaded);
            this.canPlay = !0;
          }),
          (n.prototype.setAriaLabelForButton = function (n, t) {
            this.videoMetadata.title !== ""
              ? n.setAttribute(
                  "aria-label",
                  this.locPlay.toLowerCase() + " " + this.videoMetadata.title
                )
              : t
              ? n.setAttribute("aria-label", t.toLowerCase())
              : n.setAttribute("aria-label", this.locPlayVideo.toLowerCase());
          }),
          (n.prototype.updatePlayerSource = function (n) {
            var t = this,
              i;
            n &&
              ((this.playerData.options = new h.PlayerOptions(n.options)),
              (this.playerData.metadata = n.metadata),
              (this.isFirstTimePlayed = !0),
              (this.isContentStartReported = !1),
              (this.wrapperLoadCalled = !1),
              !this.playerData.metadata ||
              !this.playerData.metadata.videoId ||
              (this.playerData.metadata.videoFiles &&
                this.playerData.metadata.videoFiles.length) ||
              this.playerData.metadata.playerName
                ? (this.pause(), this.load(this.playerData))
                : ((i = new ot.VideoShimDataFetcher(
                    this.playerData.options.shimServiceEnv,
                    this.playerData.options.shimServiceUrl
                  )),
                  i.getMetadata(this.playerData.metadata.videoId, function (n) {
                    t.pause();
                    t.playerData.metadata = n;
                    t.load(t.playerData);
                  })));
          }),
          (n.prototype.displayErrorWithDownloadLink = function () {
            var t = this.getVideoFileforDownload(),
              n = "",
              i;
            this.playerOptions.download && t
              ? ((i =
                  '<a href="' +
                  t.url +
                  '"><span style="text-decoration:underline">' +
                  this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.download_video
                  ) +
                  "</span></a>"),
                (n =
                  this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.browserunsupported
                  ) +
                  " " +
                  this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.browserunsupported_download
                  ) +
                  " " +
                  i +
                  "."))
              : (n = this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.browserunsupported
                ));
            this.displayErrorMessage({
              message: n,
            });
            this.reportEvent(k.PlayerEvents.ContentError, {
              errorType: "content:error",
              errorDesc: "error to play video",
              errorMessage: "error to play video, browser not supportted",
            });
          }),
          (n.prototype.showDataError = function () {
            this.playerOptions &&
            this.playerOptions.showImageForVideoError === !0 &&
            this.videoMetadata &&
            this.videoMetadata.posterframeUrl
              ? (this.hideTrigger(),
                this.disablePlayPauseTrigger(),
                this.displayImage(this.videoMetadata.posterframeUrl))
              : this.displayErrorMessage({
                  title: this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.data_error
                  ),
                });
            this.dataErrorShown = !0;
          }),
          (n.prototype.checkTimeRemainingCheckpoint = function (n) {
            if (!!this.playerData.options.timeRemainingCheckpoint) {
              var t = this.playerData.options.timeRemainingCheckpoint;
              t >= n && !this.timeRemainingCheckpointReached
                ? ((this.timeRemainingCheckpointReached = !0),
                  this.reportEvent("TimeRemainingCheckpoint"))
                : t < n && (this.timeRemainingCheckpointReached = !1);
            }
          }),
          (n.prototype.analyzeVideoFiles = function () {
            var n, t, i;
            for (
              this.hasHLS = !1,
                this.hasProgressive = !1,
                this.hasAdaptive = !1,
                n = 0,
                t = this.videoMetadata.videoFiles;
              n < t.length;
              n++
            ) {
              i = t[n];
              switch (i.mediaType) {
                case s.MediaTypes.DASH:
                case s.MediaTypes.SMOOTH:
                  this.hasAdaptive = !0;
                  break;
                case s.MediaTypes.HLS:
                  this.hasHLS = !0;
                  break;
                case s.MediaTypes.MP4:
                default:
                  this.hasProgressive = !0;
              }
            }
            this.useAdaptive =
              this.hasAdaptive &&
              ((this.playerOptions && this.playerOptions.useAdaptive) ||
                !this.hasProgressive);
            this.hasProgressive &&
              p.Environment.isMobile &&
              (this.useAdaptive = !1);
            this.hasProgressive &&
              this.playerOptions &&
              this.playerOptions.autoplay &&
              this.playerOptions.startTime === 0 &&
              p.Environment.isChrome &&
              !this.playerOptions.useAMPVersion2 &&
              (this.useAdaptive = !1);
          }),
          (n.prototype.loadVideoWrapper = function (n) {
            this.videoWrapper &&
              (p.Environment.isMobile && !p.Environment.isIPhone && (n = !1),
              (this.wrapperLoadCalled = !0),
              b.PlayerUtility.createVideoPerfMarker(
                this.playerId,
                it.videoPerfMarkers.wrapperLoadStart
              ),
              this.videoWrapper.load(
                this.videoComponent,
                n,
                this.onVideoWrapperLoaded,
                this.onVideoWrapperLoadFailed,
                this.onSetAudioCallback
              ));
          }),
          (n.prototype.initializeInteractiveTriggers = function () {
            var n = this;
            this.hasInteractivity &&
              (this.interactiveTriggersHelper =
                new rt.VideoPlayerInteractiveTriggersHelper(
                  this.playerContainer,
                  this.videoMetadata.interactiveTriggersUrl,
                  this,
                  this.localizationHelper,
                  function (t, i) {
                    n.reportInteractiveTelemetryEvent(t, i);
                  }
                ));
          }),
          (n.prototype.reportInteractiveTelemetryEvent = function (n, t) {
            switch (n) {
              case k.PlayerEvents.InteractiveOverlayClick:
                t && t.overlay.overlayData.pauseVideoOnClick && this.pause();
                t.overlay.overlayType === rt.OverlayType.VideoBranch &&
                  (t.overlay.overlayData.linkUrl = t.overlay.overlayData.videoId);
                this.reportEvent(k.PlayerEvents.InteractiveOverlayClick, {
                  interactiveTriggerAndOverlay: t,
                });
                t.overlay.overlayType === rt.OverlayType.VideoBranch &&
                  this.currentVideoStopwatchPlaying.reset();
                break;
              case k.PlayerEvents.InteractiveOverlayMaximize:
                this.reportEvent(k.PlayerEvents.InteractiveOverlayMaximize, {
                  interactiveTriggerAndOverlay: t,
                });
                break;
              case k.PlayerEvents.InteractiveOverlayMinimize:
                this.reportEvent(k.PlayerEvents.InteractiveOverlayMinimize, {
                  interactiveTriggerAndOverlay: t,
                });
                break;
              case k.PlayerEvents.InteractiveBackButtonClick:
                this.reportEvent(k.PlayerEvents.InteractiveBackButtonClick);
            }
          }),
          (n.prototype.initializeVideoControls = function () {
            var r = this,
              n,
              t;
            p.Environment.useNativeControls ||
              ((this.videoControlsContainer = e.selectFirstElement(
                i.VideoControls.selector,
                this.videoComponent
              )),
              e.addEvents(
                this.videoControlsContainer,
                "contextmenu",
                this.videoControlsContainerEventHandler,
                !0
              ),
              (n =
                !p.Environment.useNativeControls &&
                this.playerOptions &&
                this.playerOptions.controls &&
                !this.areControlsInitialized),
              (t = n && !this.playerOptions.trigger && !this.isTriggerShown()),
              (this.controlsScreenManagerObject = {
                HtmlObject: this.videoControlsContainer,
                Height: 44,
                Id: null,
                IsVisible: !1,
                Priority: 5,
                Transition: null,
              }),
              this.screenManagerHelper.registerElement(
                this.controlsScreenManagerObject
              ),
              this.videoControlsContainer &&
                (n &&
                  ((this.areControlsInitialized = !0),
                  this.videoControlsContainer.setAttribute(
                    "aria-hidden",
                    "false"
                  ),
                  (this.videoControls = new i.VideoControls(
                    this.videoControlsContainer,
                    this,
                    this.localizationHelper,
                    this.contextMenu
                  )),
                  this.videoControls.addUserInteractionListener(function () {
                    r.showControlsBasedOnState();
                  })),
                t ||
                  this.videoControlsContainer.setAttribute("aria-hidden", "true"),
                !this.playerOptions.showControlOnLoad &&
                  this.showcontrolFirstTime &&
                  this.videoControlsContainer.setAttribute(
                    "aria-hidden",
                    "true"
                  )));
          }),
          (n.prototype.getQualityMenu = function () {
            var n, i, u, t, h, c, f, o, e, r, l;
            if (
              !this.videoMetadata.videoFiles ||
              !this.videoMetadata.videoFiles.length
            )
              return null;
            if (
              ((n = []),
              this.hasAdaptive &&
                this.playerOptions &&
                this.playerOptions.useAdaptive)
            ) {
              if (
                ((i = this.videoWrapper.getVideoTracks()),
                !n.length && i && i.length > 1)
              )
                for (
                  u = this.videoWrapper.getCurrentVideoTrack(),
                    n.push({
                      id: this.addIdPrefix("auto"),
                      label: this.localizationHelper.getLocalizedValue(
                        g.playerLocKeys.quality_auto
                      ),
                      selected: u.auto,
                      selectable: !0,
                      persistOnClick: !0,
                    }),
                    t = 0;
                  t < i.length;
                  t++
                )
                  (h = i[t]),
                    n.push({
                      id: this.addIdPrefix("video-" + t),
                      label: b.PlayerUtility.toFriendlyBitrateString(h.bitrate),
                      selected: !u.auto && u.trackIndex === t,
                      selectable: !0,
                      persistOnClick: !0,
                    });
            } else if (!n.length)
              for (
                c = this.currentVideoFile && this.currentVideoFile.quality,
                  f = 0,
                  o = lt;
                f < o.length;
                f++
              )
                (e = o[f]),
                  (r = this.getVideoFileByQuality(e)),
                  r &&
                    r.url &&
                    ((l = {
                      id: this.addIdPrefix(s.MediaQuality[e]),
                      label: this.localizationHelper.getLocalizedValue(
                        g.playerLocKeys[
                          "quality_" + s.MediaQuality[e].toLowerCase()
                        ]
                      ),
                      data: r.url,
                      selected: r.quality === c,
                      selectable: !0,
                      persistOnClick: !0,
                    }),
                    n.push(l));
            return {
              category: ht.Quality,
              id: this.addIdPrefix(ht.Quality),
              label: this.localizationHelper.getLocalizedValue(
                g.playerLocKeys.quality
              ),
              items: n,
            };
          }),
          (n.prototype.getAudioTracksMenu = function () {
            var i = this.videoWrapper.getAudioTracks(),
              f,
              r,
              e,
              n,
              o,
              h,
              t,
              s,
              l,
              a;
            if (!i || i.length <= 1) return null;
            for (f = 0, r = 0, e = i; r < e.length; r++)
              (n = e[r]), n.isDescriptiveAudio && f++;
            for (
              o = [], h = this.videoWrapper.getCurrentAudioTrack(), t = 0;
              t < i.length;
              t++
            ) {
              var n = i[t],
                u = void 0,
                c = null;
              n.isDescriptiveAudio
                ? ((s = this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.descriptive_audio
                  )),
                  f > 1
                    ? ((l = this.localizationHelper.getLanguageNameFromLocale(
                        n.languageCode
                      )),
                      (u = s + " - " + l))
                    : (u = s))
                : ((u = this.localizationHelper.getLanguageNameFromLocale(
                    n.languageCode
                  )),
                  (c = this.localizationHelper.getLanguageCodeFromLocale(
                    n.languageCode.toLowerCase()
                  )));
              a = {
                label: u,
                language: c,
                id: this.addIdPrefix("audio-" + t),
                selected: t === h,
                selectable: !0,
                persistOnClick: !0,
              };
              o.push(a);
            }
            return {
              category: ht.AudioTracks,
              id: this.addIdPrefix(ht.AudioTracks),
              label: this.localizationHelper.getLocalizedValue(
                g.playerLocKeys.audio_tracks
              ),
              items: o,
            };
          }),
          (n.prototype.getClosedCaptionsSettingsMenu = function () {
            var f, e, n, i, l, r, t, h;
            if (this.closedCaptionsSettings) {
              f = this.closedCaptionsSettings.getCurrentSettings();
              e = [];
              for (n in u.closedCaptionsSettingsMap)
                if (u.closedCaptionsSettingsMap.hasOwnProperty(n)) {
                  var v = u.closedCaptionsSettingsMap[n],
                    s = u.closedCaptionsSettingsOptions[v.option],
                    c = [];
                  for (i in s.map)
                    s.map.hasOwnProperty(i) &&
                      c.push({
                        id: this.getCCMenuItemId(n, i),
                        label: this.localizationHelper.getLocalizedValue(
                          s.pre + i
                        ),
                        selectable: !0,
                        selected: f[n] === i,
                        persistOnClick: !0,
                        data: n + ":" + i,
                      });
                  e.push({
                    id: this.addIdPrefix(n + "_item"),
                    label: this.localizationHelper.getLocalizedValue("cc_" + n),
                    selectable: !1,
                    subMenu: {
                      id: this.getCCSettingsMenuId(n),
                      category: ht.ClosedCaptionSettings,
                      items: c,
                      label: this.localizationHelper.getLocalizedValue("cc_" + n),
                    },
                  });
                }
              l = {
                id: this.addIdPrefix(ht.ClosedCaptionSettings),
                category: ht.ClosedCaptionSettings,
                label: this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.cc_customize
                ),
                items: e,
              };
              r = [];
              for (t in u.closedCaptionsPresetMap)
                if (u.closedCaptionsPresetMap.hasOwnProperty(t)) {
                  var a = u.closedCaptionsPresetMap[t],
                    y = a.text_font,
                    p = a.text_color,
                    w = t.replace("preset", ""),
                    b = o.format(
                      this.localizationHelper.getLocalizedValue(
                        g.playerLocKeys.cc_presettings
                      ),
                      w,
                      this.localizationHelper.getLocalizedValue(
                        "cc_font_name_" + y
                      ),
                      this.localizationHelper.getLocalizedValue("cc_color_" + p)
                    );
                  r.push({
                    id: this.getCCMenuItemId(
                      u.VideoClosedCaptionsSettings.presetKey,
                      t
                    ),
                    label: this.localizationHelper.getLocalizedValue("cc_" + t),
                    data: "preset:" + t,
                    selectable: !0,
                    selected: f[u.VideoClosedCaptionsSettings.presetKey] === t,
                    persistOnClick: !0,
                    ariaLabel: b,
                  });
                }
              return (
                r.length &&
                  (r.push({
                    id: this.addIdPrefix("cc-customize"),
                    label: this.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.cc_customize
                    ),
                    subMenu: l,
                  }),
                  r.push({
                    id: this.addIdPrefix("cc-reset"),
                    label: this.localizationHelper.getLocalizedValue(
                      g.playerLocKeys.cc_reset
                    ),
                    data: "reset",
                    persistOnClick: !0,
                  })),
                (h = {
                  id: this.getCCSettingsMenuId(
                    u.VideoClosedCaptionsSettings.presetKey
                  ),
                  label: this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.cc_appearance
                  ),
                  category: ht.ClosedCaptionSettings,
                  items: r,
                }),
                (this.ccSettingsMenuId = h.id),
                h
              );
            }
          }),
          (n.prototype.getCCSettingsMenuId = function (n) {
            return this.addIdPrefix("cc-" + n);
          }),
          (n.prototype.getCCMenuItemId = function (n, t) {
            return this.addIdPrefix("cc-" + n + "-" + t);
          }),
          (n.prototype.getClosedCaptionMenu = function () {
            var r, c, t, p, w, u, l, e, a, v;
            if (
              !this.videoMetadata ||
              !this.videoMetadata.ccFiles ||
              !this.videoMetadata.ccFiles.length ||
              !this.ccOverlay ||
              !this.closedCaptions
            )
              return null;
            var y = f.getValueFromSessionStorage(n.ccLangPrefKey),
              b = this.playerOptions && this.playerOptions.autoCaptions,
              o = null,
              i = [],
              h = !1;
            for (r = 0, c = this.videoMetadata.ccFiles; r < c.length; r++)
              (t = c[r]),
                (t.ccType && t.ccType !== s.ClosedCaptionTypes.TTML) ||
                  (h || (h = t.locale === y),
                  !o && t.locale.indexOf(b) > -1 && (o = t.locale),
                  (p = this.localizationHelper.getLanguageCodeFromLocale(
                    t.locale.toLowerCase()
                  )),
                  (w = {
                    id: this.addIdPrefix(t.locale),
                    label: g.ccCultureLocStrings[t.locale],
                    language: p,
                    data: t.url,
                    selected: !1,
                    selectable: !0,
                    persistOnClick: !0,
                    ariaLabel:
                      g.ccCultureLocStrings[t.locale] +
                      " " +
                      this.localizationHelper.getLocalizedValue(
                        g.playerLocKeys.closecaption
                      ),
                  }),
                  i.push(w));
            if (
              (i.push({
                id: this.addIdPrefix("appearance"),
                label: this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.cc_appearance
                ),
                selected: !1,
                selectable: !1,
                subMenu: this.getClosedCaptionsSettingsMenu(),
              }),
              (u = h ? y : o),
              u)
            ) {
              for (l = this.addIdPrefix(u), e = 0, a = i; e < a.length; e++)
                (v = a[e]), v.id === l && (v.selected = !0);
              this.setCC(l);
            }
            return (
              i.unshift({
                id: this.addIdPrefix("off"),
                label: this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.closecaption_off
                ),
                selected: !u,
                selectable: !0,
                persistOnClick: !0,
                ariaLabel:
                  this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.closecaption_off
                  ) +
                  " " +
                  this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.closecaption
                  ),
              }),
              {
                category: ht.ClosedCaption,
                id: this.addIdPrefix(ht.ClosedCaption),
                label: this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.closecaption
                ),
                items: i,
                hideBackButton: !0,
                glyph: "glyph-subtitles",
                cssClass: "closed-caption",
                priority: 3,
              }
            );
          }),
          (n.prototype.getPlaybackRateMenu = function () {
            var r, u, t, e;
            if (
              !this.playerOptions ||
              !this.playerOptions.playbackSpeed ||
              !this.videoWrapper ||
              this.videoWrapper.getWrapperName() === "amp"
            )
              return null;
            for (
              r =
                f.getValueFromSessionStorage(n.playbackRatePrefKey) ||
                nt.PlayerConfig.defaultPlaybackRate,
                u = [],
                t = 0,
                e = nt.PlayerConfig.playbackRates;
              t < e.length;
              t++
            ) {
              var i = e[t],
                o = i === +r,
                s =
                  i === 1
                    ? this.localizationHelper.getLocalizedValue(
                        g.playerLocKeys.playbackspeed_normal
                      )
                    : i + "x",
                h = {
                  id: this.addIdPrefix("rate" + i),
                  label: s,
                  selected: o,
                  selectable: !0,
                  persistOnClick: !0,
                };
              u.push(h);
            }
            return (
              this.setPlaybackRate(this.addIdPrefix("rate" + r)),
              {
                category: ht.PlaybackSpeed,
                id: this.addIdPrefix(ht.PlaybackSpeed),
                label: this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.playbackspeed
                ),
                items: u,
              }
            );
          }),
          (n.prototype.getShareMenu = function () {
            var t, r, i, u, n, f;
            if (!this.playerOptions || !this.playerOptions.share) return null;
            if (
              ((t = tt.SharingHelper.getShareOptionsData(
                this.localizationHelper,
                this.playerOptions,
                this.videoMetadata && this.videoMetadata.shareUrl
              )),
              t && t.length)
            ) {
              for (r = [], i = 0, u = t; i < u.length; i++)
                (n = u[i]),
                  (f = {
                    id: this.addIdPrefix(n.id),
                    label: n.label,
                    data: n.url,
                    glyph: n.glyph,
                    image: n.image,
                  }),
                  r.push(f);
              return {
                category: ht.Share,
                id: this.addIdPrefix(ht.Share),
                label: this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.sharing_label
                ),
                items: r,
              };
            }
          }),
          (n.prototype.getDownloadMenu = function () {
            var i, u, f, c, t, l, r, e, o, a, n, h;
            if (!this.playerOptions || !this.playerOptions.download) return null;
            if (
              this.videoMetadata &&
              this.videoMetadata.downloadableFiles &&
              !(this.videoMetadata.downloadableFiles.length < 1)
            ) {
              for (
                i = {}, u = 0, f = 0, c = this.videoMetadata.downloadableFiles;
                f < c.length;
                f++
              )
                (n = c[f]),
                  this.playerOptions && this.playerOptions.download
                    ? ((t = i[n.locale]),
                      t || ((t = []), u++, (i[n.locale] = t)),
                      t.push(n))
                    : n.mediaType === s.DownloadableMediaTypes.transcript &&
                      ((t = i[n.locale]),
                      t || ((t = []), u++, (i[n.locale] = t)),
                      t.push(n));
              if (u > 0) {
                l = [];
                for (r in i)
                  if (i.hasOwnProperty(r)) {
                    for (e = [], o = 0, a = i[r]; o < a.length; o++)
                      (n = a[o]),
                        this.playerOptions && this.playerOptions.download
                          ? ((h = {
                              id: this.addIdPrefix(n.locale + "-" + n.mediaType),
                              label:
                                this.localizationHelper.getLocalizedMediaTypeName(
                                  n.mediaType
                                ),
                              selected: !1,
                              selectable: !1,
                              data: n.url,
                            }),
                            e.push(h))
                          : n.mediaType === s.DownloadableMediaTypes.transcript &&
                            ((h = {
                              id: this.addIdPrefix(n.locale + "-" + n.mediaType),
                              label:
                                this.localizationHelper.getLocalizedMediaTypeName(
                                  n.mediaType
                                ),
                              selected: !1,
                              selectable: !1,
                              data: n.url,
                            }),
                            e.push(h));
                    l.push({
                      id: this.addIdPrefix(ht.Download + r),
                      label: this.localizationHelper.getLanguageNameFromLocale(r),
                      selected: !1,
                      selectable: !1,
                      subMenuId: this.addIdPrefix(ht.Download + r + "menu"),
                      subMenu: {
                        id: this.addIdPrefix(ht.Download + r + "menu"),
                        category: ht.Download,
                        label:
                          this.localizationHelper.getLanguageNameFromLocale(r),
                        items: e,
                      },
                    });
                  }
                return {
                  category: ht.Download,
                  id: this.addIdPrefix(ht.Download),
                  label: this.localizationHelper.getLocalizedValue(
                    g.playerLocKeys.download_label
                  ),
                  hideBackButton: !0,
                  items: l,
                  glyph: "glyph-download",
                  priority: 2,
                };
              }
            }
          }),
          (n.prototype.setupCustomizeContextMenu = function () {
            var n = [],
              i = this.getPlayPauseMenu(),
              t;
            n.push(i);
            this.playerData.options.playPauseTrigger ||
              ((t = this.getMuteUnMuteMenu()), n.push(t));
            this.contextMenu.setupCustomizeContextMenu(n);
            this.customizedContextMenu = e.selectFirstElement(
              ".f-player-context-menu",
              this.playerContainer
            );
          }),
          (n.prototype.getMuteUnMuteMenu = function () {
            var n, t;
            return (
              this.isMuted()
                ? ((n = this.locUnmute), (t = "glyph-volume"))
                : ((n = this.locMute), (t = "glyph-mute")),
              {
                id: "context-menu-" + ct.MuteUnMute,
                label: n,
                glyph: t,
                priority: 2,
                category: ct.MuteUnMute,
              }
            );
          }),
          (n.prototype.getPlayPauseMenu = function () {
            var n, t;
            return (
              this.isPaused()
                ? ((n = this.locPlay), (t = "glyph-play"))
                : ((n = this.locPause), (t = "glyph-pause")),
              {
                id: "context-menu-" + ct.PlayPause,
                label: n,
                glyph: t,
                priority: 1,
                category: ct.PlayPause,
              }
            );
          }),
          (n.prototype.setupPlayerMenus = function () {
            var n, i, r, u, f, o, s, c, a, h, l, t;
            if (
              this.videoControls &&
              this.videoMetadata &&
              ((n = []),
              (i = this.getQualityMenu()),
              i && i.items.length && n.push(i),
              (r = this.getAudioTracksMenu()),
              r && r.items.length && n.push(r),
              (u = this.getDownloadMenu()),
              u && u.items.length && n.push(u),
              (f = this.getClosedCaptionMenu()),
              f && f.items.length && n.push(f),
              (o = this.getPlaybackRateMenu()),
              o && o.items.length && n.push(o),
              (s = this.getShareMenu()),
              s && s.items.length && n.push(s),
              this.videoControls.setupPlayerMenus(n),
              !!this.ccSettingsMenuId &&
                ((c = e.selectFirstElement(
                  "#" + this.ccSettingsMenuId,
                  this.videoControlsContainer
                )),
                !!c))
            )
              for (
                a = e.selectElementsT("button", c), h = 0, l = a;
                h < l.length;
                h++
              )
                (t = l[h]),
                  t.innerHTML.toLowerCase().indexOf("preset") >= 0
                    ? (e.addEvents(t, "mouseover focus", this.onCcPresetFocus),
                      e.addEvents(t, "mouseout blur", this.onCcPresetBlur))
                    : e.addEvents(t, "mouseover focus", this.onCcPresetBlur);
          }),
          (n.prototype.dispose = function () {
            this.hideErrorMessage();
            this.unbindEvents();
            this.stop();
            this.updateState(t.PlayerStates.Stopped);
            this.videoTag = null;
            this.videoWrapper && this.videoWrapper.dispose();
            this.interactiveTriggersHelper &&
              this.interactiveTriggersHelper.dispose();
            this.inviewManager &&
              this.registedInviewManagerAlready &&
              this.inviewManager.disposePlayer(this);
          }),
          (n.prototype.restoreSettings = function () {
            if (
              this.playerOptions.mute ||
              f.getValueFromSessionStorage(n.mutePrefKey) === "1"
            )
              (this.isVideoMuted = !0), this.mute(!1);
            else {
              var t = parseInt(f.getValueFromSessionStorage(n.volumePrefKey), 10);
              this.lastVolume = f.isNumber(t)
                ? t / 10
                : nt.PlayerConfig.defaultVolume;
              this.setVolume(this.lastVolume);
            }
            !this.videoControls || this.videoControls.updateVolumeState();
          }),
          (n.prototype.checkReplacedVideoTag = function () {
            var n = this,
              t = e.selectFirstElementT("video", this.playerContainer);
            t &&
              t !== this.videoTag &&
              ((this.videoTag = t),
              (this.videoTag.tabIndex = -1),
              (this.videoTag.style.cursor = "pointer"),
              (this.videoTag.playsInline = !0),
              p.Environment.isMobile ||
                this.videoTag.setAttribute("aria-hidden", "true"),
              p.Environment.isIProduct
                ? p.Environment.isIPhone
                  ? ((this.videoTag.controls = !0),
                    e.addEvents(
                      this.videoTag,
                      e.eventTypes[e.eventTypes.touchstart],
                      function () {
                        n.playerOptions.lazyLoad &&
                          !n.wrapperLoadCalled &&
                          n.loadVideoWrapper(!0);
                      }
                    ))
                  : e.addEvents(
                      this.videoTag,
                      e.eventTypes[e.eventTypes.touchstart],
                      function () {
                        n.videoTag.controls = !0;
                      }
                    )
                : e.addEvents(
                    this.videoTag,
                    e.eventTypes[e.eventTypes.click],
                    this.onVideoPlayerClicked
                  ));
          }),
          (n.prototype.loadVideo = function () {
            var n = this;
            if (!this.locReady) {
              setTimeout(function () {
                n.loadVideo();
              }, 50);
              return;
            }
            if (!this.videoTag) return null;
            this.checkReplacedVideoTag();
            this.restoreSettings();
            this.bindEvents();
            this.videoMetadata &&
              this.videoMetadata.posterframeUrl &&
              !this.playerOptions.hidePosterFrame &&
              this.videoWrapper.setPosterFrame(this.videoMetadata.posterframeUrl);
            this.currentVideoFile = this.getVideoFileToPlay();
            this.currentVideoFile && this.setVideoSrc(this.currentVideoFile);
            p.Environment.isMobile &&
              this.videoMetadata.ccFiles &&
              this.videoWrapper.addNativeClosedCaption(
                this.videoMetadata.ccFiles,
                s.ClosedCaptionTypes.VTT,
                this.localizationHelper
              );
            this.setupPlayerMenus();
            this.showControlsBasedOnState();
          }),
          (n.prototype.displayPreRollAndPlayContent = function () {
            var i = this,
              n,
              r,
              u;
            if (
              (this.playerState === t.PlayerStates.Ended &&
                (this.reportEvent(k.PlayerEvents.Replay),
                this.updateState("ready")),
              !this.hasInteractivity)
            ) {
              this.play();
              return;
            }
            if (!this.interactiveTriggersHelper.isInteractivityJSONReady) {
              setTimeout(function () {
                i.displayPreRollAndPlayContent();
              }, 50);
              return;
            }
            if (
              ((n = this.videoWrapper),
              (r = ""),
              !n.ampPlayer ||
                !n.ampPlayer.techName ||
                (r = n.ampPlayer.techName.toLowerCase()),
              r.indexOf("flash") >= 0 &&
                ((u = e.selectFirstElementT(
                  ".f-video-player",
                  this.playerContainer
                )),
                this.playerState === "loading" ||
                  this.playerState === "init" ||
                  u.classList.contains("vjs-loading") ||
                  u.classList.contains("vjs-waiting")))
            ) {
              setTimeout(function () {
                i.displayPreRollAndPlayContent();
              }, 50);
              return;
            }
            this.reportContentStart();
            this.interactiveTriggersHelper.displayPreRoll(function () {
              i.play();
            });
          }),
          (n.prototype.reportContentStart = function () {
            this.isFirstTimePlayed &&
              !this.isContentStartReported &&
              ((this.isFirstTimePlayed = !1),
              (this.isContentStartReported = !0),
              this.reportEvent(k.PlayerEvents.ContentStart));
          }),
          (n.prototype.bindEvents = function () {
            this.areMediaEventsBound ||
              ((this.areMediaEventsBound = !0),
              this.videoWrapper.bindVideoEvents(this.onMediaEvent),
              e.addEvents(
                this.videoComponent,
                "mousemove mouseout",
                this.onMouseEvent
              ),
              e.addEvents(this.videoComponent, "keydown", this.onKeyboardEvent),
              e.addEvents(window, "onBeforeUnload", this.onBeforeUnload),
              this.addFullscreenEvents(),
              e.addEvents(
                this.ccOverlay,
                e.eventTypes[e.eventTypes.click],
                this.onVideoPlayerClicked
              ),
              this.checkReplacedVideoTag(),
              e.addThrottledEvent(
                window,
                e.eventTypes.resize,
                this.onWindowResize
              ));
          }),
          (n.prototype.unbindEvents = function () {
            e.removeEvents(
              this.videoComponent,
              "mousemove mouseout",
              this.onMouseEvent
            );
            e.removeEvents(this.videoComponent, "keydown", this.onKeyboardEvent);
            e.removeEvents(
              this.ccOverlay,
              e.eventTypes[e.eventTypes.click],
              this.onVideoPlayerClicked
            );
            e.removeEvents(window, "onBeforeUnload", this.onBeforeUnload);
            e.removeEvents(window, "resize", this.onWindowResize);
            this.removeFullscreenEvents();
          }),
          (n.prototype.setVideoSrc = function (n) {
            var i, u, f, r, e, o;
            if (!!n && !!n.url && !!this.videoWrapper) {
              if (
                (this.updateState(t.PlayerStates.Loading),
                (i = [n]),
                (u = this.getFallbackVideoFile()),
                u)
              ) {
                for (f = !1, r = 0, e = i; r < e.length; r++)
                  if (((o = e[r]), o.url === u.url)) {
                    f = !0;
                    break;
                  }
                f || i.push(this.getFallbackVideoFile());
              }
              this.videoWrapper.setSource(i);
              this.setAutoPlayNeeded && this.videoWrapper.setAutoPlay();
            }
          }),
          (n.prototype.reportEvent = function (n, t) {
            var i = this.getReport(t),
              r,
              f,
              h,
              u,
              o,
              s;
            for (
              this.logMessage(
                "Event reported : " +
                  k.PlayerEvents[n] +
                  " | data : " +
                  JSON.stringify(i)
              ),
                r = 0,
                f = this.reporters;
              r < f.length;
              r++
            )
              (h = f[r]), h.reportEvent(n, i);
            for (
              e.customEvent(this.videoComponent, k.PlayerEvents[n], {
                detail: i,
              }),
                u = 0,
                o = this.playerEventCallbacks;
              u < o.length;
              u++
            )
              (s = o[u]),
                s &&
                  s({
                    name: k.PlayerEvents[n],
                    data: i,
                  });
          }),
          (n.prototype.getVideoWrapper = function () {
            return this.playerOptions &&
              this.playerOptions.corePlayer === "nativeplayer"
              ? new y.NativeVideoWrapper()
              : this.playerOptions &&
                this.playerOptions.corePlayer === "hasplayer"
              ? new a.HasPlayerVideoWrapper()
              : this.playerOptions &&
                this.playerOptions.corePlayer === "hlsplayer"
              ? new v.HlsPlayerVideoWrapper()
              : (this.playerOptions && this.playerOptions.corePlayer === "amp") ||
                this.useAdaptive
              ? new l.AmpWrapper(this.playerOptions.useAMPVersion2)
              : new c.Html5VideoWrapper();
          }),
          (n.prototype.hideControlPanel = function () {
            !this.controlPanelTimer ||
              (window.clearTimeout(this.controlPanelTimer),
              (this.controlPanelTimer = 0));
            this.areControlsVisible &&
              (p.Environment.useNativeControls
                ? this.videoTag &&
                  !this.playerOptions.lazyLoad &&
                  this.wrapperLoadCalled &&
                  (this.videoTag.controls = !1)
                : !this.videoControlsContainer ||
                  e.hasClass(this.videoControlsContainer, n.hideControlsClass) ||
                  (this.screenManagerHelper.updateElementDisplay(
                    this.controlsScreenManagerObject,
                    !1
                  ),
                  !this.ccOverlay ||
                    (this.closedCaptions &&
                      this.videoWrapper &&
                      this.closedCaptions.updateCaptions(
                        this.getPlayPosition().currentTime
                      ))),
              !this.videoControls ||
                (this.videoControls.prepareToHide(),
                this.videoControls.hideControls()),
              (this.areControlsVisible = !1));
          }),
          (n.prototype.showControlPanel = function (t) {
            var r = this,
              i;
            (t === void 0 && (t = !0),
            (this.playerOptions && !this.playerOptions.controls) ||
              this.isTriggerShown()) ||
              (this.playerOptions &&
                !this.playerOptions.showControlOnLoad &&
                this.showcontrolFirstTime) ||
              (!this.controlPanelTimer ||
                (window.clearTimeout(this.controlPanelTimer),
                (this.controlPanelTimer = 0)),
              this.areControlsVisible ||
                (p.Environment.useNativeControls
                  ? this.videoTag && (this.videoTag.controls = !0)
                  : !this.videoControlsContainer ||
                    e.hasClass(
                      this.videoControlsContainer,
                      n.showControlsClass
                    ) ||
                    (this.screenManagerHelper.updateElementDisplay(
                      this.controlsScreenManagerObject,
                      !0
                    ),
                    !this.ccOverlay ||
                      (this.closedCaptions &&
                        this.videoWrapper &&
                        this.closedCaptions.updateCaptions(
                          this.getPlayPosition().currentTime
                        )),
                    this.videoControls.resetSlidersWorkaround()),
                (this.areControlsVisible = !0)),
              (i = null),
              (i =
                this.playerOptions.controlPanelTimeout !== null
                  ? this.playerOptions.controlPanelTimeout
                  : n.controlPanelTimeout),
              t &&
                (this.controlPanelTimer = window.setTimeout(function () {
                  r.hideControlPanel();
                }, i)));
          }),
          (n.prototype.stopMedia = function (n, i) {
            this.logMessage("StopMedia invoked");
            this.firstByteTimer &&
              (window.clearTimeout(this.firstByteTimer),
              (this.firstByteTimer = null));
            this.exitFullScreen();
            n &&
              (this.logMessage(i || n),
              this.updateState(t.PlayerStates.Stopped),
              this.displayErrorMessage({
                title: n,
              }),
              this.reportEvent(k.PlayerEvents.ContentError, {
                errorType: "content:error",
                errorDesc: i || n,
                errorMessage: n,
              }));
          }),
          (n.prototype.setNextCheckpoint = function () {
            var t = this.getPlayPosition(),
              n,
              i,
              r;
            if (t.endTime)
              for (n = 0, i = nt.PlayerConfig.checkpoints; n < i.length; n++)
                if (
                  ((r = i[n]), Math.round((t.currentTime / t.endTime) * 100) <= r)
                ) {
                  this.nextCheckpoint = r;
                  return;
                }
            this.nextCheckpoint = null;
          }),
          (n.prototype.getPlayPosition = function () {
            return this.videoWrapper
              ? this.videoWrapper.getPlayPosition()
              : {
                  currentTime: 0,
                  startTime: 0,
                  endTime: 0,
                };
          }),
          (n.prototype.getBufferedDuration = function () {
            var n = 0;
            try {
              n = this.videoWrapper && this.videoWrapper.getBufferedDuration();
            } catch (t) {
              this.reportEvent(k.PlayerEvents.PlayerError, {
                errorType: "getBufferedDuration",
                errorDesc: "GetBufferedDuration: " + t.message,
              });
              throw t;
            }
            return n;
          }),
          (n.prototype.addPlayerEventListener = function (n) {
            this.playerEventCallbacks.indexOf(n) < 0 &&
              this.playerEventCallbacks.push(n);
          }),
          (n.prototype.removePlayerEventListener = function (n) {
            var t = this.playerEventCallbacks.indexOf(n);
            t >= 0 && this.playerEventCallbacks.splice(t, 1);
          }),
          (n.prototype.stop = function () {
            if ((this.seek(0), !!this.videoControls)) {
              this.pause();
              var n = this.getPlayPosition();
              this.videoControls.setPlayPosition({
                startTime: n && n.startTime,
                endTime: n && n.endTime,
                currentTime: n && n.startTime,
              });
            }
            this.closedCaptions && this.closedCaptions.updateCaptions(0);
          }),
          (n.prototype.isPaused = function () {
            return !this.videoWrapper ? !1 : this.videoWrapper.isPaused();
          }),
          (n.prototype.isLive = function () {
            return this.videoWrapper && this.videoWrapper.isLive();
          }),
          (n.prototype.isPlayable = function () {
            return !this.videoTag ? !1 : this.canPlay;
          }),
          (n.prototype.play = function () {
            var n = this;
            if (
              this.playerState !== t.PlayerStates.Playing &&
              this.playerState !== t.PlayerStates.Error &&
              this.playerState !== t.PlayerStates.Stopped &&
              this.playerState !== t.PlayerStates.Init
            ) {
              if (
                (this.reportEvent(k.PlayerEvents.Play),
                this.playerState === t.PlayerStates.Ended)
              ) {
                !this.showEndImage ||
                  p.Environment.isIProduct ||
                  !this.endImage ||
                  this.endImage.container.setAttribute("aria-hidden", "true");
                this.displayPreRollAndPlayContent();
                return;
              }
              this.playerOptions.lazyLoad && !this.wrapperLoadCalled
                ? ((this.playOnDataLoad = !1), this.loadVideoWrapper(!0))
                : (!this.videoWrapper ||
                    (p.Environment.isIProduct || p.Environment.isAndroidModern
                      ? this.videoWrapper.play()
                      : setTimeout(function () {
                          n.videoWrapper.play();
                        }, 0)),
                  !this.videoControls ||
                    this.videoControls.updatePlayPauseState());
              this.triggerPlayPauseContainer &&
                (!this.playPauseButton ||
                  (e.removeClass(this.playPauseButton, "glyph-play"),
                  e.addClass(this.playPauseButton, "glyph-pause"),
                  this.playPauseButton.setAttribute("aria-label", this.locPause),
                  e.setText(this.playPauseTooltip, this.locPause)));
            }
          }),
          (n.prototype.pause = function (n) {
            !this.videoWrapper || this.videoWrapper.pause();
            this.triggerPlayPauseContainer &&
              (!this.playPauseButton ||
                (e.removeClass(this.playPauseButton, "glyph-pause"),
                e.addClass(this.playPauseButton, "glyph-play"),
                p.Environment.isChrome
                  ? this.playPauseButton.setAttribute("aria-label", this.locPlay)
                  : this.setAriaLabelForButton(this.playPauseButton),
                e.setText(this.playPauseTooltip, this.locPlay)));
            !this.videoControls || this.videoControls.updatePlayPauseState();
            n && this.reportEvent(k.PlayerEvents.Pause);
          }),
          (n.prototype.seek = function (t) {
            if (f.isNumber(t) && !!this.videoWrapper) {
              var i = this.getPlayPosition();
              t = Math.max(i.startTime, Math.min(t, i.endTime));
              Math.abs(t - i.currentTime) >= n.positionUpdateThreshold &&
                (this.setNextCheckpoint(),
                (this.seekFrom = i.currentTime),
                this.videoWrapper.setCurrentTime(t));
            }
          }),
          (n.prototype.getVolume = function () {
            return (this.videoWrapper && this.videoWrapper.getVolume()) || 0;
          }),
          (n.prototype.setVolume = function (t, i) {
            if (f.isNumber(t) && !!this.videoWrapper) {
              t = Math.round(Math.max(0, Math.min(t, 1)) * 100) / 100;
              var r = this.videoWrapper.getVolume();
              t !== r &&
                ((this.lastVolume = r),
                this.videoWrapper.setVolume(t),
                (this.lastVolume = t ? t : this.lastVolume),
                i &&
                  (f.saveToSessionStorage(
                    n.volumePrefKey,
                    Math.ceil(t * 10).toString()
                  ),
                  this.reportEvent(k.PlayerEvents.Volume)),
                this.isMuted() && t > 0 && this.unmute(i, !0),
                !this.videoControls || this.videoControls.updateVolumeState());
            }
          }),
          (n.prototype.isMuted = function () {
            return (
              (this.videoWrapper && this.videoWrapper.isMuted()) ||
              this.isVideoMuted
            );
          }),
          (n.prototype.mute = function (t) {
            this.lastVolume = this.getVolume();
            this.setMuted(!0);
            t &&
              (f.saveToSessionStorage(n.mutePrefKey, "1"),
              this.reportEvent(k.PlayerEvents.Mute));
          }),
          (n.prototype.unmute = function (t, i) {
            i ||
              this.setVolume(
                this.lastVolume || nt.PlayerConfig.defaultVolume,
                !1
              );
            this.setMuted(!1);
            t &&
              (f.saveToSessionStorage(n.mutePrefKey, "0"),
              this.reportEvent(k.PlayerEvents.Unmute));
          }),
          (n.prototype.setMuted = function (n) {
            !this.videoWrapper ||
              n === this.videoWrapper.isMuted() ||
              (n ? this.videoWrapper.mute() : this.videoWrapper.unmute());
            !this.videoControls || this.videoControls.updateVolumeState();
          }),
          (n.isNativeFullscreenEnabled = function () {
            var n = document;
            return (
              n.fullscreenEnabled ||
              n.mozFullScreenEnabled ||
              n.webkitFullscreenEnabled ||
              n.webkitSupportsFullscreen ||
              n.msFullscreenEnabled
            );
          }),
          (n.getElementInFullScreen = function () {
            var n = document;
            return (
              n.fullscreenElement ||
              n.mozFullScreenElement ||
              n.webkitFullscreenElement ||
              n.msFullscreenElement
            );
          }),
          (n.prototype.getFullscreenContainer = function () {
            return p.Environment.useNativeControls
              ? this.videoTag
              : this.playerContainer;
          }),
          (n.prototype.enterFullScreen = function () {
            var t, i, r;
            n.isNativeFullscreenEnabled() &&
              ((t = this.getFullscreenContainer()),
              (i = n.getElementInFullScreen()),
              !t ||
                i ||
                ((r =
                  t.requestFullscreen ||
                  t.msRequestFullscreen ||
                  t.mozRequestFullScreen ||
                  t.webkitRequestFullscreen ||
                  t.webkitEnterFullScreen),
                r.call(t)));
          }),
          (n.prototype.exitFullScreen = function () {
            var i, r, t, u;
            n.isNativeFullscreenEnabled() &&
              ((i = this.getFullscreenContainer()),
              (r = n.getElementInFullScreen()),
              !i ||
                i !== r ||
                ((t = document),
                (u =
                  t.cancelFullScreen ||
                  t.msExitFullscreen ||
                  t.mozCancelFullScreen ||
                  t.webkitCancelFullScreen),
                u.call(t)));
          }),
          (n.prototype.toggleFullScreen = function () {
            this.isInFullscreen ? this.exitFullScreen() : this.enterFullScreen();
          }),
          (n.prototype.isFullScreen = function () {
            return this.isInFullscreen;
          }),
          (n.prototype.addFullscreenEvents = function () {
            e.addEvents(
              document,
              "fullscreenchange mozfullscreenchange webkitfullscreenchange MSFullscreenChange",
              this.onFullscreenChanged,
              !1
            );
            e.addEvents(
              document,
              "fullscreenerror mozfullscreenerror webkitfullscreenerror MSFullscreenError",
              this.onFullscreenError,
              !1
            );
            this.videoTag &&
              (e.addEvents(
                this.videoTag,
                "webkitbeginfullscreen",
                this.onIOSFullscreenEnter,
                !1
              ),
              e.addEvents(
                this.videoTag,
                "webkitendfullscreen",
                this.onIOSFullscreenExit,
                !1
              ));
          }),
          (n.prototype.removeFullscreenEvents = function () {
            e.removeEvents(
              document,
              "fullscreenchange mozfullscreenchange webkitfullscreenchange MSFullscreenChange",
              this.onFullscreenChanged,
              !1
            );
            e.removeEvents(
              document,
              "fullscreenerror mozfullscreenerror webkitfullscreenerror MSFullscreenError",
              this.onFullscreenError,
              !1
            );
            this.videoTag &&
              (e.removeEvents(
                this.videoTag,
                "webkitbeginfullscreen",
                this.onIOSFullscreenEnter,
                !1
              ),
              e.removeEvents(
                this.videoTag,
                "webkitendfullscreen",
                this.onIOSFullscreenExit,
                !1
              ));
          }),
          (n.prototype.onFullscreenEnter = function () {
            this.isInFullscreen = !0;
            this.videoControls &&
              (!this.interactiveTriggersHelper
                ? this.resetFocusTrap()
                : this.resetFocusTrap(
                    this.interactiveTriggersHelper.findInteractivityFocusTrapStart()
                  ),
              this.videoControls.updateFullScreenState());
            this.reportEvent(k.PlayerEvents.FullScreenEnter);
          }),
          (n.prototype.onFullscreenExit = function () {
            this.isInFullscreen = !1;
            this.videoControls &&
              (this.videoControls.removeFocusTrap(),
              this.videoControls.updateFullScreenState());
            this.reportEvent(k.PlayerEvents.FullScreenExit);
          }),
          (n.prototype.resetFocusTrap = function (n) {
            this.isFullScreen() &&
              (this.videoControls.removeFocusTrap(),
              n
                ? this.videoControls.setFocusTrap(n)
                : this.hasInteractivity
                ? this.videoControls.setFocusTrap(n)
                : this.videoControls.setFocusTrap(null));
          }),
          (n.prototype.initializeClosedCaptions = function () {
            this.ccOverlay = e.selectFirstElement(
              ".f-video-cc-overlay",
              this.videoComponent
            );
            this.closedCaptions = new r.VideoClosedCaptions(
              this.ccOverlay,
              this.onErrorCallback
            );
            this.closedCaptionsSettings = new u.VideoClosedCaptionsSettings(
              this.onErrorCallback
            );
            this.ccScreenManagerObject = {
              HtmlObject: this.ccOverlay,
              Height: 0,
              Id: null,
              IsVisible: !1,
              Priority: 0,
              Transition: null,
            };
            this.screenManagerHelper.registerElement(this.ccScreenManagerObject);
          }),
          (n.prototype.onPlayerMenuItemClick = function (n) {
            if (n && n.category)
              switch (n.category) {
                case ht.ClosedCaption:
                  this.setCC(n.id, !0);
                  break;
                case ht.ClosedCaptionSettings:
                  this.setCCSettings(n);
                  break;
                case ht.Quality:
                  this.setQuality(n.id);
                  break;
                case ht.AudioTracks:
                  this.setAudio(n.id);
                  break;
                case ht.Share:
                  this.shareVideo(n);
                  break;
                case ht.PlaybackSpeed:
                  this.setPlaybackRate(n.id, !0);
                  break;
                case ht.Download:
                  this.downloadMedia(n);
              }
          }),
          (n.prototype.onPlayerContextMenuItemClick = function (n) {
            if (n && n.category) {
              switch (n.category) {
                case ct.PlayPause:
                  this.isPaused() ? this.play() : this.pause(!0);
                  break;
                case ct.MuteUnMute:
                  this.isMuted() ? this.unmute(!0) : this.mute(!0);
              }
              this.customizedContextMenu.setAttribute("aria-hidden", "true");
            }
          }),
          (n.prototype.setCC = function (t, i) {
            var u, e, o, r, h;
            if (this.closedCaptions) {
              if (
                ((t = this.removeIdPrefix(t)),
                (u = null),
                t && this.videoMetadata && this.videoMetadata.ccFiles)
              )
                for (e = 0, o = this.videoMetadata.ccFiles; e < o.length; e++)
                  if (
                    ((r = o[e]),
                    r.locale === t &&
                      (!r.ccType || r.ccType === s.ClosedCaptionTypes.TTML))
                  ) {
                    u = r;
                    break;
                  }
              h = this.closedCaptions.getCurrentCcLanguage();
              this.closedCaptions.setCcLanguage(t, u ? u.url : null);
              i && f.saveToSessionStorage(n.ccLangPrefKey, t);
              t === "off"
                ? this.screenManagerHelper.updateElementDisplay(
                    this.ccScreenManagerObject,
                    !1
                  )
                : this.screenManagerHelper.updateElementDisplay(
                    this.ccScreenManagerObject,
                    !0
                  );
              this.reportEvent(k.PlayerEvents.ClosedCaptionsChanged, {
                startcaptionselection: h,
                endCaptionSelection: t,
              });
            }
          }),
          (n.prototype.setCCSettings = function (n) {
            var i, t, r;
            if (
              this.videoControls &&
              this.closedCaptions &&
              this.closedCaptionsSettings &&
              n &&
              n.data
            ) {
              if (n.data === "reset") this.closedCaptionsSettings.reset();
              else {
                if (((i = n.data.split(":")), !i && i.length < 0)) return;
                this.closedCaptionsSettings.setSetting(i[0], i[1]);
              }
              if (
                (this.closedCaptions.resetCaptions(),
                this.closedCaptions.updateCaptions(
                  this.getPlayPosition().currentTime
                ),
                (t = this.closedCaptionsSettings.getCurrentSettings()),
                t)
              ) {
                for (r in t)
                  t.hasOwnProperty(r) &&
                    this.videoControls.updateMenuSelection(
                      this.getCCSettingsMenuId(r),
                      this.getCCMenuItemId(r, t[r])
                    );
                t[u.VideoClosedCaptionsSettings.presetKey] ||
                  this.videoControls.updateMenuSelection(
                    this.getCCSettingsMenuId(
                      u.VideoClosedCaptionsSettings.presetKey
                    )
                  );
              }
              this.reportEvent(k.PlayerEvents.ClosedCaptionSettingsChanged, {
                closedCaptionSettings: n.data,
              });
            }
          }),
          (n.prototype.setPlaybackRate = function (t, i) {
            if (((t = this.removeIdPrefix(t)), t && this.videoWrapper)) {
              var u = "rate",
                r = u && o.startsWith(t, u, !1) ? t.substring(u.length) : t;
              r &&
                (this.videoWrapper.setPlaybackRate(+r),
                i && f.saveToSessionStorage(n.playbackRatePrefKey, r),
                this.reportEvent(k.PlayerEvents.PlaybackRateChanged, {
                  playbackRate: r,
                }));
            }
          }),
          (n.prototype.setQuality = function (t) {
            var u, i, o, h;
            if (((t = this.removeIdPrefix(t)), t)) {
              var e = s.MediaQuality[t],
                c = this.currentMediaQuality,
                r = this.getVideoFileToPlay(e),
                l = this.videoWrapper.getCurrentVideoTrack();
              if (r && r.url)
                (this.currentVideoFile = r),
                  f.saveToSessionStorage(n.qualityPrefKey, t),
                  (this.playOnDataLoad = !this.isPaused()),
                  (this.startTimeOnDataLoad = this.getPlayPosition().currentTime),
                  this.setVideoSrc(r),
                  this.reportEvent(k.PlayerEvents.VideoQualityChanged, {
                    startRes: c,
                    endRes: e,
                  });
              else {
                if (((u = t.match(/video-(\d+)/)), !u || u.length < 2)) return;
                i = parseInt(u[1], 10);
                i !== NaN &&
                  i >= 0 &&
                  ((o = l.auto
                    ? "auto"
                    : this.videoWrapper.getVideoTracks()[
                        this.videoWrapper.getCurrentVideoTrack().trackIndex
                      ].bitrate),
                  this.videoWrapper.switchToVideoTrack(i),
                  (h =
                    t === "auto"
                      ? "auto"
                      : this.videoWrapper.getVideoTracks()[i].bitrate),
                  this.reportEvent(k.PlayerEvents.VideoQualityChanged, {
                    startRes: o,
                    endRes: h,
                  }));
              }
            }
          }),
          (n.prototype.setAudio = function (n) {
            var i, t;
            if (
              ((n = this.removeIdPrefix(n)), n) &&
              ((i = n.match(/audio-(\d+)/)), i && !(i.length < 2)) &&
              ((t = parseInt(i[1], 10)),
              t !== NaN && t >= 0 && !!this.isAudioTracksDoneSwitching)
            ) {
              var r = this.videoWrapper.getAudioTracks(),
                u = this.videoWrapper.getCurrentAudioTrack(),
                f = !r[u] ? null : r[u].title,
                e = !r[t] ? null : r[t].title;
              this.isAudioTracksDoneSwitching = !1;
              this.videoWrapper.switchToAudioTrack(t);
              this.reportEvent(k.PlayerEvents.AudioTrackChanged, {
                startTrackSelection: f,
                endTrackSelection: e,
              });
            }
          }),
          (n.prototype.shareVideo = function (n) {
            var i = this,
              t;
            if (n && n.id && ((t = this.removeIdPrefix(n.id)), t && n.data)) {
              this.reportEvent(k.PlayerEvents.VideoShared, {
                videoShare: t,
              });
              switch (t) {
                case it.shareTypes.copy:
                  tt.SharingHelper.tryCopyTextToClipboard(
                    decodeURIComponent(n.data)
                  );
                  setTimeout(function () {
                    i.setFocusOnOptionsButton();
                  }, 100);
                  break;
                case it.shareTypes.mail:
                  window.location.href = n.data;
                  break;
                default:
                  window.open(n.data, "_blank");
              }
            }
          }),
          (n.prototype.downloadMedia = function (n) {
            if (n && n.data) {
              window.open(n.data, "_blank");
              var t = n.id.indexOf("transcript") !== -1 ? "transcript" : "video";
              this.reportEvent(k.PlayerEvents.MediaDownloaded, {
                downloadType: t,
                downloadMedia: n.data.toString(),
              });
            }
          }),
          (n.prototype.addIdPrefix = function (n) {
            var t =
              this.videoComponent && this.videoComponent.id
                ? this.videoComponent.id + "-"
                : null;
            return t && !o.startsWith(n, t, !1) ? t + n : n;
          }),
          (n.prototype.removeIdPrefix = function (n) {
            var t =
              this.videoComponent && this.videoComponent.id
                ? this.videoComponent.id + "-"
                : null;
            return t && o.startsWith(n, t, !1) ? n.substring(t.length) : n;
          }),
          (n.prototype.setFocusOnVideoContainerEdge = function () {
            var n = this;
            p.Environment.isEdgeBrowser &&
              !this.videoElementIsFocus &&
              ((this.videoElementIsFocus = !0),
              this.playerContainer.setAttribute("tabindex", "0"),
              setTimeout(function () {
                return n.playerContainer.focus();
              }, 100));
          }),
          (n.prototype.showTrigger = function () {
            !this.triggerContainer ||
              (this.triggerContainer.setAttribute("aria-hidden", "false"),
              e.addEvents(
                this.triggerContainer,
                "click keyup",
                this.triggerContainerEventHandler,
                !0
              ),
              p.Environment.isEdgeBrowser &&
                this.playerContainer.setAttribute("tabindex", "-1"));
            this.playerOptions &&
              this.playerOptions.controls &&
              this.videoControlsContainer &&
              !p.Environment.useNativeControls &&
              this.videoControlsContainer.setAttribute("aria-hidden", "true");
          }),
          (n.prototype.hideTrigger = function () {
            !this.triggerContainer ||
              (this.triggerContainer.setAttribute("aria-hidden", "true"),
              this.setFocusOnVideoContainerEdge());
            this.playerOptions &&
              this.playerOptions.controls &&
              this.videoControlsContainer &&
              !p.Environment.useNativeControls &&
              this.videoControlsContainer.setAttribute("aria-hidden", "false");
          }),
          (n.prototype.showPlayPauseTrigger = function (n) {
            !this.triggerPlayPauseContainer ||
              (n
                ? (e.removeClass(this.playPauseButton, "f-play-pause-hide"),
                  e.addClass(this.playPauseButton, "f-play-pause-show"))
                : (e.addClass(this.playPauseButton, "f-play-pause-hide"),
                  e.removeClass(this.playPauseButton, "f-play-pause-show")));
          }),
          (n.prototype.disablePlayPauseTrigger = function () {
            !this.triggerPlayPauseContainer ||
              e.removeClass(
                this.triggerPlayPauseContainer,
                "f-play-pause-trigger"
              );
          }),
          (n.prototype.isTriggerShown = function () {
            return (
              this.triggerContainer &&
              this.triggerContainer.getAttribute("aria-hidden") === "false"
            );
          }),
          (n.prototype.setTriggerProperties = function () {
            if (this.localizationHelper && this.trigger) {
              var n = this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.play
                ),
                t = this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.play_video
                );
              this.setAriaLabelForButton(this.trigger, t);
              e.setText(this.triggerTooltip, n);
            }
          }),
          (n.prototype.displayErrorMessage = function (n) {
            if (n && (n.title || n.message)) {
              if (((this.errorMessageDisplayed = !0), !this.errorMessage)) {
                this.errorMessage = {};
                this.errorMessage.container = document.createElement("div");
                var t = document.createElement("div");
                this.errorMessage.title = document.createElement("p");
                this.errorMessage.message = document.createElement("p");
                this.errorMessage.container.setAttribute("role", "status");
                this.errorMessage.container.setAttribute(
                  "class",
                  "f-error-message"
                );
                this.errorMessage.title.setAttribute("class", "c-heading");
                this.errorMessage.message.setAttribute("class", "c-paragraph");
                !n.title || e.setText(this.errorMessage.title, n.title);
                !n.message || e.setText(this.errorMessage.message, n.message);
                this.errorMessage.container.appendChild(t);
                !n.title || t.appendChild(this.errorMessage.title);
                t.appendChild(this.errorMessage.message);
                this.playerContainer.appendChild(this.errorMessage.container);
              } else
                e.setText(this.errorMessage.title, n.title || ""),
                  e.setText(this.errorMessage.message, n.message || ""),
                  this.errorMessage.container.setAttribute(
                    "aria-hidden",
                    "false"
                  );
              this.updateScreenReaderElement(n.title, !0);
              this.hideTrigger();
            }
          }),
          (n.prototype.displayImage = function (n) {
            var i, t;
            n || (n = this.videoMetadata.posterframeUrl);
            this.endImage
              ? ((i = e.selectFirstElement(
                  ".f-post-image",
                  this.endImage.container
                )),
                i.setAttribute("src", n),
                this.endImage.container.setAttribute("aria-hidden", "false"))
              : ((this.endImage = {}),
                (this.endImage.container = document.createElement("div")),
                this.endImage.container.setAttribute(
                  "class",
                  "f-end-poster-image"
                ),
                this.endImage.container.setAttribute("aria-hidden", "false"),
                this.endImage.container.setAttribute("role", "none"),
                (t = document.createElement("img")),
                t.setAttribute("src", n),
                t.setAttribute("class", "f-post-image"),
                t.setAttribute("height", "auto"),
                t.setAttribute("width", "100%"),
                t.setAttribute("role", "none"),
                this.endImage.container.appendChild(t),
                this.playerContainer.appendChild(this.endImage.container));
          }),
          (n.prototype.hideImage = function () {
            !this.endImage ||
              this.endImage.container.setAttribute("aria-hidden", "true");
          }),
          (n.prototype.hideErrorMessage = function () {
            !this.errorMessage ||
              !this.errorMessage.container ||
              (this.errorMessage.container.setAttribute("aria-hidden", "true"),
              (this.errorMessageDisplayed = !1));
          }),
          (n.prototype.showPosterImage = function (n) {
            this.wrapperLoadCalled ||
              ((this.showingPosterImage = !0),
              (this.posterImageUrl = n),
              this.loadVideoWrapper(!1));
          }),
          (n.prototype.resize = function () {
            !this.videoControls ||
              (this.videoControls.resetSlidersWorkaround(),
              this.videoControls.updateReactiveControlDisplay(),
              this.onWindowResize());
          }),
          (n.prototype.getDefaultMediaQuality = function () {
            var i = f.getValueFromSessionStorage(n.qualityPrefKey),
              t = null;
            return (
              i && (t = s.MediaQuality[i]),
              t ||
                (t = p.Environment.isMobile
                  ? nt.PlayerConfig.defaultQualityMobile
                  : p.Environment.isTV
                  ? nt.PlayerConfig.defaultQualityTV
                  : nt.PlayerConfig.defaultQualityDesktop),
              t
            );
          }),
          (n.prototype.getVideoFileforDownload = function () {
            return (
              this.getVideoFileByQuality(s.MediaQuality.HQ) ||
              this.getVideoFileByType(s.MediaTypes.MP4)
            );
          }),
          (n.prototype.getVideoFileByQuality = function (n) {
            var u = null,
              t,
              i,
              r;
            if (n && this.videoMetadata && this.videoMetadata.videoFiles)
              for (t = 0, i = this.videoMetadata.videoFiles; t < i.length; t++)
                if (((r = i[t]), r.quality === n)) {
                  u = r;
                  break;
                }
            return u;
          }),
          (n.prototype.getVideoFileByType = function (n) {
            var u = null,
              t,
              i,
              r;
            if (n && this.videoMetadata && this.videoMetadata.videoFiles)
              for (t = 0, i = this.videoMetadata.videoFiles; t < i.length; t++)
                if (((r = i[t]), r.mediaType === n)) {
                  u = r;
                  break;
                }
            return u;
          }),
          (n.prototype.getVideoFileToPlay = function (n) {
            var r = n || this.getDefaultMediaQuality(),
              t,
              i;
            return (
              (this.currentMediaQuality = r),
              (i = !1),
              this.hasHLS &&
                this.playerOptions &&
                this.playerOptions.useHLS &&
                this.playerOptions.corePlayer === "hlsplayer" &&
                ((t = this.getVideoFileByType(s.MediaTypes.HLS)),
                t && t.url && (i = !0)),
              i ||
                !this.playerOptions ||
                this.useAdaptive ||
                ((t = this.getVideoFileByQuality(r)), t && t.url && (i = !0)),
              i ||
                this.currentVideoFile ||
                (this.useAdaptive &&
                  ((t =
                    this.getVideoFileByType(s.MediaTypes.DASH) ||
                    this.getVideoFileByType(s.MediaTypes.SMOOTH)),
                  t && t.url && (i = !0)),
                i || (t = this.getVideoFileByType(s.MediaTypes.MP4))),
              t
            );
          }),
          (n.prototype.getFallbackVideoFile = function () {
            return (
              this.getVideoFileByQuality(s.MediaQuality.HQ) ||
              this.getVideoFileByType(s.MediaTypes.MP4)
            );
          }),
          (n.prototype.updateState = function (n) {
            if (
              n &&
              n !== this.playerState &&
              this.playerState !== t.PlayerStates.Error
            ) {
              this.playerState = n;
              this.logMessage("Player state updated. New state: " + n);
              var i = null;
              switch (this.playerState) {
                case t.PlayerStates.Loading:
                  i = k.PlaybackStatus.VideoOpening;
                  this.stopwatchLoading.start();
                  break;
                case t.PlayerStates.Playing:
                  i = k.PlaybackStatus.VideoPlaying;
                  this.stopwatchPlaying.start();
                  this.currentVideoStopwatchPlaying.start();
                  this.stopwatchBuffering.stop();
                  this.stopwatchLoading.stop();
                  this.isBuffering &&
                    this.stopwatchBuffering.getValue() &&
                    ((this.isBuffering = !1),
                    this.reportEvent(k.PlayerEvents.BufferComplete));
                  break;
                case t.PlayerStates.Paused:
                  i = k.PlaybackStatus.VideoPaused;
                  this.stopwatchPlaying.stop();
                  this.currentVideoStopwatchPlaying.stop();
                  this.stopwatchLoading.stop();
                  break;
                case t.PlayerStates.Buffering:
                  i = k.PlaybackStatus.VideoPlaying;
                  this.stopwatchBuffering.start();
                  this.isBuffering = !0;
                  break;
                case t.PlayerStates.Seeking:
                  this.stopwatchLoading.stop();
                  break;
                case t.PlayerStates.Ended:
                  i = k.PlaybackStatus.VideoPlayCompleted;
                  this.stopwatchPlaying.stop();
                  this.currentVideoStopwatchPlaying.reset();
                  this.showEndImage &&
                    !p.Environment.isIProduct &&
                    (this.displayImage(this.videoMetadata.posterframeUrl),
                    this.showTrigger());
                  this.triggerPlayPauseContainer &&
                    (!this.playPauseButton ||
                      (e.removeClass(this.playPauseButton, "glyph-pause"),
                      e.addClass(this.playPauseButton, "glyph-play"),
                      this.setAriaLabelForButton(this.playPauseButton),
                      e.setText(this.playPauseTooltip, this.locPlay)));
                  break;
                case t.PlayerStates.Error:
                  i = k.PlaybackStatus.VideoPlayFailed;
                  this.stopwatchBuffering.reset();
                  this.stopwatchLoading.stop();
                  this.stopwatchPlaying.reset();
                  this.currentVideoStopwatchPlaying.reset();
              }
              !this.videoControls ||
                (this.videoControls.updatePlayPauseState(),
                this.videoControls.updateVolumeState());
              this.setPlaybackStatus(i);
              this.showControlsBasedOnState();
              this.showSpinnerBasedOnState();
            }
          }),
          (n.prototype.setPlaybackStatus = function (n) {
            n &&
              this.playbackStatus !== n &&
              ((this.playbackStatus = n),
              this.reportEvent(k.PlayerEvents.PlaybackStatusChanged, {
                status: n,
              }));
          }),
          (n.prototype.setSpinnerProperties = function () {
            this.localizationHelper &&
              this.spinner &&
              (this.spinner.setAttribute(
                "aria-label",
                this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.loading_aria_label
                )
              ),
              this.spinner.setAttribute(
                "aria-valuetext",
                this.localizationHelper.getLocalizedValue(
                  g.playerLocKeys.loading_value_text
                )
              ));
          }),
          (n.prototype.showSpinner = function () {
            this.spinner &&
              !this.isTriggerShown() &&
              this.spinner.setAttribute("aria-hidden", "false");
          }),
          (n.prototype.hideSpinner = function () {
            this.spinner && this.spinner.setAttribute("aria-hidden", "true");
          }),
          (n.prototype.showSpinnerBasedOnState = function () {
            if (!!this.ageGateHelper && !!this.ageGateHelper.ageGateIsDisplayed) {
              this.hideSpinner();
              return;
            }
            switch (this.playerState) {
              case t.PlayerStates.Ready:
              case t.PlayerStates.Playing:
              case t.PlayerStates.Paused:
              case t.PlayerStates.Ended:
              case t.PlayerStates.Stopped:
              case t.PlayerStates.Error:
                this.hideSpinner();
                break;
              case t.PlayerStates.PlayerLoaded:
                p.Environment.isIPhone ? this.hideSpinner() : this.showSpinner();
                break;
              default:
                this.showSpinner();
            }
          }),
          (n.prototype.showControlsBasedOnState = function () {
            switch (this.playerState) {
              case t.PlayerStates.Loading:
              case t.PlayerStates.Init:
              case t.PlayerStates.Error:
                this.hideControlPanel();
                break;
              case t.PlayerStates.Ended:
                this.showEndImage && !p.Environment.isIProduct
                  ? this.hideControlPanel()
                  : this.showControlPanel(!1);
                break;
              case t.PlayerStates.Ready:
              case t.PlayerStates.Paused:
              case t.PlayerStates.Stopped:
                this.showControlPanel(!1);
                break;
              default:
                this.showControlPanel(!0);
            }
          }),
          (n.prototype.updateScreenReaderElement = function (n, t) {
            t === void 0 && (t = !0);
            !this.screenReaderElement ||
              this.screenReaderElement.innerText === n ||
              (p.Environment.isChrome && !t) ||
              (this.screenReaderElement.innerText = n);
          }),
          (n.prototype.setFocusOnPlayButton = function () {
            this.videoControls && this.videoControls.setFocusonPlayButton();
          }),
          (n.prototype.setFocusOnOptionsButton = function () {
            this.videoControls && this.videoControls.setFocusonOptionsButton();
          }),
          (n.prototype.getVideoTitle = function () {
            return this.videoMetadata ? this.videoMetadata.title : "";
          }),
          (n.prototype.getReport = function (n) {
            var t = this.getPlayPosition().endTime;
            return {
              playerInstanceId: this.playerId,
              playerTechnology: this.playerTechnology,
              playerType:
                this.videoWrapper && this.videoWrapper.getPlayerTechName(),
              playbackStatus: k.PlaybackStatus[this.playbackStatus],
              totalBufferWaitTime:
                this.stopwatchBuffering && this.stopwatchBuffering.getValue(),
              bufferCount:
                this.stopwatchBuffering && this.stopwatchBuffering.getIntervals(),
              errorType: n && n.errorType,
              errorDesc: n && n.errorDesc,
              loadTime:
                this.stopwatchLoading && this.stopwatchLoading.getFirstValue(),
              numPlayed:
                this.stopwatchLoading && this.stopwatchLoading.getIntervals(),
              videoDuration: t,
              videoElapsedTime: this.getPlayPosition().currentTime,
              seekFrom: n && n.seekFrom,
              seekTo: n && n.seekTo,
              videoLength: t * 1e3,
              videoSize: f.getDimensions(this.playerContainer),
              totalTimePlaying:
                this.stopwatchPlaying && this.stopwatchPlaying.getTotalValue(),
              currentVideoTotalTimePlaying:
                this.currentVideoStopwatchPlaying &&
                this.currentVideoStopwatchPlaying.getTotalValue(),
              currentInterval:
                this.stopwatchPlaying && this.stopwatchPlaying.getValue(),
              eventCheckpointInterval: nt.PlayerConfig.eventCheckpointInterval,
              checkpoint: n && n.checkpoint,
              checkpointType: n && n.checkpointType,
              currentVideoFile: this.currentVideoFile,
              videoMetadata: this.videoMetadata,
              playerOptions: this.playerOptions,
              interactiveTriggerAndOverlay: n && n.interactiveTriggerAndOverlay,
              videoShare: n && n.videoShare,
              closedCaptions: n && n.closedCaptions,
              closedCaptionSettings: n && n.closedCaptionSettings,
              playbackRate: n && n.playbackRate,
              downloadMedia: n && n.downloadMedia,
              downloadType: n && n.downloadType,
              audioTrack: n && n.audioTrack,
              ageGatePassed: n && n.ageGatePassed,
              live: this.isLive(),
              lastVolume: n && n.lastVolume,
              newVolume: n && n.newVolume,
              startRes: n && n.startRes,
              endRes: n && n.endRes,
              startTrackSelection: n && n.startTrackSelection,
              endTrackSelection: n && n.endTrackSelection,
              startCaptionSelection: n && n.startCaptionSelection,
              endCaptionSelection: n && n.endCaptionSelection,
            };
          }),
          (n.prototype.logMessage = function (n) {
            this.playerOptions &&
              this.playerOptions.debug &&
              n &&
              b.PlayerUtility.logConsoleMessage(
                n,
                "Core-Player : " + this.videoComponent.id
              );
          }),
          (n.prototype.showElement = function (n) {
            n && n.setAttribute("aria-hidden", "false");
          }),
          (n.prototype.hideElement = function (n) {
            n && n.setAttribute("aria-hidden", "true");
          }),
          (n.playerContainerSelector = ".f-core-player"),
          (n.showControlsClass = "f-slidein"),
          (n.hideControlsClass = "f-slideout"),
          (n.fitControlsClass = "f-overlay-slidein"),
          (n.volumePrefKey = "vidvol"),
          (n.mutePrefKey = "vidmut"),
          (n.qualityPrefKey = "vidqlt"),
          (n.ccLangPrefKey = "vidccpref"),
          (n.playbackRatePrefKey = "vidrate"),
          (n.positionUpdateThreshold = 0.1),
          (n.controlPanelTimeout = 6500),
          n
        );
      })();
    t.CorePlayer = at;
  });
  define("base-reporter", [
    "require",
    "exports",
    "player-constants",
    "player-utility",
    "utility",
  ], function (n, t, i, r, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var f = [
        i.videoPerfMarkers.playerInit,
        i.videoPerfMarkers.playerLoadStart,
        i.videoPerfMarkers.locLoadStart,
        i.videoPerfMarkers.locReady,
        i.videoPerfMarkers.metadataFetchStart,
        i.videoPerfMarkers.metadataFetchEnd,
        i.videoPerfMarkers.wrapperLoadStart,
        i.videoPerfMarkers.wrapperReady,
        i.videoPerfMarkers.playerReady,
        i.videoPerfMarkers.playTriggered,
        i.videoPerfMarkers.ttvs,
      ],
      e = (function () {
        function n(n) {
          if (((this.videoComponent = n), (this.isDebugMode = !1), !n)) {
            console.log("base-reporter: video component is null");
            return;
          }
          this.playerId = n.getAttribute("id");
          this.isDebugMode = n.getAttribute("data-debug") === "true";
        }
        return (
          (n.prototype.reportEvent = function (n, t) {
            if (n)
              switch (n) {
                case i.PlayerEvents.CommonPlayerImpression:
                  r.PlayerUtility.createVideoPerfMarker(
                    this.playerId,
                    i.videoPerfMarkers.playerReady
                  );
                  this.onCommonPlayerImpression(t);
                  break;
                case i.PlayerEvents.Replay:
                  this.onReplay(t);
                  break;
                case i.PlayerEvents.BufferComplete:
                  this.onBufferComplete(t);
                  break;
                case i.PlayerEvents.ContentStart:
                  r.PlayerUtility.createVideoPerfMarker(
                    this.playerId,
                    i.videoPerfMarkers.ttvs
                  );
                  this.onContentStart(t);
                  break;
                case i.PlayerEvents.ContentError:
                  this.onContentError(t);
                  break;
                case i.PlayerEvents.ContentComplete:
                  this.onContentComplete(t);
                  break;
                case i.PlayerEvents.ContentCheckpoint:
                  this.onContentCheckpoint(t);
                  break;
                case i.PlayerEvents.ContentLoaded3PP:
                  this.on3ppVideoLoaded(t);
                  break;
                case i.PlayerEvents.Pause:
                  this.onPause(t);
                  break;
                case i.PlayerEvents.Resume:
                  this.onResume(t);
                  break;
                case i.PlayerEvents.Seek:
                  this.onSeek(t);
                  break;
                case i.PlayerEvents.VideoQualityChanged:
                  this.onVideoQualityChanged(t);
                  break;
                case i.PlayerEvents.Mute:
                  this.onMute(t);
                  break;
                case i.PlayerEvents.Unmute:
                  this.onUnmute(t);
                  break;
                case i.PlayerEvents.FullScreenEnter:
                  this.onFullScreenEnter(t);
                  break;
                case i.PlayerEvents.FullScreenExit:
                  this.onFullScreenExit(t);
                  break;
                case i.PlayerEvents.InteractiveOverlayClick:
                  this.onInteractiveOverlayClick(t);
                  break;
                case i.PlayerEvents.InteractiveOverlayShow:
                  this.onInteractiveOverlayShow(t);
                  break;
                case i.PlayerEvents.InteractiveOverlayHide:
                  this.onInteractiveOverlayHide(t);
                  break;
                case i.PlayerEvents.InteractiveOverlayMaximize:
                  this.onInteractiveOverlayMaximize(t);
                  break;
                case i.PlayerEvents.InteractiveOverlayMinimize:
                  this.onInteractiveOverlayMinimize(t);
                  break;
                case i.PlayerEvents.InteractiveBackButtonClick:
                  this.onInteractiveBackButtonClick(t);
                  break;
                case i.PlayerEvents.PlayerError:
                  this.onPlayerErrors(t);
                  break;
                case i.PlayerEvents.VideoShared:
                  this.onVideoShared(t);
                  break;
                case i.PlayerEvents.ClosedCaptionsChanged:
                  this.onClosedCaptionsChanged(t);
                  break;
                case i.PlayerEvents.ClosedCaptionSettingsChanged:
                  this.onClosedCaptionSettingsChanged(t);
                  break;
                case i.PlayerEvents.PlaybackRateChanged:
                  this.onPlaybackRateChanged(t);
                  break;
                case i.PlayerEvents.MediaDownloaded:
                  this.onMediaDownloaded(t);
                  break;
                case i.PlayerEvents.AudioTrackChanged:
                  this.onAudioTrackChanged(t);
                  break;
                case i.PlayerEvents.AgeGateSubmitClick:
                  this.onAgeGateSubmitClick(t);
                  break;
                case i.PlayerEvents.Volume:
                  this.onVolumeChanged(t);
              }
          }),
          (n.prototype.getPerfMarkers = function () {
            var t = {},
              h = u.getPerfMarkerValue(i.videoPerfMarkers.scriptLoaded),
              n,
              e,
              o,
              s;
            for (
              h && (t["p." + i.videoPerfMarkers.scriptLoaded] = h), n = 0, e = f;
              n < e.length;
              n++
            )
              (o = e[n]),
                (s = r.PlayerUtility.getVideoPerfMarker(this.playerId, o)),
                s && (t["p." + o] = s);
            return t;
          }),
          (n.prototype.log = function (n, t) {
            t === void 0 && (t = "Reporter");
            this.isDebugMode && r.PlayerUtility.logConsoleMessage(n, t);
          }),
          n
        );
      })();
    t.BaseReporter = e;
  });
  var __extends =
    (this && this.__extends) ||
    (function () {
      var n =
        Object.setPrototypeOf ||
        ({
          __proto__: [],
        } instanceof Array &&
          function (n, t) {
            n.__proto__ = t;
          }) ||
        function (n, t) {
          for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
        };
      return function (t, i) {
        function r() {
          this.constructor = t;
        }
        n(t, i);
        t.prototype =
          i === null ? Object.create(i) : ((r.prototype = i.prototype), new r());
      };
    })();
  define("jsll-reporter", [
    "require",
    "exports",
    "base-reporter",
    "utility",
    "environment",
  ], function (n, t, i, r, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var f = (function (n) {
      function t(t, i) {
        var f = n.call(this, t) || this,
          e;
        return (
          (f.postJsllMsg = !1),
          (f.playerIdfromUrl = null),
          (e = r.getQSPValue("postJsllMsg", !1)),
          e &&
            u.Environment.isInIframe &&
            i &&
            ((f.postJsllMsg = !0),
            (f.playerIdfromUrl = r.getQSPValue("pid", !1))),
          f
        );
      }
      return (
        __extends(t, n),
        (t.prototype.doPing = function (n, t, i, u) {
          var f = this.getDefaultParams(n, i),
            e;
          r.extend(f, u);
          this.log(
            "jsll - t: " +
              f.t +
              " behavior : " +
              t +
              " data : " +
              JSON.stringify(f)
          );
          e = {
            vidnm: "",
            vidid: "",
            vidpct: 0,
            vidpctwtchd: 0,
            vidwt: 0,
            viddur: 0,
            vidtimeseconds: 0,
            sessiontimeseconds: 0,
            live: !1,
            parentpage: "",
            containerName: "oneplayer",
            dlid: "",
            dltype: "",
            socchn: "",
            name: "",
            id: "",
          };
          this.populateContentTags(e, n, u);
          var h = {
              videoObj: f,
            },
            s = {
              behavior: t,
              actionType: "O",
              pageTags: h,
              contentTags: e,
            },
            o = window;
          try {
            this.postJsllMsg
              ? window.parent.postMessage(
                  JSON.stringify({
                    eventName: "postjsllmessage",
                    playerId: this.playerIdfromUrl,
                    data: s,
                  }),
                  "*"
                )
              : o.awa && o.awa.ct && o.awa.ct.captureContentPageAction(s);
          } catch (c) {
            this.log("jsll logger threw exception : " + c);
          }
        }),
        (t.prototype.populateContentTags = function (n, t, i) {
          n.vidnm = t.videoMetadata && t.videoMetadata.title;
          n.vidid = t.videoMetadata && t.videoMetadata.videoId;
          n.live = t.live;
          var u = t.videoDuration,
            f = t.videoElapsedTime,
            e = t.currentVideoTotalTimePlaying / 1e3,
            h = t.totalTimePlaying / 1e3,
            o = 0,
            s = 0;
          u &&
            r.isNumber(u) &&
            f &&
            r.isNumber(f) &&
            ((o = Math.round((f / u) * 100)), (o = Math.min(o, 100)));
          u &&
            r.isNumber(u) &&
            e &&
            r.isNumber(e) &&
            ((s = Math.round((e / u) * 100)), (s = Math.min(s, 100)));
          n.viddur = Math.round(u);
          n.vidwt = Math.round(f);
          n.vidtimeseconds = Math.round(e);
          n.sessiontimeseconds = Math.round(h);
          n.vidpct = o;
          n.vidpctwtchd = s;
          n.parentpage =
            parent !== window ? document.referrer : window.location.href;
          n.name =
            i &&
            i.interactiveOverlayAndTrigger &&
            i.interactiveOverlayAndTrigger.overlay.friendlyName;
          n.id =
            i &&
            i.interactiveOverlayAndTrigger &&
            i.interactiveOverlayAndTrigger.trigger.triggerId;
          n.dlid = i && i.downloadMedia;
          n.dltype = i && i.downloadType;
          n.socchn = i && i.socchn;
        }),
        (t.prototype.getDefaultParams = function (n, t) {
          var i = {};
          return (
            t && r.extend(i, t),
            n &&
              (r.extend(i, {
                d: n.videoDuration,
                piid: n.playerInstanceId,
                plt: n.playerType,
                ptech: n.playerTechnology,
                size: n.videoSize
                  ? n.videoSize.width + "x" + n.videoSize.height
                  : null,
                vt: n.playerType,
                te: n.videoElapsedTime,
              }),
              n.currentVideoFile &&
                r.extend(i, {
                  vfc: n.currentVideoFile.formatCode,
                  vfile: n.currentVideoFile.url,
                  vmedia: n.currentVideoFile.mediaType,
                  vQuality: n.currentVideoFile.quality,
                }),
              n.playerOptions &&
                r.extend(i, {
                  isAutoplay: n.playerOptions.autoplay,
                  playerOptions: n.playerOptions,
                }),
              n.videoMetadata &&
                r.extend(i, {
                  eid: n.videoMetadata.videoId,
                  vtitle: n.videoMetadata.title,
                  vmetadata: n.videoMetadata,
                })),
            i
          );
        }),
        (t.prototype.onCommonPlayerImpression = function (n) {
          this.log("jsll - OnCommonPlayerImpression()");
          var i = window.awa ? window.awa.behavior.VIDEOPLAYERLOAD : null;
          this.doPing(
            n,
            i,
            t.usageCounters.commonPlayerImpression,
            this.getPerfMarkers()
          );
        }),
        (t.prototype.onBufferComplete = function (n) {
          this.log("jsll - OnBufferComplete()");
          var i = window.awa ? window.awa.behavior.VIDEOBUFFERING : null;
          this.doPing(n, i, t.usageCounters.contentBuffering, {
            bd: n.totalBufferWaitTime,
          });
        }),
        (t.prototype.onContentStart = function (n) {
          this.log("jsll - OnContentStart()");
          var i = window.awa ? window.awa.behavior.VIDEOSTART : null;
          this.doPing(n, i, t.usageCounters.contentStart, this.getPerfMarkers());
        }),
        (t.prototype.onContentCheckpoint = function (n) {
          this.log("jsll - OnContentCheckpoint()");
          var t = window.awa ? window.awa.behavior.VIDEOCHECKPOINT : null;
          this.doPing(n, t, null, {
            cp: n.checkpoint,
            checkpointtype: n.checkpointType,
          });
        }),
        (t.prototype.onContentComplete = function (n) {
          this.log("jsll - OnContentComplete()");
          var i = window.awa ? window.awa.behavior.VIDEOCOMPLETE : null;
          this.doPing(n, i, t.usageCounters.contentComplete);
        }),
        (t.prototype.onContentError = function (n) {
          this.log("jsll - OnContentError()");
          var i = {
              fi: n.currentVideoFile && n.currentVideoFile.url,
              et: n.errorType,
              etd: n.errorDesc,
            },
            r = window.awa ? window.awa.behavior.VIDEOERROR : null;
          this.doPing(n, r, t.usageCounters.contentError, i);
        }),
        (t.prototype.onMute = function (n) {
          this.log("jsll - OnMute()");
          var i = window.awa ? window.awa.behavior.VIDEOMUTE : null;
          this.doPing(n, i, t.usageCounters.mute);
        }),
        (t.prototype.onUnmute = function (n) {
          this.log("jsll - OnMute()");
          var i = window.awa ? window.awa.behavior.VIDEOUNMUTE : null;
          this.doPing(n, i, t.usageCounters.unmute);
        }),
        (t.prototype.onVolumeChanged = function (n) {
          this.log("jsll - onVolumeChange()");
          var t = window.awa ? window.awa.behavior.VIDEOVOLUMECONTROL : null;
          this.doPing(n, t, null, {
            startvol: n.lastVolume,
            endvol: n.newVolume,
          });
        }),
        (t.prototype.onPause = function (n) {
          this.log("jsll - OnPause()");
          var i = window.awa ? window.awa.behavior.VIDEOPAUSE : null;
          this.doPing(n, i, t.usageCounters.pause);
        }),
        (t.prototype.onSeek = function (n) {
          if (n.seekFrom !== n.seekTo) {
            this.log("jsll - OnSeek()");
            var i = window.awa ? window.awa.behavior.VIDEOJUMP : null;
            this.doPing(n, i, t.usageCounters.seek, {
              te: n.seekFrom,
              st: n.seekTo,
              startloc: n.seekFrom,
              endloc: n.seekTo,
            });
          }
        }),
        (t.prototype.onVideoQualityChanged = function (n) {
          this.log("jsll - OnVideoQualityChanged()");
          var i = window.awa ? window.awa.behavior.VIDEORESOLUTIONCONTROL : null;
          this.doPing(n, i, t.usageCounters.videoQuality, {
            q: n.endRes,
            startres: n.startRes,
            endres: n.endRes,
          });
        }),
        (t.prototype.onFullScreenEnter = function (n) {
          this.log("jsll - OnFullScreenEnter()");
          var i = window.awa ? window.awa.behavior.VIDEOFULLSCREEN : null;
          this.doPing(n, i, t.usageCounters.fullScreenEnter);
        }),
        (t.prototype.onFullScreenExit = function (n) {
          this.log("jsll - OnFullScreenExit()");
          var i = window.awa ? window.awa.behavior.VIDEOUNFULLSCREEN : null;
          this.doPing(n, i, t.usageCounters.fullScreenExit);
        }),
        (t.prototype.onReplay = function (n) {
          this.log("jsll - OnReplay()");
          var i = window.awa ? window.awa.behavior.VIDEOREPLAY : null;
          this.doPing(n, i, t.usageCounters.replay);
        }),
        (t.prototype.onResume = function (n) {
          this.log("jsll - OnResume()");
          var i = window.awa ? window.awa.behavior.VIDEOCONTINUE : null;
          this.doPing(n, i, null, t.usageCounters.resume);
        }),
        (t.prototype.on3ppVideoLoaded = function (n) {
          this.log("jsll - On3ppVideoLoaded()");
          this.doPing(n, null, t.usageCounters.contentImpression3PP);
        }),
        (t.prototype.onInteractiveOverlayClick = function (n) {
          this.log("jsll - onInteractiveTriggerClick");
          var i = window.awa ? window.awa.behavior.VIDEOLAYERCLICK : null;
          this.doPing(n, i, t.usageCounters.overlayClick, {
            interactiveOverlayAndTrigger: n.interactiveTriggerAndOverlay,
          });
        }),
        (t.prototype.onInteractiveBackButtonClick = function (n) {
          this.log("jsll - onInteractiveTriggerClick");
          var i = window.awa ? window.awa.behavior.BACKBUTTON : null;
          this.doPing(n, i, t.usageCounters.streamLinkBackButtonClick);
        }),
        (t.prototype.onInteractiveOverlayShow = function (n) {
          this.log("jsll - onInteractiveOverlayShow");
          var i = window.awa ? window.awa.behavior.SHOW : null;
          this.doPing(n, i, t.usageCounters.overlayShow, {
            interactiveOverlayAndTrigger: n.interactiveTriggerAndOverlay,
          });
        }),
        (t.prototype.onInteractiveOverlayHide = function (n) {
          this.log("jsll - onInteractiveOverlayHide");
          var i = window.awa ? window.awa.behavior.HIDE : null;
          this.doPing(n, i, t.usageCounters.overlayHide, {
            interactiveOverlayAndTrigger: n.interactiveTriggerAndOverlay,
          });
        }),
        (t.prototype.onInteractiveOverlayMaximize = function (n) {
          this.log("jsll - onInteractiveOverlayMaximize");
          var i = window.awa ? window.awa.behavior.MAXIMIZE : null;
          this.doPing(n, i, t.usageCounters.maximizeOverlay, {
            interactiveOverlayAndTrigger: n.interactiveTriggerAndOverlay,
          });
        }),
        (t.prototype.onInteractiveOverlayMinimize = function (n) {
          this.log("jsll - onInteractiveOverlayMinimize");
          var i = window.awa ? window.awa.behavior.MINIMIZE : null;
          this.doPing(n, i, t.usageCounters.minimizeOverlay, {
            interactiveOverlayAndTrigger: n.interactiveTriggerAndOverlay,
          });
        }),
        (t.prototype.onAgeGateSubmitClick = function (n) {
          this.log("jsll - onAgeGateSubmitClick");
          var i = window.awa ? window.awa.behavior.PROCESSCHECKPOINT : null;
          this.doPing(n, i, t.usageCounters.ageGateSubmitClick, {
            ageGatePassed: n.ageGatePassed,
            scn: "OnePlayerAgeGate",
            isSuccess: n.ageGatePassed,
          });
        }),
        (t.prototype.onPlayerErrors = function (n) {
          this.log("jsll - onPlayerErrors()");
          var i = window.awa ? window.awa.behavior.VIDEOERROR : null;
          this.doPing(n, i, t.usageCounters.contentError, {
            et: n.errorType,
            etd: n.errorDesc,
          });
        }),
        (t.prototype.onVideoShared = function (n) {
          this.log("jsll - onVideoShared");
          var t = window.awa ? window.awa.behavior.SOCIALSHARE : null;
          this.doPing(n, t, null, {
            videoShare: n.videoShare,
            socchn: n.videoShare,
          });
        }),
        (t.prototype.onClosedCaptionsChanged = function (n) {
          this.log("jsll - onClosedCaptionsChanged");
          var t = window.awa
            ? window.awa.behavior.VIDEOCLOSEDCAPTIONCONTROL
            : null;
          this.doPing(n, t, null, {
            closedCaptions: n.endCaptionSelection,
            startcaptionselection: n.startCaptionSelection,
            endcaptionselection: n.endCaptionSelection,
          });
        }),
        (t.prototype.onClosedCaptionSettingsChanged = function (n) {
          this.log("jsll - onClosedCaptionSettingsChanged");
          var t = window.awa ? window.awa.behavior.VIDEOCLOSEDCAPTIONSTYLE : null;
          this.doPing(n, t, null, {
            closedCaptionSettings: n.closedCaptionSettings,
            appsel: n.closedCaptionSettings,
          });
        }),
        (t.prototype.onPlaybackRateChanged = function (n) {
          this.log("jsll - onPlaybackRateChanged");
          this.doPing(n, null, null, {
            playbackRate: n.playbackRate,
          });
        }),
        (t.prototype.onMediaDownloaded = function (n) {
          this.log("jsll - onMediaDownloaded");
          var t = window.awa ? window.awa.behavior.DOWNLOAD : null;
          this.doPing(n, t, null, {
            downloadMedia: n.downloadMedia,
            dlnm: "Download",
            dlid: n.downloadMedia,
            dltype: n.downloadType,
          });
        }),
        (t.prototype.onAudioTrackChanged = function (n) {
          this.log("jsll - onAudioTrackChanged");
          var t = window.awa ? window.awa.behavior.VIDEOAUDIOTRACKCONTROL : null;
          this.doPing(n, t, null, {
            audioTrack: n.audioTrack,
            starttrackselection: n.startTrackSelection,
            endtrackselection: n.endTrackSelection,
          });
        }),
        (t.usageCounters = {
          contentBuffering: {
            t: "2",
            evt: "ContentPlay",
          },
          contentError: {
            t: "20",
            evt: "ContentPlay",
          },
          contentStart: {
            t: "21",
            evt: "ContentPlay",
          },
          contentContinue: {
            t: "22",
            evt: "ContentPlay",
          },
          contentComplete: {
            t: "23",
            evt: "ContentPlay",
          },
          contentImpression3PP: {
            t: "41",
            evt: "ContentPlay",
          },
          commonPlayerImpression: {
            t: "61",
            evt: "ContentPlay",
          },
          cc: {
            t: "30",
            evt: "Click_Non-nav",
          },
          pause: {
            t: "31",
            evt: "Click_Non-nav",
          },
          seek: {
            t: "32",
            evt: "Click_Non-nav",
          },
          mute: {
            t: "33",
            evt: "Click_Non-nav",
          },
          fullScreenEnter: {
            t: "34",
            evt: "Click_Non-nav",
          },
          info: {
            t: "35",
            evt: "Click_Non-nav",
          },
          videoQuality: {
            t: "36",
            evt: "Click_Non-nav",
          },
          resume: {
            t: "37",
            evt: "Click_Non-nav",
          },
          fullScreenExit: {
            t: "38",
            evt: "Click_Non-nav",
          },
          replay: {
            t: "39",
            evt: "Click_Non-nav",
          },
          unmute: {
            t: "40",
            evt: "Click_Non-nav",
          },
          facebook: {
            t: "51",
            evt: "Click_Non-nav",
          },
          twitter: {
            t: "52",
            evt: "Click_Non-nav",
          },
          email: {
            t: "53",
            evt: "Click_Non-nav",
          },
          overlayClick: {
            t: "70",
            evt: "Click_Non-nav",
          },
          streamLinkBackButtonClick: {
            t: "71",
            evt: "Click_Non-nav",
          },
          overlayShow: {
            t: "72",
            evt: "Show_Overlay",
          },
          overlayHide: {
            t: "73",
            evt: "Hide_Overlay",
          },
          minimizeOverlay: {
            t: "74",
            evt: "Minimize_Overlay",
          },
          maximizeOverlay: {
            t: "75",
            evt: "Maximize_Overlay",
          },
          ageGateSubmitClick: {
            t: "80",
            evt: "Click_Non-nav",
          },
        }),
        t
      );
    })(i.BaseReporter);
    t.JsllReporter = f;
  });
  define("reporting-data", ["require", "exports"], function (n, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
  });
  define("environment", ["require", "exports"], function (n, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = (function () {
      function n() {}
      return (
        (n.isOfficeCLView = function () {
          var t = parent !== window,
            n = t ? document.referrer : window.location.href;
          return n.match(/client/i) && n.match(/support.office./i) ? !0 : !1;
        }),
        (n.isVideoPlayerSupported = function () {
          return n.isHTML5videoSupported() && n.isES5Supported();
        }),
        (n.isHTML5videoSupported = function () {
          try {
            return !!document.createElement("video").canPlayType;
          } catch (n) {}
          return !1;
        }),
        (n.isES5Supported = function () {
          try {
            var n = !!(String.prototype && String.prototype.trim),
              t = !!(Function.prototype && Function.prototype.bind),
              i = !!(
                Object.keys &&
                Object.create &&
                Object.getPrototypeOf &&
                Object.getOwnPropertyNames &&
                Object.isSealed &&
                Object.isFrozen &&
                Object.isExtensible &&
                Object.getOwnPropertyDescriptor &&
                Object.defineProperty &&
                Object.defineProperties &&
                Object.seal &&
                Object.freeze &&
                Object.preventExtensions
              );
            return n && t && i ? !0 : !1;
          } catch (r) {}
          return !1;
        }),
        (n.userAgent = navigator.userAgent),
        (n.isWindowsPhone = !!n.userAgent.match(/Windows Phone/i)),
        (n.isSilk = !!n.userAgent.match(/Silk/i)),
        (n.hasSilkVersion = /\bSilk\/(\d+)\.(\d+)/.test(n.userAgent)),
        (n.silkMajor = n.hasSilkVersion ? Number(RegExp.$1) : 0),
        (n.silkMinor = n.hasSilkVersion ? Number(RegExp.$2) : 0),
        (n.isSilkModern =
          n.silkMajor > 3 || (n.silkMajor >= 3 && n.silkMinor >= 5)),
        (n.isAndroid =
          !n.isWindowsPhone && (n.isSilk || !!n.userAgent.match(/Android/i))),
        (n.androidVersion = /Android (\d+\.\d+)/i.test(n.userAgent)
          ? Number(RegExp.$1)
          : n.hasSilkVersion
          ? n.isSilkModern
            ? 4
            : 1
          : 0),
        (n.isIPhone =
          !!n.userAgent.match(/iPhone/i) || !!n.userAgent.match(/iPod/i)),
        (n.isIPad = !!n.userAgent.match(/iPad/i)),
        (n.isIProduct = n.isIPad || n.isIPhone),
        (n.isBlackBerry = !!n.userAgent.match(/BlackBerry/i)),
        (n.isHtcWindowsPhone = n.isWindowsPhone && !!n.userAgent.match(/HTC/i)),
        (n.windowsVersion = /Windows NT(\s)*(\d+\.\d+)/.test(n.userAgent)
          ? parseFloat(RegExp.$2)
          : -1),
        (n.ieVersion = /MSIE (\d+\.\d+)/.test(n.userAgent)
          ? Number(RegExp.$1)
          : /Trident.*rv:(\d+\.\d+)/.test(n.userAgent)
          ? Number(RegExp.$1)
          : 0),
        (n.isIEMobileModern = /\bIEMobile\/(\d+\.\d+)/.test(n.userAgent)
          ? Number(RegExp.$1) >= 10
          : /Windows Phone (\d+\.\d+)/i.test(n.userAgent)
          ? Number(RegExp.$1) >= 10
          : !1),
        (n.isAndroidModern =
          n.isAndroid && (n.androidVersion >= 4 || n.isSilkModern)),
        (n.isMobile =
          n.isIProduct || n.isAndroid || n.isBlackBerry || n.isWindowsPhone),
        (n.useNativeControls = n.isIProduct || n.isAndroid || n.isWindowsPhone),
        (n.isWebkit = !!n.userAgent.match(/Webkit/i)),
        (n.isFirefox = !!n.userAgent.match(/Firefox/i)),
        (n.isChrome =
          !!n.userAgent.match(/Chrome/i) &&
          navigator.vendor &&
          navigator.vendor.indexOf("Google") > -1),
        (n.isEdgeBrowser = n.userAgent.indexOf("Edge") > -1),
        (n.isTV = !!n.userAgent.match(
          /.*SMART\-TV.*Safari\/(535\.20\+|537\.42)/
        )),
        (n.isWindowsRT = /^.*?\bWindows\b.*?\bARM\b.*?$/m.test(n.userAgent)),
        (n.isInIframe = parent !== window),
        (n.isSafari =
          navigator.vendor &&
          navigator.vendor.indexOf("Apple") > -1 &&
          navigator.userAgent &&
          !navigator.userAgent.match("CriOS")),
        n
      );
    })();
    t.Environment = i;
  });
  define("player-utility", [
    "require",
    "exports",
    "stringExtensions",
    "player-data-interfaces",
    "utility",
    "environment",
  ], function (n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var e = (function () {
      function n() {}
      return (
        (n.random4CharString = function () {
          return (1 + Math.random()).toString(32).substring(1);
        }),
        (n.loadScript = function (n) {
          var i = document.getElementsByTagName("script")[0],
            t = document.createElement("script");
          t.src = n;
          t.async = !0;
          t.onload = t.onreadystatechange = function () {
            (t.readyState &&
              t.readyState !== "loaded" &&
              t.readyState !== "complete") ||
              ((t.onload = t.onreadystatechange = null),
              t.parentNode && t.parentNode.removeChild(t));
          };
          i.parentNode.insertBefore(t, i);
        }),
        (n.formatContentErrorMessage = function (n, t, u) {
          var f = i.format("[CE{0}]: {1}", r.VideoErrorCodes[n], t);
          return u && (f += i.format("; (Additional: {0})", u)), f;
        }),
        (n.logConsoleMessage = function (t, r) {
          r === void 0 && (r = "VideoPlayer");
          var u = i.format("[{0}][{1}] {2}", n.toLogTime(new Date()), r, t);
          typeof console == "object" && console.log && console.log(u);
          f.Environment.isOfficeCLView() && n.logPanelMessage(u, r);
        }),
        (n.toLogTime = function (n) {
          n || (n = new Date());
          var t = n.getHours(),
            i = n.getMinutes(),
            r = n.getSeconds();
          return (
            (t = t < 10 ? "0" + t : t),
            (i = i < 10 ? "0" + i : i),
            (r = r < 10 ? "0" + r : r),
            t + ":" + i + ":" + r
          );
        }),
        (n.toFriendlyBitrateString = function (n) {
          var t, i, r;
          return (
            n >= 1e7
              ? ((i = n / 1e6), (t = Math.round(i).toLocaleString() + " Mbps"))
              : n >= 1e6
              ? ((i = n / 1e6),
                (t = (Math.round(i * 100) * 0.01).toLocaleString() + " Mbps"))
              : n >= 1e4
              ? ((r = n / 1e3), (t = Math.round(r).toLocaleString() + " Kbps"))
              : n >= 1e3
              ? ((r = n / 1e3),
                (t = (Math.round(r * 100) * 0.01).toLocaleString() + " Kbps"))
              : (t = Math.round(n).toLocaleString() + " bps"),
            t
          );
        }),
        (n.logPanelMessage = function (t) {
          typeof n.debugPanel == "undefined" &&
            (n.debugPanel = n.createDebugPanel());
          n.debugPanel.appendChild(
            document.createTextNode("[" + new Date().toLocaleString() + "]" + t)
          );
          n.debugPanel.appendChild(document.createElement("BR"));
          n.debugPanel.scrollTop =
            n.debugPanel.scrollHeight - n.debugPanel.clientHeight;
        }),
        (n.createDebugPanel = function () {
          var n = document.createElement("div");
          return (n.className = "debugPanel"), document.body.appendChild(n), n;
        }),
        (n.getGUID = function () {
          var n = new Date().getTime();
          return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(
            /x/g,
            function (t) {
              var i = Math.floor((n + Math.random() * 16) % 16),
                r = t === "x" ? i : (i % 4) + 4;
              return r.toString(16);
            }
          );
        }),
        (n.removeFromPendingAjaxRequests = function (t) {
          for (var r = -1, i = 0; i < n.pendingAjaxRequests.length; i++)
            if (t === n.pendingAjaxRequests[i]) {
              r = i;
              break;
            }
          r >= 0 && n.pendingAjaxRequests.splice(r, 1);
        }),
        (n.ajax = function (t, i, r) {
          if (t) {
            var u = null;
            window.XDomainRequest
              ? ((u = new XDomainRequest()),
                (u.onload = function () {
                  i && i(u.responseText);
                  n.removeFromPendingAjaxRequests(u);
                }),
                n.pendingAjaxRequests.push(u))
              : window.XMLHttpRequest &&
                ((u = new XMLHttpRequest()),
                (u.onreadystatechange = function () {
                  if (u.readyState === 4) {
                    var n = null;
                    u.status === 200 && (n = u.responseText);
                    i && i(n);
                  }
                }));
            u &&
              ((u.ontimeout = u.onerror =
                function () {
                  n.removeFromPendingAjaxRequests(u);
                  r && r();
                }),
              u.open("GET", t, !0),
              u.send());
          }
        }),
        (n.createVideoPerfMarker = function (n, t) {
          n && t && u.createPerfMarker(n + "_" + t, !0);
          t === "ttvs" && u.createPerfMarker(t, !0);
        }),
        (n.getVideoPerfMarker = function (n, t) {
          return n && t ? u.getPerfMarkerValue(n + "_" + t) : 0;
        }),
        (n.sanitize = function (n) {
          var t = {
            "<": "&lt;",
            ">": "&gt;",
          };
          return n.replace(/[<>]/gi, function (n) {
            return t[n];
          });
        }),
        (n.pendingAjaxRequests = []),
        n
      );
    })();
    t.PlayerUtility = e;
  });
  define("stopwatch", ["require", "exports", "utility"], function (n, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var r = (function () {
      function n() {
        this.timestamp = null;
        this.timeValue = null;
        this.firstValue = null;
        this.totalValue = null;
        this.intervals = null;
      }
      return (
        (n.prototype.start = function () {
          this.timestamp || ((this.timestamp = new Date()), this.intervals++);
        }),
        (n.prototype.stop = function () {
          if (this.timestamp) {
            var n = new Date().valueOf() - this.timestamp.valueOf();
            this.timeValue += n;
            this.totalValue += n;
            this.firstValue || (this.firstValue = this.timeValue);
            this.timestamp = null;
          }
        }),
        (n.prototype.reset = function () {
          this.timestamp = null;
          this.timeValue = this.intervals = this.firstValue = this.totalValue = 0;
        }),
        (n.prototype.isStarted = function () {
          return !!this.intervals;
        }),
        (n.prototype.isStopped = function () {
          return !this.timestamp;
        }),
        (n.prototype.hasReached = function (n) {
          return i.isNumber(n) && this.getValue() >= n
            ? (this.timestamp &&
                ((this.totalValue +=
                  new Date().valueOf() - this.timestamp.valueOf()),
                (this.timestamp = new Date())),
              (this.timeValue = 0),
              (this.intervals = 0),
              !0)
            : !1;
        }),
        (n.prototype.getValue = function () {
          var n = this.timeValue;
          return (
            this.timestamp &&
              (n += new Date().valueOf() - this.timestamp.valueOf()),
            n
          );
        }),
        (n.prototype.getTotalValue = function () {
          var n = this.totalValue;
          return (
            this.timestamp &&
              (n += new Date().valueOf() - this.timestamp.valueOf()),
            n
          );
        }),
        (n.prototype.getFirstValue = function () {
          return this.firstValue;
        }),
        (n.prototype.getIntervals = function () {
          return this.intervals;
        }),
        n
      );
    })();
    t.Stopwatch = r;
  });
  define("video-player", [
    "require",
    "exports",
    "player-factory",
    "utility",
    "htmlExtensions",
    "player-options",
    "player-utility",
    "player-constants",
    "video-shim-data-fetcher",
  ], function (n, t, i, r, u, f, e, o, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var h = (function () {
      function n(t, i) {
        var s = this,
          h,
          c;
        ((this.videoComponent = t),
        (this.playerData = {}),
        (this.resizePlayer = function () {
          var n, t, i, r;
          s.videoComponent &&
          s.playerData &&
          s.playerData.options &&
          !s.playerData.options.flexSize
            ? ((n = s.videoComponent.getBoundingClientRect().width),
              n &&
                s.playerData.options.aspectRatio &&
                ((t = n / s.playerData.options.aspectRatio),
                (i =
                  s.videoComponent.closest &&
                  s.videoComponent.closest(".c-dialog.f-lightbox")),
                i &&
                  (t > window.innerHeight
                    ? ((t = window.innerHeight),
                      (n = t * s.playerData.options.aspectRatio),
                      u.css(s.videoComponent, "width", n + "px"))
                    : (u.css(s.videoComponent, "width", ""),
                      (r = Math.round(window.devicePixelRatio * 100) > 100),
                      r ||
                        ((n = s.videoComponent.getBoundingClientRect().width),
                        (t = n / s.playerData.options.aspectRatio)))),
                u.css(s.videoComponent, "height", t + "px")))
            : s.videoComponent.style.removeProperty("height");
        }),
        t) &&
          (n.playerInstanceCount++,
          (this.playerId = t.getAttribute("id")),
          this.playerId ||
            ((this.playerId = "vid-" + n.playerInstanceCount),
            this.videoComponent.setAttribute("id", this.playerId)),
          e.PlayerUtility.createVideoPerfMarker(
            this.playerId,
            o.videoPerfMarkers.playerInit
          ),
          (h = typeof i == "object" ? i : {}),
          (i && i.options) ||
            ((c = this.videoComponent.getAttribute(n.playerDataAttribute)),
            !c || (h = r.parseJson(c))),
          (this.playerData.options = new f.PlayerOptions(h.options)),
          (this.playerData.metadata = h.metadata),
          this.playerData.metadata && this.playerData.options.autoload
            ? this.load()
            : this.resizePlayer(),
          u.addThrottledEvent(window, u.eventTypes.resize, this.resizePlayer),
          (this.getCurrentTime = function () {
            var n = s.getPlayPosition();
            return n && n.currentTime;
          }),
          (this.getDuration = this.getVideoDuration =
            function () {
              var n = s.getPlayPosition();
              return n && n.endTime - n.startTime;
            }));
      }
      return (
        (n.prototype.updateContainerVisibility = function (n, t) {
          if (!!n) {
            var i = t ? "true" : "false";
            n.setAttribute("aria-hidden", i);
          }
        }),
        (n.prototype.load = function (n) {
          n &&
            (r.extend(this.playerData.options, n.options),
            (this.playerData.metadata = n.metadata));
          !this.currentPlayer || this.dispose();
          this.playerData.options &&
            this.playerData.options.debug &&
            this.videoComponent.setAttribute("data-debug", "true");
          this.resizePlayer();
          !this.playerData.metadata ||
          !this.playerData.metadata.videoId ||
          (this.playerData.metadata.videoFiles &&
            this.playerData.metadata.videoFiles.length) ||
          this.playerData.metadata.playerName
            ? this.loadPlayer()
            : this.fetchDataAndLoad();
        }),
        (n.prototype.shouldReportData = function () {
          return (
            !!this.playerData &&
            this.playerData.options &&
            this.playerData.options.reporting &&
            this.playerData.options.reporting.enabled
          );
        }),
        (n.prototype.updatePlayerSource = function (n) {
          this.currentPlayer.updatePlayerSource(n);
        }),
        (n.prototype.fetchDataAndLoad = function () {
          var n = this,
            t;
          e.PlayerUtility.createVideoPerfMarker(
            this.playerId,
            o.videoPerfMarkers.metadataFetchStart
          );
          t = new s.VideoShimDataFetcher(
            this.playerData.options.shimServiceEnv,
            this.playerData.options.shimServiceUrl
          );
          t.getMetadata(
            this.playerData.metadata.videoId,
            function (t) {
              e.PlayerUtility.createVideoPerfMarker(
                n.playerId,
                o.videoPerfMarkers.metadataFetchEnd
              );
              n.playerData.metadata = t;
              n.loadPlayer();
            },
            function () {
              e.PlayerUtility.createVideoPerfMarker(
                n.playerId,
                o.videoPerfMarkers.metadataFetchEnd
              );
              n.loadPlayer();
            }
          );
        }),
        (n.prototype.getCurrentPlayState = function () {
          if (this.currentPlayer) return this.currentPlayer.getCurrentPlayState();
        }),
        (n.prototype.loadPlayer = function () {
          e.PlayerUtility.createVideoPerfMarker(
            this.playerId,
            o.videoPerfMarkers.playerLoadStart
          );
          var r =
              (this.playerData.metadata && this.playerData.metadata.playerName) ||
              n.defaultPlayerName,
            t = i.PlayerFactory.createPlayer(
              r,
              this.videoComponent,
              this.playerData
            );
          this.currentPlayer = t && t.playerInstance;
          n.videoPlayerList[this.playerId] = this.currentPlayer;
        }),
        (n.prototype.dispose = function () {
          !this.currentPlayer ||
            (this.currentPlayer.dispose(),
            (this.currentPlayer = null),
            delete n.videoPlayerList[this.playerId]);
          u.removeInnerHtml(this.videoComponent);
        }),
        (n.prototype.play = function () {
          !this.currentPlayer || this.currentPlayer.play();
        }),
        (n.prototype.displayImage = function (n) {
          !this.currentPlayer || this.currentPlayer.displayImage(n);
        }),
        (n.prototype.pause = function (n) {
          !this.currentPlayer || this.currentPlayer.pause(n);
        }),
        (n.prototype.mute = function (n) {
          !this.currentPlayer ||
            (n !== undefined && !n
              ? this.currentPlayer.unmute()
              : this.currentPlayer.mute());
        }),
        (n.prototype.unmute = function () {
          !this.currentPlayer || this.currentPlayer.unmute();
        }),
        (n.prototype.seek = function (n) {
          !this.currentPlayer || this.currentPlayer.seek(n);
        }),
        (n.prototype.enterFullScreen = function () {
          !this.currentPlayer || this.currentPlayer.enterFullScreen();
        }),
        (n.prototype.exitFullScreen = function () {
          !this.currentPlayer || this.currentPlayer.exitFullScreen();
        }),
        (n.prototype.getPlayPosition = function () {
          return !this.currentPlayer
            ? {
                currentTime: 0,
                startTime: 0,
                endTime: 0,
              }
            : this.currentPlayer.getPlayPosition();
        }),
        (n.prototype.isLive = function () {
          return this.currentPlayer ? this.currentPlayer.isLive() : !1;
        }),
        (n.prototype.addPlayerEventListener = function (n) {
          !this.currentPlayer || this.currentPlayer.addPlayerEventListener(n);
        }),
        (n.prototype.removePlayerEventListener = function (n) {
          !this.currentPlayer || this.currentPlayer.removePlayerEventListener(n);
        }),
        (n.prototype.setAutoPlay = function () {
          !this.currentPlayer || this.currentPlayer.setAutoPlay();
        }),
        (n.prototype.addPlayerEventsListener = function (n) {
          !this.currentPlayer || this.currentPlayer.addPlayerEventListener(n);
        }),
        (n.prototype.removePlayerEventsListener = function (n) {
          !this.currentPlayer || this.currentPlayer.removePlayerEventListener(n);
        }),
        (n.prototype.getPlayerId = function () {
          return this.playerId;
        }),
        (n.prototype.getPlayer = function (t) {
          for (var i in n.videoPlayerList)
            if (t === i && n.videoPlayerList.hasOwnProperty(i))
              return n.videoPlayerList[i];
          return console.log("player not found in player list, id = " + t), null;
        }),
        (n.prototype.resize = function () {
          !this.currentPlayer || this.currentPlayer.resize();
        }),
        (n.videoPlayerList = {}),
        (n.selector = ".c-video-player"),
        (n.typeName = "VideoPlayer"),
        (n.corePlayerContainer = ".f-core-player"),
        (n.externalPlayerContainer = ".f-external-player"),
        (n.playerDataAttribute = "data-player-data"),
        (n.defaultPlayerName = "coreplayer"),
        (n.playerInstanceCount = 0),
        n
      );
    })();
    t.VideoPlayer = h;
    r.getPerfMarkerValue(o.videoPerfMarkers.scriptLoaded) ||
      r.createPerfMarker(o.videoPerfMarkers.scriptLoaded, !0);
  });
  require(["video-player", "componentFactory"], function (n, t) {
    t.ComponentFactory &&
      t.ComponentFactory.create &&
      t.ComponentFactory.create([
        {
          component: n.VideoPlayer,
        },
      ]);
  });
  define("player-factory", ["require", "exports", "core-player"], function (n, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var r = (function () {
      function n() {}
      return (
        (n.createPlayer = function (n, t, r) {
          var u, f;
          if (!n) (f = "coreplayer"), (u = new i.CorePlayer(t, r));
          else
            switch (n.toLowerCase()) {
              case "youtube":
                f = "youtube";
                u = null;
                break;
              default:
                f = "coreplayer";
                u = new i.CorePlayer(t, r);
            }
          return {
            playerInstance: u,
            playerName: f,
          };
        }),
        n
      );
    })();
    t.PlayerFactory = r;
  });
  define("amp-wrapper", [
    "require",
    "exports",
    "player-data-interfaces",
    "htmlExtensions",
    "stringExtensions",
    "player-constants",
    "player-utility",
    "utility",
    "player-config",
  ], function (n, t, i, r, u, f, e, o, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var h = (function () {
      function n(t) {
        var i = this;
        this.ampPlayer = null;
        this.triggerEvents = function (n) {
          if (i.onMediaEventCallback) i.onMediaEventCallback(n);
        };
        this.setupAmpPlayer = function (n) {
          var t = r.selectFirstElementT("video", i.playerContainer);
          if (
            (t ||
              (t = r.selectFirstElementT(".f-video-player", i.playerContainer)),
            !t)
          ) {
            console.log("could not find video tag");
            i.onLoadFailedCallback && i.onLoadFailedCallback();
            return;
          }
          i.ampPlayer = window.amp(
            t,
            {
              nativeControlsForTouch: !1,
              autoplay: n,
              controls: !1,
              logo: {
                enabled: !1,
              },
            },
            i.onAmpPlayerInit
          );
          i.ampPlayer.options_.autoplay = n;
          t.hasAttribute("aria-hidden") && t.removeAttribute("aria-hidden");
          i.onLoadedCallback && i.onLoadedCallback();
        };
        this.onAmpPlayerInit = function () {
          var n = r.selectFirstElement(".f-video-player", i.playerContainer),
            f,
            s,
            o,
            e,
            h,
            t;
          if (n) {
            if (i.useAMPVersion2) {
              var u = r.selectFirstElement("div", n),
                o = Array.prototype.slice.call(u.children),
                c = r.selectFirstElementT("video", n);
              for (f = 0, s = o; f < s.length; f++)
                (t = s[f]),
                  t && t.parentElement === u && !t.contains(c)
                    ? u.removeChild(t)
                    : (t.hasAttribute("aria-label") &&
                        t.removeAttribute("aria-label"),
                      t.hasAttribute("role") || t.setAttribute("role", "none"));
              u.removeAttribute("aria-label");
              c.removeAttribute("aria-hidden");
              setTimeout(function () {
                var n = document.querySelector(".amp-content-title");
                u.contains(n) && u.removeChild(n);
                u.hasAttribute("title") && u.removeAttribute("title");
              }, 0);
            } else
              for (
                o = r.selectElements("div", n), e = 0, h = o;
                e < h.length;
                e++
              )
                (t = h[e]), t && t.parentElement === n && n.removeChild(t);
            n.removeAttribute("title");
            n.removeAttribute("style");
            n.removeAttribute("tabindex");
            n.removeAttribute("aria-label");
            n.removeAttribute("vjs-label");
            n.removeAttribute("aria-hidden");
            setTimeout(function () {
              n.removeAttribute("aria-label");
            }, 0);
            i.videoTag = r.selectFirstElementT("video", n);
          }
        };
        this.useAMPVersion2 = t;
        n.isAmpScriptLoaded() ||
          e.PlayerUtility.loadScript(
            t ? s.PlayerConfig.ampVersion2Url : s.PlayerConfig.ampUrl
          );
      }
      return (
        (n.isAmpScriptLoaded = function () {
          return window && window.amp;
        }),
        (n.prototype.bindVideoEvents = function (n) {
          var t, i, r;
          if (this.ampPlayer)
            for (
              this.onMediaEventCallback = n, t = 0, i = f.MediaEvents;
              t < i.length;
              t++
            )
              (r = i[t]), this.ampPlayer.addEventListener(r, this.triggerEvents);
        }),
        (n.prototype.unbindVideoEvents = function () {
          var n, t, i;
          if (this.ampPlayer)
            for (n = 0, t = f.MediaEvents; n < t.length; n++)
              (i = t[n]),
                this.ampPlayer.removeEventListener(i, this.triggerEvents);
        }),
        (n.prototype.load = function (t, i, r, u, f) {
          var e = this;
          t || (console.log("player container is null"), u && u());
          this.ampPlayer && this.dispose();
          this.playerContainer = t;
          this.onLoadedCallback = r;
          this.onLoadFailedCallback = u;
          this.onAudioStreamSelectedCallback = f;
          n.isAmpScriptLoaded()
            ? this.setupAmpPlayer(i)
            : o.poll(
                n.isAmpScriptLoaded,
                n.pollingInterval,
                n.pollingTimeout,
                function () {
                  e.setupAmpPlayer(i);
                },
                this.onLoadFailedCallback
              );
        }),
        (n.prototype.removeTitle = function () {
          var n = r.selectFirstElement(".f-video-player", this.playerContainer);
          n &&
            this.useAMPVersion2 &&
            setTimeout(function () {
              var t = r.selectFirstElement("div", n);
              t.hasAttribute("title") && t.removeAttribute("title");
            }, 0);
        }),
        (n.prototype.play = function () {
          this.ampPlayer && this.ampPlayer.play();
          this.removeTitle();
        }),
        (n.prototype.pause = function () {
          this.ampPlayer && this.ampPlayer.pause();
          this.removeTitle();
        }),
        (n.prototype.isPaused = function () {
          return this.ampPlayer && this.ampPlayer.paused();
        }),
        (n.prototype.isLive = function () {
          return this.ampPlayer && this.ampPlayer.isLive();
        }),
        (n.prototype.getPlayPosition = function () {
          if (!this.ampPlayer)
            return {
              currentTime: 0,
              endTime: 0,
              startTime: 0,
            };
          if (this.ampPlayer.isLive()) {
            var n = this.ampPlayer.currentPlayableWindow();
            return {
              startTime: n.startInSec,
              endTime: n.endInSec,
              currentTime: this.ampPlayer.currentAbsoluteTime() || n.endInSec,
            };
          }
          return {
            currentTime: this.ampPlayer.currentTime(),
            startTime: 0,
            endTime: this.ampPlayer.duration(),
          };
        }),
        (n.prototype.getVolume = function () {
          return this.ampPlayer ? this.ampPlayer.volume() : 0;
        }),
        (n.prototype.setVolume = function (n) {
          this.ampPlayer && this.ampPlayer.volume(n);
        }),
        (n.prototype.isMuted = function () {
          return this.ampPlayer ? this.ampPlayer.muted() : !1;
        }),
        (n.prototype.mute = function () {
          this.ampPlayer && this.ampPlayer.muted(!0);
        }),
        (n.prototype.unmute = function () {
          this.ampPlayer && this.ampPlayer.muted(!1);
        }),
        (n.prototype.setCurrentTime = function (n) {
          this.ampPlayer &&
            this.ampPlayer.currentTime(this.ampPlayer.fromPresentationTime(n));
        }),
        (n.prototype.isSeeking = function () {
          return this.ampPlayer ? this.ampPlayer.seeking() : !1;
        }),
        (n.prototype.getBufferedDuration = function () {
          var t = 0,
            n;
          return (
            this.ampPlayer &&
              this.ampPlayer.buffered &&
              this.ampPlayer.buffered().length &&
              ((n = this.ampPlayer.buffered()),
              n.length && (t = n.end(n.length - 1))),
            t
          );
        }),
        (n.prototype.setSource = function (n) {
          var f, u, e, t, r;
          if (n && n.length) {
            for (f = [], u = 0, e = n; u < e.length; u++)
              if (((t = e[u]), t && t.url && this.ampPlayer)) {
                r = "video/mp4";
                switch (t.mediaType) {
                  case i.MediaTypes.HLS:
                    r = "application/vnd.apple.mpegurl";
                    break;
                  case i.MediaTypes.DASH:
                    r = "application/dash-xml";
                    break;
                  case i.MediaTypes.SMOOTH:
                    r = "application/vnd.ms-sstr+xml";
                }
                f.push({
                  src: t.url,
                  type: r,
                });
              }
            this.ampPlayer.src(f);
          }
        }),
        (n.prototype.addNativeClosedCaption = function (n, t, i) {
          var f, e, u, r;
          if (n && n.length && this.videoTag) {
            for (
              this.clearNativeCc(this.videoTag),
                this.videoTag.setAttribute("crossorigin", "anonymous"),
                f = 0,
                e = n;
              f < e.length;
              f++
            )
              (u = e[f]),
                u.ccType === t &&
                  ((r = document.createElement("track")),
                  r.setAttribute("src", u.url),
                  r.setAttribute("kind", "captions"),
                  r.setAttribute("srclang", u.locale),
                  r.setAttribute("label", i.getLanguageNameFromLocale(u.locale)),
                  this.videoTag.appendChild(r));
            this.videoTag.load && this.videoTag.load();
          }
        }),
        (n.prototype.clearNativeCc = function (n) {
          var f, t, u, i;
          if (n)
            for (
              f = r.selectElements("track", n), t = 0, u = f;
              t < u.length;
              t++
            )
              (i = u[t]), i && i.parentElement === n && n.removeChild(i);
        }),
        (n.prototype.clearSource = function () {}),
        (n.prototype.setPosterFrame = function (n) {
          n &&
            this.ampPlayer &&
            this.ampPlayer.poster() !== n &&
            this.ampPlayer.poster(n);
        }),
        (n.prototype.getError = function () {
          var n = this.ampPlayer && this.ampPlayer.error(),
            r,
            t;
          return n
            ? ((t = window),
              (r =
                n.code & t.amp.errorCode.abortedErrStart
                  ? i.VideoErrorCodes.MediaErrorAborted
                  : n.code & t.amp.errorCode.networkErrStart
                  ? i.VideoErrorCodes.MediaErrorNetwork
                  : n.code & t.amp.errorCode.decodeErrStart
                  ? i.VideoErrorCodes.MediaErrorDecode
                  : n.code & t.amp.errorCode.srcErrStart
                  ? i.VideoErrorCodes.MediaErrorSourceNotSupported
                  : n.code & t.amp.errorCode.encryptErrStart
                  ? i.VideoErrorCodes.AmpEncryptError
                  : n.code & t.amp.errorCode.srcPlayerMismatchStart
                  ? i.VideoErrorCodes.AmpPlayerMismatch
                  : i.VideoErrorCodes.MediaErrorUnknown),
              {
                errorCode: r,
                message: "AMP Error Code: " + n.code,
              })
            : null;
        }),
        (n.prototype.setPlaybackRate = function () {}),
        (n.prototype.getPlayerTechName = function () {
          return this.ampPlayer && this.ampPlayer.currentTechName();
        }),
        (n.prototype.getWrapperName = function () {
          return "amp";
        }),
        (n.prototype.getAudioTracks = function () {
          var i =
              this.ampPlayer &&
              this.ampPlayer.currentAudioStreamList &&
              this.ampPlayer.currentAudioStreamList(),
            r,
            f,
            t,
            e;
          if (!i || ((r = i.streams), !r)) return null;
          for (
            !this.onAudioStreamSelectedCallback ||
              i.addEventListener(
                "streamselected",
                this.onAudioStreamSelectedCallback
              ),
              f = [],
              t = 0,
              e = r;
            t < e.length;
            t++
          ) {
            var n = e[t],
              o =
                (n.language && u.startsWith(n.language, "dau-", !0)) ||
                (n.title && u.startsWith(n.title, "dau-", !0)),
              s = o && n.language ? n.language.substring(4) : n.language;
            f.push({
              isDescriptiveAudio: o,
              bitrate: n.bitrate,
              languageCode: s,
              name: n.name,
              title: n.title,
            });
          }
          return f;
        }),
        (n.prototype.switchToAudioTrack = function (n) {
          var t =
            this.ampPlayer &&
            this.ampPlayer.currentAudioStreamList &&
            this.ampPlayer.currentAudioStreamList();
          t && t.switchIndex(n);
        }),
        (n.prototype.getCurrentAudioTrack = function () {
          var n =
              this.ampPlayer &&
              this.ampPlayer.currentAudioStreamList &&
              this.ampPlayer.currentAudioStreamList(),
            t;
          return !n || !n.enabledIndices
            ? undefined
            : ((t = n.enabledIndices), t.length > 0 ? t[0] : -1);
        }),
        (n.prototype.getVideoTracks = function () {
          var i = this.getSelectedAmpVideoStream(),
            r,
            n,
            u,
            t;
          if (!i || !i.tracks) return null;
          for (r = [], n = 0, u = i.tracks; n < u.length; n++)
            (t = u[n]),
              r.push({
                bitrate: t.bitrate,
                width: t.width,
                height: t.height,
              });
          return r;
        }),
        (n.prototype.getSelectedAmpVideoStream = function () {
          if (!this.ampPlayer || !this.ampPlayer.currentVideoStreamList)
            return null;
          var n = this.ampPlayer.currentVideoStreamList();
          return n
            ? !n.streams ||
              n.selectedIndex < 0 ||
              n.selectedIndex >= n.streams.length
              ? null
              : n.streams[n.selectedIndex]
            : null;
        }),
        (n.prototype.switchToVideoTrack = function (n) {
          var t = this.getSelectedAmpVideoStream();
          if (!t || !t.selectTrackByIndex) return null;
          t.selectTrackByIndex(n);
        }),
        (n.prototype.getCurrentVideoTrack = function () {
          var i = this.getSelectedAmpVideoStream(),
            n,
            r,
            t;
          if (!i || !i.tracks || i.tracks.length === 0) return null;
          if (
            ((n = i.tracks),
            (r = n.reduce(function (n, t) {
              return t.selectable ? n + 1 : n;
            }, 0)),
            r === n.length)
          )
            return {
              auto: !0,
              trackIndex: null,
            };
          if (r === 1)
            for (t = 0; t < n.length; t++)
              if (n[t].selectable)
                return {
                  auto: !1,
                  trackIndex: t,
                };
          return null;
        }),
        (n.prototype.setAutoPlay = function () {
          this.useAMPVersion2
            ? (this.ampPlayer.autoplay(!0),
              this.ampPlayer.muted(!0),
              this.setVolume(0))
            : !this.videoTag ||
              ((this.videoTag.autoplay = !0),
              (this.videoTag.muted = !0),
              this.setVolume(0),
              this.videoTag.setAttribute("playsinline", ""),
              this.videoTag.setAttribute("muted", ""));
        }),
        (n.prototype.dispose = function () {
          this.clearSource();
          this.unbindVideoEvents();
          this.ampPlayer && this.ampPlayer.dispose && this.ampPlayer.dispose();
          this.ampPlayer = null;
        }),
        (n.pollingInterval = 50),
        (n.pollingTimeout = 3e4),
        n
      );
    })();
    t.AmpWrapper = h;
  });
  define("has-video-wrapper", [
    "require",
    "exports",
    "player-data-interfaces",
    "htmlExtensions",
    "player-constants",
    "player-utility",
    "utility",
    "player-config",
  ], function (n, t, i, r, u, f, e, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var s = (function () {
      function n() {
        var t = this,
          i;
        this.hasPlayer = null;
        this.setupHasPlayer = function (n) {
          if (
            ((t.videoTag = r.selectFirstElementT("video", t.playerContainer)),
            t.videoTag ||
              (t.videoTag = r.selectFirstElementT(
                ".f-video-player",
                t.playerContainer
              )),
            !t.videoTag)
          ) {
            console.log("could not find video tag");
            t.onLoadFailedCallback && t.onLoadFailedCallback();
            return;
          }
          t.hasPlayer = new window.MediaPlayer();
          t.hasPlayer.init(t.videoTag);
          t.hasPlayer.setAutoPlay(n);
          t.onLoadedCallback && t.onLoadedCallback();
        };
        this.triggerEvents = function (n) {
          if (t.onMediaEventCallback) t.onMediaEventCallback(n);
        };
        n.isHasPlayerScriptLoaded() ||
          ((i = o.PlayerConfig.hasPlayerUrl
            .replace("url(", "")
            .replace(")", "")
            .trim()),
          f.PlayerUtility.loadScript(i));
      }
      return (
        (n.isHasPlayerScriptLoaded = function () {
          return window && window.MediaPlayer;
        }),
        (n.prototype.bindVideoEvents = function (n) {
          var t, i, f;
          if (this.videoTag)
            for (
              this.onMediaEventCallback = n, t = 0, i = u.MediaEvents;
              t < i.length;
              t++
            )
              (f = i[t]), r.addEvents(this.videoTag, f, this.triggerEvents);
        }),
        (n.prototype.unbindVideoEvents = function () {
          var n, t, i;
          if (this.videoTag)
            for (n = 0, t = u.MediaEvents; n < t.length; n++)
              (i = t[n]), r.removeEvents(this.videoTag, i, this.triggerEvents);
        }),
        (n.prototype.load = function (t, i, r, u) {
          var f = this;
          t || (console.log("player container is null"), u && u());
          this.videoTag && this.dispose();
          this.playerContainer = t;
          this.onLoadedCallback = r;
          this.onLoadFailedCallback = u;
          n.isHasPlayerScriptLoaded()
            ? this.setupHasPlayer(i)
            : e.poll(
                n.isHasPlayerScriptLoaded,
                n.pollingInterval,
                n.pollingTimeout,
                function () {
                  f.setupHasPlayer(i);
                },
                this.onLoadFailedCallback
              );
        }),
        (n.prototype.play = function () {
          this.videoTag && this.videoTag.play();
        }),
        (n.prototype.pause = function () {
          this.videoTag && this.videoTag.pause();
        }),
        (n.prototype.isPaused = function () {
          return this.videoTag && (this.videoTag.paused || this.videoTag.ended);
        }),
        (n.prototype.isLive = function () {
          return !1;
        }),
        (n.prototype.getPlayPosition = function () {
          return this.videoTag
            ? {
                currentTime: this.videoTag.currentTime,
                startTime: 0,
                endTime: this.videoTag.duration,
              }
            : {
                currentTime: 0,
                endTime: 0,
                startTime: 0,
              };
        }),
        (n.prototype.getVolume = function () {
          return this.videoTag ? this.videoTag.volume : 0;
        }),
        (n.prototype.setVolume = function (n) {
          this.videoTag && (this.videoTag.volume = n);
        }),
        (n.prototype.isMuted = function () {
          return this.videoTag ? this.videoTag.muted : !1;
        }),
        (n.prototype.mute = function () {
          this.videoTag && (this.videoTag.muted = !0);
        }),
        (n.prototype.unmute = function () {
          this.videoTag && (this.videoTag.muted = !1);
        }),
        (n.prototype.setCurrentTime = function (n) {
          this.videoTag && (this.videoTag.currentTime = n);
        }),
        (n.prototype.isSeeking = function () {
          return this.videoTag ? this.videoTag.seeking : !1;
        }),
        (n.prototype.getBufferedDuration = function () {
          var n = 0;
          return (
            this.videoTag &&
              this.videoTag.buffered &&
              this.videoTag.buffered.length &&
              (n = this.videoTag.buffered.end(this.videoTag.buffered.length - 1)),
            n
          );
        }),
        (n.prototype.setSource = function (n) {
          if (this.hasPlayer && n && n.length && n[0].url) {
            this.hasPlayer.setInitialQualityFor("video", 999);
            this.hasPlayer.setQualityFor("video", 999);
            var t = {
              url: n[0].url,
              protocol: n[0].mediaType === i.MediaTypes.HLS ? "HLS" : null,
            };
            this.hasPlayer.load(t);
          }
        }),
        (n.prototype.addNativeClosedCaption = function (n, t, i) {
          var f, e, u, r;
          if (n && n.length && this.videoTag) {
            for (
              this.clearNativeCc(this.videoTag),
                this.videoTag.setAttribute("crossorigin", "anonymous"),
                f = 0,
                e = n;
              f < e.length;
              f++
            )
              (u = e[f]),
                u.ccType === t &&
                  ((r = document.createElement("track")),
                  r.setAttribute("src", u.url),
                  r.setAttribute("kind", "captions"),
                  r.setAttribute("srclang", u.locale),
                  r.setAttribute("label", i.getLanguageNameFromLocale(u.locale)),
                  this.videoTag.appendChild(r));
            this.videoTag.load && this.videoTag.load();
          }
        }),
        (n.prototype.clearNativeCc = function (n) {
          var f, t, u, i;
          if (n)
            for (
              f = r.selectElements("track", n), t = 0, u = f;
              t < u.length;
              t++
            )
              (i = u[t]), i && i.parentElement === n && n.removeChild(i);
        }),
        (n.prototype.clearSource = function () {
          this.hasPlayer && this.hasPlayer.reset(1);
        }),
        (n.prototype.setPosterFrame = function (n) {
          n &&
            this.videoTag &&
            this.videoTag.poster !== n &&
            (this.videoTag.poster = n);
        }),
        (n.prototype.getError = function () {
          var n;
          if (this.videoTag !== null && this.videoTag.error !== null) {
            switch (this.videoTag.error.code) {
              case this.videoTag.error.MEDIA_ERR_ABORTED:
                n = i.VideoErrorCodes.MediaErrorAborted;
                break;
              case this.videoTag.error.MEDIA_ERR_NETWORK:
                n = i.VideoErrorCodes.MediaErrorNetwork;
                break;
              case this.videoTag.error.MEDIA_ERR_DECODE:
                n = i.VideoErrorCodes.MediaErrorDecode;
                break;
              case this.videoTag.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                n = i.VideoErrorCodes.MediaErrorSourceNotSupported;
                break;
              default:
                n = i.VideoErrorCodes.MediaErrorUnknown;
            }
            return {
              errorCode: n,
            };
          }
          return null;
        }),
        (n.prototype.setPlaybackRate = function (n) {
          this.videoTag && n && e.isNumber(n) && (this.videoTag.playbackRate = n);
        }),
        (n.prototype.getPlayerTechName = function () {
          return "hasplayer";
        }),
        (n.prototype.getWrapperName = function () {
          return "hasplayerVideo";
        }),
        (n.prototype.getAudioTracks = function () {
          return null;
        }),
        (n.prototype.switchToAudioTrack = function () {
          throw new Error("HTML5.switchToAudioTrack is not supported");
        }),
        (n.prototype.getCurrentAudioTrack = function () {
          return null;
        }),
        (n.prototype.getVideoTracks = function () {
          return null;
        }),
        (n.prototype.switchToVideoTrack = function () {
          throw new Error("HTML5.switchToVideoTrack is not supported");
        }),
        (n.prototype.getCurrentVideoTrack = function () {
          return null;
        }),
        (n.prototype.setAutoPlay = function () {
          this.hasPlayer.setAutoPlay(!0);
        }),
        (n.prototype.dispose = function () {
          this.unbindVideoEvents();
          this.clearSource();
          this.hasPlayer && this.hasPlayer.dispose && this.hasPlayer.dispose();
          this.hasPlayer = null;
        }),
        (n.pollingInterval = 50),
        (n.pollingTimeout = 3e4),
        (n.supportedMediaTypes = [i.MediaTypes.HLS, i.MediaTypes.MP4]),
        n
      );
    })();
    t.HasPlayerVideoWrapper = s;
  });
  define("hls-video-wrapper", [
    "require",
    "exports",
    "player-data-interfaces",
    "htmlExtensions",
    "player-constants",
    "player-utility",
    "utility",
    "player-config",
  ], function (n, t, i, r, u, f, e, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var s = (function () {
      function n() {
        var t = this,
          i;
        this.hlsPlayer = null;
        this.setupHlsPlayer = function () {
          if (
            ((t.videoTag = r.selectFirstElementT("video", t.playerContainer)),
            t.videoTag ||
              (t.videoTag = r.selectFirstElementT(
                ".f-video-player",
                t.playerContainer
              )),
            !t.videoTag)
          ) {
            console.log("could not find video tag");
            t.onLoadFailedCallback && t.onLoadFailedCallback();
            return;
          }
          t.hlsPlayer = new window.Hls();
          t.hlsPlayer.attachMedia(t.videoTag);
          t.onLoadedCallback && t.onLoadedCallback();
        };
        this.triggerEvents = function (n) {
          if (t.onMediaEventCallback) t.onMediaEventCallback(n);
        };
        n.isHlsPlayerScriptLoaded() ||
          ((i = o.PlayerConfig.hlsPlayerUrl
            .replace("url(", "")
            .replace(")", "")
            .trim()),
          f.PlayerUtility.loadScript(i));
      }
      return (
        (n.isHlsPlayerScriptLoaded = function () {
          return window && window.Hls;
        }),
        (n.prototype.bindVideoEvents = function (n) {
          var t, i, f;
          if (this.videoTag)
            for (
              this.onMediaEventCallback = n, t = 0, i = u.MediaEvents;
              t < i.length;
              t++
            )
              (f = i[t]), r.addEvents(this.videoTag, f, this.triggerEvents);
        }),
        (n.prototype.unbindVideoEvents = function () {
          var n, t, i;
          if (this.videoTag)
            for (n = 0, t = u.MediaEvents; n < t.length; n++)
              (i = t[n]), r.removeEvents(this.videoTag, i, this.triggerEvents);
        }),
        (n.prototype.load = function (t, i, r, u) {
          var f = this;
          t || (console.log("player container is null"), u && u());
          this.videoTag && this.dispose();
          this.playerContainer = t;
          this.onLoadedCallback = r;
          this.onLoadFailedCallback = u;
          n.isHlsPlayerScriptLoaded()
            ? this.setupHlsPlayer(i)
            : e.poll(
                n.isHlsPlayerScriptLoaded,
                n.pollingInterval,
                n.pollingTimeout,
                function () {
                  f.setupHlsPlayer(i);
                },
                this.onLoadFailedCallback
              );
        }),
        (n.prototype.play = function () {
          this.videoTag && this.videoTag.play();
        }),
        (n.prototype.pause = function () {
          this.videoTag && this.videoTag.pause();
        }),
        (n.prototype.isPaused = function () {
          return this.videoTag && (this.videoTag.paused || this.videoTag.ended);
        }),
        (n.prototype.isLive = function () {
          return !1;
        }),
        (n.prototype.getPlayPosition = function () {
          return this.videoTag
            ? {
                currentTime: this.videoTag.currentTime,
                startTime: 0,
                endTime: this.videoTag.duration,
              }
            : {
                currentTime: 0,
                endTime: 0,
                startTime: 0,
              };
        }),
        (n.prototype.getVolume = function () {
          return this.videoTag ? this.videoTag.volume : 0;
        }),
        (n.prototype.setVolume = function (n) {
          this.videoTag && (this.videoTag.volume = n);
        }),
        (n.prototype.isMuted = function () {
          return this.videoTag ? this.videoTag.muted : !1;
        }),
        (n.prototype.mute = function () {
          this.videoTag && (this.videoTag.muted = !0);
        }),
        (n.prototype.unmute = function () {
          this.videoTag && (this.videoTag.muted = !1);
        }),
        (n.prototype.setCurrentTime = function (n) {
          this.videoTag && (this.videoTag.currentTime = n);
        }),
        (n.prototype.isSeeking = function () {
          return this.videoTag ? this.videoTag.seeking : !1;
        }),
        (n.prototype.getBufferedDuration = function () {
          var n = 0;
          return (
            this.videoTag &&
              this.videoTag.buffered &&
              this.videoTag.buffered.length &&
              (n = this.videoTag.buffered.end(this.videoTag.buffered.length - 1)),
            n
          );
        }),
        (n.prototype.setSource = function (n) {
          this.hlsPlayer &&
            n &&
            n.length &&
            n[0].url &&
            this.hlsPlayer.loadSource(n[0].url);
        }),
        (n.prototype.addNativeClosedCaption = function (n, t, i) {
          var f, e, u, r;
          if (n && n.length && this.videoTag) {
            for (
              this.clearNativeCc(this.videoTag),
                this.videoTag.setAttribute("crossorigin", "anonymous"),
                f = 0,
                e = n;
              f < e.length;
              f++
            )
              (u = e[f]),
                u.ccType === t &&
                  ((r = document.createElement("track")),
                  r.setAttribute("src", u.url),
                  r.setAttribute("kind", "captions"),
                  r.setAttribute("srclang", u.locale),
                  r.setAttribute("label", i.getLanguageNameFromLocale(u.locale)),
                  this.videoTag.appendChild(r));
            this.videoTag.load && this.videoTag.load();
          }
        }),
        (n.prototype.clearNativeCc = function (n) {
          var f, t, u, i;
          if (n)
            for (
              f = r.selectElements("track", n), t = 0, u = f;
              t < u.length;
              t++
            )
              (i = u[t]), i && i.parentElement === n && n.removeChild(i);
        }),
        (n.prototype.clearSource = function () {
          this.hlsPlayer && this.hlsPlayer.detachMedia();
        }),
        (n.prototype.setPosterFrame = function (n) {
          n &&
            this.videoTag &&
            this.videoTag.poster !== n &&
            (this.videoTag.poster = n);
        }),
        (n.prototype.getError = function () {
          var n;
          if (this.videoTag !== null && this.videoTag.error !== null) {
            switch (this.videoTag.error.code) {
              case this.videoTag.error.MEDIA_ERR_ABORTED:
                n = i.VideoErrorCodes.MediaErrorAborted;
                break;
              case this.videoTag.error.MEDIA_ERR_NETWORK:
                n = i.VideoErrorCodes.MediaErrorNetwork;
                break;
              case this.videoTag.error.MEDIA_ERR_DECODE:
                n = i.VideoErrorCodes.MediaErrorDecode;
                break;
              case this.videoTag.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                n = i.VideoErrorCodes.MediaErrorSourceNotSupported;
                break;
              default:
                n = i.VideoErrorCodes.MediaErrorUnknown;
            }
            return {
              errorCode: n,
            };
          }
          return null;
        }),
        (n.prototype.setPlaybackRate = function (n) {
          this.videoTag && n && e.isNumber(n) && (this.videoTag.playbackRate = n);
        }),
        (n.prototype.getPlayerTechName = function () {
          return "hlsplayer";
        }),
        (n.prototype.getWrapperName = function () {
          return "hlsplayerVideo";
        }),
        (n.prototype.getAudioTracks = function () {
          return null;
        }),
        (n.prototype.switchToAudioTrack = function () {
          throw new Error("HTML5.switchToAudioTrack is not supported");
        }),
        (n.prototype.getCurrentAudioTrack = function () {
          return null;
        }),
        (n.prototype.getVideoTracks = function () {
          return null;
        }),
        (n.prototype.switchToVideoTrack = function () {
          throw new Error("HTML5.switchToVideoTrack is not supported");
        }),
        (n.prototype.getCurrentVideoTrack = function () {
          return null;
        }),
        (n.prototype.setAutoPlay = function () {
          this.videoTag.autoplay = !0;
          this.videoTag.muted = !0;
          this.setVolume(0);
          this.videoTag.setAttribute("playsinline", "");
          this.videoTag.setAttribute("muted", "");
        }),
        (n.prototype.dispose = function () {
          this.unbindVideoEvents();
          this.clearSource();
          this.hlsPlayer && this.hlsPlayer.dispose && this.hlsPlayer.dispose();
          this.hlsPlayer = null;
        }),
        (n.pollingInterval = 50),
        (n.pollingTimeout = 3e4),
        (n.supportedMediaTypes = [i.MediaTypes.HLS, i.MediaTypes.MP4]),
        n
      );
    })();
    t.HlsPlayerVideoWrapper = s;
  });
  define("html5-video-wrapper", [
    "require",
    "exports",
    "player-data-interfaces",
    "htmlExtensions",
    "player-constants",
    "utility",
  ], function (n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var e = (function () {
      function n() {
        var n = this;
        this.triggerEvents = function (t) {
          if (n.onMediaEventCallback) n.onMediaEventCallback(t);
        };
      }
      return (
        (n.prototype.bindVideoEvents = function (n) {
          var t, i, f;
          if (this.videoTag)
            for (
              this.onMediaEventCallback = n, t = 0, i = u.MediaEvents;
              t < i.length;
              t++
            )
              (f = i[t]), r.addEvents(this.videoTag, f, this.triggerEvents);
        }),
        (n.prototype.unbindVideoEvents = function () {
          var n, t, i;
          if (this.videoTag)
            for (n = 0, t = u.MediaEvents; n < t.length; n++)
              (i = t[n]), r.removeEvents(this.videoTag, i, this.triggerEvents);
        }),
        (n.prototype.load = function (n, t, i, u) {
          n || (console.log("player container is null"), u && u());
          this.videoTag && this.dispose();
          this.playerContainer = n;
          this.videoTag = r.selectFirstElementT("video", this.playerContainer);
          this.videoTag.autoplay = t;
          !this.videoTag && u && (console.log("video tag not found"), u());
          i && setTimeout(i, 0);
        }),
        (n.prototype.play = function () {
          this.videoTag && this.videoTag.play();
        }),
        (n.prototype.pause = function () {
          this.videoTag && this.videoTag.pause();
        }),
        (n.prototype.isPaused = function () {
          return this.videoTag && this.videoTag.paused;
        }),
        (n.prototype.isLive = function () {
          return !1;
        }),
        (n.prototype.getPlayPosition = function () {
          return this.videoTag
            ? {
                currentTime: this.videoTag.currentTime,
                startTime: 0,
                endTime: this.videoTag.duration,
              }
            : {
                currentTime: 0,
                endTime: 0,
                startTime: 0,
              };
        }),
        (n.prototype.getVolume = function () {
          return this.videoTag ? this.videoTag.volume : 0;
        }),
        (n.prototype.setVolume = function (n) {
          this.videoTag && (this.videoTag.volume = n);
        }),
        (n.prototype.isMuted = function () {
          return this.videoTag ? this.videoTag.muted : !1;
        }),
        (n.prototype.mute = function () {
          this.videoTag &&
            ((this.videoTag.muted = !0),
            this.videoTag.setAttribute("muted", "muted"));
        }),
        (n.prototype.unmute = function () {
          this.videoTag &&
            ((this.videoTag.muted = !1), this.videoTag.removeAttribute("muted"));
        }),
        (n.prototype.setCurrentTime = function (n) {
          this.videoTag && (this.videoTag.currentTime = n);
        }),
        (n.prototype.isSeeking = function () {
          return this.videoTag ? this.videoTag.seeking : !1;
        }),
        (n.prototype.getBufferedDuration = function () {
          var n = 0;
          return (
            this.videoTag &&
              this.videoTag.buffered &&
              this.videoTag.buffered.length &&
              (n = this.videoTag.buffered.end(this.videoTag.buffered.length - 1)),
            n
          );
        }),
        (n.prototype.setSource = function (n) {
          if (this.videoTag && n && n.length) {
            var t = this.videoTag.getAttribute("src");
            n[0].url !== t &&
              (this.videoTag.setAttribute("src", n[0].url),
              this.videoTag.load && this.videoTag.load());
          }
        }),
        (n.prototype.addNativeClosedCaption = function (n, t, i) {
          var f, e, u, r;
          if (n && n.length && this.videoTag) {
            for (
              this.clearNativeCc(this.videoTag),
                this.videoTag.setAttribute("crossorigin", "anonymous"),
                f = 0,
                e = n;
              f < e.length;
              f++
            )
              (u = e[f]),
                u.ccType === t &&
                  ((r = document.createElement("track")),
                  r.setAttribute("src", u.url),
                  r.setAttribute("kind", "captions"),
                  r.setAttribute("srclang", u.locale),
                  r.setAttribute("label", i.getLanguageNameFromLocale(u.locale)),
                  this.videoTag.appendChild(r));
            this.videoTag.load && this.videoTag.load();
          }
        }),
        (n.prototype.clearNativeCc = function (n) {
          var f, t, u, i;
          if (n)
            for (
              f = r.selectElements("track", n), t = 0, u = f;
              t < u.length;
              t++
            )
              (i = u[t]), i && i.parentElement === n && n.removeChild(i);
        }),
        (n.prototype.clearSource = function () {
          this.videoTag &&
            (this.videoTag.setAttribute("src", ""),
            this.videoTag.load && this.videoTag.load());
        }),
        (n.prototype.setPosterFrame = function (n) {
          n &&
            this.videoTag &&
            this.videoTag.poster !== n &&
            (this.videoTag.poster = n);
        }),
        (n.prototype.getError = function () {
          var n;
          if (this.videoTag !== null && this.videoTag.error !== null) {
            switch (this.videoTag.error.code) {
              case this.videoTag.error.MEDIA_ERR_ABORTED:
                n = i.VideoErrorCodes.MediaErrorAborted;
                break;
              case this.videoTag.error.MEDIA_ERR_NETWORK:
                n = i.VideoErrorCodes.MediaErrorNetwork;
                break;
              case this.videoTag.error.MEDIA_ERR_DECODE:
                n = i.VideoErrorCodes.MediaErrorDecode;
                break;
              case this.videoTag.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                n = i.VideoErrorCodes.MediaErrorSourceNotSupported;
                break;
              default:
                n = i.VideoErrorCodes.MediaErrorUnknown;
            }
            return {
              errorCode: n,
            };
          }
          return null;
        }),
        (n.prototype.setPlaybackRate = function (n) {
          this.videoTag && n && f.isNumber(n) && (this.videoTag.playbackRate = n);
        }),
        (n.prototype.getPlayerTechName = function () {
          return "html5";
        }),
        (n.prototype.getWrapperName = function () {
          return "html5video";
        }),
        (n.prototype.getAudioTracks = function () {
          return null;
        }),
        (n.prototype.switchToAudioTrack = function () {
          throw new Error("HTML5.switchToAudioTrack is not supported");
        }),
        (n.prototype.getCurrentAudioTrack = function () {
          return null;
        }),
        (n.prototype.getVideoTracks = function () {
          return null;
        }),
        (n.prototype.switchToVideoTrack = function () {
          throw new Error("HTML5.switchToVideoTrack is not supported");
        }),
        (n.prototype.getCurrentVideoTrack = function () {
          return null;
        }),
        (n.prototype.setAutoPlay = function () {
          !this.videoTag ||
            ((this.videoTag.autoplay = !0),
            (this.videoTag.muted = !0),
            this.setVolume(0),
            this.videoTag.setAttribute("playsinline", ""),
            this.videoTag.setAttribute("muted", ""));
        }),
        (n.prototype.dispose = function () {
          this.unbindVideoEvents();
          this.clearSource();
        }),
        (n.supportedMediaTypes = [i.MediaTypes.HLS, i.MediaTypes.MP4]),
        n
      );
    })();
    t.Html5VideoWrapper = e;
  });
  define("native-video-wrapper", [
    "require",
    "exports",
    "htmlExtensions",
  ], function (n, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var r = (function () {
      function n() {
        var n = this;
        this.triggerEvents = function (t) {
          var i = null;
          if (
            (t.state === "MediaOpened"
              ? n.ensureLoadEventRaised()
              : t.state === "MediaEnded"
              ? ((i = document.createEvent("CustomEvent")), i.initEvent("ended"))
              : t.state === "MediaFailed"
              ? ((i = document.createEvent("CustomEvent")), i.initEvent("error"))
              : (i = n.createMediaPlaybackEvent(t.target)),
            i)
          )
            n.onMediaEventCallback(i);
        };
      }
      return (
        (n.prototype.bindVideoEvents = function (n) {
          this.hasStoreApi &&
            ((this.onMediaEventCallback = n),
            window.storeApi.backgroundVideoPlayer.addEventListener(
              "mediaplayerstatechanged",
              this.triggerEvents
            ));
        }),
        (n.prototype.unbindVideoEvents = function () {
          this.hasStoreApi &&
            window.storeApi.backgroundVideoPlayer.removeEventListener(
              "mediaplayerstatechanged",
              this.triggerEvents
            );
        }),
        (n.prototype.load = function (n, t, r, u) {
          var f, o, e;
          if (
            (n || (console.log("player container is null"), u && u()),
            this.hasLoaded && this.dispose(),
            (this.playerContainer = n),
            (f = i.selectFirstElementT("video", this.playerContainer)),
            !f && u && (console.log("video tag not found"), u()),
            window && window.storeApi && window.storeApi.backgroundVideoPlayer
              ? (this.hasStoreApi = !0)
              : u &&
                (console.log("native store host api not found"),
                (this.hasStoreApi = !1),
                u()),
            (this.autoPlay = t),
            f && this.hasStoreApi)
          ) {
            for (o = f; o.parentElement; )
              (o.style.background = "transparent"), (o = o.parentElement);
            e = document.createElement("DIV");
            e.className = f.className;
            e.style.position = "absolute";
            e.style.width = "100%";
            e.style.height = "100%";
            f.parentNode.insertBefore(e, f);
            f.remove();
          }
          r && setTimeout(r, 0);
          this.hasLoaded = !0;
        }),
        (n.prototype.play = function () {
          this.hasStoreApi &&
            (!this.autoPlay && this.sourceUri
              ? ((window.storeApi.backgroundVideoPlayer.source = this.sourceUri),
                (this.sourceUri = null))
              : window.storeApi.backgroundVideoPlayer.play());
        }),
        (n.prototype.pause = function () {
          this.hasStoreApi && window.storeApi.backgroundVideoPlayer.pause();
        }),
        (n.prototype.isPaused = function () {
          return this.hasStoreApi
            ? !(
                window.storeApi.backgroundVideoPlayer.mediaPlaybackState ===
                  "Opening" ||
                window.storeApi.backgroundVideoPlayer.mediaPlaybackState ===
                  "Buffering" ||
                window.storeApi.backgroundVideoPlayer.mediaPlaybackState ===
                  "Playing"
              )
            : !1;
        }),
        (n.prototype.isLive = function () {
          return !1;
        }),
        (n.prototype.getPlayPosition = function () {
          return {
            currentTime: 0,
            endTime: 0,
            startTime: 0,
          };
        }),
        (n.prototype.getVolume = function () {
          return 0;
        }),
        (n.prototype.setVolume = function () {}),
        (n.prototype.isMuted = function () {
          return this.hasStoreApi
            ? window.storeApi.backgroundVideoPlayer.isMuted
            : !1;
        }),
        (n.prototype.mute = function () {
          this.hasStoreApi &&
            (window.storeApi.backgroundVideoPlayer.isMuted = !0);
        }),
        (n.prototype.unmute = function () {
          this.hasStoreApi &&
            (window.storeApi.backgroundVideoPlayer.isMuted = !1);
        }),
        (n.prototype.setCurrentTime = function () {}),
        (n.prototype.isSeeking = function () {
          return !1;
        }),
        (n.prototype.getBufferedDuration = function () {
          return 0;
        }),
        (n.prototype.setSource = function (n) {
          var i, t;
          if (this.hasStoreApi)
            if (window.storeApi.backgroundVideoPlayer.source) {
              if (
                (this.ensureLoadEventRaised(),
                (i = this.createMediaPlaybackEvent(
                  window.storeApi.backgroundVideoPlayer
                )),
                i)
              )
                this.onMediaEventCallback(i);
            } else
              (t = n[0].url),
                t.charAt(0) === "/" && (t = "http:" + t),
                this.autoPlay
                  ? (window.storeApi.backgroundVideoPlayer.source = t)
                  : (this.sourceUri = t);
        }),
        (n.prototype.addNativeClosedCaption = function () {}),
        (n.prototype.clearSource = function () {
          this.hasStoreApi &&
            ((window.storeApi.backgroundVideoPlayer.source = null),
            (window.storeApi.backgroundVideoPlayer.posterSource = null));
        }),
        (n.prototype.setPosterFrame = function (n) {
          this.hasStoreApi &&
            (window.storeApi.backgroundVideoPlayer.posterSource ||
              (n.charAt(0) === "/" && (n = "http:" + n),
              (window.storeApi.backgroundVideoPlayer.posterSource = n)));
        }),
        (n.prototype.getError = function () {
          return null;
        }),
        (n.prototype.setPlaybackRate = function () {}),
        (n.prototype.getPlayerTechName = function () {
          return "nativeplayer";
        }),
        (n.prototype.getWrapperName = function () {
          return "nativeplayer";
        }),
        (n.prototype.getAudioTracks = function () {
          return null;
        }),
        (n.prototype.switchToAudioTrack = function () {
          throw new Error("HTML5.switchToAudioTrack is not supported");
        }),
        (n.prototype.getCurrentAudioTrack = function () {
          return null;
        }),
        (n.prototype.getVideoTracks = function () {
          return null;
        }),
        (n.prototype.switchToVideoTrack = function () {
          throw new Error("HTML5.switchToVideoTrack is not supported");
        }),
        (n.prototype.getCurrentVideoTrack = function () {
          return null;
        }),
        (n.prototype.setAutoPlay = function () {}),
        (n.prototype.dispose = function () {
          this.unbindVideoEvents();
          this.clearSource();
        }),
        (n.prototype.ensureLoadEventRaised = function () {
          if (!this.hasRaisedLoadedEvent && this.onMediaEventCallback) {
            var n = document.createEvent("CustomEvent");
            n.initEvent("loadeddata", !1, !1);
            this.hasRaisedLoadedEvent = !0;
            this.onMediaEventCallback(n);
          }
        }),
        (n.prototype.createMediaPlaybackEvent = function (n) {
          var t = null;
          switch (n.mediaPlaybackState) {
            case "Paused":
              t = document.createEvent("CustomEvent");
              t.initEvent("pause", !1, !1);
              break;
            case "Playing":
              t = document.createEvent("CustomEvent");
              t.initEvent("playing", !1, !1);
          }
          return t;
        }),
        n
      );
    })();
    t.NativeVideoWrapper = r;
  });
  define("video-wrapper-interface", ["require", "exports"], function (n, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
  });
  
  
  /*
   * Loads the videoplayerIframeApi if required 
   */
  var jsapi = null;
  var params = document.location.search ? document.location.search.substring(1).split('&') : [];
  for (var qspCounter = 0; qspCounter < params.length; qspCounter++) {
    var pair = params[qspCounter].split('=');
      if (pair.length > 1 && decodeURIComponent(pair[0]) === 'jsapi') {
        jsapi = decodeURIComponent(pair[1]);
        break;
      }
  }

  if (jsapi === "true") {
      define("videoPlayerIframeApi", [
          "require",
          "exports",
          "componentFactory",
          "video-player",
          "htmlExtensions",
          "utility"
      ], function(n, t, i, r, u, f) {
          "use strict";
          Object.defineProperty(t, "__esModule", {
              value: !0
          });
          var e = function() {
              function n() {
                  var n = this;
                  this.player = null;
                  this.playerId = null;
                  this.onMessageReceived = function(t) {
                      if (n.player && t && t.data && typeof t.data == "string") {
                          var i;
                          try {
                              i = JSON.parse(n.sanitize(t.data))
                          } catch (r) {}
                          if (!i || typeof i != "object" || !i.eventName) {
                              console.log("Warning: ignoring unrecognized message event: " + t.data);
                              return
                          }
                          switch (i.eventName.toLowerCase()) {
                              case "play":
                                  n.player.play();
                                  break;
                              case "pause":
                                  n.player.pause();
                                  break;
                              case "mute":
                                  n.player.mute();
                                  break;
                              case "unmute":
                                  n.player.unmute();
                                  break;
                              case "enterfullscreen":
                                  n.player.enterFullScreen();
                                  break;
                              case "exitfullscreen":
                                  n.player.exitFullScreen();
                                  break;
                              case "seek":
                                  n.player.seek(i.data);
                              case "updateplayersource":
                                  n.player.updatePlayerSource(i.data)
                          }
                      }
                  };
                  this.onPlayerCreated = function() {
                      if (!n.player.currentPlayer) {
                          setTimeout(n.onPlayerCreated, 50);
                          return
                      }
                      n.playerId = f.getQSPValue("pid", !1);
                      n.player.addPlayerEventListener(n.onPlayerEvent);
                      u.addEvents(window, "message", n.onMessageReceived);
                      n.sendPostMessage("playerready")
                  };
                  this.onVideoEvent = function(t) {
                      t && n.sendPostMessage(t.type)
                  };
                  this.onPlayerEvent = function(t) {
                      n.sendPostMessage(t.name)
                  };
                  i.ComponentFactory.create([{
                      component: r.VideoPlayer,
                      callback: function(t) {
                          t && t.length === 1 && (n.player = t[0],
                              n.onPlayerCreated())
                      }
                  }])
              }
              return n.prototype.sanitize = function(n) {
                      var t = {
                          "<": "&lt;",
                          ">": "&gt;"
                      };
                      return n.replace(/[<>]/ig, function(n) {
                          return t[n]
                      })
                  },
                  n.prototype.sendPostMessage = function(n) {
                      var i = this.player.shouldReportData(),
                          t;
                      i && (t = {
                              eventName: n,
                              data: this.player && this.player.getPlayPosition(),
                              playerId: this.playerId
                          },
                          window.parent.postMessage(JSON.stringify(t), "*"))
                  },
                  n
          }();
          t.VideoPlayerIframeApi = e
      });
      require(["videoPlayerIframeApi"], function(n) {
          if (n)
              return new n.VideoPlayerIframeApi
      });
  }