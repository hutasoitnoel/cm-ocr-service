"use strict";

module.exports = function (data) {
  var totalFields = Object.keys(data).length; // Total number of fields
  var filledFields = Object.values(data).filter(function (value) {
    return value !== undefined && value !== null && value !== '';
  }).length; // Count non-empty fields

  var score = filledFields / totalFields * 100; // Calculate percentage
  return Number(score.toFixed(0)); // Return score rounded to 0 decimal places
};