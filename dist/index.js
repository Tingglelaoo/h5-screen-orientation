// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author tingglelaoo
 * @date 2018-5-22
 * @desc 屏幕状态一些处理进行统一封装，包括以下内容：
 * 1.对DOM结构，进行强制横竖屏显示
 * 2.根据需要设置横竖屏翻转提示蒙层，有默认配置（可配置logo和提示文案）
 * 3.横竖屏翻转事件回调绑定
 * @example
  const xScreen = new Screen()
  // 强制竖屏
  xScreen.lock({
    mode: 'portrait',
    $wrapper: document.getElementById('J_portrait'),
    zIndex: 302,
  })

  // 强制横屏
  xScreen.lock({
    mode: 'landscape',
    $wrapper: document.getElementById('J_landscape'),
    zIndex: 301,
  })

  // 横屏提示
  xScreen.inform({
    mode: 'landscape',
    id: 'J_landscapeTips',
  })

  // 竖屏提醒
  xScreen.inform({
    mode: 'portrait',
    id: 'J_portraitTips',
    text: '竖屏浏览体验更好喔！',
    logo: './img/portrait_logo.png'
  })

  // 屏幕翻转回调
  xScreen.onOrientationChange(orientation => {
    console.log('1', orientation)
  }, this)

  // 屏幕翻转回调
  xScreen.onOrientationChange(orientation => {
    console.log('2', orientation)
  }, this)
 */
var Screen =
/*#__PURE__*/
function () {
  function Screen() {
    var _this = this;

    _classCallCheck(this, Screen);

    this.$wrappers = []; // 存储需要处理的dom

    this.$informs = []; // 需要提示的

    this.listeners = [];
    this.logoPortrait = "data:image/png;base64,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";
    this.logoLandscape = "data:image/png;base64,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";
    this.orientation = Screen._detectOrient(); // 绑定事件

    window.addEventListener('resize', function () {
      _this.orientation = Screen._detectOrient();

      _this.$wrappers.forEach(_this._lockOrientation.bind(_this));

      _this.$informs.forEach(_this._showInform.bind(_this));

      _this.listeners.forEach(function (item) {
        var callback = item.callback,
            context = item.context;
        callback.call(context, _this.orientation);
      });
    }, this);
  }

  _createClass(Screen, [{
    key: "_lockOrientation",
    value: function _lockOrientation(_ref) {
      var mode = _ref.mode,
          $wrapper = _ref.$wrapper,
          zIndex = _ref.zIndex;

      if (mode === this.orientation) {
        $wrapper.style = Screen._getLockStyle('normal');
        return;
      }

      $wrapper.style = Screen._getLockStyle(mode, zIndex);
    }
  }, {
    key: "_showInform",
    value: function _showInform(_ref2) {
      var id = _ref2.id,
          mode = _ref2.mode;
      var $inform = document.getElementById(id);
      if (!$inform) return;

      if (mode === this.orientation) {
        $inform.classList.remove('show');
      } else {
        $inform.classList.add('show');
      }
    }
    /**
     * @desc 将指定容器保持横屏/竖屏显示
     * @param {object} config 配置，包括以下可配置项：
     * mode {string} 显示模式，强制横屏选"landscape"，强制竖屏选"portrait"，必填
     * $wrapper {HTMLElement} 被处理的DOM容器，必填
     * zIndex {number} 显示的层次，也就是z-index，默认是301，可选
     */

  }, {
    key: "lock",
    value: function lock(config) {
      config = Object.assign({
        mode: '',
        $wrapper: null,
        zIndex: 301
      }, config);
      if (!config.mode || !config.$wrapper) return;
      this.$wrappers.push(config);

      this._lockOrientation(config);
    }
    /**
     * @desc 在指定场景下（横屏/竖屏）显示提醒蒙层
     * @param {object} config 配置，包括以下可配置项：
     * mode {string} 显示模式，强制横屏选"landscape"，强制竖屏选"portrait"，必填
     * id {string} 提示蒙层id命名，必填
     * logo {src} 提示蒙层的logo，默认切换横竖屏的静态logo，可选
     * text {string} 提示文案，默认“为了更好的体验，请保持竖屏/横屏显示”可选
     * zIndex {number} 显示的层次，也就是z-index，默认是310，可选
     */

  }, {
    key: "inform",
    value: function inform(_ref3) {
      var _this2 = this;

      var mode = _ref3.mode,
          id = _ref3.id,
          logo = _ref3.logo,
          text = _ref3.text,
          zIndex = _ref3.zIndex;
      if (!mode || !id) return;
      logo = logo || (mode === 'landscape' ? this.logoLandscape : this.logoPortrait);
      text = text || "\u4E3A\u4E86\u66F4\u597D\u7684\u4F53\u9A8C\uFF0C\u8BF7\u4FDD\u6301".concat(mode === 'landscape' ? '横屏' : '竖屏', "\u6D4F\u89C8");
      zIndex = zIndex || 310; // 注入CSS

      Screen._createTipsStyle(id, zIndex); // 注入DOM


      Screen._createTipsDOM({
        id: id,
        text: text,
        logo: logo
      }).then(function () {
        return _this2._showInform({
          id: id,
          mode: mode
        });
      }).catch(function (err) {
        return console.warn(err);
      }); // 响应检测列表


      this.$informs.push({
        id: id,
        mode: mode
      });
    }
    /**
     * @desc 横竖屏切换回调
     * @param {function} callback 回调函数
     * @param {variable} context 回调函数的上下文
     */

  }, {
    key: "onOrientationChange",
    value: function onOrientationChange(callback, context) {
      if (typeof callback !== 'function') return;
      this.listeners.push({
        callback: callback,
        context: context
      });
    }
  }], [{
    key: "_detectOrient",
    value: function _detectOrient() {
      var screen = window.screen;
      var docEle = document.documentElement;
      var clientWidth = docEle.clientWidth;
      var min = Math.min(screen.width, screen.height);
      var max = Math.max(screen.width, screen.height);

      if (clientWidth === max) {
        return 'landscape';
      }

      if (clientWidth === min) {
        return 'portrait';
      }

      return '';
    }
  }, {
    key: "_getLockStyle",
    value: function _getLockStyle(mode, zIndex) {
      var docEle = document.documentElement;
      var clientWidth = docEle.clientWidth;
      var clientHeight = docEle.clientHeight;
      var width;
      var height;
      var rotate;
      var originX;
      var originY;

      switch (mode) {
        case 'portrait':
          width = clientHeight;
          height = clientWidth;
          rotate = '-90deg';
          originX = clientHeight / 2;
          originY = clientHeight / 2;
          break;

        case 'landscape':
          width = clientHeight;
          height = clientWidth;
          rotate = '90deg';
          originX = clientWidth / 2;
          originY = clientWidth / 2;
          break;

        default:
          width = clientWidth;
          height = clientHeight;
          rotate = '0';
          originX = '0';
          originY = '0';
      }

      var cssText = "\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: ".concat(zIndex, ";\n    width: ").concat(width, "px;\n    height: ").concat(height, "px;\n    -webkit-transform: rotate(").concat(rotate, ");\n    transform: rotate(").concat(rotate, ");\n    -webkit-transform-origin: ").concat(originX, "px ").concat(originY, "px;\n    transform-origin: ").concat(originX, "px ").concat(originY, "px;\n    ");
      return cssText;
    }
  }, {
    key: "_createTipsStyle",
    value: function _createTipsStyle(id, zIndex) {
      var cssText = "\n    #".concat(id, ".screentips {\n      transition: opacity linear 0.3s;\n      pointer-events: none;\n      visibility: hidden;\n      opacity: 0;\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0,0,0, 0.8);\n      z-index: ").concat(zIndex, ";\n    }\n    #").concat(id, ".screentips.show {\n      visibility: visible;\n      opacity: 1;\n      pointer-events: auto;\n    }\n    #").concat(id, " .screentips_inner{\n      position: absolute;top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n    }\n    #").concat(id, " .screentips_icon {\n      margin:1.5rem auto;\n      display: block;\n      width: 5rem;\n      animation: phone_rotate 1.6s ease-in infinite;\n    }\n    #").concat(id, " .screentips_icon img {\n      width: 100%;\n    }\n    #").concat(id, " .screentips_text {\n      white-space: nowrap;\n      font-size: 0.75rem;\n      text-align: center;\n      color: #fff;\n    }\n    ");
      var doc = document;
      var style = doc.createElement('style');

      if (style.styleSheet) {
        // IE8 and below.
        style.styleSheet.cssText = cssText;
      } else {
        style.appendChild(doc.createTextNode(cssText));
      }

      doc.head.appendChild(style);
    }
  }, {
    key: "_createTipsDOM",
    value: function _createTipsDOM(_ref4) {
      var id = _ref4.id,
          text = _ref4.text,
          logo = _ref4.logo;
      return new Promise(function (resolve, reject) {
        var doc = document;
        var body = doc.body;
        var orientDOM = doc.createElement('div');
        orientDOM.id = id;
        orientDOM.className = 'screentips';
        var img = new window.Image();

        img.onload = function () {
          orientDOM.innerHTML = "<div class='screentips_inner'><i class='screentips_icon'><img src=".concat(img.src, "></i><p class='screentips_text'>").concat(text, "</p></div>");
          body.appendChild(orientDOM);
          resolve();
        };

        img.onerror = function (err) {
          reject(err);
        };

        img.src = logo;
      });
    }
  }]);

  return Screen;
}();

exports.default = Screen;
},{}],"../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57399" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map