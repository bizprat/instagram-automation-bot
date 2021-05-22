'use strict';

const puppeteer = require('puppeteer')
const path = require('path')

// Set location of root directory as global variables
global.appRoot = path.resolve(__dirname)

const login  = require('./modules/login')

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';

(async function(){
	try {

		const browser = await puppeteer.launch({ 
			headless: false, 
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] 
		});

		global.page = await browser.newPage()
		await page.setUserAgent(USER_AGENT)

		await login(page)

		console.log("forward")

	} catch(e) {
		console.log(e)
	}


})();
