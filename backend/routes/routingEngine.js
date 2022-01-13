const express = require('express');
const storage = require('../storage.js');

const router = express.Router();

router.post('/savecontract', function(req, res) {
  storage.saveContractAddress(req.body.address);
  res.json({success: true});
});

router.post('/savemetadata', function(req, res) {
  res.json({success: true, id: storage.saveMetadata(req.body)});
});

router.get('/getcontract', function(req, res) {
  const result = storage.getContractAddress();

  if(!result) {
    res.json({success: false});
  } else {
    res.json({success: true, address: result});
  }
});

router.get('/getmetadata&id=:id', function(req, res) {
  const result = storage.getMetadataById(req.params.id);

  if(!result) {
    res.json({success: false});
  } else {
    res.json({success: true, metadata: result});
  }
});

router.get('/metadatacount', function(req, res) {
  res.json({success: true, count: storage.metadataCount()});
});

module.exports = router;
