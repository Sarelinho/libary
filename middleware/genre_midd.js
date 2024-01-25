
//read
async function readGenre(req, res, next) {
    const sql = 'SELECT * FROM genre';
    const promisePool = db_pool.promise();
    let row=[];

    try {

        [row] = await promisePool.query(sql);


        res.results = row;
    } catch (err) {
        return res.status(500).json({message: err});
    }
        next();
}

//create
async function createGenre(req, res, next) {
    const {  type } = req.body; // Assuming you pass id and type in the request body
    const sql = 'INSERT INTO genre ( type) VALUES ( ?)';
    const promisePool = db_pool.promise();

    try {
        await promisePool.query(sql, [ type]);
        res.status(201).json({ message: 'Genre created successfully.' });
    } catch (err) {
        console.error('Error creating genre:', err);
        res.status(500).json({ message: 'Error creating genre.' });
    }

    next();
}

//delete
async function deleteGenre(req, res, next) {
    const genreId = req.body.id; // Assuming the genre ID is passed as a route parameter
    const sql = 'DELETE FROM genre WHERE id = ?';
    const promisePool = db_pool.promise();

    try {
        const [result] = await promisePool.query(sql, [genreId]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Genre not found.' });
        } else {
            res.status(200).json({ message: 'Genre deleted successfully.' });
        }
    } catch (err) {
        console.error('Error deleting genre:', err);
        res.status(500).json({ message: 'Error deleting genre.' });
    }

    next();
}

//update
async function updateGenre(req, res, next) {
    const { id, type } = req.body;
    const sql = 'UPDATE genre SET type = ? WHERE id = ?';
    const promisePool = db_pool.promise();

    try {
        const [result] = await promisePool.query(sql, [type, id]);

        if (result.affectedRows === 0) {
            // No rows were affected, meaning the genre with the given ID was not found
            res.status(404).json({ message: 'Genre not found.' });
        } else {
            // Genre updated successfully
            res.status(200).json({ message: 'Genre updated successfully.' });
        }
    } catch (err) {
        console.error('Error updating genre:', err);
        res.status(500).json({ message: 'Error updating genre.' });
    }

    next();
}

module.exports={
    createGenre: createGenre,
    readGenre:readGenre,
    deleteGenre:deleteGenre,
    updateGenre:updateGenre
};
