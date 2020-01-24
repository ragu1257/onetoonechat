// this class defines the db
const Sequelize = require('sequelize')
const db = require('../config/database')

const Gig = db.define('gigs', { // define fields of db , table name is --'gigs'
id: {
    type: Sequelize.STRING,
    primaryKey: true
},
origin: {
    type: Sequelize.STRING
},
destination: {
    type: Sequelize.STRING
},
// createdAt: {
//     type: Sequelize.DATE
// },
// updatedAt: {
//     type: Sequelize.DATE
// },


})

module.exports = Gig;