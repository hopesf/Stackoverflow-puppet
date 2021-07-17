const express = require('express');
const router = express.Router();
const abc = require('../../odev/data.json');

let content =[];

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', {title: "Stackoverflow App", abc:abc});
});

module.exports = router;
