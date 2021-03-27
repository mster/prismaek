'use strict'

const { shiftDegrees } = require('./utils') 

module.exports = {
    complementary,
    splitComplementary,
    triadic,
    tetradic,
    analagous,
    stepSixty,
    analagousTight
}

function complementary(hsv) {
    const { h, s, v } = hsv

    return [
        { h, s, v },
        { h: shiftDegrees(+h, 180), s, v }
    ]
}

function splitComplementary(hsv) {
    const { h, s, v } = hsv
    
    return [
        { h, s, v },
        { h: shiftDegrees(+h, 150), s, v },
        { h: shiftDegrees(+h, 210), s, v }
    ]
}

function triadic(hsv) {
    const { h, s, v } = hsv
    
    return [
        { h, s, v },
        { h: shiftDegrees(+h, 120), s, v },
        { h: shiftDegrees(+h, 240), s, v }
    ]
}

function tetradic(hsv) {
    const { h, s, v } = hsv
    
    return [
        { h, s, v },
        { h: shiftDegrees(+h, 90), s, v },
        { h: shiftDegrees(+h, 180), s, v },
        { h: shiftDegrees(+h, 270), s, v }
    ]
}

function analagous(hsv) {
    const { h, s, v } = hsv
    
    return [
        { h, s, v },
        { h: shiftDegrees(+h, 30), s, v },
        { h: shiftDegrees(+h, 60), s, v },
        { h: shiftDegrees(+h, 90), s, v }
    ]
}

function stepSixty(hsv) {
    const { h, s, v } = hsv

    return [
        { h, s, v },
        { h: shiftDegrees(+h, 60), s, v },
        { h: shiftDegrees(+h, 120), s, v },
        { h: shiftDegrees(+h, 180), s, v },
        { h: shiftDegrees(+h, 240), s, v },
        { h: shiftDegrees(+h, 300), s, v }
    ]
}

function analagousTight(hsv) {
    const { h, s, v } = hsv

    return [
        { h, s, v },
        { h: shiftDegrees(+h, 15), s, v },
        { h: shiftDegrees(+h, 30), s, v },
        { h: shiftDegrees(+h, 45), s, v },
        { h: shiftDegrees(+h, 60), s, v },
        { h: shiftDegrees(+h, 75), s, v },
        { h: shiftDegrees(+h, 90), s, v }
    ]
}