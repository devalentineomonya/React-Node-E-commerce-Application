const express = require("express");
const passport = require('passport');
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./src/config/config");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const authRouter = require("./src/routes/auth.routes");

// Import and configure Passport strategies
require('./src/config/passport'); // Make sure this is required to configure Passport strategies

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

/*========================
        ROUTES
==========================*/
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.render("index");
});

// Example route for digest token (uncomment if needed)
// app.get("/digest/:token", (req, res) => {
//   const { token } = req.params;
//   // Handle token logic here
// });

const start = async () => {
    try {
        await connectDB(); // Connect to the database
        app.listen(config.port, () => {
            console.log(`App running on port ${config.port}`);
        });
    } catch (error) {
        console.log({ message: "An error occurred while starting application", error: error.message });
    }
};

start();
