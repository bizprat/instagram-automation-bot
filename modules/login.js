'use strict'

const randomInteger = require('./getRandomInteger')
const pause = require('./pause')

const login = async (page) => {

    try {
        
        await page.goto(process.env.BASE_URL, { waitUntil: 'networkidle2' })

        await pause()

        console.info('hello')

    } catch(e) {
        console.log(e)
    }

}

module.exports = login