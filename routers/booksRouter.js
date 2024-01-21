const express = require('express');
const router = express.Router();
module.exports=router;

router.post('/add',(req,res)=> {

    const reqData = req.body();
    res.json({message: 'Data received successfully', data: reqData});

}
);

