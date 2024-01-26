const express = require('express');
const router = express.Router();
let db_m = require('../database');
global.db_pool = db_m.pool;
module.exports=router;
const books_midd=require('../middleware/books_midd');


//read
router.get('/readBooks', [books_midd.readBooks], (req, res) => {
    console.log(res.results);
    res.json(res.results);
});
// create
router.post('/createBooks', [books_midd.createBooks], (req, res) => {
    console.log(res.results)
    res.json(res.results);
});
//delete
router.delete('/deleteBooks/', [books_midd.deleteBooks], (req, res) => {
    console.log(res.results)
    res.json(res.results);
});
// update
router.put('/updateBooks/', [books_midd.updateBooks], (req, res) => {
    console.log(res.results)
    res.json(res.results);
});
