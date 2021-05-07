"use strict";

module.exports = {
  complementary,
  splitComplementary,
  triadic,
  tetradic,
  analagous,
  stepSixty,
  analagousTight,
};

const SUPPORTED_SPACES = require("./spaces");
const { shiftDegrees, xspace, cspace } = require("./utils");

function complementary(color, format = "hsv") {
  format = format.toLowerCase();

  const { h, s, v, ...rest } = preValidation(color, format);

  const harmony = [
    { h, s, v, ...rest },
    { h: shiftDegrees(+h, 180), s, v, ...rest },
  ];

  return postFormat(harmony, format);
}

function splitComplementary(color, format = "hsv") {
  format = format.toLowerCase();

  const { h, s, v, ...rest } = preValidation(color, format);

  const harmony = [
    { h, s, v, ...rest },
    { h: shiftDegrees(+h, 150), s, v, ...rest },
    { h: shiftDegrees(+h, 210), s, v, ...rest },
  ];

  return postFormat(harmony, format);
}

function triadic(color, format = "hsv") {
  format = format.toLowerCase();

  const { h, s, v, ...rest } = preValidation(color, format);

  const harmony = [
    { h, s, v, ...rest },
    { h: shiftDegrees(+h, 120), s, v, ...rest },
    { h: shiftDegrees(+h, 240), s, v, ...rest },
  ];

  return postFormat(harmony, format);
}

function tetradic(color, format = "hsv") {
  format = format.toLowerCase();

  const { h, s, v, ...rest } = preValidation(color, format);

  const harmony = [
    { h, s, v, ...rest },
    { h: shiftDegrees(+h, 90), s, v, ...rest },
    { h: shiftDegrees(+h, 180), s, v, ...rest },
    { h: shiftDegrees(+h, 270), s, v, ...rest },
  ];

  return postFormat(harmony, format);
}

function analagous(color, format = "hsv") {
  format = format.toLowerCase();

  const { h, s, v, ...rest } = preValidation(color, format);

  const harmony = [
    { h, s, v, ...rest },
    { h: shiftDegrees(+h, 30), s, v, ...rest },
    { h: shiftDegrees(+h, 60), s, v, ...rest },
    { h: shiftDegrees(+h, 90), s, v, ...rest },
  ];

  return postFormat(harmony, format);
}

function stepSixty(color, format = "hsv") {
  format = format.toLowerCase();

  const { h, s, v, ...rest } = preValidation(color, format);

  const harmony = [
    { h, s, v, ...rest },
    { h: shiftDegrees(+h, 60), s, v, ...rest },
    { h: shiftDegrees(+h, 120), s, v, ...rest },
    { h: shiftDegrees(+h, 180), s, v, ...rest },
    { h: shiftDegrees(+h, 240), s, v, ...rest },
    { h: shiftDegrees(+h, 300), s, v, ...rest },
  ];

  return postFormat(harmony, format);
}

function analagousTight(color, format = "hsv") {
  format = format.toLowerCase();

  const { h, s, v, ...rest } = preValidation(color, format);

  const harmony = [
    { h, s, v, ...rest },
    { h: shiftDegrees(+h, 15), s, v, ...rest },
    { h: shiftDegrees(+h, 30), s, v, ...rest },
    { h: shiftDegrees(+h, 45), s, v, ...rest },
    { h: shiftDegrees(+h, 60), s, v, ...rest },
    { h: shiftDegrees(+h, 75), s, v, ...rest },
    { h: shiftDegrees(+h, 90), s, v, ...rest },
  ];

  return postFormat(harmony, format);
}

function preValidation(color, space) {
  if (cspace(color) === null)
    throw new Error("Invalid color, unable to produce harmony.");

  if (space && !SUPPORTED_SPACES.includes(space))
    throw new Error("Unsupport color space, unable to produce harmony.");

  return xspace(color, "hsv");
}

function postFormat(harmony, space) {
  if (space === "hsv") return harmony;

  return harmony.map((color) => xspace(color, space));
}
