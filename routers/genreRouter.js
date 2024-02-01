const express = require('express');
const router = express.Router();
let db_m = require('../database');
global.db_pool = db_m.pool;
module.exports=router;


const genre_midd=require('../middleware/genre_midd');

//route read
router.get('/readGenre',[genre_midd.readGenre],(req,res) => {
    console.log(res.json(res.results))
      res.json(res.results)
    }
);
//route create
router.post('/createGenre',[genre_midd.createGenre],(req,res) => {
        console.log(res.json(res.results))
        res.json(res.results)
    }
);
//route delete
router.delete('/deleteGenre',[genre_midd.deleteGenre],(req,res) => {
        console.log(res.json(res.results))
        res.json(res.results)
    }
);
//route update
router.put('/updateGenre',[genre_midd.updateGenre],(req,res) => {
        console.log(res.json(res.results))
        res.json(res.results)
    }
);

//create

