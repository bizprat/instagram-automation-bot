'use strict';

const puppeteer = require('puppeteer')
const path = require('path')
const UserAgent = require('user-agents')

// Set location of root directory as global variables
global.appRoot = path.resolve(__dirname)
global.BASE_URL = `https://www.instagram.com`

const { login }  = require('./modules/login')
const profile  = require('./modules/profile')

const userAgent = new UserAgent({ deviceCategory: 'desktop' })
// const USER_AGENT = userAgent.toString();
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';

(async function(){
	try {

		const browser = await puppeteer.launch({ 
			headless: false, 
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] 
		});

		global.page = await browser.newPage()
		await page.setUserAgent(USER_AGENT)

		await login()

		// await profile.getQueryHash() 
		// await profile.getCurrentUser() 
		await profile.getFollowers('ekaumchannel') 

		// await browser.close()

	} catch(e) {
		console.log(e)
	}


})();
