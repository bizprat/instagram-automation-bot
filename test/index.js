'use strict'

const puppeteer = require('puppeteer');

(async function() {
    try {

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] 
        })

        const page = await browser.newPage()

        await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2' })

        await page.reload({ waitUntil: 'networkidle2' })

        console.log(await page.$('html.logged-in'))

    } catch (e) {
        console.log(e)
    }
})()