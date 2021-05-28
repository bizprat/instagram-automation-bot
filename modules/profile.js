'use strict'

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

async function getFollowers(username, end_cursor = null) {
    try {
        if (!username) throw new Error('Please provide username')

        let query_hash = '5aefa9893005572d237da5068082d8d5'
        const user = await getUserinfo(username)
        let next_page_token = null

        const variables = {
            id: user.id,
            include_reel: true,
            fetch_mutual: true,
            first: 50,
            after: end_cursor
        }

        let url = new URL(`${BASE_URL}/graphql/query/`)
        url.searchParams.append('query_hash', query_hash)
        url.searchParams.append('variables', JSON.stringify(variables))
    
        const response = await page.goto(url.href, { waitUntil: 'networkidle2' })

        const body = await response.json()

        if (body.status !== 'ok') throw new Error(`getFollowers(): Invalid response from ${url.href}`)

        if (body.data.user.edge_followed_by.page_info.has_next_page) {
            next_page_token = body.data.user.edge_followed_by.page_info.end_cursor
        }

        // Filter out non-private and un-verified users
        const filteredUsers = body.data.user.edge_followed_by.edges.filter(user => {
            if (
                !user.node.is_private && 
                !user.node.is_verified &&
                !user.node.followed_by_viewer &&
                !user.node.follows_viewer &&
                !user.node.requested_by_viewer 
               ) {
                return {
                    id: user.node.id,
                    username: user.node.username
                }
            }
        })

        const users = filteredUsers.map(user => {
            return {
                id: user.node.id,
                username: user.node.username
            }
        })

        return {
            end_cursor: next_page_token,
            users
        }

    } catch (e) {
        console.log(e)
    }
}

async function isPrivateProfile( username ) {
    try {
        if (!username) throw new Error('Pleave provide a valid username')

        await page.goto(`${BASE_URL}/${username}`, { waitUntil: 'networkidle2' })

        return !!await page.$('article h2')

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUserinfo,
    getFollowers,
    isPrivateProfile
}