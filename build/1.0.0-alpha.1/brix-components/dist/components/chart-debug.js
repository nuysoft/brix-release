(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("Chart"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "Chart", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/chart"] = factory(require("jquery"), require("underscore"), require("Chart"), require("brix/base"));
	else
		root["components/chart"] = factory(root["jquery"], root["underscore"], root["Chart"], root["brix/base"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/*
	    https://github.com/nnnick/Chart.js
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3), __webpack_require__(4),
	        __webpack_require__(5),
	        __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _, Chart,
	        Brix,
	        template
	    ) {
	        /*
	            ### 数据
	                {}
	            ### 选项
	                TODO
	            ### 属性
	                TODO
	            ### 方法
	                TODO
	            ### 事件
	                TODO
	            ===

	            ### 公共选项
	                data template css
	            ### 公共属性
	                element relatedElement 
	                moduleId clientId parentClientId childClientIds 
	                data template css
	            ### 公共方法
	                .render()
	            ### 公共事件
	                ready destroyed

	        */
	        return Brix.extend({
	            options: {
	                TYPES: {
	                    line: 'Line',
	                    bar: 'Bar',
	                    radar: 'Radar',
	                    polararea: 'PolarArea',
	                    pie: 'Pie',
	                    doughnut: 'Doughnut',
	                },
	                type: 'Line', // Line Bar Radar PolarArea Pie Doughnut
	                width: undefined,
	                height: 400
	            },
	            render: function() {
	                // 适配宽度
	                if (!this.options.width) this.options.width = $(this.element).width()

	                // 尝试从 innerText 中解析数据
	                /* jshint evil:true */
	                if (!this.options.data) {
	                    this.options.data = eval('(function(){ return Array.prototype.slice.call(arguments)[0] })(' + this.element.innerText + ')')
	                    this.element.innerText = ''
	                }

	                var html = _.template(template)(this.options)
	                var canvas = $(html).appendTo(this.element)
	                var context = canvas.get(0).getContext("2d")
	                var type = this.options.TYPES[this.options.type.toLowerCase()]
	                this.chart = new Chart(context)[type](this.options.data, {})
	            }
	        })
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<canvas width=\"<%= width %>\" height=\"<%= height %>\"></canvas>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;