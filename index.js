const express = require("express");
const port = 3000;
const app = express();
app.use(express.json());



let db_m = require('./database');
global.db_pool = db_m.pool;

const path = require('path');
const {json} = require('express');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.set("view engine","ejs");

app.listen(port,()=>{
    console.log(`now listening on port ${port}`);
})

