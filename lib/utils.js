'use strict'

module.exports = {
    hex2RGB,
    RGB2Hex,
    RGB2HSV,
    HSV2RGB,
    hex2HSV,
    HSV2Hex,
    isHex,
    shiftDegrees
}

function hex2RGB(hex) {
    if (hex?.constructor.name !== 'String') {
        throw new Error(`Argument is not a String: ${hex.constructor.name }`)
    }

    if (hex.length !== 6) {
        throw new Error(`Argument is malformed String: ${hex}`)
    }

    const r = parseInt((hex[0] + hex[1]), 16)
    const g = parseInt((hex[2] + hex[3]), 16)
    const b = parseInt((hex[4] + hex[5]), 16)

    return {r,g,b}
}

function RGB2Hex(rgb) {
    if (rgb?.constructor.name !== 'Object') {
        throw new Error(`Argument is not an Object: ${rgb.constructor.name}`)
    }

    if (
        isNaN(+(rgb?.r)) || 
        isNaN(+(rgb?.g)) || 
        isNaN(+(rgb?.b))
    ) {
        throw new Error(`Argument properties are malformed: ${Object.values(rgb)}`)
    }

    if (
        0 > (+(rgb?.r)) || (+(rgb?.r)) > 255 || 
        0 > (+(rgb?.g)) || (+(rgb?.g)) > 255 ||
        0 > (+(rgb?.b)) || (+(rgb?.b)) > 255
    ) {
        throw new Error(`RGB values must be between 0-255: ${Object.values(rgb)}`)
    }

    const rHex = (+(rgb.r)).toString(16)
    const gHex = (+(rgb.g)).toString(16)
    const bHex = (+(rgb.b)).toString(16)


    return `${rHex.length > 1 ? rHex : '0' + rHex}${gHex.length > 1 ? gHex : '0' + gHex}${bHex.length > 1 ? bHex : '0' + bHex}`.toUpperCase()
}

function RGB2HSV(rgb) {
    if (rgb?.constructor.name !== 'Object') {
        throw new Error(`Argument is not an Object: ${rgb.constructor.name}`)
    }

    if (
        isNaN(+(rgb?.r)) || 
        isNaN(+(rgb?.g)) || 
        isNaN(+(rgb?.b))
    ) {
        throw new Error(`Argument properties are malformed: ${Object.values(rgb)}`)
    }

    if (
        0 > (+(rgb?.r)) || (+(rgb?.r)) > 255 || 
        0 > (+(rgb?.g)) || (+(rgb?.g)) > 255 ||
        0 > (+(rgb?.b)) || (+(rgb?.b)) > 255
    ) {
        throw new Error(`RGB values must be between 0-255: ${Object.values(rgb)}`)
    }

    // formulas from https://www.rapidtables.com/convert/color/rgb-to-hsv.html

    const rPrime = (+(rgb.r))/255
    const gPrime = (+(rgb.g))/255
    const bPrime = (+(rgb.b))/255

    const cMax = Math.max(rPrime, gPrime, bPrime)
    const cMin = Math.min(rPrime, gPrime, bPrime)

    const delta  = cMax - cMin

    let h = 0
    switch (true) {
        case cMax === rPrime && (cMax !== gPrime || cMax !== bPrime):
            h = 60 * (((gPrime - bPrime)/delta) % 6)
            break;
        case cMax === gPrime && (cMax !== rPrime || cMax !== bPrime):
            h = 60 * (((bPrime - rPrime)/delta) + 2)
            break;
        case cMax === bPrime && (cMax !== gPrime || cMax !== rPrime):
            h = 60 * (((rPrime - gPrime)/delta) + 4)
            break;
    }

    if (h < 0) h = 360 + h

    h = Math.round(Math.abs(h))
    const s = cMax === 0 ? 0 : Math.round((delta/cMax) * 1000) / 1000
    const v = Math.round(cMax * 1000) / 1000

    return {h,s,v}
}

function HSV2RGB(hsv) {
    if (hsv?.constructor.name !== 'Object') {
        throw new Error(`Argument is not an Object: ${hsv.constructor.name}`)
    }

    if (
        isNaN(+(hsv?.h)) || 
        isNaN(+(hsv?.s)) || 
        isNaN(+(hsv?.v))
    ) {
        throw new Error(`Argument properties are malformed: ${Object.values(hsv)}`)
    }

    if (
        0 > (+(hsv?.h)) || (+(hsv?.h)) > 360 || 
        0 > (+(hsv?.s)) || (+(hsv?.s)) > 1 ||
        0 > (+(hsv?.v)) || (+(hsv?.v)) > 1
    ) {
        throw new Error(`Hue (h) value must be between 0-360;\nSaturation (s) & Value (v) values must be between 0-1: ${Object.values(hsv)}`)
    }

    // formulas from https://www.rapidtables.com/convert/color/hsv-to-rgb.html

    const h = (+(hsv.h))
    const c = (+(hsv.v)) * (+(hsv.s))
    const x = c * (1 - Math.abs((h/60) % 2 - 1))
    const m = (+(hsv.v)) - c

    let rPrime = 0, gPrime = 0, bPrime = 0

    switch (true) {
        case h < 60:
            rPrime = c
            gPrime = x
            bPrime = 0
            break;
        case h < 120:
            rPrime = x
            gPrime = c
            bPrime = 0
            break;
        case h < 180:
            rPrime = 0
            gPrime = c
            bPrime = x
            break;
        case h < 240:
            rPrime = 0
            gPrime = x
            bPrime = c
            break;
        case h < 300:
            rPrime = x
            gPrime = 0
            bPrime = c
            break;
        default:
            rPrime = c
            gPrime = 0
            bPrime = x
            break;
    }

    const r = Math.round((rPrime + m) * 255)
    const g = Math.round((gPrime + m) * 255)
    const b = Math.round((bPrime + m) * 255)

    return {r,g,b}

}

function hex2HSV(hex) {
    const rgb = hex2RGB(hex)
    const hsv = RGB2HSV(rgb)
    return hsv
}

function HSV2Hex(hsv) {
    const rgb = HSV2RGB(hsv)
    const hex = RGB2Hex(rgb)
    return hex
}

function isHex(hexString) {
    return /[\da-f]{6}/i.test(hexString) && hexString.length === 6
}

function shiftDegrees(degree, shift) {
    if (degree + shift < 360) return degree + shift
    return Math.abs((degree + shift) - 360)
}