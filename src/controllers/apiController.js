const apiModel = require('../models/apiModel');
const googleModel = require('../models/googleApiModel');

exports.apiPlaces = async function (req, res) {
    console.log(
        req.params.long,
        req.params.lat,
        req.params.radius,
        req.params.sport,
        req.params.outdoor,
        req.params.indoor
    );
    let result = await apiModel.getPlaces(
        req.params.long,
        req.params.lat,
        req.params.radius,
        req.params.sport,
        req.params.outdoor,
        req.params.indoor
    );
    let decathlon = await googleModel.findNearestDecathlon(
        req.params.long,
        req.params.lat
    );
    result.unshift(decathlon);
    res.send(result);
};

exports.apiSports = async function (req, res) {
    let result = await apiModel.getSports();
    res.send(result);
};

exports.apiSport = async function (req, res) {
    let result = await apiModel.getSport(req.params.id);
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
