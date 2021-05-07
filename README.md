# Prismaek [![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.com/mster/prismaek.svg?branch=main)](https://travis-ci.com/mster/prismaek) [![Coverage Status](https://coveralls.io/repos/github/mster/prismaek/badge.svg?branch=main)](https://coveralls.io/github/mster/prismaek?branch=main)

Generate color complements, shades, tints, and tones. Convert between color spaces.

# Install

```
$ npm install prismaek
```

# Usage

To produce complements, use the provided `harmonies` functions.

See [Harmonies](#Harmonies).

```js
const { harmonies } = require("prismaek");

const hsv = { h: 153, s: 0.737, v: 0.596 };
/* hue: 153 deg, saturation: 73.7%, value: 59.6% */

const complementary = harmonies.complementary(hsv);
/* [ { h: 153, s: 0.737, v: 0.596 }, { h: 333, s: 0.737, v: 0.596 } ] */
```

![complementary](https://user-images.githubusercontent.com/15038724/118057317-92f8f480-b340-11eb-8a3d-5d3d1ba686ca.png)

```js
const triadic = harmonies.triadic(hsv);
/* [ { h: 153, s: 0.737, v: 0.596 },
     { h: 273, s: 0.737, v: 0.596 },
     { h: 33, s: 0.737, v: 0.596 } ] */
```

![triadic](https://user-images.githubusercontent.com/15038724/118057439-d9e6ea00-b340-11eb-9638-2ae4cd9ce2be.png)

```js
const analagous = harmonies.analagous(hsv);
/* [ { h: 153, s: 0.737, v: 0.596 },
     { h: 183, s: 0.737, v: 0.596 },
     { h: 213, s: 0.737, v: 0.596 },
     { h: 243, s: 0.737, v: 0.596 } ] */
```

![analagous](https://user-images.githubusercontent.com/15038724/118057897-c5572180-b341-11eb-91c3-6f4516ad66ad.png)

To explicitly change between color spaces, use the conversion utilities.

See [Utilities](#Utilities).

```js
const { utils } = require("prismaek");

const rgb = { r: 75, g: 21, b: 156 };

const hsv = utils.rgb2HSV(rgb);
/* { h: 264, s: 0.865, v: 0.612 } */
```

Validate color spaces

```js
const hsvSpace = utils.isHSV(hsv);
/* true */

const badHSV = { h: 361, s: 1.001, v: -0.001 };

const notHsvSpace = utils.isHSV(badHSV);
/* false */
```

Get the color space of a color, using `cspace`.

```js
const { cspace } = utils;

const color = { h: 312, s: 0.431, l: 0.213 };

const colorSpace = cspace(color);
/* "hsl" */
```

Dynamically transform color spaces using `xspace`.

```js
const { xspace } = utils;

const colors = [
  { r: 75, g: 21, b: 156 },
  "#4b159c",
  { h: 264, s: 0.865, v: 0.612 },
  { h: 264, s: 0.763, l: 0.347 },
];

const rgbColors = colors.map((color) => xspace(color, "rgb"));
/* [ { r: 75, g: 21, b: 156 },
     { r: 75, g: 21, b: 156 },
     { r: 75, g: 21, b: 156 },
     { r: 75, g: 21, b: 156 } ] */
```

# API

## Harmonies

```
harmonyName (base [, format])

- base: <Object> | <String> Base color.

- format: <String> Output color space, defaulting to "hsv".

- Returns: <Array<<Object> | <String>> The generated harmony, including the base color.
```

_Generates mathematically proven color harmonies._

```js
const {
  harmonies: { complementary },
} = require("prismaek");

complementary({ r: 40, g: 102, b: 106 }, "hex");

complementary("#009197");
```

## Effects

```
effectName (base [, format] [, step] [, count])

- base: <Object> | <String> | <Array> Base color, or array of colors.

- format: <String> Output color space, defaulting to "hex".

- step <Number> Step size when generating the effect, a number between 0 and 1. Default is 0.10, or 10%.

- count <Number> Iteration count, defaulting to 5.

- Returns: <Array<<Object> | <String>> The generated effect, including base color.
```

_Generates a color scheme based on popular effects._

```js
const {
  effects: { shade, tint, tone },
} = require("prismaek");

shade("#ee0a97", "rgb", 0.05, 10);

tint({ r: 40, g: 65, b: 106 }, "hex");

tone({ h: 359, s: 0.102, l: 0.696 });
```

# Utilities

## xspace

```
xspace (color, map)

- color <Object> | <String> Base color.

- map <String> Color space to convert to.

- Returns: <Object> | <String> The converted color.
```

_Converts between supported color spaces._

```js
const {
  utils: { xspace },
} = require("prismaek");

xspace("#ee0a97", "rgb"); // { r: 238, g: 10, b: 151 }
```

## cspace

```
cspace (color)

- color <Object> | <String> Base color.

- Returns <String> color space.
```

_Returns the color space of a color or null._

```js
const {
  utils: { cspace },
} = require("prismaek");

cspace("#d5186c"); // "hex"

cspace({ h: 251, s: 0.891, v: 0.668 }); // "hsv"

cspace({ foo: "bar" }); // null
```

## \<from-space>2\<TO-SPACE>

```
<from-space>2<TO-SPACE> (color)

- color <Object> | <String> Base color.

- Returns <Object> | <String> The converted color.
```

_Useful when explicity converting from one color space to another._

```js
const {
  utils: { rgb2Hex, hex2RGB },
} = require("prismaek");

const hex = rgb2Hex({ r: 163, g: 189, b: 254 }); // #a3bdfe

hex2RGB(hex); // { r: 163, g: 189, b: 254 }
```

# Contributing

See our [guidelines](https://github.com/mster/prismaek/blob/main/CONTRIBUTING.md)
