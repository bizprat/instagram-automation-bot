'use strict';

const delay = require('delay');
const puppeteer = require('puppeteer');

const login  = require('./modules/login')

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';

(async function(){
	try {

		const browser = await puppeteer.launch({ 
			headless: false, 
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] 
		});

		const page = await browser.newPage()
		await page.setUserAgent(USER_AGENT)

		login(page)

	} catch(e) {
		console.log(e)
	}


})();


// (async () => {
// 	console.log(process.env.INSTA_USERNAME)

// 	await delay(3000);

// 	// Executed 100 milliseconds later
// 	console.log(process.env.INSTA_USERNAME)
// })()