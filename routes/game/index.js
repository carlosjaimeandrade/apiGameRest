const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.send('point')
})


module.exports = router