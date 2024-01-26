const express = require('express');
const router = express.Router();
let db_m = require('../database');
global.db_pool = db_m.pool;
module.exports=router;
const auther_midd=require('../middleware/auther_midd');

// Read Authers
router.get('/readAuthers', [auther_midd.readAuthers]);

// Create Auther
router.post('/createAuthers', [auther_midd.createAuthers]);

// Delete Auther
router.delete('/deleteAuthers', [auther_midd.deleteAuthers]);

// Update Auther
router.put('/updateAuthers', [auther_midd.updateAuthers]);

