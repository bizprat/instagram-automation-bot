'use strict'
const fs = require('fs-extra')

const cookiesPath = `${appRoot}/db/cookies.json`

const cookies = {

    get: async () => {
        try {
            return fs.readFileSync(cookiesPath, 'utf8')
        } catch(e) {
            console.log(e)
        }
    },

    save: async () => {
        try {
            await fs.ensureFile(cookiesPath)
            const loginCookie = await page.cookies()
            await fs.writeFile(cookiesPath, JSON.stringify(loginCookie, null, 4), 'utf8')
        } catch(e) {
            console.log(e)
        }
    }

}

cookies.load = cookies.get

module.exports = cookies