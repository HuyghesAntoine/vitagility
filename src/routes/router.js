var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
const apiController = require('../controllers/apiController');

router.get('/', indexController.index);

/* API */
router.get('/api/places/:long&:lat&:radius&:outdoor&:indoor', apiController.apiPlaces);
router.get('/api/sports', apiController.apiSports);
router.get('/api/find/:input', apiController.apiPlacesfromInput);

module.exports = router;
