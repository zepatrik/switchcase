(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	function switchcase(cases={},strict) {
		const switches = [];
		for(let key in cases) {
			try {
				key = Function("return " + key)();
			} catch(e) { ; }
			switches.push([key,cases[key]]);
		}
		const switcher = (value) => { 
			for(let item of switches) {
				const key = item[0],
					type = typeof(key);
				if((key && type==="object" && key instanceof RegExp && key.test(value)) || (type==="function" && key(value)) || (strict && key===value) || (!strict && key==value)) {
					return item[1];
				}
			} 
			return switcher.otherwise; 
		}
		switcher.otherwise = cases.default;
		switcher.case = (test,value) => {
			switches.push([test,value]);
			return switcher;
		}
		switcher.default = (value) => {
			switcher.otherwise = value;
			return switcher;
		}
		switcher.match = (value) => switcher(value);
		return switcher;
	}
	
	if(typeof(module)!=="undefined") {
		module.exports = switchcase;
	} 
	if(typeof(window)!=="undefined") {
		window.switchcase = switchcase;
	}
})();

},{}]},{},[1]);
