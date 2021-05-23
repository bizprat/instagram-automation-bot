'use strict'

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('test.json')
const db = low(adapter)

db.defaults({
    followed_users: [],
    unfollowed_users: [],
    liked_posts: []
}).write()

// db
// .get('followed_users')
// .push({ username: 'abc', timestamp: 123456789 })
// .write()

// const x = db
// .get('followed_users')
// .find({ username: 'abc' })
// .value()

const x = db
.get('followed_users')
.find({ username: 'abc' })
.value()

console.log(x)