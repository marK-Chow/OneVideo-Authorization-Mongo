var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var express = require("express");
var http = require("http");
var path = require("path");


var passport = require("passport");
var passportHttp = require("passport-http");
var passportLocal = require("passport-local");

var db = require("./db.js");


var app = express();

app.engine(".html", require("ejs").__express);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");



app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUnintialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

// /db
var dbCollectioin = db.collections.users;

/*
 * Correct demo input
 * username: mark ; password: 123
 * or
 * username tom ; password: 456
 * */
passport.use(new passportLocal.Strategy(function (username, password, done) {
    dbCollectioin.find({"username": username}, {}, function (e, docs) {
        if (docs.length == 0) {
            done(null, null);
        } else if (docs[0].password == password) {
            done(null, {id: username, name: username});
        } else {
            done(null, null);
        }
    });

}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    done(null, {id: id, name: id});
});

app.get("/", function (req, res) {
    res.render("index",
        {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        }
    );
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local"), function (req, res) {
    res.redirect("/");
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

var port = process.env.PORT || 1336;

var server = app.listen(port, function () {
    console.log("http://127.0.0.1:" + port + "/");
});

