"use strict";

module.exports = {
  rgb2Hex,
  rgb2HSV,
  rgb2HSL,
  hex2RGB,
  hex2HSV,
  hex2HSL,
  hsv2RGB,
  hsv2Hex,
  hsv2HSL,
  hsl2RGB,
  hsl2Hex,
  hsl2HSV,
  isHex,
  isRGB,
  isHSV,
  isHSL,
  cspace,
  xspace,
  shiftDegrees,
};

const SUPPORTED_SPACES = require("./spaces");

function hex2RGB(hex) {
  if (!isHex(hex)) {
    throw new Error(`Invalid hex color string: ${hex}`);
  }

  if (hex.includes("#")) hex = hex.replace("#", "");

  const r = parseInt(hex[0] + hex[1], 16);
  const g = parseInt(hex[2] + hex[3], 16);
  const b = parseInt(hex[4] + hex[5], 16);

  return { r, g, b };
}

function hex2HSV(hex) {
  const rgb = hex2RGB(hex);
  const hsv = rgb2HSV(rgb);
  return hsv;
}

function hex2HSL(hex) {
  const rgb = hex2RGB(hex);
  const hsl = rgb2HSL(rgb);
  return hsl;
}

function rgb2Hex(rgb) {
  if (!isRGB(rgb)) {
    throw new Error(`Invalid RGB color object: ${rgb}`);
  }

  const rHex = (+rgb.r).toString(16);
  const gHex = (+rgb.g).toString(16);
  const bHex = (+rgb.b).toString(16);

  return `${rHex.length > 1 ? rHex : "0" + rHex}${
    gHex.length > 1 ? gHex : "0" + gHex
  }${bHex.length > 1 ? bHex : "0" + bHex}`.toUpperCase();
}

function rgb2HSV(rgb) {
  if (!isRGB(rgb)) {
    throw new Error(`Invalid RGB color object: ${rgb}`);
  }

  const { r, g, b, ...rest } = rgb;

  const rPrime = r / 255;
  const gPrime = g / 255;
  const bPrime = b / 255;

  const cMax = Math.max(rPrime, gPrime, bPrime);
  const cMin = Math.min(rPrime, gPrime, bPrime);

  const delta = cMax - cMin;

  let h = 0;
  switch (true) {
    case cMax === rPrime && (cMax !== gPrime || cMax !== bPrime):
      h = 60 * (((gPrime - bPrime) / delta) % 6);
      break;
    case cMax === gPrime && (cMax !== rPrime || cMax !== bPrime):
      h = 60 * ((bPrime - rPrime) / delta + 2);
      break;
    case cMax === bPrime && (cMax !== gPrime || cMax !== rPrime):
      h = 60 * ((rPrime - gPrime) / delta + 4);
      break;
  }

  if (h < 0) h = 360 + h;

  let s = cMax === 0 ? 0 : delta / cMax;
  let v = cMax;

  h = round(h, 0);
  s = round(s, 3);
  v = round(v, 3);

  return { h, s, v, ...rest };
}

function rgb2HSL(rgb) {
  if (!isRGB(rgb)) {
    throw new Error(`Invalid RGB color object: ${rgb}`);
  }

  const { r, g, b, ...rest } = rgb;

  const rPrime = r / 255;
  const gPrime = g / 255;
  const bPrime = b / 255;

  const cMax = Math.max(rPrime, gPrime, bPrime);
  const cMin = Math.min(rPrime, gPrime, bPrime);

  const delta = cMax - cMin;

  let h = 0;
  switch (true) {
    case cMax === rPrime && (cMax !== gPrime || cMax !== bPrime):
      h = 60 * (((gPrime - bPrime) / delta) % 6);
      break;
    case cMax === gPrime && (cMax !== rPrime || cMax !== bPrime):
      h = 60 * ((bPrime - rPrime) / delta + 2);
      break;
    case cMax === bPrime && (cMax !== gPrime || cMax !== rPrime):
      h = 60 * ((rPrime - gPrime) / delta + 4);
      break;
  }

  if (h < 0) h = 360 + h;
  let l = (cMax + cMin) / 2;
  let s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  h = round(h, 0);
  s = round(s, 3);
  l = round(l, 3);

  return { h, s, l, ...rest };
}

function hsv2RGB(hsv) {
  if (!isHSV(hsv)) {
    throw new Error(`Invalid HSV color object: ${hsv}`);
  }

  const { h, s, v, ...rest } = hsv;

  const c = +v * +s;
  const x = c * (1 - Math.abs(((+h / 60) % 2) - 1));
  const m = +v - c;

  let rPrime = 0,
    gPrime = 0,
    bPrime = 0;

  switch (true) {
    case h < 60:
      rPrime = c;
      gPrime = x;
      bPrime = 0;
      break;
    case h < 120:
      rPrime = x;
      gPrime = c;
      bPrime = 0;
      break;
    case h < 180:
      rPrime = 0;
      gPrime = c;
      bPrime = x;
      break;
    case h < 240:
      rPrime = 0;
      gPrime = x;
      bPrime = c;
      break;
    case h < 300:
      rPrime = x;
      gPrime = 0;
      bPrime = c;
      break;
    default:
      rPrime = c;
      gPrime = 0;
      bPrime = x;
      break;
  }

  const r = Math.round((rPrime + m) * 255);
  const g = Math.round((gPrime + m) * 255);
  const b = Math.round((bPrime + m) * 255);

  return { r, g, b, ...rest };
}

function hsv2Hex(hsv) {
  const rgb = hsv2RGB(hsv);
  const hex = rgb2Hex(rgb);
  return hex;
}

function hsv2HSL(hsv) {
  const rgb = hsv2RGB(hsv);
  const hsl = rgb2HSL(rgb);
  return hsl;
}

function hsl2RGB(hsl) {
  if (!isHSL(hsl)) {
    throw new Error(`Invalid HSV color object: ${hsl}`);
  }

  const { h, s, l, ...rest } = hsl;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let rPrime = 0,
    gPrime = 0,
    bPrime = 0;

  switch (true) {
    case h < 60:
      rPrime = c;
      gPrime = x;
      bPrime = 0;
      break;
    case h >= 60 && h < 120:
      rPrime = x;
      gPrime = c;
      bPrime = 0;
      break;
    case h >= 120 && h < 180:
      rPrime = 0;
      gPrime = c;
      bPrime = x;
      break;
    case h >= 180 && h < 240:
      rPrime = 0;
      gPrime = x;
      bPrime = c;
      break;
    case h >= 240 && h < 300:
      rPrime = x;
      gPrime = 0;
      bPrime = c;
      break;
    default:
      rPrime = c;
      gPrime = 0;
      bPrime = x;
      break;
  }

  const r = Math.round((rPrime + m) * 255);
  const g = Math.round((gPrime + m) * 255);
  const b = Math.round((bPrime + m) * 255);

  return { r, g, b, ...rest };
}

function hsl2Hex(hsl) {
  if (!isHSL(hsl)) {
    throw new Error(`Invalid HSV color object: ${hsl}`);
  }

  const rgb = hsl2RGB(hsl);
  const hex = rgb2Hex(rgb);

  return hex;
}

function hsl2HSV(hsl) {
  if (!isHSL(hsl)) {
    throw new Error(`Invalid HSV color object: ${hsl}`);
  }

  const rgb = hsl2RGB(hsl);
  const hsv = rgb2HSV(rgb);

  return hsv;
}

function isHex(hexString) {
  if (!hexString || hexString.constructor.name !== "String") return false;
  if (hexString.includes("#")) hexString = hexString.replace("#", "");
  return /[\da-f]{6}/i.test(hexString) && hexString.length === 6;
}

function isRGB(rgbObj) {
  if (
    rgbObj &&
    rgbObj.constructor.name === "Object" &&
    !isNaN(rgbObj.r) &&
    !isNaN(rgbObj.g) &&
    !isNaN(rgbObj.b) &&
    +rgbObj.r < 256 &&
    +rgbObj.r >= 0 &&
    +rgbObj.g < 256 &&
    +rgbObj.g >= 0 &&
    +rgbObj.b < 256 &&
    +rgbObj.b >= 0
  ) {
    return true;
  }

  return false;
}

function isHSV(hsvObj) {
  if (
    hsvObj &&
    hsvObj.constructor.name === "Object" &&
    !isNaN(hsvObj.h) &&
    !isNaN(hsvObj.s) &&
    !isNaN(hsvObj.v) &&
    +hsvObj.h < 360 &&
    +hsvObj.h >= 0 &&
    +hsvObj.s <= 1 &&
    +hsvObj.s >= 0 &&
    +hsvObj.v <= 1 &&
    +hsvObj.v >= 0
  ) {
    return true;
  }

  return false;
}

function isHSL(hslObj) {
  if (
    hslObj &&
    hslObj.constructor.name === "Object" &&
    !isNaN(hslObj.h) &&
    !isNaN(hslObj.s) &&
    !isNaN(hslObj.l) &&
    +hslObj.h < 360 &&
    +hslObj.h >= 0 &&
    +hslObj.s <= 1 &&
    +hslObj.s >= 0 &&
    +hslObj.l <= 1 &&
    +hslObj.l >= 0
  ) {
    return true;
  }

  return false;
}

function cspace(color) {
  if (isRGB(color)) return "rgb";
  if (isHex(color)) return "hex";
  if (isHSV(color)) return "hsv";
  if (isHSL(color)) return "hsl";

  return null;
}

function xspace(color, map) {
  let space;
  if (!color || !(space = cspace(color)))
    throw new Error("Cannot transform color space: Invalid color");

  if (!map || !SUPPORTED_SPACES.includes(map))
    throw new Error("Unrecognized color space, cannot transform.");

  map = map.toLowerCase();

  switch (true) {
    case space === "rgb":
      if (map === "rgb") return color;
      if (map === "hex") return rgb2Hex(color);
      if (map === "hsv") return rgb2HSV(color);
      if (map === "hsl") return rgb2HSL(color);
      break;
    case space === "hex":
      if (map === "hex") return color;
      if (map === "rgb") return hex2RGB(color);
      if (map === "hsv") return hex2HSV(color);
      if (map === "hsl") return hex2HSL(color);
      break;
    case space === "hsv":
      if (map === "hsv") return color;
      if (map === "rgb") return hsv2RGB(color);
      if (map === "hex") return hsv2Hex(color);
      if (map === "hsl") return hsv2HSL(color);
      break;
    case space === "hsl":
      if (map === "hsl") return color;
      if (map === "rgb") return hsl2RGB(color);
      if (map === "hex") return hsl2Hex(color);
      if (map === "hsv") return hsl2HSV(color);
      break;
    default:
      throw new Error("Invalid color space; unable to transform.");
  }
}

function shiftDegrees(degree, shift) {
  if (shift >= 360 || shift <= -360) shift = shift % 360;
  if (degree + shift < 360) return degree + shift;
  return degree + shift - 360;
}

function round(num, precision) {
  if (isNaN(precision) || precision < 0 || precision > 21) {
    throw new Error(
      "Unable to round. Precision must be of type number with value between 1 - 21."
    );
  }

  const base = Number(`1e${precision}`);
  return Math.round(num * base) / base;
}
