var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
const apiController = require('../controllers/apiController');

router.get('/', indexController.index);

/* API */
router.get('/api/places/:long&:lat&:radius', apiController.apiPlaces);

module.exports = router;
