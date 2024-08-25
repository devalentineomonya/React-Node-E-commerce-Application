const config = require("../config/config");

const clientUrl = config.env.dev ? "http://localhost:5173" : config.appUris.clientUri;
const serverUrl = config.env.prod ? config.appUris.serverUri : "http://localhost:8000/api";

module.exports = { clientUrl, serverUrl };
