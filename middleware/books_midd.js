//read
async function readBooks(req, res, next) {
    const sql = 'SELECT * FROM books';
    const promisePool = db_pool.promise();

    try {
        const [rows] = await promisePool.query(sql);
        res.results = rows;  // Use 'rows' instead of 'row' to reflect multiple results
        next();
    } catch (err) {
        console.error('Error in readBooks middleware:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


//create
async function createBooks(req, res, next) {
    const { name, genre_id, auther_id } = req.body;
    const sql = 'INSERT INTO books (name, genre_id, auther_id) VALUES (?, ?, ?)';
    const values = [name, genre_id, auther_id];
    const promisePool = db_pool.promise();

    try {
        const [result] = await promisePool.query(sql, values);
        const insertedId = result.insertId;

        const [newRecord] = await promisePool.query('SELECT * FROM books WHERE id = ?', [insertedId]);

        res.results = newRecord || {};
        next();
    } catch (err) {
        console.error('Error in createBook middleware:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//delete
async function deleteBooks(req, res, next) {
    const bookId = req.body.id;
    const sql = 'DELETE FROM books WHERE id = ?';
    const values = [bookId];

    const promisePool = db_pool.promise();

    try {
        const [result] = await promisePool.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found', details: 'No rows deleted' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error in deleteBook middleware:', err);
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
}

//update
async function updateBooks(req, res, next) {
    const bookId = req.body.id;
    const { name, genre_id, auther_id } = req.body;

    // Validate that required fields are provided
    if (!name || !genre_id || !auther_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sqlSelect = 'SELECT * FROM books WHERE id = ?';
    const valuesSelect = [bookId];

    const sqlUpdate = 'UPDATE books SET name = ?, genre_id = ?, auther_id = ? WHERE id = ?';
    const valuesUpdate = [name, genre_id, auther_id, bookId];

    const promisePool = db_pool.promise();

    try {
        // Check if the book exists before attempting to update it
        const [existingBook] = await promisePool.query(sqlSelect, valuesSelect);

        if (!existingBook || existingBook.length === 0) {
            return res.status(404).json({ error: 'Book not found', details: 'Book does not exist' });
        }

        // If the book exists, proceed with the update
        const [result] = await promisePool.query(sqlUpdate, valuesUpdate);

        if (result.affectedRows === 0) {
            return res.status(500).json({ error: 'Internal Server Error', details: 'No rows updated' });
        }

        res.json({ message: 'Book updated successfully' });
    } catch (err) {
        console.error('Error in updateBook middleware:', err);
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
}

module.exports={
    readBooks:readBooks,
    createBooks: createBooks,
    deleteBooks: deleteBooks,
    updateBooks:updateBooks
};