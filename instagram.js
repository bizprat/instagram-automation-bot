'use strict'

const { shuffle } = require('lodash')
const UserAgent = require('user-agents')

const [ minMs, hourMs, dayMs ] = [60000, 3600000, 86400000]

const ig = async (settings) => {
    
    const {
        instagramBaseUrl = 'https://www.instagram.com/',

        username = process.env.INSTAGRAM_USERNAME,
        password = process.env.INSTAGRAM_PASSWORD,

        randomUserAgent = true,
        userAgent,

        maxFollowsPerHour = 20,
        maxFollowsPerDay = 100,

        maxLikesPerhour = 30,
        maxLikesPerDay = 150,

        cookiePath = './db/cookies.json',

        excludeUsers = [],
        excludeHashgtag = [],

        followWithMinFollowing = 100,

    } = settings

}

module.exports = ig