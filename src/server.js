const express = require("express");
const app = express();
const categories_route = require("./routes/category_route");
const products_route = require("./routes/product_route");
const token_route = require("./routes/token_route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", categories_route);
app.use("", products_route);
app.use("", token_route);
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type, Authorization, username, session"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

module.exports = app;
