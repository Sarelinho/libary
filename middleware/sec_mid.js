
async function addSec(req,res,next){
    let area = req.body.area;
    let shelf = req.body.shelf;
    let category_id = req.body.category_id;

    let poolPromise = db_pool.promise();
    let row =[];
    let q =`INSERT INTO section`;
     q +=`(area,shelf,category_id) `;
    q+=`VALUES('${area}','${shelf}','${category_id}')`;
    try {
        [row] = await poolPromise.query(q);
    }catch (err){
        res.status(500).json({message:err});
    }
    res.row = row.insertId;
    next();
}
async function deleteSec(req,res,next){
    let id = req.body.id;
    let poolPromise = db_pool.promise();
    let row =[];
    let q = `DELETE FROM section WHERE id = ${id}`;
    try {
        [row] = await poolPromise.query(q);
    }catch (err){
        res.status(500).json({message:err});
    }
    res.row = row;
    next();
}
async function updateSec(req,res,next){
    let id = req.body.id;
    let area = req.body.area;
    let shelf = req.body.shelf;
    let category_id = req.body.category_id;

    let poolPromise = db_pool.promise();
    let row =[];
    let q = `UPDATE section SET area = '${area}',`;
    q+=`shelf = '${shelf}',category_id = '${category_id}' WHERE id = ${id}`;
    try {
        [row] = await poolPromise.query(q);
    }catch (err){
        res.status(500).json({message:err});
    }
    res.row = row;
    next();
}
async function getSec(req,res,next){
    let poolPromise = db_pool.promise();
    let row =[];
    let q = `SELECT * FROM section`;
    try {
        [row] = await poolPromise.query(q);
    }catch (err){
        res.status(500).json({message:err});
    }
    res.row = row;
    next();
}


module.exports ={
    addSec:addSec,
    deleteSec:deleteSec,
    updateSec:updateSec,
    getSec:getSec
}