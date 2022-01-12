const express = require('express');
const storage = require('../storage.js');

const router = express.Router();

router.post('/add', function(req, res) {
  res.json({success: true, id: storage.save(req.body)});
});

router.get('/get', function(req, res) {
  if(!req.query.from) {
    res.json({success: false});
    return;
  }

  const result = storage.getByIds(req.query.from, req.query.to);

  if(result === []) {
    res.json({success: false});
  } else {
    res.json({success: true, count: result});
  }
});

router.get('/count', function(req, res) {
  res.json({success: true, count: storage.entriesCount()});
});

module.exports = router;
