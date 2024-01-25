const express = require('express');
const router = express.Router();
module.exports = router;
const secMid = require('../middleware/sec_mid');

router.post('/Add',[secMid.addSec],(req,res)=> {
    res.json(res.row);
});
router.delete(`/Delete`,[secMid.deleteSec],(req,res)=>{
    res.json(res.row)
});
router.patch('/Update',[secMid.updateSec],(req,res)=> {
    res.json(res.row);
});
router.get('/List',[secMid.getSec],(req, res)=>{
    res.json(res.row)
})
