'use strict'

const pause = require('./pause')
const { green, red } = require('chalk')
const { tick, cross } = require('figures')

async function getQueryHash() {
    try {
        
        if(!isLoggedIn) {
            console.log( red(`${cross} User not logged in`) )
            return false
        }

        let url = BASE_URL + await page.evaluate(`document.querySelector('link[type="application/json"]').getAttribute('href')`)

        url = new URL(url)
        const queryHash = url.searchParams.get("query_hash")

        return queryHash
    } catch (e) {
        console.log(e)
    }
}

module.exports = {getQueryHash}