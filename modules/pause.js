const delay = require('delay');
const chalk = require('chalk');

const pause = async (param) => {
    
    try {
        const obj = param || {}
        const { min = 0, max = 0 } = obj

        const time = Math.floor(Math.random() * (max - min) + min)

        console.info( chalk.gray(`Pause for ${time} sec`) )
        await delay(time * 1000)

    } catch(e) {
        console.log(e)
    }
}

module.exports = pause