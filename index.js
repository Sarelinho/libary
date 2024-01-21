const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());

let db_m = require('./database');
global.db_pool = db_m.pool;
// console.log(db_pool)
const path = require('path');
const {json} = require('express');

const books_rtr= require('./routers/booksRouter');
const author_rtr= require('./routers/autherRoute');
app.use('/books',books_rtr);
app.use('/auther',author_rtr);




app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.set("view engine","ejs");


// Read
// app.get('/api/items', () => {console.log('middleware')},(req, res) => {
//     const sql = 'SELECT * FROM auther';
//     db_pool.getConnection((err, connection) => {
//         if(err) throw err;
//         connection.query(sql, (err, results) => {
//             connection.release();
//             res.json(results);
//             // res.render('views/pages/auther/index', {
//             //     authers: results,
//             //     tagline: "balala"
//             // });
//         });
//     })
//
// });

// Update
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const { name ,id,genre_id,_auther_id } = req.body;
    const sql = 'UPDATE items SET name=?, description=? WHERE id=?';
    db_m.pool.query(sql, [name ,id,genre_id,_auther_id], (err) => {
        if (err) throw err;
        res.json({ message: 'Item updated successfully', id: id });
    });
});

// Delete
app.delete('/api/items/:id', (req, res) => {
    const { name ,id,genre_id,_auther_id } = req.body;
    const sql = 'DELETE FROM items WHERE id=?';
    db_m.pool.query(sql, [name ,id,genre_id,_auther_id], (err) => {
        if (err) throw err;
        res.json({ message: 'Item deleted successfully', id: id });
    });
});


app.listen(port,()=>{
    console.log(`now listening on port ${port}`);
})



