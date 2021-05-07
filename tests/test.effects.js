"use strict";

const {
  effects: { shade, tint, tone },
} = require("../index");

describe("Shades", () => {
  test("should return shades of a singular base color, given the step size and count of shades", () => {
    const rgb = { r: 40, g: 146, b: 152 };
    const expectedRgbShades = [
      "289298",
      "248389",
      "20757A",
      "1C666A",
      "18585B",
    ];
    const actualRgbShades = shade(rgb);

    expect(actualRgbShades).toEqual(expectedRgbShades);

    const hex = "#982892";
    const expectedHexShades = [
      "982892",
      "892483",
      "7A2075",
      "6A1C66",
      "5B1858",
    ];
    const actualHexShades = shade(hex);

    expect(actualHexShades).toEqual(expectedHexShades);

    const hsv = { h: 3, s: 0.737, v: 0.596 };
    const expectedHsvShades = [
      "982E28",
      "892924",
      "7A2520",
      "6A201C",
      "5B1C18",
    ];
    const actualHsvShades = shade(hsv);

    expect(actualHsvShades).toEqual(expectedHsvShades);

    const hsl = { h: 181, s: 0.12, l: 0.24 };
    const expectedHslShades = [
      "364445",
      "313D3E",
      "2B3637",
      "263030",
      "202929",
    ];
    const actualHslShades = shade(hsl);

    expect(actualHslShades).toEqual(expectedHslShades);
  });

  test("should support using an array of base colors", () => {
    const hexes = ["#289866", "#2E2898", "#98285A", "#929828"];
    const expectedHexesShades = {
      0: ["289866", "2E2898", "98285A", "929828"],
      0.1: ["24895C", "292489", "892451", "838924"],
      0.2: ["207A52", "25207A", "7A2048", "757A20"],
      0.3: ["1C6A47", "201C6A", "6A1C3F", "666A1C"],
      0.4: ["185B3D", "1C185B", "5B1836", "585B18"],
    };
    const actualHexesShades = shade(hexes);

    expect(actualHexesShades).toEqual(expectedHexesShades);

    const rgbs = [
      { r: 67, g: 62, b: 162 },
      { r: 162, g: 67, b: 62 },
      { r: 62, g: 162, b: 67 },
    ];
    const expectedRgbsShades = {
      0: ["433EA2", "A2433E", "3EA243"],
      0.1: ["3C3892", "923C38", "38923C"],
      0.2: ["363282", "823632", "328236"],
      0.3: ["2F2B71", "712F2B", "2B712F"],
      0.4: ["282561", "612825", "256128"],
    };
    const actualRgbsShades = shade(rgbs);

    expect(actualRgbsShades).toEqual(expectedRgbsShades);

    const expectedReformattedShades = {
      0: [
        { b: 102, g: 152, r: 40, shift: 0 },
        { b: 152, g: 40, r: 46, shift: 0 },
        { b: 90, g: 40, r: 152, shift: 0 },
        { b: 40, g: 152, r: 146, shift: 0 },
      ],
      0.1: [
        { b: 92, g: 137, r: 36, shift: 0.1 },
        { b: 137, g: 36, r: 41, shift: 0.1 },
        { b: 81, g: 36, r: 137, shift: 0.1 },
        { b: 36, g: 137, r: 131, shift: 0.1 },
      ],
      0.2: [
        { b: 82, g: 122, r: 32, shift: 0.2 },
        { b: 122, g: 32, r: 37, shift: 0.2 },
        { b: 72, g: 32, r: 122, shift: 0.2 },
        { b: 32, g: 122, r: 117, shift: 0.2 },
      ],
      0.3: [
        { b: 71, g: 106, r: 28, shift: 0.3 },
        { b: 106, g: 28, r: 32, shift: 0.3 },
        { b: 63, g: 28, r: 106, shift: 0.3 },
        { b: 28, g: 106, r: 102, shift: 0.3 },
      ],
      0.4: [
        { b: 61, g: 91, r: 24, shift: 0.4 },
        { b: 91, g: 24, r: 28, shift: 0.4 },
        { b: 54, g: 24, r: 91, shift: 0.4 },
        { b: 24, g: 91, r: 88, shift: 0.4 },
      ],
    };
    const actualReformattedShades = shade(hexes, "rgb");

    expect(actualReformattedShades).toEqual(expectedReformattedShades);
  });

  test("should return values in the specified color space format", () => {
    const singularHex = "#982892";
    const expectedHsvShades = [
      { h: 303, s: 0.737, v: 0.596, shift: 0 },
      { h: 304, s: 0.737, v: 0.537, shift: 0.1 },
      { h: 303, s: 0.738, v: 0.478, shift: 0.2 },
      { h: 303, s: 0.736, v: 0.416, shift: 0.3 },
      { h: 303, s: 0.736, v: 0.357, shift: 0.4 },
    ];
    const actualHsvShades = shade(singularHex, "hsv");

    expect(actualHsvShades).toEqual(expectedHsvShades);

    const expectedHslShades = [
      { h: 303, s: 0.583, l: 0.376, shift: 0 },
      { h: 304, s: 0.584, l: 0.339, shift: 0.1 },
      { h: 303, s: 0.584, l: 0.302, shift: 0.2 },
      { h: 303, s: 0.582, l: 0.263, shift: 0.3 },
      { h: 303, s: 0.583, l: 0.225, shift: 0.4 },
    ];
    const actualHslShades = shade(singularHex, "hsl");

    expect(actualHslShades).toEqual(expectedHslShades);
  });

  test("should throw with invalid arguments", () => {
    expect(() => {
      shade();
    }).toThrow();

    const badHex = "#evilHex";
    expect(() => {
      shade(badHex);
    }).toThrow();

    const goodHex = "#982892";
    const badFormat = "rgba";
    expect(() => {
      shade(goodHex, badFormat);
    }).toThrow();

    const goodFormat = "hsl";
    const badStep = 0.001;
    expect(() => {
      shade(goodHex, goodFormat, badStep);
    }).toThrow();

    const goodStep = 0.15;
    const badCount = "threePointOneFour";
    expect(() => {
      shade(goodHex, goodFormat, goodStep, badCount);
    }).toThrow();

    const goodCount = 3;
    const badColors = [
      { r: 12, h: 256 },
      "#Yucky",
      { h: 361, s: 0.42, v: 0.69 },
    ];
    expect(() => {
      shade(badColors, goodFormat, goodStep, goodCount);
    }).toThrow();
  });
});
