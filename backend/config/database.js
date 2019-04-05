// setting ENV --------------------
const dotenv = require('dotenv')
dotenv.config()

// set ENV --------------------
const IPADDRESS = process.env.IPADDRESS || 'localhost'
const DBPORT = process.env.DBPORT || 27017
const DB = process.env.DB || 'mongodb' 

module.exports = {
    'url' : `mongodb://${IPADDRESS}:${DBPORT}/${DB}`
}