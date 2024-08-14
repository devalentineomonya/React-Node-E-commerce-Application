const config = require("../config/config")
const clientUrl = config.env.dev ? "http://localhost:5173" : process.env.CLIENT_URL

module.exports = {clientUrl} 