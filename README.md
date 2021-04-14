# Prismaek

Generate custom color schemes using maths. Color type conversion utilities included!

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)

# Usage

```js
const prismaek = require('prismaek')

const { splitComplementary } = prismaek.harmonies
const { RGB2HSV } = prismaek.utils

// start with a single color
const rgb = { r: 255, g: 102, b: 69 }

// convert to HSV color format
const hsv = RGB2HSV(rgb) // {h: 11, s: 0.729, v: 1}

// note: HSV (HSB) format is required for scheme generation.
const scheme = splitComplementary(hsv)
/*
    [
        { h: 11, s: 0.729, v: 1 },
        { h: 161, s: 0.729, v: 1 },
        { h: 221, s: 0.729, v: 1 }
    ]
*/
```

If you need a scheme in a particular form:

```js
let scheme = analagous(hsv)

scheme = scheme.map(e => HSV2RGB(e))
/*
    [
        { r: 255, g: 103, b: 69 },
        { r: 255, g: 196, b: 69 },
        { r: 221, g: 255, b: 69 },
        { r: 128, g: 255, b: 69 }
    ]
*/

scheme = scheme.map(e => RGB2Hex(e))
/*
    [ 'FF6745', 'FFC445', 'DDFF45', '80FF45' ]
*/
```

# Effects

Prismaek includes an effect builder for generating **tints**, **tones**, and **shades**. Effects have one required argument and three optional arguments.

<br>

### shade(base[, format][, step][, count ])
* #### **base** \<Object> | \<String> | \<Array> Base color object (HSV/RGB), hex value as a string, or an array containing any combination of either.
* #### **format** \<String> Output format. Optional, **Default:** `hex`
    * Supported types: `hex`, `rgb`, `hsv`
* #### **step** \<Number> | \<String> Step size. Optional, **Default:** `0.10`
* #### **count** \<Number> | \<String> Iteration count (base color included). Optional, **Default:** `5`

<br>

```js
    const { shade, tint, tone } = require('prismaek').effects;

    const color = { r: 102, g: 55, b: 69 };
    const shades = shade(color, "hex", 0.05, 5);
    // [ '663745', '613442', '5C323E', '572F3B', '522C37' ]
```

Works with schemes too. Pretty cool, huh?

```js
const color = "#289866";
const tetradicScheme = tetradic(hex2HSV(color));
/* [{ h: 153, s: 0.737, v: 0.596 },
    { h: 243, s: 0.737, v: 0.596 },
    { h: 333, s: 0.737, v: 0.596 },
    { h: 63, s: 0.737, v: 0.596 }] */

const tetradicTones = tone(tetradicScheme, "rgb", 0.1, 3);
/* {
  '0': [
    { r: 60, g: 228, b: 153, shift: 0 },
    { r: 69, g: 60, b: 228, shift: 0 },
    { r: 228, g: 60, b: 135, shift: 0 },
    { r: 219, g: 228, b: 60, shift: 0 }
  ],
  '0.1': [
    { r: 56, g: 213, b: 143, shift: 0.1 },
    { r: 64, g: 56, b: 213, shift: 0.1 },
    { r: 213, g: 56, b: 126, shift: 0.1 },
    { r: 204, g: 213, b: 56, shift: 0.1 }
  ],
  '0.2': [
    { r: 52, g: 198, b: 133, shift: 0.2 },
    { r: 60, g: 52, b: 198, shift: 0.2 },
    { r: 198, g: 52, b: 117, shift: 0.2 },
    { r: 190, g: 198, b: 52, shift: 0.2 }
  ] 
} */
```

Finally, something a bit funky. 

```js
let woah = RGBs.map(rgb => tone(triadic(RGB2HSV(rgb))));
/*[
  {
    '0': [ '950269', '699502', '026995' ],
    '0.1': [ '8B0162', '628B01', '01628B' ],
    '0.2': [ '81015B', '5B8101', '015B81' ],
    '0.3': [ '770154', '547701', '015477' ],
    '0.4': [ '6D014D', '4D6D01', '014D6D' ]
  },
  {
    '0': [ 'B972C2', 'C2B972', '72C2B9' ],
    '0.1': [ 'AC6AB5', 'B5AC6A', '6AB5AC' ],
    '0.2': [ 'A063A8', 'A8A063', '63A8A0' ],
    '0.3': [ '945B9B', '9B945B', '5B9B94' ],
    '0.4': [ '87548E', '8E8754', '548E87' ]
  },
  {
    '0': [ '995368', '689953', '536899' ],
    '0.1': [ '8F4D61', '618F4D', '4D618F' ],
    '0.2': [ '85485A', '5A8548', '485A85' ],
    '0.3': [ '7A4253', '537A42', '42537A' ],
    '0.4': [ '703D4C', '4C703D', '3D4C70' ]
  }
] */
```

# Contributing
Thanks for checking out my package! Contribution guidelines will be coming soon.



