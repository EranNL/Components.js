/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Str = function () {
				function Str() {
								_classCallCheck(this, Str);
				}

				_createClass(Str, null, [{
								key: 'toCamelCase',
								value: function toCamelCase(string) {
												var words = string.toLowerCase().split(' ');

												for (var i = 1; i < words.length; i++) {
																words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
												}

												return words.join('');
								}

								/**
        * Returns the give string with a capitalized first letter
         * @param {String} string
         * @returns String
         */

				}, {
								key: 'ucFirst',
								value: function ucFirst(string) {
												return string.charAt(0).toUpperCase() + string.slice(1);
								}

								/**
        * Returns the given string as an object
        *
        * @return {Object}
         */

				}, {
								key: 'toObject',
								value: function toObject() {
												string = string.replace(/'/g, '"');
												try {
																return JSON.parse(string);
												} catch (err) {
																return {};
												}
								}
				}]);

				return Str;
}();

exports.default = Str;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = __webpack_require__(2);

var _Events2 = _interopRequireDefault(_Events);

var _Str = __webpack_require__(0);

var _Str2 = _interopRequireDefault(_Str);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
	function Element() {
		var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

		_classCallCheck(this, Element);

		this.element = this._select(element);
		//this.options = this.data();

		//Register a new Events instance for this element, so events are captured.
		//But only on non-objects
		if (!this.element.length) {
			this.events = new _Events2.default(this);
		}
	}

	/**
  *
  * Returns the HTMLobject element that can be used
  *
  * @param {mixed}
  *
  * @private
  */


	_createClass(Element, [{
		key: '_select',
		value: function _select(selector) {

			var returnElements = [];

			if (!selector) {
				return;
			}

			if (typeof selector == "string") {
				var selectorType = "querySelectorAll";

				if (selector.indexOf('#') == 0) {
					//Selector is an ID
					selectorType = 'getElementById';
					selector = selector.substr(1, selector.length);
				}

				return document[selectorType](selector);
			}

			if (selector.nodeType) {
				//getElementById, document, document.body
				return selector;
			} else if (selector.length) {
				//getElementsByClassName or getElementsByClassName
				for (var i = 0; i < selector.length; i++) {
					returnElements.push(new self(selector[i]));
				}
			}
			return returnElements;
		}

		/**
   * Returns the data attributes assigned to the element
   *
   * @example
   * <div data-component="component" data-foo="bar" />
   *
   * @param {String} key (optional) The specific value of a attribute key that has to be returned
   *
   * @return {mixed} 	null: when not a specific element |
   * 				   	String: when a key is specified |
   * 					Object: when returning the whole options object
   */

	}, {
		key: 'getData',
		value: function getData(key) {
			if (!this.element || this.element.length) {
				return null;
			}

			var returnData = {};
			var i = 0;

			for (; i < this.element.attributes.length; i++) {
				var attribute = this.element.attributes[i];

				if (attribute.name.indexOf('data-') == 0) {
					var name = attribute.name.substr("data-".length, attribute.name.length - 1);

					returnData[name] = /{.*}/g.test(attribute.value) ? _Str2.default.toObject(attribute.value) : attribute.value;
				}
			}

			if (key) {
				return returnData[key] || "";
			}

			return returnData;
		}

		/**
   * Add an event to the element(s)
   *
   * @param {String} ev The name of the event
   * @param {closure} callback The callback that has to be fired when the event is triggered
   *
   * @return {void}
   */

	}, {
		key: 'addEvent',
		value: function addEvent(ev, callback) {
			this.element.addEventListener(ev, callback);
		}

		/**
   * Call a callback for every element in the element object or just the only element that is specified
   *
   * @param {closure} callback The callback thas has to be called on every element
   *
   * @return {void}
   */

	}, {
		key: 'each',
		value: function each(callback) {
			if (_typeof(this.element) == "object") {
				for (var i = 0; i < this.element.length; i++) {
					if (typeof callback == 'function') {
						callback(new Element(this.element[i]), i);
					}
				}
			} else {
				if (typeof callback == 'function') {
					callback(new Element(this.element), 0);
				}
			}
		}

		/**
  * Gets the children for this element.
   * @returns {Element}
   */

	}, {
		key: 'children',
		value: function children(selector) {
			return new Element(selector);
		}

		/**
   * Returns the height of the element
   *
   * @returns {number}
   *
   * @todo Improve options for height
   */

	}, {
		key: 'getHeight',
		value: function getHeight() {
			return this.element.clientHeight;
		}
	}]);

	return Element;
}();

exports.default = Element;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Str = __webpack_require__(0);

var _Str2 = _interopRequireDefault(_Str);

var _Element = __webpack_require__(1);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
	function Events(instance) {
		_classCallCheck(this, Events);

		this.instance = instance;

		this._attachEvents();
	}

	/**
  * Check whether a function exists in the class where this instance is called
  *
  * @param {String} func The name of the method
  *
  * @return {boolean}
  */


	_createClass(Events, [{
		key: 'functionExists',
		value: function functionExists(func) {
			return String(func) in this.instance.__proto__;
		}

		/**
   * Attach the current events to the element of the calling instance
   *
   * @return {void}
   */

	}, {
		key: '_attachEvents',
		value: function _attachEvents() {
			var _this = this;

			var element = this.instance instanceof _Element2.default ? this.instance : this.instance.element;

			Object.keys(Event.prototype).forEach(function (ev) {
				var e = _Str2.default.toCamelCase('on ' + ev);
				if (_this.functionExists(e)) {
					element.addEvent(ev.toLowerCase(), function () {
						return _this.instance.__proto__[e].apply(_this.instance, [event]);
					});
					return;
				}
			});
		}
	}]);

	return Events;
}();

exports.default = Events;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Events = __webpack_require__(2);

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           *
                                                                                                                                                           */

var Component = function Component(element) {
    _classCallCheck(this, Component);

    this.element = element;

    this.events = new _Events2.default(this);
};

exports.default = Component;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Component.js": 3,
	"./Input.js": 5,
	"./dom/Element.js": 1,
	"./dom/Events.js": 2,
	"./helpers/Str.js": 0
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 4;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Component2 = __webpack_require__(3);

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input(element) {
        _classCallCheck(this, Input);

        return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, element));
    }

    return Input;
}(_Component3.default);

exports.default = Input;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = __webpack_require__(1);

var _Element2 = _interopRequireDefault(_Element);

var _Str = __webpack_require__(0);

var _Str2 = _interopRequireDefault(_Str);

var _Events = __webpack_require__(2);

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

"use strict";

/**
 * Main class for the library. This class has to be called with a given context
 * This context is used so
 */

window.componentList = {};

var OctaBootstrap = function () {

	/**
  * @var {Element}
  */
	function OctaBootstrap(element) {
		_classCallCheck(this, OctaBootstrap);

		this.context = new _Element2.default(element);
	}

	_createClass(OctaBootstrap, [{
		key: 'init',


		/**
   * Initialize the framework inside the given context
   *
   * @return {void}
   */
		value: function init() {
			this.context.children('[data-component]').each(function (element) {
				var com = element.getData('component').split(' ');
				var i = 0;

				for (; i < com.length; i++) {
					try {
						var component = __webpack_require__(4)("./" + _Str2.default.ucFirst(com[i]) + '.js').default;
						new component(element);
					} catch (err) {
						//no module was found, try to fetch it from the array
						if (componentList[com[i]] != undefined) {
							new componentList[com[i]](element);
						}
					}
				}
			});
		}
	}], [{
		key: 'registerComponent',
		value: function registerComponent(instance, name) {
			if (componentList[name] == undefined) {
				componentList[name] = instance;
			}
		}
	}, {
		key: 'registerEvents',
		value: function registerEvents(instance) {
			return new _Events2.default(instance);
		}
	}]);

	return OctaBootstrap;
}();

//Put the function in the global window object so it is accessible outside the scope of webpack


window.OctaBootstrap = OctaBootstrap;

/**
 * Overwrite the existing Octa variable
 * @todo Delete after browsers officially support ES6?
 */
window.Octa = window.O = function (element) {
	return new OctaBootstrap(element);
};

/***/ })
/******/ ]);