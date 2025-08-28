const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config");
const passport = require("passport");
//order is important:cookieParser and session before flash
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
//mongoose and mongostore
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
mongoose.connect("mongodb://localhost:27017/nodestart");

require("dotenv").config();
require("app-module-path").addPath(__dirname);

global.config = require("./config");

app.use(
  cors({
    origin: "http://localhost:3000", // Your Next.js frontend URL
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("method"));
//again order is important
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 100) },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/nodestart",
      touchAfter: 24 * 3600, // lazy session update
    }),
  })
);
app.use(flash());

require("./passport/passportLocal");
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

//middleware1
app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  res.locals = { errors: req.flash("errors"), req: req };
  next();
});
app.get("/", (req, res) => {
  res.render("index");
});
//middleware2
app.use((req, res, next) => {
  next();
});

// app.use("/user", require("./routes/user"));
//route created in routes folder and not here

app.use("/", require("./routes/index"));

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
