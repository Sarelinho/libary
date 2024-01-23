const express = require('express');
const router = express.Router();
let db_m = require('../database');
global.db_pool = db_m.pool;
module.exports=router;



router.get('/readBooks', (req, res) => {
    const sql = 'SELECT * FROM books';
    db_pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        connection.query(sql, (err, results) => {
            connection.release();

            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.json(results);
            console.log(results);
        });
    });
});

// create
router.post('/createBook', (req, res) => {
    const { id,name, genre_id, auther_id } = req.body;
    console.log(req.body)
    // Validate that required fields are provided
    if (!id || !name || !genre_id || !auther_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO books (id,name, genre_id, auther_id) VALUES (?,?, ?, ?)';
    const values = [id,name, genre_id, auther_id];

    db_pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        connection.query(sql, values, (err, result) => {
            connection.release();

            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Return the ID of the newly created book
            const newBookId = result.insertId;
            res.json({ id: newBookId, message: 'Book created successfully' });
        });
    });
});
//delete
router.delete('/deleteBook/:id', (req, res) => {
    const bookId = req.params.id;

    const sql = 'DELETE FROM books WHERE id = ?';
    const values = [bookId];

    db_pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        connection.query(sql, values, (err, result) => {
            connection.release();

            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ error: 'Internal Server Error', details: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Book not found', details: 'No rows deleted' });
            }

            res.json({ message: 'Book deleted successfully' });
        });
    });
});



// update
router.put('/updateBook/:id', (req, res) => {
    const bookId = req.params.id;
    const { id,name, genre_id, auther_id } = req.body;

    // Validate that required fields are provided
    if (!id || !name || !genre_id || !auther_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'UPDATE books SET name = ?, genre_id = ?, auther_id = ? WHERE id = ?';
    const values = [name, genre_id, auther_id, bookId];

    db_pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        connection.query(sql, values, (err, result) => {
            connection.release();

            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }

            res.json({ message: 'Book updated successfully' });
        });
    });
});

