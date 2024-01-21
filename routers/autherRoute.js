const express = require('express');
const router = express.Router();
let db_m = require('../database');
global.db_pool = db_m.pool;
module.exports=router;


//read
router.get('/readAuther',(req,res)=> {
    const sql = 'SELECT * FROM auther';
    db_pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sql, (err, results) => {
            connection.release();
            res.json(results);
            console.log(results);

            // res.render('views/pages/auther/index', {
            //     authers: results,
            //     tagline: "balala"
            // });
        });
    })
    }
);
// Create
router.post('/api/createAuther', (req, res) => {
    const { last_name, first_name, id } = req.body;
    console.log("here")

    const sql = 'INSERT INTO items (last_name, first_name, id) VALUES (?, ?, ?)';

    db_pool.getConnection((err, connection) => {
        if (err) {

            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        connection.query(sql, [last_name, first_name, id], (err, results) => {
            connection.release();

            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.json(results);
        });
    });
});

router.delete('/api/deleteAuther/:id', (req, res) => {
    const authorId = req.params.id;
    const sql = 'DELETE FROM items WHERE id = ?';

    db_pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        connection.query(sql, [authorId], (err, results) => {
            connection.release();

            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.json({ message: 'Author deleted successfully', id: authorId });
        });
    });
});

