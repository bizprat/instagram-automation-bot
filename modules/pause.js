const delay = require('delay');

const pause = async (param) => {
    
    try {
        const obj = param || {}
        const { min = 1, max = 15 } = obj

        const time = Math.floor(Math.random() * (max - min) + min)

        console.info(`Waiting for ${time} sec`)
        await delay(time * 1000)

    } catch(e) {
        console.log(e)
    }
}

module.exports = pause