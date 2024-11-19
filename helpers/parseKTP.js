"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var calculateScore = require('./calculateScore');
var refineData = function refineData(data) {
  var _data$religion, _data$marital_status, _data$sub_district, _data$district, _data$citizenship, _data$expiration_date;
  return _objectSpread(_objectSpread({}, data), {}, {
    religion: ((_data$religion = data.religion) === null || _data$religion === void 0 ? void 0 : _data$religion.split(/\s/)[0]) || data.religion,
    marital_status: ((_data$marital_status = data.marital_status) === null || _data$marital_status === void 0 ? void 0 : _data$marital_status.split(/\s/)[0]) || data.marital_status,
    sub_district: ((_data$sub_district = data.sub_district) === null || _data$sub_district === void 0 ? void 0 : _data$sub_district.split(/\s/)[0]) || data.sub_district,
    district: ((_data$district = data.district) === null || _data$district === void 0 ? void 0 : _data$district.split(/\s/)[0]) || data.district,
    citizenship: ((_data$citizenship = data.citizenship) === null || _data$citizenship === void 0 ? void 0 : _data$citizenship.split(/\s/)[0]) || data.citizenship,
    expiration_date: ((_data$expiration_date = data.expiration_date) === null || _data$expiration_date === void 0 ? void 0 : _data$expiration_date.split(/\s/)[0]) || data.expiration_date
  });
};
module.exports = function (text) {
  var _text$match, _text$match2, _text$match3, _text$match4, _text$match5, _text$match6, _text$match7, _text$match8, _text$match9, _text$match10, _text$match11, _text$match12, _text$match13, _text$match14, _text$match15, _text$match16;
  var data = {
    type: 'KTP',
    province: (_text$match = text.match(/PROVINSI\s+(.*)/i)) === null || _text$match === void 0 || (_text$match = _text$match[1]) === null || _text$match === void 0 ? void 0 : _text$match.trim(),
    city: (_text$match2 = text.match(/JAKARTA\s+BARAT/i)) === null || _text$match2 === void 0 || (_text$match2 = _text$match2[0]) === null || _text$match2 === void 0 ? void 0 : _text$match2.trim(),
    id_number: (_text$match3 = text.match(/NIK\s*:\s*([\d]+)/i)) === null || _text$match3 === void 0 || (_text$match3 = _text$match3[1]) === null || _text$match3 === void 0 ? void 0 : _text$match3.trim(),
    name: (_text$match4 = text.match(/Nama\s*:\s*(.*)/i)) === null || _text$match4 === void 0 || (_text$match4 = _text$match4[1]) === null || _text$match4 === void 0 ? void 0 : _text$match4.trim(),
    dob: (_text$match5 = text.match(/Tempat.*:\s*(.*)/i)) === null || _text$match5 === void 0 || (_text$match5 = _text$match5[1]) === null || _text$match5 === void 0 ? void 0 : _text$match5.trim(),
    gender: (_text$match6 = text.match(/Jenis Kelamin\s*:\s*(\w+)/i)) === null || _text$match6 === void 0 || (_text$match6 = _text$match6[1]) === null || _text$match6 === void 0 ? void 0 : _text$match6.trim(),
    blood_type: (_text$match7 = text.match(/Gol\. Darah\s*:\s*(\w+)/i)) === null || _text$match7 === void 0 || (_text$match7 = _text$match7[1]) === null || _text$match7 === void 0 ? void 0 : _text$match7.trim(),
    address: (_text$match8 = text.match(/Alamat\s*:\s*(.*)/i)) === null || _text$match8 === void 0 || (_text$match8 = _text$match8[1]) === null || _text$match8 === void 0 ? void 0 : _text$match8.trim(),
    rt_rw: (_text$match9 = text.match(/RTRW\s*:\s*([\d\/]+)/i)) === null || _text$match9 === void 0 || (_text$match9 = _text$match9[1]) === null || _text$match9 === void 0 ? void 0 : _text$match9.trim(),
    sub_district: (_text$match10 = text.match(/(?:KeliDesa.*?:|Kel\/Desa\s*:\s*)(.*)/i)) === null || _text$match10 === void 0 || (_text$match10 = _text$match10[1]) === null || _text$match10 === void 0 ? void 0 : _text$match10.trim(),
    district: (_text$match11 = text.match(/Kecamatan\s*:\s*(.*)/i)) === null || _text$match11 === void 0 || (_text$match11 = _text$match11[1]) === null || _text$match11 === void 0 ? void 0 : _text$match11.trim(),
    religion: (_text$match12 = text.match(/Agama\s*:\s*(.*)/i)) === null || _text$match12 === void 0 || (_text$match12 = _text$match12[1]) === null || _text$match12 === void 0 ? void 0 : _text$match12.trim(),
    marital_status: (_text$match13 = text.match(/Status Perkawinan\s*:\s*(.*)/i)) === null || _text$match13 === void 0 || (_text$match13 = _text$match13[1]) === null || _text$match13 === void 0 ? void 0 : _text$match13.trim(),
    occupation: (_text$match14 = text.match(/Pekerjaan\s*:\s*(.*)/i)) === null || _text$match14 === void 0 || (_text$match14 = _text$match14[1]) === null || _text$match14 === void 0 ? void 0 : _text$match14.trim(),
    citizenship: (_text$match15 = text.match(/Kewarganegaraan\s*:\s*(.*)/i)) === null || _text$match15 === void 0 || (_text$match15 = _text$match15[1]) === null || _text$match15 === void 0 ? void 0 : _text$match15.trim(),
    expiration_date: (_text$match16 = text.match(/Berlaku Hingga\s*:\s*(.*)/i)) === null || _text$match16 === void 0 || (_text$match16 = _text$match16[1]) === null || _text$match16 === void 0 ? void 0 : _text$match16.trim()
  };
  var result = refineData(data);
  return {
    score: calculateScore(result),
    data: result
  };
};