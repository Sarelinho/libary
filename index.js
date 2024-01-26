const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

let db_m = require('./database');
global.db_pool = db_m.pool;
// console.log(db_pool)
const path = require('path');
const {json} = require('express');

const books_rtr= require('./routers/booksRouter');
const author_rtr= require('./routers/autherRoute');
const section_rtr= require('./routers/sectionRouter');
const genre_rtr= require('./routers/genreRouter');

app.use('/books',books_rtr);
app.use('/section',section_rtr);
app.use('/auther',author_rtr);
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));


app.listen(port,()=>{
    console.log(`now listening on port ${port}`);
})
