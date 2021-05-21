'use strict'

const randomInteger = ( min = 3, max = 15 ) => Math.floor(Math.random() * (max - min) + min)

module.exports = randomInteger