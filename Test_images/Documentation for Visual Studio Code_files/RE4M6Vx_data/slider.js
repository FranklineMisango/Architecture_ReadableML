// vid team slider.js
define("observableComponent", ["require", "exports", "htmlExtensions"], function(n, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function n(t, i) {
            i === void 0 && (i = null);
            this.element = t;
            this.ignoreNextDOMChange = !1;
            this.observing = !1;
            n.shouldInitializeAsClass(t, i) && this.setObserver()
        }
        return n.prototype.detach = function() {
            this.unObserve();
            this.teardown()
        }
        ,
        n.prototype.isObserving = function() {
            return this.observing
        }
        ,
        n.prototype.unObserve = function() {
            this.observing = !1;
            this.modernObserver && this.modernObserver.disconnect();
            i.removeEvent(this.element, i.eventTypes.DOMNodeInserted, this.obsoleteNodeInsertedEventHander);
            i.removeEvent(this.element, i.eventTypes.DOMNodeRemoved, this.obsoleteNodeRemovedEventHandler)
        }
        ,
        n.prototype.setObserver = function() {
            this.observing = !0;
            typeof n.mutationObserver != "undefined" ? this.observeModern() : "MutationEvent"in window && this.observeObsolete()
        }
        ,
        n.prototype.observeModern = function() {
            var t = this
              , i = function(n) {
                t.onModernMutations(n)
            };
            this.modernObserver = new n.mutationObserver(i);
            this.modernObserver.observe(this.element, {
                childList: !0,
                subtree: !0
            })
        }
        ,
        n.prototype.onModernMutations = function(n) {
            var r, u, f, e, i, o, t, s;
            if (this.ignoreNextDOMChange) {
                this.ignoreNextDOMChange = !1;
                return
            }
            for (r = !1,
            u = !1,
            f = 0,
            e = n; f < e.length; f++) {
                for (i = e[f],
                t = 0,
                o = i.addedNodes.length; t < o; t++)
                    i.addedNodes[t].nodeType === Node.ELEMENT_NODE && (r = !0,
                    u = !0);
                for (t = 0,
                s = i.removedNodes.length; t < s; t++)
                    i.removedNodes[t].nodeType === Node.ELEMENT_NODE && (r = !0,
                    i.removedNodes[t] !== this.element && (u = !0))
            }
            r && this.teardown();
            u && this.update()
        }
        ,
        n.prototype.observeObsolete = function() {
            var n = this;
            this.obsoleteNodeInsertedEventHander = i.addDebouncedEvent(this.element, i.eventTypes.DOMNodeInserted, function() {
                n.onObsoleteNodeInserted()
            });
            this.obsoleteNodeRemovedEventHandler = i.addDebouncedEvent(this.element, i.eventTypes.DOMNodeRemoved, function(t) {
                n.onObsoleteNodeRemoved(t)
            })
        }
        ,
        n.prototype.onObsoleteNodeInserted = function() {
            this.ignoreNextDOMChange || (this.teardown(),
            this.update())
        }
        ,
        n.prototype.onObsoleteNodeRemoved = function(n) {
            this.ignoreNextDOMChange || (this.teardown(),
            i.getEventTargetOrSrcElement(n) !== this.element && this.update())
        }
        ,
        n.shouldInitializeAsClass = function(t, i) {
            var r = t ? t.getAttribute(n.mwfClassAttribute) : null
              , u = t ? t.getAttribute(n.initializeAttribute) : null;
            return u === "false" ? !1 : !!t && (!r || !!i && r === i.mwfClass)
        }
        ,
        n.mwfClassAttribute = "data-mwf-class",
        n.initializeAttribute = "data-js-initialize",
        n.mutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        n
    }();
    t.ObservableComponent = r
});
define("htmlExtensions", ["require", "exports", "stringExtensions"], function(n, t, i) {
    "use strict";
    function e(n, t, i, f) {
        var e, o, s;
        for (f === void 0 && (f = !1),
        e = 0,
        o = u(n); e < o.length; e++)
            s = o[e],
            y(s, i, f, r[t])
    }
    function g(n, t, r, f) {
        var e, s, l, o, h, c;
        if (f === void 0 && (f = !1),
        !i.isNullOrWhiteSpace(t))
            for (e = 0,
            s = u(n); e < s.length; e++)
                for (l = s[e],
                o = 0,
                h = t.split(/\s+/); o < h.length; o++)
                    c = h[o],
                    i.isNullOrWhiteSpace(c) || y(l, r, f, c)
    }
    function nt(n, t, r, f) {
        var e, s, l, o, h, c;
        for (f === void 0 && (f = !1),
        e = 0,
        s = u(n); e < s.length; e++)
            for (l = s[e],
            o = 0,
            h = u(t); o < h.length; o++)
                c = h[o],
                i.isNullOrWhiteSpace(c) || d(l, r, f, c)
    }
    function tt(n) {
        n = v(n);
        n && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
    }
    function it(n, t, i, r) {
        r === void 0 && (r = 150);
        var f, u = 0, o = function(n) {
            var t = Date.now();
            f && (clearTimeout(f),
            f = undefined);
            !!u && t < u + r ? f = setTimeout(function() {
                u = Date.now();
                i(n)
            }, r - (t - u)) : (u = t,
            i(n))
        };
        return e(n, t, o),
        o
    }
    function rt(n, t, r, f, e) {
        function p(n) {
            var i, t = 0;
            return function(r) {
                var u = Date.now();
                clearTimeout(i);
                !!t && u < t + e ? i = setTimeout(function() {
                    t = u;
                    n(r)
                }, e - (u - t)) : (t = u,
                n(r))
            }
        }
        var o, h, a, s, c, l, v;
        if (f === void 0 && (f = !1),
        e === void 0 && (e = 150),
        !i.isNullOrWhiteSpace(t))
            for (o = 0,
            h = u(n); o < h.length; o++)
                for (a = h[o],
                s = 0,
                c = t.split(/\s+/); s < c.length; s++)
                    l = c[s],
                    i.isNullOrWhiteSpace(l) || (v = p(r),
                    y(a, v, f, l))
    }
    function ut(n, t, i, r) {
        r === void 0 && (r = 150);
        var u, f = function(n) {
            window.clearTimeout(u);
            u = setTimeout(function() {
                i(n)
            }, r)
        };
        return e(n, t, f),
        f
    }
    function ft(n, t) {
        if (t === void 0 && (t = 5e3),
        document.readyState === "complete") {
            n.call(null);
            return
        }
        if (!document.attachEvent && document.readyState === "interactive") {
            n.call(null);
            return
        }
        var o, i, u, f = function() {
            clearTimeout(o);
            i && c(document, r.DOMContentLoaded, i);
            u && c(document, r.onreadystatechange, u);
            l.requestAnimationFrame.call(window, n)
        };
        if (o = setTimeout(function() {
            f("timedout")
        }, t),
        document.addEventListener) {
            i = function() {
                f("domcontentloaded")
            }
            ;
            e(document, r.DOMContentLoaded, i, !1);
            return
        }
        document.attachEvent && (u = function() {
            document.readyState === "complete" && f("readystatecomplete")
        }
        ,
        e(document, r.onreadystatechange, u, !1))
    }
    function et(n, t) {
        t === void 0 && (t = 5e3);
        var i, u = setTimeout(function() {
            clearTimeout(u);
            c(window, r.load, i);
            n.call(null)
        }, t);
        i = function() {
            clearTimeout(u);
            l.requestAnimationFrame.call(window, n)
        }
        ;
        document.readyState === "complete" ? (clearTimeout(u),
        n.call(null)) : e(window, r.load, i)
    }
    function p(n, t) {
        !n || i.isNullOrWhiteSpace(t) || b(n, t) || (n.classList ? n.classList.add(t) : n.className = i.trim(n.className + " " + t))
    }
    function w(n, t) {
        var o, e, s, r, f;
        if (!!n && !i.isNullOrWhiteSpace(t))
            for (o = " " + i.trim(t) + " ",
            e = 0,
            s = u(n); e < s.length; e++)
                if (r = s[e],
                r.classList)
                    r.classList.remove(t);
                else if (!i.isNullOrWhiteSpace(r.className)) {
                    for (f = " " + r.className + " "; f.indexOf(o) > -1; )
                        f = f.replace(o, " ");
                    r.className = i.trim(f)
                }
    }
    function ot(n, t) {
        var i, r, u;
        if (t)
            for (i = 0,
            r = t; i < r.length; i++)
                u = r[i],
                w(n, u)
    }
    function st(n, t) {
        var i, r, u;
        if (t)
            for (i = 0,
            r = t; i < r.length; i++)
                u = r[i],
                p(n, u)
    }
    function ht(n, t) {
        var u, f, r;
        if (n && t)
            for (u = 0,
            f = t; u < f.length; u++)
                r = f[u],
                i.isNullOrWhiteSpace(r.name) || i.isNullOrWhiteSpace(r.value) || n.setAttribute(r.name, r.value)
    }
    function b(n, t) {
        return !n || i.isNullOrWhiteSpace(t) ? !1 : n.classList ? n.classList.contains(t) : (" " + n.className + " ").indexOf(" " + i.trim(t) + " ") > -1
    }
    function ct(n) {
        return n ? n.parentElement.removeChild(n) : n
    }
    function lt(n, t) {
        return h(n, t)
    }
    function at(n, t) {
        var i = h(n, t);
        return !i || !i.length ? null : i[0]
    }
    function h(n, t) {
        var r, u;
        if (i.isNullOrWhiteSpace(n) || n === "#")
            return [];
        if (r = t || document,
        /^[\#.]?[\w-]+$/.test(n)) {
            switch (n[0]) {
            case ".":
                return r.getElementsByClassName ? o(r.getElementsByClassName(n.slice(1))) : o(r.querySelectorAll(n));
            case "#":
                return u = r.querySelector(n),
                u ? [u] : []
            }
            return o(r.getElementsByTagName(n))
        }
        return o(r.querySelectorAll(n))
    }
    function vt(n, t) {
        var i = h(n, t);
        return !i || !i.length ? null : i[0]
    }
    function yt(n, t) {
        var o = t || document, u, f, i, r, e;
        for (u = n.split(","),
        i = 0,
        r = u; i < r.length; i++)
            e = r[i],
            f += this.selectElements(e, o);
        return f
    }
    function o(n) {
        var i, t;
        if (!n)
            return [];
        for (i = [],
        t = 0; t < n.length; t++)
            i.push(n[t]);
        return i
    }
    function pt(n) {
        for (n === void 0 && (n = document.documentElement); n !== null; ) {
            var t = n.getAttribute("dir");
            if (!t)
                n = n.parentElement;
            else
                return t === "rtl" ? s.right : s.left
        }
        return s.left
    }
    function a(n) {
        var i, t, r;
        if (n) {
            i = n.getBoundingClientRect();
            t = {};
            for (r in i)
                t[r] = i[r];
            return typeof t.width == "undefined" && (t.width = n.offsetWidth),
            typeof t.height == "undefined" && (t.height = n.offsetHeight),
            t
        }
    }
    function wt(n) {
        if (n)
            return {
                width: parseFloat(a(n).width) + parseFloat(f(n, "margin-left")) + parseFloat(f(n, "margin-right")),
                height: parseFloat(a(n).height) + parseFloat(f(n, "margin-top")) + parseFloat(f(n, "margin-bottom"))
            }
    }
    function f(n, t, r) {
        if (!n)
            return null;
        if (!r && r !== "")
            return r = n.style[t],
            i.isNullOrWhiteSpace(r) && (r = getComputedStyle(n),
            r = r[t]),
            r;
        n.style[t] = r
    }
    function c(n, t, i, f) {
        var e, o, s;
        if (n && t && i)
            for (e = 0,
            o = u(n); e < o.length; e++)
                s = o[e],
                d(s, i, f, r[t])
    }
    function k(n) {
        return Array.isArray ? Array.isArray(n) : {}.toString.call(n) === "[object Array]"
    }
    function u(n) {
        return n ? k(n) ? n : typeof n == "string" ? n.split(/\s+/) : [n] : []
    }
    function bt(n, t) {
        return !!n && n !== t && n.contains(t)
    }
    function kt(n, t) {
        return !!n && n.contains(t)
    }
    function dt(n) {
        return !n ? "" : n.textContent || n.innerText || ""
    }
    function gt(n, t) {
        !n || t === null || (n.textContent ? n.textContent = t : n.innerHTML = t)
    }
    function ni(n) {
        n && (n.innerHTML = "")
    }
    function ti(n) {
        return n = v(n),
        n.target || n.srcElement
    }
    function v(n) {
        return n || window.event
    }
    function y(n, t, i, r) {
        i === void 0 && (i = !1);
        !n || (window.addEventListener ? n.addEventListener(r, t, i) : n.attachEvent("on" + r, t))
    }
    function d(n, t, i, r) {
        i === void 0 && (i = !1);
        !n || (window.removeEventListener ? n.removeEventListener(r, t, i) : n.detachEvent("on" + r, t))
    }
    function ii(n, t, i) {
        if (i === void 0 && (i = {}),
        !n || !t)
            return null;
        var f = typeof t == "string" ? t : r[t]
          , u = null;
        if (i.bubbles = typeof i.bubbles == "undefined" ? !0 : i.bubbles,
        i.cancelable = typeof i.cancelable == "undefined" ? !0 : i.cancelable,
        window.CustomEvent && typeof CustomEvent == "function")
            u = new CustomEvent(f,i),
            i.changedTouches && i.changedTouches.length && (u.changedTouches = i.changedTouches);
        else if (document.createEvent)
            u = document.createEvent("CustomEvent"),
            u.initCustomEvent(f, i.bubbles, i.cancelable, i.detail),
            i.changedTouches && i.changedTouches.length && (u.changedTouches = i.changedTouches);
        else {
            u = document.createEventObject();
            try {
                n.fireEvent("on" + f, u)
            } catch (e) {
                return undefined
            }
            return u
        }
        return n.dispatchEvent(u),
        u
    }
    function ri(n) {
        n.stopPropagation ? n.stopPropagation() : n.returnValue = !1
    }
    function ui(n) {
        return n === void 0 && (n = window),
        n.scrollY || n.pageYOffset || (n.document.compatMode === "CSS1Compat" ? n.document.documentElement.scrollTop : n.document.body.scrollTop)
    }
    function fi(n) {
        if (!n)
            return window.document.documentElement;
        for (var i = n.ownerDocument.documentElement, t = n.offsetParent; t && f(t, "position") == "static"; )
            t = t.offsetParent;
        return t || i
    }
    function ei(n, t) {
        if (n && t) {
            var i = t.clientHeight
              , r = t.scrollHeight;
            r > i && (t.scrollTop = Math.min(n.offsetTop - t.firstElementChild.offsetTop, r - i))
        }
    }
    function oi(n) {
        return typeof n.complete != "undefined" && typeof n.naturalHeight != "undefined" ? n && n.complete && n.naturalHeight > 0 : !0
    }
    function si(n) {
        return n && typeof n.complete != "undefined" && typeof n.naturalHeight != "undefined" ? n && n.complete && n.naturalWidth == 0 && n.naturalHeight == 0 : !1
    }
    function hi(n) {
        var i = n.touches && n.touches.length ? n.touches : [n]
          , t = n.changedTouches && n.changedTouches[0] || i[0];
        return {
            x: t.clientX,
            y: t.clientY
        }
    }
    function ci(n, t) {
        for (var i = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector; n; ) {
            if (i.call(n, t))
                break;
            n = n.parentElement
        }
        return n
    }
    function li(n, t) {
        t === void 0 && (t = !0);
        !!n && (window.PointerEvent || window.navigator.pointerEnabled) && f(n, "touchAction", t ? "pan-y pinch-zoom" : "pan-x pinch-zoom")
    }
    var l, s, r;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(n) {
        n.requestAnimationFrame = window.requestAnimationFrame || function(n) {
            typeof n == "function" && window.setTimeout(n, 16.7)
        }
    }(l = t.SafeBrowserApis || (t.SafeBrowserApis = {})),
    function(n) {
        n[n.right = 0] = "right";
        n[n.left = 1] = "left"
    }(s = t.Direction || (t.Direction = {})),
    function(n) {
        n[n.animationend = 0] = "animationend";
        n[n.blur = 1] = "blur";
        n[n.change = 2] = "change";
        n[n.click = 3] = "click";
        n[n.DOMContentLoaded = 4] = "DOMContentLoaded";
        n[n.DOMNodeInserted = 5] = "DOMNodeInserted";
        n[n.DOMNodeRemoved = 6] = "DOMNodeRemoved";
        n[n.ended = 7] = "ended";
        n[n.error = 8] = "error";
        n[n.focus = 9] = "focus";
        n[n.focusin = 10] = "focusin";
        n[n.focusout = 11] = "focusout";
        n[n.input = 12] = "input";
        n[n.load = 13] = "load";
        n[n.keydown = 14] = "keydown";
        n[n.keypress = 15] = "keypress";
        n[n.keyup = 16] = "keyup";
        n[n.loadedmetadata = 17] = "loadedmetadata";
        n[n.mousedown = 18] = "mousedown";
        n[n.mousemove = 19] = "mousemove";
        n[n.mouseout = 20] = "mouseout";
        n[n.mouseover = 21] = "mouseover";
        n[n.mouseup = 22] = "mouseup";
        n[n.onreadystatechange = 23] = "onreadystatechange";
        n[n.resize = 24] = "resize";
        n[n.scroll = 25] = "scroll";
        n[n.submit = 26] = "submit";
        n[n.timeupdate = 27] = "timeupdate";
        n[n.touchcancel = 28] = "touchcancel";
        n[n.touchend = 29] = "touchend";
        n[n.touchmove = 30] = "touchmove";
        n[n.touchstart = 31] = "touchstart";
        n[n.transitionend = 32] = "transitionend";
        n[n.wheel = 33] = "wheel"
    }(r = t.eventTypes || (t.eventTypes = {}));
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
    t.preventDefaultSwipeAction = li
});
define("stringExtensions", ["require", "exports"], function(n, t) {
    "use strict";
    function r(n) {
        return !n || typeof n != "string" || !i(n)
    }
    function i(n) {
        return !n || typeof n != "string" ? n : n.trim ? n.trim() : n.replace(/^\s+|\s+$/g, "")
    }
    function u(n, t, i) {
        return (i === void 0 && (i = !0),
        !n || !t) ? !1 : (i && (n = n.toLocaleLowerCase(),
        t = t.toLocaleLowerCase()),
        n.startsWith) ? n.startsWith(t) : n.indexOf(t) === 0
    }
    function f(n, t, i) {
        return (i === void 0 && (i = !0),
        !n || !t) ? !1 : (i && (n = n.toLocaleLowerCase(),
        t = t.toLocaleLowerCase()),
        n.endsWith) ? n.endsWith(t) : n.lastIndexOf(t) === n.length - t.length
    }
    function e(n, t, i) {
        if (i === void 0 && (i = !0),
        !n || !t)
            return 0;
        var r = 0;
        for (i && (n = n.toLocaleLowerCase(),
        t = t.toLocaleLowerCase()); n.charCodeAt(r) === t.charCodeAt(r); )
            r++;
        return r
    }
    function o(n) {
        for (var i = [], t = 1; t < arguments.length; t++)
            i[t - 1] = arguments[t];
        return n.replace(/{(\d+)}/g, function(n, t) {
            if (t >= i.length)
                return n;
            var r = i[t];
            return typeof r != "number" && !r ? "" : typeof r == "string" ? r : r.toString()
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.isNullOrWhiteSpace = r;
    t.trim = i;
    t.startsWith = u;
    t.endsWith = f;
    t.getMatchLength = e;
    t.format = o
});
define("componentFactory", ["require", "exports", "htmlExtensions", "utility", "stringExtensions", "pageBehaviors"], function(n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var e = function() {
        function n() {}
        return n.create = function(t) {
            for (var i, r = 0, u = t; r < u.length; r++) {
                if (i = u[r],
                !i.c && !i.component)
                    throw "factoryInput should has either component or c to tell the factory what component to create.Eg.ComponentFactory.create([{ c: Carousel] or ComponentFactory.create([component: Carousel]))";
                n.createComponent(i.component || i.c, i)
            }
        }
        ,
        n.createComponent = function(t, r) {
            if (t) {
                var o = r && r.eventToBind ? r.eventToBind : ""
                  , f = r && r.selector ? r.selector : t.selector
                  , s = r && r.context ? r.context : null
                  , u = []
                  , e = function(n, f, e) {
                    var a, c, l, o, h;
                    for (a = r.elements ? r.elements : f ? i.selectElementsT(f, s) : [document.body],
                    c = 0,
                    l = a; c < l.length; c++)
                        o = l[c],
                        o ? (o.mwfInstances || (o.mwfInstances = {}),
                        o.mwfInstances[n] ? u.push(o.mwfInstances[n]) : (h = new t(o,e),
                        (!h.isObserving || h.isObserving()) && (o.mwfInstances[n] = h,
                        u.push(h)))) : console.error("The elements array in ComponentFactory.create() cannnot have a null element in it")
                };
                switch (o) {
                case "DOMContentLoaded":
                    if (n.onDomReadyHappened)
                        n.callBindFunction(t, f, e, r, u);
                    else {
                        n.domReadyFunctions.push(function() {
                            return n.callBindFunction(t, f, e, r, u)
                        });
                        break
                    }
                    break;
                case "load":
                default:
                    if (n.onDeferredHappened)
                        n.callBindFunction(t, f, e, r, u);
                    else {
                        n.deferredFunctions.push(function() {
                            return n.callBindFunction(t, f, e, r, u)
                        });
                        break
                    }
                }
            }
        }
        ,
        n.callBindFunction = function(t, i, u, f, e) {
            f === void 0 && (f = null);
            var o = n.getTypeName(t)
              , s = o || i || ""
              , h = f && f.params ? f.params : {};
            h.mwfClass = o;
            r.createPerfMarker(s + "_Begin");
            u(o, i, h);
            r.createPerfMarker(s + "_End");
            f && f.callback && f.callback(e)
        }
        ,
        n.getTypeName = function(t) {
            if (t.typeName)
                return t.typeName;
            if (t.name)
                return t.name;
            var i = n.typeNameRegEx.exec(t.toString());
            if (i && i.length > 1)
                return i[1]
        }
        ,
        n.enumerateComponents = function(n, t) {
            var i, r, u;
            if (n && t) {
                i = n.mwfInstances;
                for (r in i)
                    if (i.hasOwnProperty(r) && (u = i[r],
                    u && !t(r, u)))
                        break
            }
        }
        ,
        n.detach = function(n, t) {
            var i = n, r;
            i && i.mwfInstances && !u.isNullOrWhiteSpace(t) && i.mwfInstances.hasOwnProperty(t) && (r = i.mwfInstances[t],
            i.mwfInstances[t] = null,
            r && r.detach && r.detach())
        }
        ,
        n.typeNameRegEx = /function\s+(\S+)\s*\(/,
        n.onLoadTimeoutMs = 6e3,
        n.onDeferredHappened = !1,
        n.deferredFunctions = [],
        n.onDomReadyHappened = !1,
        n.domReadyFunctions = [],
        n
    }();
    t.ComponentFactory = e,
    function() {
        i.onDeferred(function() {
            var n, t, r, u;
            if (e.onDeferredHappened = !0,
            n = e.deferredFunctions,
            !n || n.length > 0)
                for (t = 0,
                r = n; t < r.length; t++)
                    u = r[t],
                    typeof u == "function" && i.SafeBrowserApis.requestAnimationFrame.call(window, u);
            e.deferredFunctions = null
        }, e.onLoadTimeoutMs);
        i.documentReady(function() {
            var n, t, r, u;
            if (e.onDomReadyHappened = !0,
            n = e.domReadyFunctions,
            !n || n.length > 0)
                for (t = 0,
                r = n; t < r.length; t++)
                    u = r[t],
                    typeof u == "function" && i.SafeBrowserApis.requestAnimationFrame.call(window, u);
            e.domReadyFunctions = null
        }, e.onLoadTimeoutMs);
        new f.PageBehaviors
    }()
});
define("utility", ["require", "exports", "stringExtensions"], function(n, t, i) {
    "use strict";
    function r(n) {
        return !isNaN(n) && typeof n == "number"
    }
    function f() {
        return window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth
    }
    function h() {
        return window.innerHeight && document.documentElement.clientHeight ? Math.min(window.innerHeight, document.documentElement.clientHeight) : window.innerHeight || document.documentElement.clientHeight
    }
    function c(n) {
        if (n != null)
            return {
                width: n.clientWidth,
                height: n.clientHeight
            }
    }
    function l(n) {
        var t;
        if ((n = n || window.event,
        !n) || (t = n.key || n.keyIdentifier,
        !t))
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
            return t
        }
    }
    function a(n) {
        return n = n || window.event,
        n == null ? null : n.which || n.keyCode || n.charCode
    }
    function v(n, t, i, r, u) {
        var o = "", f, e;
        r && (f = new Date,
        f.setTime(f.getTime() + r * 864e5),
        o = "; expires=" + f.toUTCString());
        e = "";
        u && (e = ";domain=" + u);
        window.document.cookie = n + "=" + encodeURIComponent(t) + o + ("; path=" + i + ";") + e
    }
    function y(n) {
        var t, i;
        if (n)
            for (t = 0,
            i = document.cookie.split("; "); t < i.length; t++) {
                var r = i[t]
                  , f = r.indexOf("=")
                  , u = e(r.substring(0, f));
                if (u === n)
                    return e(r.substring(u.length + 1))
            }
        return null
    }
    function e(n) {
        return n = decodeURIComponent(n.replace("/+/g", " ")),
        n.indexOf('"') === 0 && (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")),
        n
    }
    function p(n) {
        var u;
        if (!!n && n.length === 6) {
            var t = parseInt(n.substring(0, 2), 16)
              , i = parseInt(n.substring(2, 4), 16)
              , r = parseInt(n.substring(4, 6), 16);
            if (!isNaN(t) && !isNaN(i) && !isNaN(r))
                return u = (t * 299 + i * 587 + r * 114) / 255e3,
                u >= .5 ? 2 : 1
        }
        return null
    }
    function w(n, t, i) {
        return !i || !r(n) || !r(t) || !r(i.left) || !r(i.right) || !r(i.top) || !r(i.bottom) ? !1 : n >= i.left && n <= i.right && t >= i.top && t <= i.bottom
    }
    function b(n) {
        console && console.warn ? console.warn(n) : console && console.error && console.error(n)
    }
    function k(n, t) {
        if ((t || !(o("item").toLowerCase().indexOf("perf_marker_global:true") < 0)) && !i.isNullOrWhiteSpace(n) && window.performance && window.performance.mark) {
            var r = n.split(" ").join("_");
            window.performance.mark(r);
            window.console && window.console.timeStamp && window.console.timeStamp(r)
        }
    }
    function d(n) {
        if (i.isNullOrWhiteSpace(n) || !window.performance || !window.performance.mark)
            return 0;
        var r = n.split(" ").join("_")
          , t = window.performance.getEntriesByName(r);
        return t && t.length ? Math.round(t[t.length - 1].startTime) : 0
    }
    function g(n, t) {
        var f;
        if (!r(n))
            return "00:00";
        f = n < 0;
        f && (n *= -1);
        var u = Math.floor(n / 3600)
          , e = n % 3600
          , o = Math.floor(e / 60)
          , i = "";
        return i = t ? u > 0 ? u + ":" : "00:" : u > 0 ? u + ":" : "",
        n = Math.floor(e % 60),
        i += (o < 10 ? "0" : "") + o,
        i += ":" + (n === 0 ? "00" : (n < 10 ? "0" : "") + n),
        f ? "-" + i : i
    }
    function nt(n) {
        if (!JSON || !JSON.parse)
            throw new Error("JSON.parse unsupported.");
        if (!n)
            throw new Error("Invalid json.");
        return JSON.parse(n)
    }
    function u() {
        for (var e, t, o, n, f, i, r = [], c = 0; c < arguments.length; c++)
            r[c] = arguments[c];
        if (!r || !r.length)
            return null;
        if (e = typeof r[0] == "boolean" && r[0],
        r.length < 2)
            return e ? null : r[0];
        if (e && r.length < 3)
            return r[1];
        for (t = e ? r[1] : r[0],
        o = e ? 2 : 1; o < r.length; o++)
            for (n in r[o])
                if (r[o].hasOwnProperty(n)) {
                    if (f = r[o][n],
                    e) {
                        var s = Array.isArray ? Array.isArray(f) : {}.toString.call(f) === "[object Array]"
                          , h = !!t[n] && (Array.isArray ? Array.isArray(t[n]) : {}.toString.call(t[n]) === "[object Array]")
                          , l = !s && typeof f == "object"
                          , a = !h && !!t[n] && typeof t[n] == "object";
                        if (s && h) {
                            for (i = 0; i < f.length; i++)
                                s = Array.isArray ? Array.isArray(f[i]) : {}.toString.call(f[i]) === "[object Array]",
                                h = !!t[n][i] && (Array.isArray ? Array.isArray(t[n][i]) : {}.toString.call(t[n][i]) === "[object Array]"),
                                l = !s && typeof f[i] == "object",
                                a = !h && !!t[n][i] && typeof t[n][i] == "object",
                                t[n][i] = s ? u(!0, h ? t[n][i] : [], f[i]) : l ? u(!0, a ? t[n][i] : {}, f[i]) : f[i];
                            continue
                        } else if (s) {
                            t[n] = u(!0, [], f);
                            continue
                        } else if (l) {
                            t[n] = u(!0, a ? t[n] : {}, f);
                            continue
                        }
                    }
                    t[n] = f
                }
        return t
    }
    function tt(n, t, i, r, u) {
        var f = !i || i < 0 ? -1 : Number(new Date) + i;
        t = t || 100,
        function e() {
            var i = n();
            if (i && r)
                r();
            else {
                if (i)
                    return;
                if (f === -1 || Number(new Date) < f)
                    setTimeout(e, t);
                else if (u)
                    u();
                else
                    return
            }
        }()
    }
    function o(n, t) {
        return t === void 0 && (t = !0),
        s(location.search, n, t)
    }
    function it(n, t, i) {
        return i === void 0 && (i = !0),
        s(n, t, i)
    }
    function s(n, t, i) {
        if (i === void 0 && (i = !0),
        !t || !n)
            return "";
        var r = "[\\?&]" + t.replace(/[\[\]]/g, "\\$&") + "=([^&#]*)"
          , f = i ? new RegExp(r,"i") : new RegExp(r)
          , u = f.exec(n);
        return u === null ? "" : decodeURIComponent(u[1].replace(/\+/g, " "))
    }
    function rt(n, t) {
        var i, r;
        if (!t)
            return n;
        if (n.indexOf("//") === -1)
            throw 'To avoid unexpected results in URL parsing, url must begin with "http://", "https://", or "//"';
        return i = document.createElement("a"),
        i.href = n,
        i.search = (i.search ? i.search + "&" : "?") + t,
        r = i.href,
        i = null,
        r
    }
    function ut(n, t) {
        try {
            if (!window.sessionStorage || !n || !t)
                return;
            sessionStorage.setItem(n, t)
        } catch (i) {}
    }
    function ft(n) {
        try {
            return !window.sessionStorage || !n ? null : sessionStorage.getItem(n)
        } catch (t) {
            return null
        }
    }
    function et(n, t) {
        try {
            if (!window.localStorage || !n || !t)
                return;
            localStorage.setItem(n, t)
        } catch (i) {}
    }
    function ot(n) {
        try {
            return !window.localStorage || !n ? null : localStorage.getItem(n)
        } catch (t) {
            return null
        }
    }
    function st() {
        return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.isNumber = r;
    t.getWindowWidth = f;
    t.getWindowHeight = h;
    t.getDimensions = c;
    t.getVirtualKey = l;
    t.getKeyCode = a;
    t.setCookie = v;
    t.getCookie = y;
    t.detectContrast = p;
    t.pointInRect = w;
    t.apiDeprecated = b;
    t.createPerfMarker = k;
    t.getPerfMarkerValue = d;
    t.toElapsedTimeString = g;
    t.parseJson = nt;
    t.extend = u;
    t.poll = tt;
    t.getQSPValue = o;
    t.getQSPFromUrl = it;
    t.addQSP = rt;
    t.saveToSessionStorage = ut;
    t.getValueFromSessionStorage = ft;
    t.saveToLocalStorage = et;
    t.getValueFromLocalStorage = ot;
    t.getScrollTop = st;
    var ht;
    (function(n) {
        function t() {
            var t;
            if (window.matchMedia) {
                for (t = 0; t < n.allWidths.length; ++t)
                    if (!window.matchMedia("(min-width:" + n.allWidths[t] + "px)").matches)
                        return t
            } else
                for (t = 0; t < n.allWidths.length; ++t)
                    if (!(f() >= n.allWidths[t]))
                        return t;
            return n.allWidths.length
        }
        n.allWidths = [320, 540, 768, 1084, 1400, 1779];
        n.vpMin = n.allWidths[0];
        n.vpMax = 2048;
        n.getViewport = t
    }
    )(ht = t.Viewports || (t.Viewports = {}))
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault;
(function(n) {
    function t(n, t) {
        return n !== i && (typeof Object.create == "function" ? Object.defineProperty(n, "__esModule", {
            value: !0
        }) : n.__esModule = !0),
        function(i, r) {
            return n[i] = t ? t(i, r) : r
        }
    }
    var i = typeof global == "object" ? global : typeof self == "object" ? self : typeof this == "object" ? this : {};
    typeof define == "function" && define.amd ? define("tslib", ["exports"], function(r) {
        n(t(i, t(r)))
    }) : typeof module == "object" && typeof module.exports == "object" ? n(t(i, t(module.exports))) : n(t(i))
}
)(function(n) {
    var t = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(n, t) {
        n.__proto__ = t
    }
    || function(n, t) {
        for (var i in t)
            t.hasOwnProperty(i) && (n[i] = t[i])
    }
    ;
    __extends = function(n, i) {
        function r() {
            this.constructor = n
        }
        t(n, i);
        n.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
    ;
    __assign = Object.assign || function(n) {
        for (var t, r, i = 1, u = arguments.length; i < u; i++) {
            t = arguments[i];
            for (r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
        }
        return n
    }
    ;
    __rest = function(n, t) {
        var u = {}, r;
        for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && t.indexOf(i) < 0 && (u[i] = n[i]);
        if (n != null && typeof Object.getOwnPropertySymbols == "function")
            for (r = 0,
            i = Object.getOwnPropertySymbols(n); r < i.length; r++)
                t.indexOf(i[r]) < 0 && (u[i[r]] = n[i[r]]);
        return u
    }
    ;
    __decorate = function(n, t, i, r) {
        var f = arguments.length, u = f < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r, e, o;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
            u = Reflect.decorate(n, t, i, r);
        else
            for (o = n.length - 1; o >= 0; o--)
                (e = n[o]) && (u = (f < 3 ? e(u) : f > 3 ? e(t, i, u) : e(t, i)) || u);
        return f > 3 && u && Object.defineProperty(t, i, u),
        u
    }
    ;
    __param = function(n, t) {
        return function(i, r) {
            t(i, r, n)
        }
    }
    ;
    __metadata = function(n, t) {
        if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
            return Reflect.metadata(n, t)
    }
    ;
    __awaiter = function(n, t, i, r) {
        return new (i || (i = Promise))(function(u, f) {
            function o(n) {
                try {
                    e(r.next(n))
                } catch (t) {
                    f(t)
                }
            }
            function s(n) {
                try {
                    e(r["throw"](n))
                } catch (t) {
                    f(t)
                }
            }
            function e(n) {
                n.done ? u(n.value) : new i(function(t) {
                    t(n.value)
                }
                ).then(o, s)
            }
            e((r = r.apply(n, t || [])).next())
        }
        )
    }
    ;
    __generator = function(n, t) {
        function o(n) {
            return function(t) {
                return s([n, t])
            }
        }
        function s(e) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (r)
                try {
                    if (f = 1,
                    u && (i = u[e[0] & 2 ? "return" : e[0] ? "throw" : "next"]) && !(i = i.call(u, e[1])).done)
                        return i;
                    (u = 0,
                    i) && (e = [0, i.value]);
                    switch (e[0]) {
                    case 0:
                    case 1:
                        i = e;
                        break;
                    case 4:
                        return r.label++,
                        {
                            value: e[1],
                            done: !1
                        };
                    case 5:
                        r.label++;
                        u = e[1];
                        e = [0];
                        continue;
                    case 7:
                        e = r.ops.pop();
                        r.trys.pop();
                        continue;
                    default:
                        if (!(i = r.trys,
                        i = i.length > 0 && i[i.length - 1]) && (e[0] === 6 || e[0] === 2)) {
                            r = 0;
                            continue
                        }
                        if (e[0] === 3 && (!i || e[1] > i[0] && e[1] < i[3])) {
                            r.label = e[1];
                            break
                        }
                        if (e[0] === 6 && r.label < i[1]) {
                            r.label = i[1];
                            i = e;
                            break
                        }
                        if (i && r.label < i[2]) {
                            r.label = i[2];
                            r.ops.push(e);
                            break
                        }
                        i[2] && r.ops.pop();
                        r.trys.pop();
                        continue
                    }
                    e = t.call(n, r)
                } catch (o) {
                    e = [6, o];
                    u = 0
                } finally {
                    f = i = 0
                }
            if (e[0] & 5)
                throw e[1];
            return {
                value: e[0] ? e[1] : void 0,
                done: !0
            }
        }
        var r = {
            label: 0,
            sent: function() {
                if (i[0] & 1)
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        }, f, u, i, e;
        return e = {
            next: o(0),
            "throw": o(1),
            "return": o(2)
        },
        typeof Symbol == "function" && (e[Symbol.iterator] = function() {
            return this
        }
        ),
        e
    }
    ;
    __exportStar = function(n, t) {
        for (var i in n)
            t.hasOwnProperty(i) || (t[i] = n[i])
    }
    ;
    __values = function(n) {
        var t = typeof Symbol == "function" && n[Symbol.iterator]
          , i = 0;
        return t ? t.call(n) : {
            next: function() {
                return n && i >= n.length && (n = void 0),
                {
                    value: n && n[i++],
                    done: !n
                }
            }
        }
    }
    ;
    __read = function(n, t) {
        var i = typeof Symbol == "function" && n[Symbol.iterator], r, u, f, e;
        if (!i)
            return n;
        r = i.call(n);
        f = [];
        try {
            while ((t === void 0 || t-- > 0) && !(u = r.next()).done)
                f.push(u.value)
        } catch (o) {
            e = {
                error: o
            }
        } finally {
            try {
                u && !u.done && (i = r["return"]) && i.call(r)
            } finally {
                if (e)
                    throw e.error;
            }
        }
        return f
    }
    ;
    __spread = function() {
        for (var n = [], t = 0; t < arguments.length; t++)
            n = n.concat(__read(arguments[t]));
        return n
    }
    ;
    __await = function(n) {
        return this instanceof __await ? (this.v = n,
        this) : new __await(n)
    }
    ;
    __asyncGenerator = function(n, t, i) {
        function e(n) {
            o[n] && (u[n] = function(t) {
                return new Promise(function(i, u) {
                    r.push([n, t, i, u]) > 1 || f(n, t)
                }
                )
            }
            )
        }
        function f(n, t) {
            try {
                h(o[n](t))
            } catch (i) {
                s(r[0][3], i)
            }
        }
        function h(n) {
            n.value instanceof __await ? Promise.resolve(n.value.v).then(c, l) : s(r[0][2], n)
        }
        function c(n) {
            f("next", n)
        }
        function l(n) {
            f("throw", n)
        }
        function s(n, t) {
            (n(t),
            r.shift(),
            r.length) && f(r[0][0], r[0][1])
        }
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var o = i.apply(n, t || []), u, r = [];
        return u = {},
        e("next"),
        e("throw"),
        e("return"),
        u[Symbol.asyncIterator] = function() {
            return this
        }
        ,
        u
    }
    ;
    __asyncDelegator = function(n) {
        function i(i, u) {
            n[i] && (t[i] = function(t) {
                return (r = !r) ? {
                    value: __await(n[i](t)),
                    done: i === "return"
                } : u ? u(t) : t
            }
            )
        }
        var t, r;
        return t = {},
        i("next"),
        i("throw", function(n) {
            throw n;
        }),
        i("return"),
        t[Symbol.iterator] = function() {
            return this
        }
        ,
        t
    }
    ;
    __asyncValues = function(n) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var t = n[Symbol.asyncIterator];
        return t ? t.call(n) : typeof __values == "function" ? __values(n) : n[Symbol.iterator]()
    }
    ;
    __makeTemplateObject = function(n, t) {
        return Object.defineProperty ? Object.defineProperty(n, "raw", {
            value: t
        }) : n.raw = t,
        n
    }
    ;
    __importStar = function(n) {
        var t, i;
        if (n && n.__esModule)
            return n;
        if (t = {},
        n != null)
            for (i in n)
                Object.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        return t["default"] = n,
        t
    }
    ;
    __importDefault = function(n) {
        return n && n.__esModule ? n : {
            "default": n
        }
    }
    ;
    n("__extends", __extends);
    n("__assign", __assign);
    n("__rest", __rest);
    n("__decorate", __decorate);
    n("__param", __param);
    n("__metadata", __metadata);
    n("__awaiter", __awaiter);
    n("__generator", __generator);
    n("__exportStar", __exportStar);
    n("__values", __values);
    n("__read", __read);
    n("__spread", __spread);
    n("__await", __await);
    n("__asyncGenerator", __asyncGenerator);
    n("__asyncDelegator", __asyncDelegator);
    n("__asyncValues", __asyncValues);
    n("__makeTemplateObject", __makeTemplateObject);
    n("__importStar", __importStar);
    n("__importDefault", __importDefault)
});
define("button", ["require", "exports", "tslib", "observableComponent", "htmlExtensions", "utility"], function(n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var e = function(n) {
        function t(t) {
            var i = n.call(this, t) || this;
            return i.handleKeydown = function(n) {
                var t = f.getKeyCode(n);
                switch (t) {
                case 32:
                    u.preventDefault(n);
                    i.emitClickEvent()
                }
            }
            ,
            i.update(),
            i
        }
        return i.__extends(t, n),
        t.prototype.update = function() {
            this.element && this.element.nodeName === "A" && (this.element.getAttribute("role") || "").toLowerCase() === "button" && u.addEvent(this.element, u.eventTypes.keydown, this.handleKeydown)
        }
        ,
        t.prototype.teardown = function() {
            u.removeEvent(this.element, u.eventTypes.keydown, this.handleKeydown)
        }
        ,
        t.prototype.emitClickEvent = function() {
            u.customEvent(this.element, u.eventTypes.click)
        }
        ,
        t.selector = ".c-button",
        t.typeName = "Button",
        t
    }(r.ObservableComponent);
    t.Button = e
});
require(["button", "componentFactory"], function(n, t) {
    t.ComponentFactory && t.ComponentFactory.create && t.ComponentFactory.create([{
        c: n.Button
    }])
});
define("actionMenu", ["require", "exports", "tslib", "publisher", "utility", "htmlExtensions"], function(n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var e = function(n) {
        function t(t) {
            var i = n.call(this, t) || this;
            return i.onTriggerClick = function(n) {
                if (n = f.getEvent(n),
                f.preventDefault(n),
                !i.disabled) {
                    i.onTriggerToggled();
                    var t = i.items[0];
                    t.setAttribute("tabindex", "0");
                    t.focus()
                }
            }
            ,
            i.onTouchMove = function(n) {
                n = f.getEvent(n);
                f.preventDefault(n);
                i.isExpanded() ? i.collapse() : i.expand()
            }
            ,
            i.onItemClick = function(n) {
                n = f.getEvent(n);
                var t = n.currentTarget;
                if (!t.hasAttribute("aria-disabled")) {
                    i.onItemSelected(t);
                    i.collapse()
                }
            }
            ,
            i.onNonActionMenuClick = function(n) {
                if (n = f.getEvent(n),
                !!i.element && !!i.menu) {
                    var t = f.getEventTargetOrSrcElement(n);
                    i.element.contains(t) || t !== i.menu && t.parentElement !== i.menu && i.collapse()
                }
            }
            ,
            i.onTriggerKeyPress = function(n) {
                var r, t;
                n = f.getEvent(n);
                r = u.getKeyCode(n);
                switch (r) {
                case 13:
                case 32:
                    f.preventDefault(n);
                    i.disabled || (t = i.items[0],
                    i.onTriggerToggled(),
                    t.setAttribute("tabindex", "0"),
                    t.focus())
                }
            }
            ,
            i.handleMenuKeydownEvent = function(n) {
                n = f.getEvent(n);
                var t = u.getKeyCode(n);
                (t !== 9 || i.isExpanded()) && f.preventDefault(n);
                i.handleMenuKeydown(f.getEventTargetOrSrcElement(n), t)
            }
            ,
            i.update(),
            i
        }
        return i.__extends(t, n),
        t.prototype.update = function() {
            if (this.trigger = f.selectFirstElement(t.triggerSelector, this.element),
            this.menu = f.selectFirstElement(t.menuSelector, this.element),
            this.items = f.selectElementsT('li[class^="f-context-"]', this.element),
            this.disabled = this.trigger.hasAttribute("disabled"),
            !!this.trigger && !!this.menu && !!this.items && !!this.items.length) {
                var n = this.isExpanded();
                this.addEventListeners();
                n && this.expand()
            }
        }
        ,
        t.prototype.teardown = function() {
            !this.trigger || !this.menu || !this.items || !this.items.length || this.removeEventListeners();
            this.trigger = null;
            this.menu = null;
            this.items = null;
            this.selectedItem = null
        }
        ,
        t.prototype.isExpanded = function() {
            return this.trigger.getAttribute(t.ariaExpanded) === "true"
        }
        ,
        t.prototype.expand = function() {
            f.removeClass(this.trigger, "x-hidden-focus");
            f.addClass(this.trigger, "f-active");
            this.trigger.setAttribute(t.ariaExpanded, "true")
        }
        ,
        t.prototype.collapse = function() {
            f.removeClass(this.trigger, "f-active");
            this.trigger.setAttribute(t.ariaExpanded, "false")
        }
        ,
        t.prototype.addEventListeners = function() {
            var n, t, i;
            for (f.addEvent(this.trigger, f.eventTypes.click, this.onTriggerClick),
            f.addEvent(this.trigger, f.eventTypes.keydown, this.onTriggerKeyPress),
            f.addEvent(this.menu, f.eventTypes.keydown, this.handleMenuKeydownEvent, !0),
            f.addEvent(this.trigger, f.eventTypes.touchmove, this.onTouchMove),
            n = 0,
            t = this.items; n < t.length; n++)
                i = t[n],
                f.addEvent(i, f.eventTypes.click, this.onItemClick);
            f.addEvent(document, f.eventTypes.click, this.onNonActionMenuClick)
        }
        ,
        t.prototype.removeEventListeners = function() {
            var n, t, i;
            for (f.removeEvent(this.trigger, f.eventTypes.click, this.onTriggerClick),
            f.removeEvent(this.trigger, f.eventTypes.keydown, this.onTriggerKeyPress),
            f.removeEvent(this.menu, f.eventTypes.keydown, this.handleMenuKeydownEvent, !0),
            f.removeEvent(this.trigger, f.eventTypes.touchmove, this.onTouchMove),
            n = 0,
            t = this.items; n < t.length; n++)
                i = t[n],
                f.removeEvent(i, f.eventTypes.click, this.onItemClick);
            f.removeEvent(document, f.eventTypes.click, this.onNonActionMenuClick)
        }
        ,
        t.prototype.onTriggerToggled = function() {
            this.isExpanded() ? this.collapse() : this.expand()
        }
        ,
        t.prototype.onItemSelected = function(n) {
            var r, i;
            this.selectedItem = n;
            r = this.selectedItem.getAttribute("role") === "menuitemcheckbox";
            r ? (i = this.selectedItem.getAttribute(t.ariaChecked) === "true",
            i ? this.selectedItem.setAttribute(t.ariaChecked, "false") : this.selectedItem.setAttribute(t.ariaChecked, "true"),
            this.initiatePublish({
                id: this.selectedItem.id,
                checked: !i
            })) : this.initiatePublish({
                id: this.selectedItem.id
            })
        }
        ,
        t.prototype.publish = function(n, t) {
            if (this.selectedItem)
                n.onSelection(t)
        }
        ,
        t.prototype.handleMenuKeydown = function(n, t) {
            switch (t) {
            case 13:
                n.hasAttribute("aria-disabled") || (this.handleMenuEnterKey(n),
                this.trigger.focus(),
                this.collapse());
                break;
            case 32:
                n.hasAttribute("aria-disabled") || (this.handleMenuEnterKey(n),
                n.getAttribute("role") !== "menuitemcheckbox" && (this.collapse(),
                this.trigger.focus()));
                break;
            case 27:
            case 196:
                this.trigger.focus();
                this.collapse();
                break;
            case 38:
            case 203:
            case 211:
                this.handleMenuArrowKey(!0, n);
                break;
            case 40:
            case 204:
            case 212:
                this.handleMenuArrowKey(!1, n);
                break;
            case 9:
                this.isExpanded() && (this.trigger.focus(),
                this.collapse())
            }
        }
        ,
        t.prototype.handleMenuArrowKey = function(n, t) {
            var r = this.items.indexOf(t), i;
            r !== -1 && (i = n ? r - 1 : r + 1,
            i < 0 ? i = this.items.length - 1 : i >= this.items.length && (i = 0),
            this.items[r].removeAttribute("tabindex"),
            this.items[i].setAttribute("tabindex", "0"),
            this.items[i].focus())
        }
        ,
        t.prototype.handleMenuEnterKey = function(n) {
            this.onItemSelected(n)
        }
        ,
        t.selector = ".c-action-menu",
        t.typeName = "ActionMenu",
        t.ariaExpanded = "aria-expanded",
        t.ariaChecked = "aria-checked",
        t.triggerSelector = t.selector + " > button.c-action-trigger",
        t.menuSelector = t.triggerSelector + ' + ul[role="menu"]',
        t
    }(r.Publisher);
    t.ActionMenu = e
});
require(["actionMenu", "componentFactory"], function(n, t) {
    t.ComponentFactory && t.ComponentFactory.create && t.ComponentFactory.create([{
        component: n.ActionMenu
    }])
});
define("publisher", ["require", "exports", "tslib", "observableComponent"], function(n, t, i, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = function(n) {
        function t(t, i) {
            i === void 0 && (i = null);
            var r = n.call(this, t, i) || this;
            return r.element = t,
            r
        }
        return i.__extends(t, n),
        t.prototype.subscribe = function(n) {
            if (!n)
                return !1;
            if (this.subscribers) {
                if (this.subscribers.indexOf(n) !== -1)
                    return !1
            } else
                this.subscribers = [];
            return this.subscribers.push(n),
            !0
        }
        ,
        t.prototype.unsubscribe = function(n) {
            if (!n || !this.subscribers || !this.subscribers.length)
                return !1;
            var t = this.subscribers.indexOf(n);
            return t === -1 ? !1 : (this.subscribers.splice(t, 1),
            !0)
        }
        ,
        t.prototype.hasSubscribers = function() {
            return !!this.subscribers && this.subscribers.length > 0
        }
        ,
        t.prototype.initiatePublish = function(n) {
            var t, i, r;
            if (this.hasSubscribers())
                for (t = 0,
                i = this.subscribers; t < i.length; t++)
                    r = i[t],
                    this.publish(r, n)
        }
        ,
        t.prototype.update = function() {}
        ,
        t.prototype.teardown = function() {}
        ,
        t
    }(r.ObservableComponent);
    t.Publisher = u
});
define("pageBehaviors", ["require", "exports", "htmlExtensions"], function(n, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function n() {
            i.removeClass(document.documentElement, "no-js");
            i.addClass(document.documentElement, "js");
            i.hasClass(document.body, "c_native") && window.navigator && typeof window.navigator.gamepadInputEmulation == "string" && (window.navigator.gamepadInputEmulation = "keyboard")
        }
        return n.typeName = "PageBehaviors",
        n
    }();
    t.PageBehaviors = r
});
define("viewportCollision", ["require", "exports", "htmlExtensions"], function(n, t, i) {
    "use strict";
    function r(n, t) {
        var r = i.getClientRect(n), u, f, e, o;
        return (r.left = Math.round(r.left),
        r.top = Math.round(r.top),
        r.right = Math.round(r.right),
        r.bottom = Math.round(r.bottom),
        r.width !== 0 && (u = !1,
        f = {
            top: !1,
            bottom: !1,
            left: !1,
            right: !1
        },
        t || (e = Math.min(window.innerWidth, document.documentElement.clientWidth),
        o = Math.min(window.innerHeight, document.documentElement.clientHeight),
        t = {
            left: 0,
            top: 0,
            right: e,
            bottom: o,
            width: e,
            height: o
        }),
        r.left < t.left && (u = !0,
        f.left = !0),
        r.top < t.top && (u = !0,
        f.top = !0),
        r.right > t.right && (u = !0,
        f.right = !0),
        r.bottom > t.bottom && (u = !0,
        f.bottom = !0),
        u)) ? f : !1
    }
    function u(n, t) {
        var r = i.getClientRect(n), u, f;
        if (r.width === 0)
            return null;
        t || (u = Math.min(window.innerWidth, document.documentElement.clientWidth),
        f = Math.min(window.innerHeight, document.documentElement.clientHeight),
        t = {
            top: 0,
            right: u,
            bottom: f,
            left: 0,
            height: f,
            width: u
        });
        var e = Math.round(r.top - t.top)
          , o = Math.round(t.right - r.right)
          , s = Math.round(t.bottom - r.bottom)
          , h = Math.round(r.left - t.left);
        return e >= 0 && o >= 0 && s >= 0 && h >= 0 ? null : {
            top: e,
            right: o,
            bottom: s,
            left: h,
            clientRect: r,
            viewport: t
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.collidesWith = r;
    t.getCollisionExtents = u
});
define("selectMenu", ["require", "exports", "tslib", "publisher", "htmlExtensions", "stringExtensions", "viewportCollision", "utility"], function(n, t, i, r, u, f, e, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function(n) {
        function t(t) {
            var i = n.call(this, t) || this;
            return i.onTriggerClick = function(n) {
                n = u.getEvent(n);
                u.preventDefault(n);
                i.onTriggerToggled(n)
            }
            ,
            i.onItemClick = function(n) {
                n = u.getEvent(n);
                i.onItemSelected(u.getEventTargetOrSrcElement(n), !1, !0);
                i.trigger.focus()
            }
            ,
            i.onNonSelectMenuClick = function(n) {
                if (n = u.getEvent(n),
                !!i.element && !!i.menu) {
                    var t = u.getEventTargetOrSrcElement(n);
                    i.element.contains(t) || t !== i.menu && t.parentElement !== i.menu && i.collapse()
                }
            }
            ,
            i.onNonSelectMenuTab = function(n) {
                n = u.getEvent(n);
                var t = o.getKeyCode(n);
                t === 9 && i.collapse()
            }
            ,
            i.onTriggerKeyPress = function(n) {
                n = u.getEvent(n);
                var t = o.getKeyCode(n);
                switch (t) {
                case 13:
                case 32:
                    u.preventDefault(n);
                    i.onTriggerToggled()
                }
            }
            ,
            i.handleMenuKeydownEvent = function(n) {
                n = u.getEvent(n);
                var t = o.getKeyCode(n);
                t !== 9 && i.isExpanded() && u.preventDefault(n);
                i.handleMenuKeydown(u.getEventTargetOrSrcElement(n), t, n)
            }
            ,
            i.isOptionDisabled = function(n) {
                var t = u.getParent(n, ".c-menu-item");
                return t && t.getAttribute("aria-disabled") === "true"
            }
            ,
            i.update(),
            i
        }
        return i.__extends(t, n),
        t.prototype.update = function() {
            var s, f, a, v, e, i, r, o, n, y;
            if (this.element) {
                if (this.persist = u.hasClass(this.element, "f-persist"),
                this.trigger = u.selectFirstElementT('[role="button"]', this.element),
                this.trigger || (this.trigger = u.selectFirstElementT("button", this.element)),
                this.trigger) {
                    !this.trigger.id && this.element.id && (this.trigger.id = this.element.id + "-trigger");
                    s = this.trigger.getAttribute(t.placeHolder) || u.getText(this.trigger);
                    this.element.setAttribute(t.placeHolder, s);
                    var h = this.trigger.getAttribute(t.ariaLabel)
                      , c = this.trigger.getAttribute(t.ariaLabelledBy)
                      , l = this.element.getAttribute(t.dataAriaLabelFormat);
                    h && this.element.setAttribute(t.defaultAriaLabel, h);
                    c && this.element.setAttribute(t.defaultAriaLabelledBy, c);
                    l && this.trigger.setAttribute(t.dataAriaLabelFormat, l)
                }
                if (this.menu = u.selectFirstElement(".c-menu", this.element),
                f = u.selectElementsT(".c-menu-item a", this.element),
                this.items = f.length > 0 ? f : u.selectElementsT(".c-menu-item span", this.element),
                this.isLtr = u.getDirection(this.menu) === u.Direction.left,
                this.persist && (a = !!u.selectFirstElement("img", this.menu),
                a && (this.ignoreNextDOMChange = !0,
                v = document.createElement("img"),
                e = document.createElement("span"),
                u.setText(e, u.getText(this.trigger)),
                u.setText(this.trigger, ""),
                this.trigger.appendChild(v),
                this.trigger.appendChild(e))),
                !!this.trigger && !!this.menu && !!this.items && !!this.items.length) {
                    for (i = null,
                    u.hasClass(this.menu, t.fScroll) && u.addClass(this.element, t.fScroll),
                    this.items.length <= t.fScrollItems ? u.removeClass(this.menu, t.fScroll) : u.hasClass(this.element, t.fScroll) && u.addClass(this.menu, t.fScroll),
                    r = 0,
                    o = this.items; r < o.length; r++)
                        n = o[r],
                        this.itemIsSelected(n) && i === null ? (i = n,
                        n.setAttribute(this.getSelectedAttribute(n), "true")) : n.setAttribute(this.getSelectedAttribute(n), "false"),
                        n.setAttribute("tabindex", "-1"),
                        this.cleanSelectedAttributes(n),
                        n.hasAttribute("role") || n.setAttribute("role", "menuitem");
                    y = this.isExpanded();
                    this.onItemSelected(i, !0, !1);
                    this.selectedItem || this.updateAriaLabel();
                    this.addEventListeners();
                    y && this.expand()
                }
            }
        }
        ,
        t.prototype.teardown = function() {
            var n, t, i;
            for (u.removeEvent(this.trigger, u.eventTypes.click, this.onTriggerClick),
            u.removeEvent(this.trigger, u.eventTypes.keydown, this.onTriggerKeyPress),
            u.removeEvent(this.menu, u.eventTypes.keydown, this.handleMenuKeydownEvent, !0),
            n = 0,
            t = this.items; n < t.length; n++)
                i = t[n],
                u.removeEvent(i, u.eventTypes.click, this.onItemClick);
            u.removeEvent(document, u.eventTypes.click, this.onNonSelectMenuClick);
            u.removeEvent(this.items[this.items.length - 1], u.eventTypes.keydown, this.onNonSelectMenuTab);
            this.persist = !1;
            this.trigger = null;
            this.menu = null;
            this.items = null;
            this.selectedItem = null
        }
        ,
        t.prototype.setSelectedItem = function(n) {
            if (!n || !this.element)
                return !1;
            var t = u.selectFirstElement('[id="' + n + '"] > a', this.element) || u.selectFirstElement('[id="' + n + '"] > span', this.element);
            return t ? this.onItemSelected(t, !1, !1) : !1
        }
        ,
        t.prototype.updateAriaLabel = function() {
            if (this.selectedItem) {
                var e = this.trigger.getAttribute(t.selectedAriaLabel) || this.trigger.getAttribute(t.dataAriaLabelFormat) || this.trigger.getAttribute(t.ariaLabel)
                  , o = this.trigger.getAttribute(t.selectedAriaLabelledBy) || this.trigger.getAttribute(t.ariaLabelledBy)
                  , s = this.selectedItem ? this.selectedItem.getAttribute(t.ariaLabel) || u.getText(this.selectedItem) : u.getText(this.trigger)
                  , h = e ? f.format(e, s) : s;
                this.trigger.setAttribute(t.ariaLabel, h);
                o && this.trigger.setAttribute(t.ariaLabelledBy, f.format(o, this.trigger.id))
            } else {
                this.trigger.removeAttribute(t.ariaLabel);
                this.trigger.removeAttribute(t.ariaLabelledBy);
                var n = this.element.getAttribute(t.placeHolder)
                  , i = this.element.getAttribute(t.dataAriaLabelFormat) || this.element.getAttribute(t.defaultAriaLabel)
                  , r = this.element.getAttribute(t.defaultAriaLabelledBy);
                n && u.setText(this.trigger, n);
                i && this.trigger.setAttribute(t.ariaLabel, f.format(i, u.getText(this.trigger)));
                r && this.trigger.setAttribute(t.ariaLabelledBy, f.format(r, this.trigger.id))
            }
        }
        ,
        t.prototype.isExpanded = function() {
            return !!this.trigger && !!this.menu && this.trigger.getAttribute(t.ariaExpanded) === "true" && this.menu.getAttribute(t.ariaHidden) === "false"
        }
        ,
        t.prototype.itemIsSelected = function(n) {
            return n.getAttribute(t.ariaSelected) === "true" || n.getAttribute(t.ariaChecked) === "true"
        }
        ,
        t.prototype.getSelectedAttribute = function(n) {
            return n.getAttribute("role") === "menuitemradio" ? t.ariaChecked : t.ariaSelected
        }
        ,
        t.prototype.cleanSelectedAttributes = function(n) {
            var i = this.getSelectedAttribute(n) === t.ariaSelected ? t.ariaChecked : t.ariaSelected;
            n.removeAttribute(i)
        }
        ,
        t.prototype.positionMenu = function() {
            var i = u.css(this.element, "float"), r = i === "right", o = !r && i === "left", f = o ? !0 : r || !this.isLtr ? !1 : !0, n, t;
            u.css(this.menu, "top", "auto");
            u.css(this.menu, "bottom", "auto");
            u.css(this.menu, f ? "left" : "right", "0");
            u.css(this.menu, "height", "auto");
            n = e.getCollisionExtents(this.menu);
            !n || ((n.right < 0 || n.left < 0) && (n.clientRect.width <= n.viewport.width ? f ? u.css(this.menu, "left", n.right + "px") : u.css(this.menu, "right", n.left + "px") : (u.css(this.menu, "left", -n.left + "px"),
            u.css(this.menu, "width", n.viewport.width + "px"))),
            n.bottom < 0 && (t = parseFloat(u.css(this.trigger, "height")),
            n.clientRect.height + t <= n.top ? u.css(this.menu, "bottom", t + "px") : n.clientRect.height <= n.viewport.height ? u.css(this.menu, "top", n.bottom + t + "px") : (u.css(this.menu, "top", -n.top + t + "px"),
            u.css(this.menu, "height", n.viewport.height + "px"))))
        }
        ,
        t.prototype.expand = function() {
            if (!!this.trigger && !!this.menu && (this.trigger.setAttribute(t.ariaExpanded, "true"),
            this.menu.setAttribute(t.ariaHidden, "false"),
            this.positionMenu(),
            !!this.items)) {
                var n = this.items.indexOf(this.selectedItem)
                  , i = n === -1 ? 0 : n
                  , r = this.items[i];
                r.focus()
            }
        }
        ,
        t.prototype.collapse = function() {
            !this.trigger || !this.menu || (this.trigger.setAttribute(t.ariaExpanded, "false"),
            this.menu.setAttribute(t.ariaHidden, "true"))
        }
        ,
        t.prototype.addEventListeners = function() {
            var n, t, i;
            if (!!this.trigger && !!this.items) {
                for (u.addEvent(this.trigger, u.eventTypes.click, this.onTriggerClick),
                u.addEvent(this.trigger, u.eventTypes.keydown, this.onTriggerKeyPress),
                u.addEvent(this.menu, u.eventTypes.keydown, this.handleMenuKeydownEvent, !0),
                n = 0,
                t = this.items; n < t.length; n++)
                    i = t[n],
                    u.addEvent(i, u.eventTypes.click, this.onItemClick);
                u.addEvent(this.items[this.items.length - 1], u.eventTypes.keydown, this.onNonSelectMenuTab);
                u.addEvent(document, u.eventTypes.click, this.onNonSelectMenuClick)
            }
        }
        ,
        t.prototype.onTriggerToggled = function(n) {
            this.element.getAttribute("aria-disabled") !== "true" && (this.isExpanded() ? this.collapse() : this.expand(n))
        }
        ,
        t.prototype.onItemSelected = function(n, t, i) {
            var e, f, o, s, h, r;
            if (!n || n === this.selectedItem)
                return this.collapse(),
                !1;
            if ((n.nodeName === "P" || n.nodeName === "IMG") && (n = n.parentElement),
            !this.isOptionDisabled(n)) {
                if (n.className === "c-menu")
                    return this.collapse(),
                    !1;
                for (this.persist && this.trigger && (e = u.selectFirstElementT("img", this.trigger),
                this.ignoreNextDOMChange = !0,
                e ? (f = u.selectFirstElementT("img", n),
                o = f ? f.getAttribute("src") : "",
                e.setAttribute("src", o),
                s = u.selectFirstElementT("span", this.trigger),
                u.setText(s, u.getText(n)),
                u.hasClass(this.trigger, "f-icon") && !f ? u.removeClass(this.trigger, "f-icon") : !u.hasClass(this.trigger, "f-icon") && f && u.addClass(this.trigger, "f-icon")) : u.setText(this.trigger, u.getText(n))),
                this.selectedItem && this.selectedItem.setAttribute(this.getSelectedAttribute(this.selectedItem), "false"),
                this.selectedItem = n,
                this.selectedItem.setAttribute(this.getSelectedAttribute(this.selectedItem), "true"),
                this.updateAriaLabel(),
                this.collapse(),
                h = null,
                r = this.selectedItem; r && r.parentElement !== this.menu; )
                    r = r.parentElement;
                return r && this.initiatePublish({
                    id: r.id,
                    href: this.selectedItem.getAttribute("href"),
                    internal: t,
                    userInitiated: i
                }),
                !0
            }
        }
        ,
        t.prototype.publish = function(n, t) {
            if (this.selectedItem)
                n.onSelectionChanged(t)
        }
        ,
        t.prototype.handleMenuKeydown = function(n, t, i) {
            i === void 0 && (i = null);
            switch (t) {
            case 32:
            case 13:
                this.handleMenuEnterKey(n);
                this.trigger.focus();
                break;
            case 27:
                this.trigger.focus();
                this.collapse();
                i && i.stopPropagation();
                break;
            case 38:
            case 203:
            case 211:
                this.handleMenuArrowKey(!0, n);
                break;
            case 40:
            case 204:
            case 212:
                this.handleMenuArrowKey(!1, n);
                break;
            case 9:
                this.isExpanded() && this.handleMenuEnterKey(n)
            }
        }
        ,
        t.prototype.handleMenuArrowKey = function(n, t) {
            var r = this.items.indexOf(t), u, i;
            if (r !== -1) {
                u = n ? -1 : 1;
                i = r;
                do
                    i += u,
                    (i < 0 || i >= this.items.length) && (i = r);
                while (i !== r && this.isOptionDisabled(this.items[i]));
                this.items[i].focus()
            }
        }
        ,
        t.prototype.handleMenuEnterKey = function(n) {
            this.onItemSelected(n, !1, !0)
        }
        ,
        t.selector = ".c-select-menu",
        t.typeName = "SelectMenu",
        t.dataAriaLabelFormat = "data-aria-label-format",
        t.selectedAriaLabel = "data-selected-aria-label",
        t.selectedAriaLabelledBy = "data-selected-aria-labelledby",
        t.ariaExpanded = "aria-expanded",
        t.ariaHidden = "aria-hidden",
        t.ariaSelected = "aria-selected",
        t.ariaLabel = "aria-label",
        t.ariaLabelledBy = "aria-labelledby",
        t.ariaChecked = "aria-checked",
        t.placeHolder = "data-placeholder",
        t.defaultAriaLabel = "data-default-aria-label",
        t.defaultAriaLabelledBy = "data-default-aria-labelledby",
        t.fScroll = "f-scroll",
        t.fScrollItems = 5,
        t
    }(r.Publisher);
    t.SelectMenu = s
});
require(["selectMenu", "componentFactory"], function(n, t) {
    t.ComponentFactory && t.ComponentFactory.create && t.ComponentFactory.create([{
        component: n.SelectMenu
    }])
});
define("slider", ["require", "exports", "tslib", "publisher", "htmlExtensions", "utility"], function(n, t, i, r, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var e = function(n) {
        function t(t) {
            var i = n.call(this, t) || this;
            return i.onKeyPressed = function(n) {
                var t, r, f, e;
                switch (n) {
                case 37:
                case 39:
                    i.isVerticalSlider || (t = i.primaryDirection === u.Direction.left ? i.stepOffset : -i.stepOffset,
                    t = n === 37 ? -t : t,
                    i.updateThumbOffset(i.thumbOffset + t, !0, !0),
                    u.preventDefault(u.getEvent(event)));
                    break;
                case 38:
                case 40:
                    i.isVerticalSlider && (t = n === 38 ? i.stepOffset : -i.stepOffset,
                    i.updateThumbOffset(i.thumbOffset + t, !0, !0),
                    u.preventDefault(u.getEvent(event)));
                    break;
                case 33:
                    u.preventDefault(u.getEvent(event));
                    t = 2 * i.stepOffset;
                    i.updateThumbOffset(i.thumbOffset + t, !0, !0);
                    break;
                case 34:
                    u.preventDefault(u.getEvent(event));
                    t = -(2 * i.stepOffset);
                    i.updateThumbOffset(i.thumbOffset + t, !0, !0);
                    break;
                case 36:
                    u.preventDefault(u.getEvent(event));
                    r = parseInt(i.input.getAttribute("min"), 10) || 0;
                    i.updateThumbOffset(r, !0, !0);
                    break;
                case 35:
                    u.preventDefault(u.getEvent(event));
                    f = parseInt(i.input.getAttribute("step"), 10);
                    e = i.thumbRange + f;
                    i.updateThumbOffset(e, !0, !0)
                }
            }
            ,
            i.onKeyDown = function(n) {
                i.onKeyPressed(f.getKeyCode(u.getEvent(n)))
            }
            ,
            i.onMouseDown = function(n) {
                if (n = u.getEvent(n),
                i.setupDimensions(),
                u.getEventTargetOrSrcElement(n) === i.thumb) {
                    u.addEvent(document, u.eventTypes.mousemove, i.onMouseMove);
                    u.addEvent(document, u.eventTypes.mouseup, i.onMouseUp);
                    u.addEvent(document, u.eventTypes.touchmove, i.onMouseMove);
                    u.addEvent(document, u.eventTypes.touchcancel, i.onMouseUp);
                    return
                }
                i.moveThumbTo(n.clientX, n.clientY)
            }
            ,
            i.onMouseMove = function(n) {
                if (n.type === "mousemove" && (n = u.getEvent(n)),
                n.type === "touchmove") {
                    var t = u.getEvent(n);
                    n = t.targetTouches[0]
                }
                i.moveThumbTo(n.clientX, n.clientY)
            }
            ,
            i.onMouseUp = function() {
                u.removeEvent(document, u.eventTypes.mousemove, i.onMouseMove);
                u.removeEvent(document, u.eventTypes.mouseup, i.onMouseUp);
                u.removeEvent(document, u.eventTypes.touchmove, i.onMouseMove);
                u.removeEvent(document, u.eventTypes.touchcancel, i.onMouseUp)
            }
            ,
            i.onWindowResized = function() {
                i.setupDimensions()
            }
            ,
            i.update(),
            i
        }
        return i.__extends(t, n),
        t.prototype.update = function() {
            if (this.element) {
                this.input = u.selectFirstElement("input", this.element);
                this.primaryDirection = u.getDirection(this.element);
                this.isVerticalSlider = u.hasClass(this.input, "f-vertical");
                u.preventDefaultSwipeAction(this.element, !this.isVerticalSlider);
                u.addClass(this.input, "x-screen-reader");
                var t = parseInt(this.input.getAttribute("min"), 10) || 0
                  , i = parseInt(this.input.getAttribute("max"), 10) || 100
                  , n = parseInt(this.input.getAttribute("value"), 10)
                  , r = parseInt(this.input.getAttribute("step"), 10);
                this.element.children[this.element.children.length - 1] === this.input ? (this.mockSlider = document.createElement("div"),
                this.thumb = document.createElement("button"),
                this.thumb.setAttribute("role", "slider"),
                this.thumb.setAttribute("aria-valuemin", t.toString()),
                this.thumb.setAttribute("aria-valuemax", i.toString()),
                this.thumb.setAttribute("aria-valuenow", n.toString()),
                this.thumb.setAttribute("aria-valuetext", n.toString()),
                this.input.hasAttribute("aria-label") && this.thumb.setAttribute("aria-label", this.input.getAttribute("aria-label")),
                this.valueTooltip = document.createElement("span"),
                this.track = document.createElement("span"),
                this.thumb.appendChild(this.valueTooltip),
                this.mockSlider.appendChild(this.thumb),
                this.mockSlider.appendChild(this.track),
                this.element.appendChild(this.mockSlider),
                this.ignoreNextDOMChange = !0) : (this.mockSlider = this.element.children[this.element.children.length - 1],
                this.thumb = this.mockSlider.firstElementChild,
                this.valueTooltip = this.thumb.firstElementChild,
                this.track = this.mockSlider.children[this.mockSlider.children.length - 1]);
                this.halfThumbOffset = this.thumb.clientWidth / 2;
                this.resetSliderInternal(t, i, n, r, !0) && (u.addEvent(this.element, u.eventTypes.mousedown, this.onMouseDown),
                u.addEvent(this.element, u.eventTypes.touchstart, this.onMouseDown),
                u.addEvent(this.thumb, u.eventTypes.keydown, this.onKeyDown),
                this.resizeListener = u.addDebouncedEvent(window, u.eventTypes.resize, this.onWindowResized))
            }
        }
        ,
        t.prototype.teardown = function() {
            u.removeEvent(this.element, u.eventTypes.mousedown, this.onMouseDown);
            u.removeEvent(this.element, u.eventTypes.touchstart, this.onMouseDown);
            u.removeEvent(this.thumb, u.eventTypes.keydown, this.onKeyDown);
            u.removeEvent(window, u.eventTypes.resize, this.resizeListener);
            this.input = null;
            this.mockSlider = null;
            this.thumb = null;
            this.valueTooltip = null;
            this.track = null;
            this.resizeListener = null
        }
        ,
        t.prototype.resetSlider = function(n, t, i, r) {
            return this.resetSliderInternal(n, t, i, r, !1)
        }
        ,
        t.prototype.resetSliderInternal = function(n, t, i, r, u) {
            return !f.isNumber(n) || !f.isNumber(t) ? !1 : Math.max(n, t) - Math.min(n, t) <= 0 ? !1 : (this.min = Math.min(n, t),
            this.max = Math.max(n, t),
            this.range = this.max - this.min,
            this.step = isNaN(r) ? this.range / 10 : r,
            this.value = Math.min(Math.max(isNaN(i) ? isNaN(this.value) ? this.min : this.value : i, this.min), this.max),
            this.setupDimensions(),
            this.updateThumbOffset(this.thumbOffset, u, !1, this.value),
            !0)
        }
        ,
        t.prototype.setValue = function(n) {
            return !f.isNumber(n) || n < this.min || n > this.max ? !1 : (n !== this.value && (this.thumbOffset = (n - this.min) * this.thumbRange / this.range + this.halfThumbOffset,
            this.updateThumbOffset(this.thumbOffset, !1, !1, n)),
            !0)
        }
        ,
        t.prototype.setupDimensions = function() {
            this.dimensions = u.getClientRect(this.mockSlider);
            this.isVerticalSlider ? (this.dimensions.left -= t.hitPadding,
            this.dimensions.right += t.hitPadding,
            this.thumbRange = this.dimensions.height - this.thumb.clientWidth,
            this.maxThumbOffset = this.dimensions.height) : (this.dimensions.top -= t.hitPadding,
            this.dimensions.bottom += t.hitPadding,
            this.thumbRange = this.dimensions.width - this.thumb.clientWidth,
            this.maxThumbOffset = this.dimensions.width);
            this.thumbRange = Math.max(this.thumbRange, 1);
            this.thumbOffset = (this.value - this.min) * this.thumbRange / this.range + this.halfThumbOffset;
            this.stepOffset = this.thumbRange / (this.range / this.step);
            this.setThumbPosition()
        }
        ,
        t.prototype.setThumbPosition = function() {
            var n = Math.max(0, this.thumbOffset - this.halfThumbOffset);
            u.css(this.thumb, u.Direction[this.primaryDirection], n + "px");
            u.css(this.track, "width", n + "px")
        }
        ,
        t.prototype.updateThumbOffset = function(n, t, i, r) {
            var o, s, e;
            r === void 0 && (r = NaN);
            f.isNumber(n) || (n = this.thumbOffset);
            this.thumbOffset = Math.min(Math.max(0, n), this.maxThumbOffset);
            o = r;
            isNaN(o) && (o = Math.max(0, this.thumbOffset - this.halfThumbOffset) * 1e3 * this.range / this.thumbRange,
            o = Math.round(o) / 1e3 + this.min);
            this.value = Math.min(Math.max(this.min, o), this.max);
            this.input.setAttribute("value", this.value.toString());
            o = parseFloat(this.input.getAttribute("value"));
            isNaN(o) || (this.value = o);
            s = isNaN(parseFloat(this.input.getAttribute("step"))) ? this.value % 1 == 0 ? this.value.toString() : (Math.round(this.value * 10) / 10).toString() : this.value.toString();
            this.thumb.setAttribute("aria-valuenow", s);
            this.thumb.setAttribute("aria-valuetext", s);
            this.setThumbPosition();
            this.valueDescriptor = null;
            this.initiatePublish({
                value: this.value,
                internal: t,
                userInitiated: i
            });
            e = this.valueDescriptor || {};
            this.valueDescriptor = null;
            typeof e == "object" ? (u.setText(this.valueTooltip, e.tooltipText || s),
            e.ariaValueText && this.thumb.setAttribute("aria-valuetext", e.ariaValueText)) : typeof e == "string" && ((isNaN(parseFloat(e)) || e.match(":")) && this.thumb.setAttribute("aria-valuetext", e === "00:00:00" ? "0 second" : e),
            u.setText(this.valueTooltip, e))
        }
        ,
        t.prototype.publish = function(n, t) {
            var i = n.onValueChanged(t);
            !i || this.valueDescriptor || (this.valueDescriptor = i)
        }
        ,
        t.prototype.moveThumbTo = function(n, t) {
            if (f.pointInRect(n, t, this.dimensions)) {
                var i = this.dimensions.bottom - t;
                this.isVerticalSlider || (i = this.primaryDirection === u.Direction.left ? n - this.dimensions.left : this.dimensions.right - n);
                this.updateThumbOffset(i, !0, !0)
            }
        }
        ,
        t.selector = ".c-slider",
        t.typeName = "Slider",
        t.hitPadding = 20,
        t
    }(r.Publisher);
    t.Slider = e
});
require(["slider", "componentFactory"], function(n, t) {
    t.ComponentFactory && t.ComponentFactory.create && t.ComponentFactory.create([{
        component: n.Slider
    }])
})
