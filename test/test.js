'use strict'

// Introduce lowdb
let low = require('lowdb');
// Introduce a synchronous write adapter
let FileSync = require('lowdb/adapters/FileSync')
// Declare an adapter and define its name, that is, generate a json file of xcr.json to store data
let adapter = new FileSync('xcr.json');
// Load the adapter, that is, use variables to save, convenient to use
let db = low(adapter);
// Define the default structure, that is, write the default data structure to the json file
db.defaults({
    post: [],
    user: {},
    count: 0
}).write();
// Use the get method to get the post attribute in the structure and append the content to the file
db.get('post').push({ id: 1, title: 'lowdb is awesome' }).write();
// Use the set method to create the properties of the objects in the structure and write them into the file
db.set('user.name', 'typecode').write();
// Use the update method to update the attribute value
db.update('count', n => n+1).write();

