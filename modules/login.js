'use strict'

const pause = require('./pause')
const { green, red } = require('chalk')
const { tick, cross } = require('figures')

const cookies = require(`./db.js`)
const BASE_URL = `https://www.instagram.com`

async function isLoggedIn() {
    try {
        
        await page.reload({ waitUntil: 'networkidle2' })

        const isLoggedIn = !!await page.$('html.logged-in')

        if ( !isLoggedIn ) {
            console.log( red(`${cross} Old session is not working.`) )
            return isLoggedIn
        }

        console.log( green(`${tick} Logged in by old session`) )

        await pause()

        return isLoggedIn

    } catch (e) {
        console.log(e)
    }
}

async function loadSession() {
    try {
        console.log(`Try logging in with old session`)
        const sessions = JSON.parse(await cookies.load())
        
        if (!sessions.length) {
            console.log( red(`Previous session does not exist`) )
            return false
        }

        for (const i in sessions) {
            await page.setCookie(sessions[i])
        }

        return true

    } catch (e) {
        console.log(e)
    }
}

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
        await pause()

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

        console.log(`Turning on post notification`)
        await pause({ max: 2 })

        await turnOnPostNotificationBtn[0].click()

        console.log( green(`${tick} Successfully turned on Post notification`) )
        await pause()

    } catch(e) {
        console.log(e)
    }
}

async function login () {
    try {
        

        await page.goto(BASE_URL, { waitUntil: 'networkidle2' })
        await pause()

        await loadSession()

        await pause()

        if( await isLoggedIn() ) {
            await turnOnPostNotification()
            return true
        }

        console.log(`Trying logging in...`)

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