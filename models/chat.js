// this class defines the db
const Sequelize = require('sequelize')
const db = require('../config/database')

const Chat = db.define('chat', { // define fields of db , table name is --'gigs'
id: {
    type: Sequelize.STRING,
    primaryKey: true
},
sender: {
    type: Sequelize.STRING
},
receiver: {
    type: Sequelize.STRING
},
message: {
    type: Sequelize.STRING
}

})

module.exports = Chat;