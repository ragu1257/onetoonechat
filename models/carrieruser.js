// this class defines the db table signup_user
const Sequelize = require('sequelize')
const db = require('../config/database')

const CarrierUser = db.define('carrier_users', { // define fields of db , table name is --'gigs'

first_name: {
    type: Sequelize.STRING
},
last_name: {
    type: Sequelize.STRING
},
email: {
    type: Sequelize.STRING,
    primaryKey: true
},
date_of_travel: {
    type: Sequelize.DATE
},
origin_country: {
    type: Sequelize.STRING
},
destination_country: {
    type: Sequelize.STRING
},
max_weight: {
    type: Sequelize.STRING
},
weight_unit: {
    type: Sequelize.STRING
},
carrier_cost: {
    type: Sequelize.STRING
},
currency: {
    type: Sequelize.STRING
},
package_size: {
    type: Sequelize.STRING
},
way_of_package_receive: {
    type: Sequelize.STRING
},
items_not_allowed: {
    type: Sequelize.STRING
},
sex: {
    type: Sequelize.STRING
}
})


module.exports = CarrierUser;