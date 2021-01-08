const apiModel = require('../models/apiModel');
const googleModel = require('../models/googleApiModel');

exports.apiPlaces = async function (req, res) {
    let result = await apiModel.getPlaces(
        req.params.long,
        req.params.lat,
        req.params.radius
    );
    console.log(req.params.long, req.params.lat, req.params.radius);
    res.send(result);
};

exports.apiSports = async function (req, res) {
    let result = await apiModel.getSports();
    res.send(result);
};

exports.apiPlacesfromInput = async function (req, res) {
    let result = await googleModel.findPlace(req.params.input);
    res.send(result);
};

exports.apiDetailedPlaces = async function (req, res) {
    let result = await googleModel.findDetailedPlace(req.params.id);
    res.send(result);
};
