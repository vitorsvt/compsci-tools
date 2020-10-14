/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/converter.ts":
/*!******************************!*\
  !*** ./scripts/converter.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.decimal_to_binary = exports.binary_to_decimal = exports.decimal_to_gray = void 0;\nexports.decimal_to_gray = (num) => {\n    return (num ^ (num >>> 1)).toString(2);\n};\nexports.binary_to_decimal = (num) => {\n    return parseInt(num, 2);\n};\nexports.decimal_to_binary = (num) => {\n    return num.toString(2);\n};\n\n\n//# sourceURL=webpack:///./scripts/converter.ts?");

/***/ }),

/***/ "./scripts/generator.ts":
/*!******************************!*\
  !*** ./scripts/generator.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.generate_kmap = exports.generate_table = void 0;\nconst tools_1 = __webpack_require__(/*! ./tools */ \"./scripts/tools.ts\");\nconst converter_1 = __webpack_require__(/*! ./converter */ \"./scripts/converter.ts\");\nexports.generate_table = (eq) => {\n    let vars = [];\n    const outputs = [];\n    eq = tools_1.parse_equation(eq.toUpperCase());\n    for (let i = 0; i < eq.length; ++i) {\n        let c = eq.charAt(i);\n        if (c.toLowerCase() != c && !vars.includes(c)) {\n            vars.push(c);\n            eq = eq.replace(new RegExp(c, \"g\"), `tests.${c}`);\n        }\n    }\n    vars = vars.sort();\n    for (let i = 0; i < 2 ** vars.length; ++i) {\n        let binary = converter_1.decimal_to_binary(i);\n        const tests = {};\n        binary = tools_1.pad(binary, vars.length);\n        for (let j = 0; j < vars.length; ++j) {\n            tests[vars[j]] = +binary[j];\n        }\n        outputs.push(Function(\"tests\", `return ${eq}`)(tests));\n    }\n    return { vars, outputs };\n};\nexports.generate_kmap = (table) => {\n    const { vars, outputs } = table;\n    const karnaugh = [];\n    const cols = Math.floor(vars.length / 2);\n    const lines = vars.length - cols;\n    for (let i = 0; i < lines * 2; ++i) {\n        let x = tools_1.pad(converter_1.decimal_to_gray(i), lines);\n        for (let j = 0; j < cols * 2; ++j) {\n            let y = tools_1.pad(converter_1.decimal_to_gray(j), cols);\n            let index = converter_1.binary_to_decimal(x.concat(y));\n            karnaugh.push(outputs[index]);\n        }\n    }\n    return { vars, outputs: karnaugh };\n};\n\n\n//# sourceURL=webpack:///./scripts/generator.ts?");

/***/ }),

/***/ "./scripts/main.ts":
/*!*************************!*\
  !*** ./scripts/main.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst converter_1 = __webpack_require__(/*! ./converter */ \"./scripts/converter.ts\");\nconst generator_1 = __webpack_require__(/*! ./generator */ \"./scripts/generator.ts\");\nconst render_1 = __webpack_require__(/*! ./render */ \"./scripts/render.ts\");\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const decimal_to_binary_in = (document.getElementById(\"decimal-to-binary-in\"));\n    decimal_to_binary_in.addEventListener(\"change\", () => {\n        const num = parseInt(decimal_to_binary_in.value);\n        const out = (document.getElementById(\"decimal-to-binary-out\"));\n        out.innerHTML = converter_1.decimal_to_binary(num);\n    });\n    const equation_in = (document.getElementById(\"equation-in\"));\n    equation_in.addEventListener(\"change\", () => {\n        const equation = equation_in.value;\n        try {\n            const table = generator_1.generate_table(equation);\n            const kmap = generator_1.generate_kmap(table);\n            render_1.render_table(table);\n        }\n        catch {\n            console.log(\"Error\");\n        }\n    });\n});\n\n\n//# sourceURL=webpack:///./scripts/main.ts?");

/***/ }),

/***/ "./scripts/render.ts":
/*!***************************!*\
  !*** ./scripts/render.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.render_table = void 0;\nconst tools_1 = __webpack_require__(/*! ./tools */ \"./scripts/tools.ts\");\nexports.render_table = (table_info) => {\n    const { vars, outputs } = table_info;\n    const table = document.getElementById(\"equation-table\");\n    table.innerHTML = \"\";\n    let tr = document.createElement(\"tr\");\n    for (let i = 0; i < vars.length; ++i) {\n        let th = document.createElement(\"th\");\n        th.innerHTML = vars[i];\n        tr.appendChild(th);\n    }\n    let th = document.createElement(\"th\");\n    th.innerHTML = \"S\";\n    tr.appendChild(th);\n    table.appendChild(tr);\n    for (let i = 0; i < outputs.length; ++i) {\n        let tr = document.createElement(\"tr\");\n        let bin = i.toString(2);\n        bin = tools_1.pad(bin, vars.length);\n        for (let j = 0; j < vars.length; ++j) {\n            let td = document.createElement(\"td\");\n            td.innerHTML = bin[j];\n            tr.appendChild(td);\n        }\n        let td = document.createElement(\"td\");\n        td.innerHTML = outputs[i].toString();\n        tr.appendChild(td);\n        table.appendChild(tr);\n    }\n};\n\n\n//# sourceURL=webpack:///./scripts/render.ts?");

/***/ }),

/***/ "./scripts/tools.ts":
/*!**************************!*\
  !*** ./scripts/tools.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.parse_equation = exports.pad = void 0;\nexports.pad = (str, length) => {\n    str = \"0\".repeat(length).substr(str.length) + str;\n    return str;\n};\nexports.parse_equation = (str) => {\n    const syntax = {\n        AND: \"&\",\n        \"\\\\.\": \"&\",\n        \"&&\": \"&\",\n        XOR: \"^\",\n        OR: \"|\",\n        \"\\\\+\": \"|\",\n        \"\\\\|\\\\|\": \"|\",\n        NOT: \"!\",\n    };\n    Object.keys(syntax).forEach((l) => {\n        str = str.replace(new RegExp(l, \"g\"), syntax[l]);\n    });\n    return str;\n};\n\n\n//# sourceURL=webpack:///./scripts/tools.ts?");

/***/ })

/******/ });