'use strict'

const pause = require('./pause')
const { green, red } = require('chalk')
const { tick } = require('figures')

const cookies = require(`${appRoot}/db.js`)
const BASE_URL = `https://www.instagram.com`;

async function saveDeviceInfo () {
    try {
            const saveDeviceOnLoginBtn = await page.$x("//button[ contains(., 'Save Info') ]")
        
        if ( !saveDeviceOnLoginBtn.length ) {
            console.log( red(`Not save login page at ${page.url()}`) )
            throw new Error(`The give page URL is not "Save Login Info" page.\n URL: ${page.url()}`)
        }

        console.log(`Trying to save device info`)

        await saveDeviceOnLoginBtn[0].click()
        await page.waitForNavigation({ waitUntil: 'networkidle2' })

        console.log( green(`${tick} Device info saved`) )
        pause()

    } catch (e) {
        console.log(e)
    }
}

async function turnOnPostNotification () {
    try {

        const turnOnPostNotificationBtn = await page.$x("//button[ contains(., 'Turn On') ]")

        if ( !turnOnPostNotificationBtn.length ) {
            console.log( red(`There is no POST NOTIFICATION dialogure present`) )
            throw new Error(`There is no POST NOTIFICATION dialogure present`)
        }

        console.log(`Trying to turn on post notification`)

        await turnOnPostNotificationBtn[0].click()

        console.log( green(`${tick} Successfully turned on Post notification`) )
        pause()

    } catch(e) {
        console.log(e)
    }
}

async function login () {
    try {
        
        await page.goto(BASE_URL, { waitUntil: 'networkidle2' })
        await pause()
        
        let isLoggedIn = !!await page.$('svg[aria-label="Home"]')
        console.log('Is already logged in? ', isLoggedIn)

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

        await cookies.save()
        await pause()
        await saveDeviceInfo()
        await turnOnPostNotification()

    } catch(e) {
        console.log(e)
    }

}

module.exports = login