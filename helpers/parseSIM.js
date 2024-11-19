"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var calculateScore = require('./calculateScore');
var findAddress = function findAddress(text) {
  var lines = text.split('\n').map(function (line) {
    return line.trim();
  }); // Split text into lines and trim spaces
  var result = ''; // Initialize result string
  var capture = false; // Start capturing flag
  var _iterator = _createForOfIteratorHelper(lines),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var line = _step.value;
      if (line.startsWith('4.')) {
        capture = true; // Start capturing after "4."
        result += line.replace('4.', '').trim() + ' '; // Add the first line (remove "4.")
      } else if (line.includes('5.')) {
        capture = false; // Stop capturing if the line includes "5."
        break;
      } else if (capture) {
        result += line + ' '; // Append subsequent lines
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result.trim(); // Return the final trimmed address
};
var findValidity = function findValidity(text) {
  var matches = text.match(/\d{2}-\d{2}-\d{4}/g); // Find all date-like patterns
  return matches ? matches[matches.length - 1] : null; // Return the last match
};
var refineData = function refineData(data, text) {
  try {
    return _objectSpread(_objectSpread({}, data), {}, {
      address: findAddress(text)
    });
  } catch (err) {
    return data;
  }
};
module.exports = function (text) {
  var _text$match, _text$match2, _text$match3, _text$match4, _text$match5, _text$match6, _text$match7, _text$match8;
  var data = {
    type: 'SIM',
    name: (_text$match = text.match(/1\.\s*(.*)/)) === null || _text$match === void 0 || (_text$match = _text$match[1]) === null || _text$match === void 0 ? void 0 : _text$match.trim(),
    // Line starting with "1."
    dob: (_text$match2 = text.match(/2\.\s*(.*)/)) === null || _text$match2 === void 0 || (_text$match2 = _text$match2[1]) === null || _text$match2 === void 0 ? void 0 : _text$match2.trim(),
    // Line starting with "2."
    blood_type: (_text$match3 = text.match(/3\.\s*(.*)/)) === null || _text$match3 === void 0 || (_text$match3 = _text$match3[1]) === null || _text$match3 === void 0 || (_text$match3 = _text$match3.split('-')[0]) === null || _text$match3 === void 0 ? void 0 : _text$match3.trim(),
    // Line starting with "3." (before "-")
    gender: (_text$match4 = text.match(/3\.\s*(.*)/)) === null || _text$match4 === void 0 || (_text$match4 = _text$match4[1]) === null || _text$match4 === void 0 || (_text$match4 = _text$match4.split('-')[1]) === null || _text$match4 === void 0 ? void 0 : _text$match4.trim(),
    // Line starting with "3." (after "-")
    address: (_text$match5 = text.match(/4\.\s*(.*)/)) === null || _text$match5 === void 0 || (_text$match5 = _text$match5[1]) === null || _text$match5 === void 0 ? void 0 : _text$match5.trim(),
    // Line starting with "4."
    occupation: (_text$match6 = text.match(/5\.\s*(.*)/)) === null || _text$match6 === void 0 || (_text$match6 = _text$match6[1]) === null || _text$match6 === void 0 ? void 0 : _text$match6.trim(),
    // Line starting with "5."
    place_of_issue: (_text$match7 = text.match(/6\.\s*(.*)/)) === null || _text$match7 === void 0 || (_text$match7 = _text$match7[1]) === null || _text$match7 === void 0 ? void 0 : _text$match7.trim().split(/\s/)[0],
    expiration_date: findValidity(text),
    // Line starting with "6."
    id_number: (_text$match8 = text.match(/[\w$]{4}-[\w$]{4}-[\w$]{6}/)) === null || _text$match8 === void 0 || (_text$match8 = _text$match8[0]) === null || _text$match8 === void 0 ? void 0 : _text$match8.trim() // License number pattern
  };
  var result = refineData(data, text);
  return {
    score: calculateScore(result),
    data: result
  };
};