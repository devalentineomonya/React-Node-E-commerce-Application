const express = require("express");
const passport = require('passport');
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const path = require("path");
const config = require("./src/config/config");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const authRouter = require("./src/routes/auth.routes");
const productRouter = require("./src/routes/product.routes");
const brandRouter = require("./src/routes/brand.routes");
const categoryRouter = require("./src/routes/category.routes");
const adminRouter = require("./src/routes/admin.routes");
const { clientUrl, serverUrl } = require("./src/utils/url.util");
const cartRouter = require("./src/routes/cart.routes");
require('./src/config/passport'); 

const app = express();

/*========================
    UNIVERSAL MIDDLEWARES
==========================*/
app
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "src/views"))
  .use(express.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors())
  .use(session({
    secret: config.session.secret,  
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    cookie: { secure: false }  
  }))
  .use(passport.initialize())
  .use(passport.session());

/*========================
        ROUTES
==========================*/
app
  .use("/api/users", userRouter)
  .use("/api/auth", authRouter)
  .use("/api/products", productRouter)
  .use("/api/brands", brandRouter)
  .use("/api/categories", categoryRouter)
  .use("/api/admins", adminRouter)
  .use("/api/cart", cartRouter)
  .get("/", (_, res) => {
    res.render("pages/index");
  });

(async () => {
  try {
    await connectDB(); 
    app.listen(config.port, () => {
      console.log(`App running on port ${config.port}`);
    });
  } catch (error) {
    console.log({ message: "An error occurred while starting the application", error: error.message });
  }
})();
