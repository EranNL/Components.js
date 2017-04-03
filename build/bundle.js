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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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

var _Str = __webpack_require__(1);

var _Str2 = _interopRequireDefault(_Str);

var _Element = __webpack_require__(2);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
	function Events(instance) {
		_classCallCheck(this, Events);

		this.instance = instance;
		this.element = this.instance instanceof _Element2.default ? this.instance.htmlElement : this.instance.element.htmlElement;

		this.attachEvents();
	}

	/**
  * Check whether a function exists in the class where this instance is called
  *
  * @param {String} func The name of the method
  *
  * @return {boolean}
  *
  * @private
  */


	_createClass(Events, [{
		key: "_functionExists",
		value: function _functionExists(func) {
			return this.instance.__proto__.hasOwnProperty(String(func));
		}

		/**
   * Attach the current events to the element of the calling instance
   *
   * @return {void}
   */

	}, {
		key: "attachEvents",
		value: function attachEvents() {
			var _this = this;

			Object.keys(Event.prototype).forEach(function (ev) {
				var e = _Str2.default.toCamelCase('on ' + ev);
				if (_this._functionExists(e)) {
					_this.add(ev.toLowerCase(), function () {
						return _this.instance.__proto__[e].apply(_this.instance, [_this.element, event]);
					});
				}
			});
		}

		/**
  * Adds an event listener to the element
  *
  * @param {String} ev The name of the event
  * @param {Function} callback The callback that has to be invoked when the event occurered.
  *
  * @return {void}
   */

	}, {
		key: "add",
		value: function add(ev, callback) {
			this.element.addEventListener(ev, callback);
		}
	}]);

	return Events;
}();

exports.default = Events;

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = __webpack_require__(0);

var _Events2 = _interopRequireDefault(_Events);

var _HeightDimension = __webpack_require__(5);

var _HeightDimension2 = _interopRequireDefault(_HeightDimension);

var _WidthDimension = __webpack_require__(6);

var _WidthDimension2 = _interopRequireDefault(_WidthDimension);

var _FadeEffect = __webpack_require__(8);

var _FadeEffect2 = _interopRequireDefault(_FadeEffect);

var _Str = __webpack_require__(1);

var _Str2 = _interopRequireDefault(_Str);

var _Collection = __webpack_require__(9);

var _Collection2 = _interopRequireDefault(_Collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
    function Element() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, Element);

        this.htmlElement = this._select(element);
        //this.options = this.data();

        //Register a new Events instance for this element, so events are captured.
        //But only on non-objects
        if (this.isCollection()) {
            this.events = new _Events2.default(this, true);
        } else {
            this.events = new _Events2.default(this);
        }
    }

    /**
     *
     * Returns the HTMLobject element that can be used
     *
     * @param {*} selector
     *
     * @private
     */


    _createClass(Element, [{
        key: '_select',
        value: function _select(selector) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;


            var returnElements = new _Collection2.default();

            if (!selector) {
                return;
            }

            if (typeof selector == "string") {

                if (selector.indexOf('#') == 0) {
                    //Selector is an ID
                    return context.getElementById(selector);
                } else {
                    var elements = context.querySelectorAll(selector);

                    for (var i = 0; i < elements.length; i++) {
                        returnElements.push(new Element(elements[i]));
                    }
                }
            } else {
                if (selector.nodeType) {
                    //getElementById, document, document.body
                    return selector;
                } else if (selector instanceof NodeList) {
                    //getElementsByClassName or getElementsByClass
                    for (var _i = 0; _i < selector.length; _i++) {
                        returnElements.push(new Element(selector[_i]));
                    }
                }
            }

            return returnElements;
        }

        /**
        * Returns whether the htmlElement is a collection (a set of elements)
        *
        * @return {boolean}
         */

    }, {
        key: 'isCollection',
        value: function isCollection() {
            return this.htmlElement instanceof _Collection2.default;
        }

        /**
         * Returns the data attributes assigned to the element
         *
         * @example
         * <div data-component="component" data-foo="bar" />
         *
         * @param {String} key (optional) The specific value of a attribute key that has to be returned
         *
         * @return {*} 	null: when not a specific element |
         * 				   	String: when a key is specified |
         * 					Object: when returning the whole options object
         */

    }, {
        key: 'getData',
        value: function getData(key) {
            if (!this.htmlElement || this.isCollection()) {
                return null;
            }

            var returnData = {};
            var i = 0;
            //@todo: retrieve data from localStorage

            for (; i < this.htmlElement.attributes.length; i++) {
                var attribute = this.htmlElement.attributes[i];

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
         * Call a callback for every element in the element object or just the only element that is specified
         *
         * @param {Function} callback The callback thas has to be called on every element
         *
         * @return {void}
         */

    }, {
        key: 'each',
        value: function each(callback) {
            if (this.isCollection()) {
                for (var i = 0; i < this.htmlElement.length(); i++) {
                    if (typeof callback == 'function') {
                        callback(new Element(this.htmlElement.get(i)), i);
                    }
                }
            } else {
                if (typeof callback == 'function') {
                    callback(new Element(this.htmlElement), 0);
                }
            }
        }

        /**
        * Gets the children for this element.
         * @returns {Element}
        *
        * @todo Needs cleaning up
         */

    }, {
        key: 'children',
        value: function children(selector) {
            var _this = this;

            var returnChildren = new _Collection2.default();

            if (this.isCollection()) {
                this.htmlElement.each(function (element) {
                    var children = _this._select(selector, element);

                    if (children instanceof _Collection2.default) {
                        for (var i = 0; i < children.length(); i++) {
                            returnChildren.push(new Element(children.get(i)));
                        }
                    } else {
                        //child is a single HTMLelement
                        returnChildren.push(new Element(children));
                    }
                });

                return returnChildren;
            } else {
                return new Element(this._select(selector, this.htmlElement));
            }
        }

        /**
         * Adds an class to the element
        *
        * @param {String} className The name of the class youd like to add
        *
        * @return {void}
         */

    }, {
        key: 'addClass',
        value: function addClass(className) {
            if (this.isCollection()) {
                this.htmlElement.each(function (element) {
                    //recursively call for each element in the collection
                    element.addClass(className);
                });
            } else {
                var hasClasses = this.htmlElement.getAttribute("class");

                if (hasClasses.length == 0) {
                    this.htmlElement.setAttribute("class", className);
                } else if (hasClasses.indexOf(className) == -1) {
                    this.htmlElement.setAttribute("class", hasClasses + " " + className);
                }
            }
        }

        /**
        * Checks whether the element has a specific class
        *
         * @param {String} className The class the lement has to have
        * @return {boolean}
         */

    }, {
        key: 'hasClass',
        value: function hasClass(className) {
            if (this.isCollection()) {
                return false;
            }

            return this.htmlElement.getAttribute("class").indexOf(className) != -1;
        }

        /**
         * Returns the height of the element
         *
         * @returns {HeightDimension}
         *
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return new _HeightDimension2.default(this);
        }

        /**
        * Returns the width of the element
        *
        * @return {WidthDimension}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return new _WidthDimension2.default(this);
        }

        /**
         * Event handler to listen to events occuring on the element and then executing a callback
         * @param {*} ev String: The name of the event
         *               Array: List of events
         * @param {Function} callback
         */

    }, {
        key: 'on',
        value: function on(ev, callback) {
            var _this2 = this;

            if (this.isCollection()) {
                if ((typeof ev === 'undefined' ? 'undefined' : _typeof(ev)) == 'object') {
                    var _loop = function _loop(i) {
                        _this2.htmlElement.each(function (element) {
                            element.events.add(ev[i], function (event) {
                                return callback(new Element(element.htmlElement), event);
                            });
                        });
                    };

                    for (var i = 0; i < ev.length; i++) {
                        _loop(i);
                    }
                }
            } else {
                this.events.add(ev, function (event) {
                    return callback(new Element(_this2.htmlElement), event);
                });
            }
        }

        /**
         * Applies a css property to the element
         *
         * @param {*} Object: key-object notation of property-value
        * @param {}
         *
         * @return {void}
         */

    }, {
        key: 'css',
        value: function css() {
            var _arguments = arguments;

            if (this.isCollection()) {
                this.htmlElement.each(function (element) {
                    element.css(_arguments);
                });
            } else {
                if ((typeof arguments === 'undefined' ? 'undefined' : _typeof(arguments)) == 'object') {
                    for (var key in arguments[0]) {
                        this.htmlElement.style[key] = arguments[0][key];
                    }
                } else if (typeof arguments[0] == 'string' && typeof arguments[1] == 'string') {
                    this.htmlElement.style[arguments[0]] = arguments[1];
                }
            }
        }

        /**
        * Fades the element out
        *
         * @param {int} duration The duration of the effect in ms
         * @param {function} callback The callback fired when the effect is finished
         */

    }, {
        key: 'fadeOut',
        value: function fadeOut(duration, callback) {

            if (this.htmlElement instanceof _Collection2.default) {
                for (var i = 0; i < this.htmlElement.length(); i++) {
                    new _FadeEffect2.default('out', 500, this.htmlElement.get(i));
                }
            } else {
                new _FadeEffect2.default('out', 500, this.htmlElement);
            }
        }
    }, {
        key: 'getRawElement',
        value: function getRawElement() {
            if (!(this.htmlElement instanceof _Collection2.default)) {
                //element is a single element
                return this.htmlElement;
            }

            return null;
        }
    }]);

    return Element;
}();

exports.default = Element;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dimension = function () {
    function Dimension(htmlElement) {
        _classCallCheck(this, Dimension);

        this.htmlElement = htmlElement;
        this.dimension = 0;
    }

    _createClass(Dimension, [{
        key: "calculate",
        value: function calculate() {
            return this.dimension;
        }
    }]);

    return Dimension;
}();

exports.default = Dimension;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Events = __webpack_require__(0);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dimension2 = __webpack_require__(3);

var _Dimension3 = _interopRequireDefault(_Dimension2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeightDimension = function (_Dimension) {
    _inherits(HeightDimension, _Dimension);

    function HeightDimension(htmlElement) {
        _classCallCheck(this, HeightDimension);

        var _this = _possibleConstructorReturn(this, (HeightDimension.__proto__ || Object.getPrototypeOf(HeightDimension)).call(this, htmlElement));

        _this.height();
        return _this;
    }

    _createClass(HeightDimension, [{
        key: "height",
        value: function height() {
            var _this2 = this;

            if (this.htmlElement.isCollection()) {
                this.htmlElement.each(function (element) {
                    _this2.dimension += element.htmlElement.clientHeight;
                });
            } else {
                this.dimension = this.htmlElement.clientHeight;
            }

            return this;
        }
    }, {
        key: "withPadding",
        value: function withPadding() {
            //@todo implementation
            return this;
        }
    }, {
        key: "withMargin",
        value: function withMargin() {
            //@todo implementation
            return this;
        }
    }]);

    return HeightDimension;
}(_Dimension3.default);

exports.default = HeightDimension;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dimension2 = __webpack_require__(3);

var _Dimension3 = _interopRequireDefault(_Dimension2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidthDimension = function (_Dimension) {
    _inherits(WidthDimension, _Dimension);

    function WidthDimension(htmlElement) {
        _classCallCheck(this, WidthDimension);

        var _this = _possibleConstructorReturn(this, (WidthDimension.__proto__ || Object.getPrototypeOf(WidthDimension)).call(this, htmlElement));

        _this.width();
        return _this;
    }

    _createClass(WidthDimension, [{
        key: "width",
        value: function width() {
            if (this.htmlElement.length) {
                for (var i = 0; i < this.htmlElement.length; i++) {
                    this.dimension += this.htmlElement[i].clientWidth;
                }
            } else {
                this.dimension = this.htmlElement.clientWidth;
            }

            return this;
        }
    }]);

    return WidthDimension;
}(_Dimension3.default);

exports.default = WidthDimension;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Effect = function () {
    function Effect(type, duration, element) {
        _classCallCheck(this, Effect);

        this.duration = duration;
        this.element = element;
        this.isRunning = false;
        this.hasFinished = false;

        this[type].apply(this);
    }

    /**
     * Stop the current running effect
     *
     * @returns {Effect}
     */


    _createClass(Effect, [{
        key: "stop",
        value: function stop() {
            this.isRunning = false;

            return this;
        }

        /**
         * Returns whether the effect is finished
         *
         * @returns {boolean}
         */

    }, {
        key: "isFinished",
        value: function isFinished() {
            return this.hasFinished;
        }

        /**
         * Animate css things
         *
         * @param {Object}
         */

    }, {
        key: "animate",
        value: function animate(css, duration) {}
    }]);

    return Effect;
}();

exports.default = Effect;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Effect2 = __webpack_require__(7);

var _Effect3 = _interopRequireDefault(_Effect2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FadeEffect = function (_Effect) {
    _inherits(FadeEffect, _Effect);

    function FadeEffect(type, duration, element) {
        _classCallCheck(this, FadeEffect);

        var _this = _possibleConstructorReturn(this, (FadeEffect.__proto__ || Object.getPrototypeOf(FadeEffect)).call(this, type, duration, element));

        _this.duration = 2000;
        return _this;
    }

    _createClass(FadeEffect, [{
        key: "out",
        value: function out() {
            console.log('out invoked');
        }
    }]);

    return FadeEffect;
}(_Effect3.default);

exports.default = FadeEffect;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collection = function () {
    function Collection(array) {
        _classCallCheck(this, Collection);

        if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) == 'object') {
            this.array = array;
        } else {
            this.array = [];

            for (var i = 0; i < arguments.length; i++) {
                this.array.push(arguments[i]);
            }
        }
    }

    /**
     * Gets the first index a value is located on in the collection
     *
     * @param {String} value The value that is looked for
     *
     * @return {int}
     */


    _createClass(Collection, [{
        key: 'getFirstIndex',
        value: function getFirstIndex(value) {
            var index = -1;

            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i] == value) {
                    index = i;
                    break;
                }
            }

            return index;
        }
    }, {
        key: 'each',
        value: function each(callback) {
            for (var i = 0; i < this.length(); i++) {
                callback(this.array[i], i);
            }
        }

        /**
         * Gets the last index a value is located on in the collection
         *
         * @param {String} value The value that is looked for
         *
         * @return {int}
         */

    }, {
        key: 'getLastIndex',
        value: function getLastIndex(value) {
            var index = -1;

            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i] == value) {
                    index = i;
                }
            }

            return index;
        }

        /**
         * Returns the index(es) on which a given value is located in a collection.
         *
         * @param {String} value The value that is looked for
         *
         * @return {Object}
         */

    }, {
        key: 'getIndexes',
        value: function getIndexes(value) {
            var indexes = new Collection();

            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i] == value) {
                    indexes.push(i);
                }
            }

            return indexes;
        }

        /**
         * Filter the array with a given expression. The array only contains the values that match the filter.
         *
         * @param {callback} condition The condition callback. The rule whith wich every value has to be checked
         *
         * @return {Object}
         */

    }, {
        key: 'filter',
        value: function filter(condition) {
            var filteredArray = new Octa.Collection();

            for (var i = 0; i < this.array.length; i++) {
                if (condition(this.array[i])) {
                    filteredArray.push(this.array[i]);
                }
            }

            return filteredArray;
        }

        /**
         * Returns the amount of elements in the collection
         * @returns {Number}
         */

    }, {
        key: 'length',
        value: function length() {
            return this.array.length;
        }

        /**
         * Push an item to the collection
         *
         * @param {mixed} value The value to be pushed
         *
         * @return {this}
         */

    }, {
        key: 'push',
        value: function push(value) {
            this.array.push(value);

            return this;
        }
    }, {
        key: 'get',
        value: function get(index) {
            return this.array[index];
        }

        /**
         * Returns the plain array of the collection
         *
         * @return {array}
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return this.array;
        }
    }]);

    return Collection;
}();

exports.default = Collection;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Component.js": 4,
	"./Input.js": 11,
	"./dom/Element.js": 2,
	"./dom/Events.js": 0,
	"./dom/dimensions/Dimension.js": 3,
	"./dom/dimensions/HeightDimension.js": 5,
	"./dom/dimensions/WidthDimension.js": 6,
	"./dom/effects/Effect.js": 7,
	"./dom/effects/FadeEffect.js": 8,
	"./http/HTTPRequest.js": 12,
	"./http/HTTPRespons.js": 13,
	"./util/Browser.js": 14,
	"./util/Collection.js": 9,
	"./util/Keyboard.js": 15,
	"./util/Str.js": 1
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = __webpack_require__(4);

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

    _createClass(Input, [{
        key: 'onClick',
        value: function onClick() {
            alert('clicked');
        }
    }, {
        key: 'onMouseover',
        value: function onMouseover() {
            alert('mouseOver');
        }
    }]);

    return Input;
}(_Component3.default);

exports.default = Input;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by Eran on 2-4-2017.
 */


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by Eran on 2-4-2017.
 */


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Browser = function Browser() {
  _classCallCheck(this, Browser);
};

exports.default = Browser;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEYS = {};

var Keyboard = function () {
    function Keyboard() {
        _classCallCheck(this, Keyboard);
    }

    _createClass(Keyboard, null, [{
        key: "register",
        value: function register(instance, keyMap, selector) {
            //Check whether instance is a component.
            var element = null;
            if (selector) {
                element = selector instanceof Octa.Element ? selector : new Octa.Element(selector);
            } else {
                element = instance.element;
            }
        }
    }]);

    return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = __webpack_require__(2);

var _Element2 = _interopRequireDefault(_Element);

var _Str = __webpack_require__(1);

var _Str2 = _interopRequireDefault(_Str);

var _Events = __webpack_require__(0);

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
  *
  * @todo: Improve!!!
  */
	function OctaBootstrap(element, init) {
		_classCallCheck(this, OctaBootstrap);

		if (init) {
			this.context = new _Element2.default(element);
		} else {
			return new _Element2.default(element);
		}
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
						var component = __webpack_require__(10)("./" + _Str2.default.ucFirst(com[i]) + '.js').default;
						new component(element);
					} catch (err) {
						//no module was found, try to fetch it from the array
						if (componentList[com[i]] !== undefined) {
							new componentList[com[i]](element, OctaBootstrap);
						} else {
							console.error('Module ' + com[i] + 'was not found. Does it exist?');
						}
					}
				}
			});
		}
	}], [{
		key: 'registerComponent',
		value: function registerComponent(instance, name) {
			if (componentList[name] === undefined) {
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
window.Octa = window.O = function (element, init) {
	return new OctaBootstrap(element, init);
};

/***/ })
/******/ ]);