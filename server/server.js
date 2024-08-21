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
const productRouter = require("./src/routes/product.routes");
const brandRouter = require("./src/routes/brand.routes");
const categoryRouter = require("./src/routes/category.routes");
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


/*========================
        ROUTES
==========================*/
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter)
app.use("/api/brands", brandRouter)
app.use("/api/category", categoryRouter)

app.get("/", (_, res) => {
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
