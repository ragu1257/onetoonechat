// this class defines the db table signup_user
const Sequelize = require('sequelize')
const db = require('../config/database')

const SignUpUser = db.define('signup_users', { // define fields of db , table name is --'gigs'

first_name: {
    type: Sequelize.STRING
},
last_name: {
    type: Sequelize.STRING
},
password: {
    type: Sequelize.STRING
},
email: {
    type: Sequelize.STRING,
    primaryKey: true
},
phone_number: {
    type: Sequelize.STRING
}
})

module.exports = SignUpUser;