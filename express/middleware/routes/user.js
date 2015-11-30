var express = require('express');
var router = express.Router();

router.get('/add', function (req, res) {
    res.send('/add');
});

router.get('/edit', function (req, res) {
    res.send('/edit');
});

router.get('/delete', function (req, res) {
    res.send('/delete');
});

module.exports = router;