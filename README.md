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

schemes = schemes.map(e => HSV2Hex(e))
/*
    [ 'FF6745', 'FFC445', 'DDFF45', '80FF45' ]
*/
```





