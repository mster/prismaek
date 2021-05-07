"use strict";

module.exports = {
  shade,
  tint,
  tone,
};

const {
  isHex,
  isRGB,
  isHSV,
  hex2RGB,
  hsv2RGB,
  rgb2Hex,
  rgb2HSV,
  rgb2HSL,
  isHSL,
  hsl2RGB,
} = require("./utils");

const formatMap = {
  rgb: (e) => e,
  hex: rgb2Hex,
  hsv: rgb2HSV,
  hsl: rgb2HSL,
};

function shade(base, format, step, count) {
  if (!base) throw new Error("Error: arg `base` is required!");

  return effectsBuilder(base, format, step, count, (rgb, shift) => {
    return {
      r: Math.min(Math.round(+rgb.r * (1 - shift)), 255),
      g: Math.min(Math.round(+rgb.g * (1 - shift)), 255),
      b: Math.min(Math.round(+rgb.b * (1 - shift)), 255),
      shift,
    };
  });
}

function tint(base, format, step, count) {
  if (!base) throw new Error("Error: arg `base` is required!");

  return effectsBuilder(base, format, step, count, (rgb, shift) => {
    return {
      r: Math.min(Math.round(+rgb.r + (255 - +rgb.r) * shift), 255),
      g: Math.min(Math.round(+rgb.g + (255 - +rgb.g) * shift), 255),
      b: Math.min(Math.round(+rgb.b + (255 - +rgb.b) * shift), 255),
      shift,
    };
  });
}

function tone(base, format, step, count) {
  if (!base) throw new Error("Error: arg `base` is required!");

  return effectsBuilder(base, format, step, count, (rgb, shift) => {
    return {
      r: Math.min(Math.round(+rgb.r + +rgb.r * (0.5 - shift)), 255),
      g: Math.min(Math.round(+rgb.g + +rgb.g * (0.5 - shift)), 255),
      b: Math.min(Math.round(+rgb.b + +rgb.b * (0.5 - shift)), 255),
      shift,
    };
  });
}

function effectsBuilder(
  base,
  format = "hex",
  step = 0.1,
  count = 5,
  applyEffect
) {
  if (isNaN(step) || isNaN(count)) {
    throw new Error(
      `Arguments step and count must be of type number (or coercible). step=${step} count=${count}`
    );
  }
  if (step < 0.01) {
    throw new Error(`Shade step percision must be >= 0.01 (1%). step=${step}`);
  }
  if (count % 1 !== 0) {
    throw new Error(`Shade count must be a whole number. count=${count}`);
  }

  format = format.toLowerCase(); // avoid case sensitivity
  if (!formatMap[format]) {
    throw new Error(`Unsupported format type: ${format}`);
  }

  let constr;
  const constructor = base && (constr = base.constructor.name) ? constr : null;

  if (constructor === "Array") {
    const _results = {};

    let i = 0;
    for (; i < count; i++) {
      const shift = Math.round(i * step * 100) / 100;

      _results[String(shift)] = base.map((color, index) => {
        let hex, hsv, hsl;
        if (
          color &&
          (color.constructor.name === "Object" ||
            color.constructor.name === "String") &&
          (isRGB(color) ||
            (hex = isHex(color)) ||
            (hsv = isHSV(color)) ||
            (hsl = isHSL(color)))
        ) {
          if (hex) color = hex2RGB(color);
          if (hsv) color = hsv2RGB(color);
          if (hsl) color = hsl2RGB(color);

          return formatMap[format](applyEffect(color, shift));
        }

        throw new Error(
          `Invalid color format; unable to generate shades. base, index=${index} color=${color}`
        );
      });
    }

    return _results;
  }

  // valid for hsv or rgb
  let hsv, hsl;
  if (
    constructor === "Object" &&
    (isRGB(base) || (hsv = isHSV(base)) || (hsl = isHSL(base)))
  ) {
    if (hsv) base = hsv2RGB(base);
    if (hsl) base = hsl2RGB(base);

    const _results = [];

    let i = 0;
    for (; i < count; i++) {
      const shift = Math.round(i * step * 100) / 100;
      _results.push(formatMap[format](applyEffect(base, shift)));
    }

    return _results;
  }

  // only valid for singular hex color
  if (constructor === "String") {
    if (base.includes("#")) base = base.replace("#", "");

    if (isHex(base)) {
      const rgb = hex2RGB(base);
      const _results = [];

      let i = 0;
      for (; i < count; i++) {
        const shift = Math.round(i * step * 100) / 100;
        _results.push(formatMap[format](applyEffect(rgb, shift)));
      }

      return _results;
    }

    throw new Error(
      `Invalid color format; unable to generate shades. base=${base}`
    );
  }

  throw new Error(
    `Shade generator requires a valid base color, or array of colors. \nbase.constructor.name=${constructor}`
  );
}
