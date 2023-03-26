var express = require('express');
var router = express.Router();
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios');
const filteredData = require("../services/filteredData");
const insertDistanceToData = require('../services/insertDistanceToData');
const sortDataBasedOnDistance = require('../services/sortDataBasedOnDistance');
const clearDuplicateData = require('../services/clearDuplicateData');
const exData = require('../exData.json');



router.post('/example', async function (req, res, nex) {
  res.json(exData);
})

router.post('/', async function (req, res, next) {
  const resultFilteredData = await filteredData();
  const lat = req.body.lat;
  const long = req.body.long;
  console.log("This is index", lat, ' ', long)
  
  let clearedData;
  if (lat != null && long != null) {
    console.log("lat = ", lat, " long = ", long);

    const insertedData = insertDistanceToData(lat, long, resultFilteredData);
    const sortedData = await sortDataBasedOnDistance(insertedData);

    clearedData = clearDuplicateData(sortedData);
  }
  else clearedData = clearDuplicateData(resultFilteredData);

  res.json(clearedData);


})

module.exports = router;
