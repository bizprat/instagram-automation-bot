'use strict';

const delay = require('delay');

(async () => {
	console.log(process.env.INSTA_USERNAME)

	await delay(3000);

	// Executed 100 milliseconds later
	console.log(process.env.INSTA_USERNAME)
})()