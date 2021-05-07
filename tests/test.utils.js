"use strict";

const { utils } = require("../index");

describe("Color space check", () => {
  test("isRGB should return a boolean true/false depending on if the passed argument is in proper form.", () => {
    const { isRGB } = utils;

    const undef = undefined;
    expect(isRGB(undef)).toEqual(false);

    const completeRGB = { r: 100, g: 20, b: 12 };
    expect(isRGB(completeRGB)).toEqual(true);

    const partialRGB = { r: 254, b: 69 };
    expect(isRGB(partialRGB)).toEqual(false);

    const outOfRangeRGB = { r: 255, b: 0, g: 256 };
    expect(isRGB(outOfRangeRGB)).toEqual(false);

    const negativeRGB = { r: 0, b: -1, g: 56 };
    expect(isRGB(negativeRGB)).toEqual(false);

    const hex = "#53A8AD";
    expect(isRGB(hex)).toEqual(false);
  });

  test("isHex should return a boolean true/false depending on if the passed argument is in proper form.", () => {
    const { isHex } = utils;

    const undef = undefined;
    expect(isHex(undef)).toEqual(false);

    const completeHex = "#982892";
    expect(isHex(completeHex)).toEqual(true);

    const numericHex = "28982E";
    expect(isHex(numericHex)).toEqual(true);

    const nonHex = "foobar";
    expect(isHex(nonHex)).toEqual(false);

    const partialHex = "#28982";
    expect(isHex(partialHex)).toEqual(false);

    const outOfRangeHex = "#100FFFF";
    expect(isHex(outOfRangeHex)).toEqual(false);

    const hsv = { h: 12, s: 0.54, v: 0.965 };
    expect(isHex(hsv)).toEqual(false);
  });

  test("isHSV should return a boolean true/false depending on if the passed argument is in proper form.", () => {
    const { isHSV } = utils;

    const undef = undefined;
    expect(isHSV(undef)).toEqual(false);

    const completeHSV = { h: 100, s: 0.2, v: 0.12 };
    expect(isHSV(completeHSV)).toEqual(true);

    const partialHSV = { h: 254, s: 0.69 };
    expect(isHSV(partialHSV)).toEqual(false);

    const outOfRangeHue = { h: 361, s: 0.1, v: 0.256 };
    expect(isHSV(outOfRangeHue)).toEqual(false);

    const outOfRangeValue = { h: 359, s: 0.1, v: 1.1 };
    expect(isHSV(outOfRangeValue)).toEqual(false);

    const negativeHSV = { h: 102, s: -0.59, v: 0.59 };
    expect(isHSV(negativeHSV)).toEqual(false);

    const rgb = { r: 12, g: 255, b: 67 };
    expect(isHSV(rgb)).toEqual(false);
  });

  test("isHSL should return a boolean true/false depending on if the passed argument is in proper form.", () => {
    const { isHSL } = utils;

    const undef = undefined;
    expect(isHSL(undef)).toEqual(false);

    const completeHSL = { h: 100, s: 0.2, l: 0.12 };
    expect(isHSL(completeHSL)).toEqual(true);

    const partialHSL = { h: 254, s: 0.69 };
    expect(isHSL(partialHSL)).toEqual(false);

    const outOfRangeHue = { h: 361, s: 0.1, l: 0.256 };
    expect(isHSL(outOfRangeHue)).toEqual(false);

    const outOfRangeLightness = { h: 359, s: 0.1, l: 1.1 };
    expect(isHSL(outOfRangeLightness)).toEqual(false);

    const negativeHSL = { h: 102, s: -0.59, l: 0.59 };
    expect(isHSL(negativeHSL)).toEqual(false);

    const hsv = { h: 12, s: 0.255, v: 0.67 };
    expect(isHSL(hsv)).toEqual(false);
  });
});

describe("Color conversion", () => {
  test("hex2RGB should properly convert color space from hex to RGB.", () => {
    const { hex2RGB } = utils;

    const bases = ["#289866", "#2E2898", "#98285A", "#929828"];
    const expecteds = [
      { r: 40, g: 152, b: 102 },
      { r: 46, g: 40, b: 152 },
      { r: 152, g: 40, b: 90 },
      { r: 146, g: 152, b: 40 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hex2RGB(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hex2RGB should throw when passed an invalid argument.", () => {
    const { hex2RGB } = utils;

    const notHex = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hex2RGB(notHex);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hex2RGB(undef);
    }).toThrow();
  });

  test("hex2HSV should properly convert color space from hex to HSV.", () => {
    const { hex2HSV } = utils;

    const bases = ["#487A20", "#20757A", "#51207A", "#7A2420"];
    const expecteds = [
      { h: 93, s: 0.738, v: 0.478 },
      { h: 183, s: 0.738, v: 0.478 },
      { h: 273, s: 0.738, v: 0.478 },
      { h: 3, s: 0.738, v: 0.478 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hex2HSV(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hex2HSV should throw when passed an invalid argument.", () => {
    const { hex2HSV } = utils;

    const notHex = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hex2HSV(notHex);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hex2HSV(undef);
    }).toThrow();
  });

  test("hex2HSL should properly convert color space from hex to HSL.", () => {
    const { hex2HSL } = utils;

    const bases = ["#289866", "#2E2898", "#98285A", "#929828"];
    const expecteds = [
      { h: 153, s: 0.583, l: 0.376 },
      { h: 243, s: 0.583, l: 0.376 },
      { h: 333, s: 0.583, l: 0.376 },
      { h: 63, s: 0.583, l: 0.376 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hex2HSL(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hex2HSL should throw when passed an invalid argument.", () => {
    const { hex2HSL } = utils;

    const notHex = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hex2HSL(notHex);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hex2HSL(undef);
    }).toThrow();
  });

  test("rgb2Hex should properly convert color space from RGB to hex.", () => {
    const { rgb2Hex } = utils;

    const bases = [
      { r: 40, g: 152, b: 102 },
      { r: 46, g: 40, b: 152 },
      { r: 152, g: 40, b: 90 },
      { r: 146, g: 152, b: 40 },
      { r: 0, g: 0, b: 0 },
    ];
    const expecteds = ["289866", "2E2898", "98285A", "929828", "000000"];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = rgb2Hex(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("rgb2Hex should throw when passed an invalid argument.", () => {
    const { rgb2Hex } = utils;

    const notRgb = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      rgb2Hex(notRgb);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      rgb2Hex(undef);
    }).toThrow();
  });

  test("rgb2HSV should properly convert color space from RGB to HSV.", () => {
    const { rgb2HSV } = utils;

    const bases = [
      { r: 40, g: 152, b: 102 },
      { r: 46, g: 40, b: 152 },
      { r: 152, g: 40, b: 90 },
      { r: 146, g: 152, b: 40 },
      { r: 0, g: 0, b: 0 },
    ];
    const expecteds = [
      { h: 153, s: 0.737, v: 0.596 },
      { h: 243, s: 0.737, v: 0.596 },
      { h: 333, s: 0.737, v: 0.596 },
      { h: 63, s: 0.737, v: 0.596 },
      { h: 0, s: 0.0, v: 0.0 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = rgb2HSV(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("rgb2HSV should throw when passed an invalid argument.", () => {
    const { rgb2HSV } = utils;

    const notRgb = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      rgb2HSV(notRgb);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      rgb2HSV(undef);
    }).toThrow();
  });

  test("rgb2HSL should properly convert color space from RGB to HSL.", () => {
    const { rgb2HSL } = utils;

    const bases = [
      { r: 40, g: 152, b: 102 },
      { r: 46, g: 40, b: 152 },
      { r: 152, g: 40, b: 90 },
      { r: 146, g: 152, b: 40 },
      { r: 0, g: 0, b: 0 },
    ];
    const expecteds = [
      { h: 153, s: 0.583, l: 0.376 },
      { h: 243, s: 0.583, l: 0.376 },
      { h: 333, s: 0.583, l: 0.376 },
      { h: 63, s: 0.583, l: 0.376 },
      { h: 0, s: 0.0, l: 0.0 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = rgb2HSL(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("rgb2HSL should throw when passed an invalid argument.", () => {
    const { rgb2HSL } = utils;

    const notRgb = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      rgb2HSL(notRgb);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      rgb2HSL(undef);
    }).toThrow();
  });

  test("hsv2RGB should properly convert color space from HSV to RGB.", () => {
    const { hsv2RGB } = utils;

    const bases = [
      { h: 153, s: 0.737, v: 0.596 },
      { h: 239, s: 0.737, v: 0.596 },
      { h: 243, s: 0.737, v: 0.596 },
      { h: 333, s: 0.737, v: 0.596 },
      { h: 63, s: 0.737, v: 0.596 },
    ];
    const expecteds = [
      { r: 40, g: 152, b: 102 },
      { r: 40, g: 42, b: 152 },
      { r: 46, g: 40, b: 152 },
      { r: 152, g: 40, b: 90 },
      { r: 146, g: 152, b: 40 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hsv2RGB(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hsv2RGB should throw when passed an invalid argument.", () => {
    const { hsv2RGB } = utils;

    const notHsv = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hsv2RGB(notHsv);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hsv2RGB(undef);
    }).toThrow();
  });

  test("hsv2Hex should properly convert color space from HSV to hex.", () => {
    const { hsv2Hex } = utils;

    const bases = [
      { h: 153, s: 0.737, v: 0.596 },
      { h: 243, s: 0.737, v: 0.596 },
      { h: 333, s: 0.737, v: 0.596 },
      { h: 63, s: 0.737, v: 0.596 },
    ];
    const expecteds = ["289866", "2E2898", "98285A", "929828"];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hsv2Hex(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hsv2Hex should throw when passed an invalid argument.", () => {
    const { hsv2Hex } = utils;

    const notHsv = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hsv2Hex(notHsv);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hsv2Hex(undef);
    }).toThrow();
  });

  test("hsv2HSL should properly convert color space from HSV to HSL.", () => {
    const { hsv2HSL } = utils;

    const bases = [
      { h: 153, s: 0.737, v: 0.596 },
      { h: 243, s: 0.737, v: 0.596 },
      { h: 333, s: 0.737, v: 0.596 },
      { h: 63, s: 0.737, v: 0.596 },
    ];
    const expecteds = [
      { h: 153, s: 0.583, l: 0.376 },
      { h: 243, s: 0.583, l: 0.376 },
      { h: 333, s: 0.583, l: 0.376 },
      { h: 63, s: 0.583, l: 0.376 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hsv2HSL(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hsv2HSL should throw when passed an invalid argument.", () => {
    const { hsv2HSL } = utils;

    const notHsv = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hsv2HSL(notHsv);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hsv2HSL(undef);
    }).toThrow();
  });

  test("hsl2RGB should properly convert color space from HSL to RGB.", () => {
    const { hsl2RGB } = utils;

    const bases = [
      { h: 0, s: 0.0, l: 0.0 },
      { h: 153, s: 0.583, l: 0.376 },
      { h: 181, s: 0.12, l: 0.24 },
      { h: 243, s: 0.583, l: 0.376 },
      { h: 333, s: 0.583, l: 0.376 },
      { h: 63, s: 0.583, l: 0.376 },
    ];
    const expecteds = [
      { r: 0, g: 0, b: 0 },
      { r: 40, g: 152, b: 101 },
      { r: 54, g: 68, b: 69 },
      { r: 46, g: 40, b: 152 },
      { r: 152, g: 40, b: 90 },
      { r: 146, g: 152, b: 40 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hsl2RGB(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hsl2RGB should throw when passed an invalid argument.", () => {
    const { hsl2RGB } = utils;

    const notHsl = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hsl2RGB(notHsl);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hsl2RGB(undef);
    }).toThrow();
  });

  test("hsl2Hex should properly convert color space from HSL to Hex.", () => {
    const { hsl2Hex } = utils;

    const bases = [
      { h: 153, s: 0.583, l: 0.376 },
      { h: 243, s: 0.583, l: 0.376 },
      { h: 333, s: 0.583, l: 0.376 },
      { h: 63, s: 0.583, l: 0.376 },
    ];
    const expecteds = ["289865", "2E2898", "98285A", "929828"];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hsl2Hex(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hsl2Hex should throw when passed an invalid argument.", () => {
    const { hsl2Hex } = utils;

    const notHsl = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hsl2Hex(notHsl);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hsl2Hex(undef);
    }).toThrow();
  });

  test("hsl2HSV should properly convert color space from HSL to HSV.", () => {
    const { hsl2HSV } = utils;

    const bases = [
      { h: 153, s: 0.583, l: 0.376 },
      { h: 243, s: 0.583, l: 0.376 },
      { h: 333, s: 0.583, l: 0.376 },
      { h: 63, s: 0.583, l: 0.376 },
    ];
    const expecteds = [
      { h: 153, s: 0.737, v: 0.596 },
      { h: 243, s: 0.737, v: 0.596 },
      { h: 333, s: 0.737, v: 0.596 },
      { h: 63, s: 0.737, v: 0.596 },
    ];

    for (let index = 0; index < bases.length; index++) {
      const expected = expecteds[index];
      const actual = hsl2HSV(bases[index]);

      expect(actual).toEqual(expected);
    }
  });

  test("hsl2HSV should throw when passed an invalid argument.", () => {
    const { hsl2HSV } = utils;

    const notHsl = { foo: "bar", baz: "qux", quux: "quuz" };
    expect(() => {
      hsl2HSV(notHsl);
    }).toThrow();

    const undef = undefined;
    expect(() => {
      hsl2HSV(undef);
    }).toThrow();
  });
});

describe("Utility", () => {
  test("cspace should return the string name of the color space for the provided color.", () => {
    const { cspace } = utils;

    const rgb = { r: 40, g: 20, b: 0 };
    expect(cspace(rgb)).toEqual("rgb");

    const hex = "#ffffff";
    expect(cspace(hex)).toEqual("hex");

    const hsv = { h: 359, s: 0.999, v: 0.001 };
    expect(cspace(hsv)).toEqual("hsv");

    const hsl = { h: 359, s: 0.999, l: 0.001 };
    expect(cspace(hsl)).toEqual("hsl");
  });

  test("cspace should return null for invalid/unsupported color spaces.", () => {
    const { cspace } = utils;

    const badRgb = { r: 40, g: 20, c: 0 };
    expect(cspace(badRgb)).toEqual(null);

    const badHex = "#666";
    expect(cspace(badHex)).toEqual(null);

    const badHsv = { h: 359, s: 0.999, q: 0.001 };
    expect(cspace(badHsv)).toEqual(null);

    const badHsl = { g: 359, five: 0.999, nine: 0.001 };
    expect(cspace(badHsl)).toEqual(null);
  });

  test("xspace should transform the given color into the provided space.", () => {
    const { xspace } = utils;

    const rgb = { r: 0, g: 0, b: 0 };
    const hex = "000000";
    const hsv = { h: 0, s: 0, v: 0 };
    const hsl = { h: 0, s: 0, l: 0 };

    // rgb to ...
    expect(xspace(rgb, "hex")).toEqual(hex);
    expect(xspace(rgb, "rgb")).toEqual(rgb);
    expect(xspace(rgb, "hsv")).toEqual(hsv);
    expect(xspace(rgb, "hsl")).toEqual(hsl);

    // hex to ...
    expect(xspace(hex, "hex")).toEqual(hex);
    expect(xspace(hex, "rgb")).toEqual(rgb);
    expect(xspace(hex, "hsv")).toEqual(hsv);
    expect(xspace(hex, "hsl")).toEqual(hsl);

    // hsv to ...
    expect(xspace(hsv, "hex")).toEqual(hex);
    expect(xspace(hsv, "rgb")).toEqual(rgb);
    expect(xspace(hsv, "hsv")).toEqual(hsv);
    expect(xspace(hsv, "hsl")).toEqual(hsl);

    // hsl to ...
    expect(xspace(hsl, "hex")).toEqual(hex);
    expect(xspace(hsl, "rgb")).toEqual(rgb);
    expect(xspace(hsl, "hsv")).toEqual(hsv);
    expect(xspace(hsl, "hsl")).toEqual(hsl);
  });

  test("xspace should throw when provided with an invalid color or map.", () => {
    const { xspace } = utils;

    const badRgb = { r: 12, q: 3 };
    const goodMap = "hex";

    expect(() => {
      xspace(badRgb, goodMap);
    }).toThrow();

    const goodRgb = { r: 0, g: 0, b: 0 };
    const badMap = "fooey";

    expect(() => {
      xspace(goodRgb, badMap);
    }).toThrow();

    expect(() => {
      xspace(badRgb, badMap);
    }).toThrow();
  });

  test("shiftDegrees should return a numeral representation of the resulting degree addition, wrt 360.", () => {
    const { shiftDegrees } = utils;

    expect(90).toEqual(shiftDegrees(0, 90));

    expect(0).toEqual(shiftDegrees(270, 90));

    expect(270).toEqual(shiftDegrees(270, -360));

    expect(0).toEqual(shiftDegrees(0, 360));

    expect(359).toEqual(shiftDegrees(358, 361));
  });
});
