'use strict'

const pause = require('./pause')
const { green, red } = require('chalk')
const { tick, cross } = require('figures')
const { loadSession } = require('./login')

async function getQueryHash() {
    try {
        
        if(!isLoggedIn) {
            console.log( red(`${cross} User not logged in`) )
            return false
        }
        let url, attrs = [], keys = []

        attrs.push(await page.evaluate(`document.querySelectorAll('link[type="application/json"]')[0].getAttribute('href')`))
        attrs.push(await page.evaluate(`document.querySelectorAll('link[type="application/json"]')[1].getAttribute('href')`))

        for (let attr of attrs) {
            url = BASE_URL + attr
            url = new URL(url)
            let key = url.searchParams.get("query_hash")
            keys.push(key)
        }

        // let url = BASE_URL + await page.evaluate(`document.querySelector('link[type="application/json"]').getAttribute('href')`)

        // url = new URL(url)
        // const queryHash = url.searchParams.get("query_hash")

        return keys
    } catch (e) {
        console.log(e)
    }
}

async function getUserinfo(username) {
    try {
        if (!username) throw new Error('Please provide username')

        await page.goto( `${BASE_URL}/${username}` )
        return await page.evaluate('window._sharedData.entry_data.ProfilePage[0].graphql.user')
    } catch (e) {
        console.log(e)
    }
}

async function getFollowers(username) {
    try {
        if (!username) throw new Error('Please provide username')

        let query_hash = '5aefa9893005572d237da5068082d8d5'
        const user = await getUserinfo(username)
        const followersNum = 50

        const variables = {
            id: user.id,
            include_reel: true,
            fetch_mutual: true,
            first: 50
        }

        let url = new URL(`${BASE_URL}/graphql/query/`)
        url.searchParams.append('query_hash', query_hash)
        url.searchParams.append('variables', JSON.stringify(variables))
    
        const response = await page.goto(url.href, { waitUntil: 'networkidle2' })

        const body = await response.json()

        console.log(body.data.user.edge_followed_by.edges.length)

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getUserinfo,
    getFollowers
}