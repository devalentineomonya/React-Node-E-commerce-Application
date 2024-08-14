const config = require("../config/config")
const clientUrl = config.env.dev ? "http://localhost:5173" : process.env.CLIENT_URL
const serverUrl = config.env.prod ? process.env.SERVER_URL : "http://localhost:8000/api"

module.exports = {clientUrl,serverUrl} 