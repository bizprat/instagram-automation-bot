'use strict'

const { shuffle } = require('lodash')
const UserAgent = require('user-agents')
const assert = require('assert')

const JSONDB = require('./db')

const [ minMs, hourMs, dayMs ] = [60000, 3600000, 86400000]

const ig = async (db, browser, settings) => {
    
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

        dryRun = true

    } = settings

    // Check whether the following variables are true, else throw error
    assert(db)
    assert(browser)

}

ig.JSONDB = JSONDB

module.exports = ig