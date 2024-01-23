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
            if(err)throw err;
            res.json(results);
            res.render('index',{results});
            console.log(results);
        });
    })
    }
);
// Create

// Create
router.post('/createAuther', (req, res) => {
    const { last_name, first_name, id } = req.body;
    const sql = 'INSERT INTO auther (last_name, first_name, id) VALUES (?, ?, ?)';

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

            res.json({ message: 'Auther created successfully', id: results.insertId });
        });
    });
});



// Delete
router.delete('/deleteAuther/:id', (req, res) => {
    const autherId = req.params.id;
    const sql = 'DELETE FROM auther WHERE id = ?';

    db_pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        connection.query(sql, [autherId], (err, results) => {
            connection.release();

            if (err) {
                console.error(err);
                res.status(500).json({ error: err.message });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Author not found', id: autherId });
            } else {
                res.json({ message: 'Author deleted successfully', id: autherId });
            }
        });
    });
});


// Update
router.put('/updateAuther/:id', (req, res) => {
    const authorId = req.params.id;
    const { last_name, first_name, id } = req.body;
    const sql = 'UPDATE auther SET last_name=?, first_name=?, id=? WHERE id=?';

    db_pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        connection.query(sql, [last_name, first_name, id, authorId], (err, results) => {
            connection.release();

            if (err) {
                console.error(err);
                res.status(500).json({ error: err.message });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Author not found', id: authorId });
            } else {
                res.json({ message: 'Author updated successfully', id: authorId });
            }
            console.log(results);
        });
    });
});
