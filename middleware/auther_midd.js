
// Read
async function readAuthers(req, res, next) {
    const sql = 'SELECT * FROM auther';
    const promisePool = db_pool.promise();

    try {
        const [results] = await promisePool.query(sql);
        res.json(results);
        res.render('./views/pages/auther/index', { results });
        console.log(results);
    } catch (err) {
        console.error('Error in readAuthors middleware:', err);
        res.status(500).send('Internal Server Error');
    }
    next();
}
// Create
async function createAuthers(req, res, next) {
    const { last_name, first_name, id } = req.body;
    const sql = 'INSERT INTO auther (last_name, first_name, id) VALUES (?, ?, ?)';
    const values = [last_name, first_name, id];
    const promisePool = db_pool.promise();

    try {
        const [result] = await promisePool.query(sql, values);
        res.json({ message: 'Author created successfully', id: result.insertId });
    } catch (err) {
        console.error('Error in createAuthor middleware:', err);
        res.status(500).send('Internal Server Error');
    }
    next();

}

// Delete
async function deleteAuthers(req, res, next) {
    const autherId = req.body.id;
    const sql = 'DELETE FROM auther WHERE id = ?';
    const promisePool = db_pool.promise();

    try {
        const [result] = await promisePool.query(sql, [autherId]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Author not found', id: autherId });
        } else {
            res.json({ message: 'Author deleted successfully', id: autherId });
        }
    } catch (err) {
        console.error('Error in deleteAuthor middleware:', err);
        res.status(500).json({ error: err.message });
    }
    next();
}

// Update
async function updateAuthers(req, res, next) {
    const autherId = req.body.id;
    const { last_name, first_name, id } = req.body;
    const sql = 'UPDATE auther SET last_name=?, first_name=?, id=? WHERE id=?';
    const values = [last_name, first_name, id, autherId];
    const promisePool = db_pool.promise();

    try {
        const [result] = await promisePool.query(sql, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Author not found', id: autherId });
        } else {
            res.json({ message: 'Author updated successfully', id: autherId });
        }
        console.log(result);
    } catch (err) {
        console.error('Error in updateAuthor middleware:', err);
        res.status(500).json({ error: err.message });
    }
    next();

}

module.exports = {
    readAuthers: readAuthers,
    createAuthers: createAuthers,
    deleteAuthers: deleteAuthers,
    updateAuthers: updateAuthers
};
