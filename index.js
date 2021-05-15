const delay = require('delay')

(async () => {
	console.log('Before Delay')

	await delay(3000);

	// Executed 100 milliseconds later
	console.log('After Delay')
})()