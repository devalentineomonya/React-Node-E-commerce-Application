const express = require("express");
const passport = require('passport');
const cors = require("cors");
const bodyParser = require("body-parser");
var session = require('express-session');
const path = require("path");
const config = require("./src/config/config");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const authRouter = require("./src/routes/auth.routes");
require('./src/config/passport'); 

const app = express();

/*========================
    UNIVERSAL MIDDLEWARES
==========================*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(passport.initialize()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
//   }));
//   app.use(passport.authenticate('session'));

/*========================
        ROUTES
==========================*/
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.render("pages/index");
});



const start = async () => {
    try {
        await connectDB(); 
        app.listen(config.port, () => {
            console.log(`App running on port ${config.port}`);
        });
    } catch (error) {
        console.log({ message: "An error occurred while starting application", error: error.message });
    }
};

start();
