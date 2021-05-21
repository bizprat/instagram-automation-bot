'use strict'

const pause = require('./pause')
const { green } = require('chalk')
const { tick } = require('figures')

const login = async (page) => {

    try {
        
        await page.goto(process.env.BASE_URL, { waitUntil: 'networkidle2' })
        await pause()
        
        let isLoggedIn = !!await page.$('svg[aria-label="Home"]')
        console.log(isLoggedIn)

        const {INSTAGRAM_USERNAME: username, INSTAGRAM_PASSWORD: password} = process.env

        await page.select('select[aria-label="Switch Display Language"]', 'en')

		console.log(green(`${tick} Language set to English`))

        await pause()

        console.log(`Typing username`)
        await page.type('input[name="username"]', username, { delay: 200 })

        console.log(`Typing password`)
        await page.type('input[name="password"]', password, { delay: 200 })

        console.log(`Logging in ...`)
        await page.click('button[type="submit"]')
        await page.waitForNavigation({ waitUntil: 'networkidle2' })

        return 
    } catch(e) {
        console.log(e)
    }

}

module.exports = login