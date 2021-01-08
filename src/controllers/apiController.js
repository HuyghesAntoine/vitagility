const apiModel = require('../models/apiModel');
const googleModel = require('../models/googleApiModel');

exports.apiPlaces = async function (req, res) {
    console.log(req.params.long, req.params.lat, req.params.radius, req.params.sport, req.params.outdoor, req.params.indoor);
    let result = await apiModel.getPlaces(
        req.params.long,
        req.params.lat,
        req.params.radius,
        req.params.sport,
        req.params.outdoor,
        req.params.indoor
    );
    console.log(req.params.long, req.params.lat, req.params.radius);
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
    /*let result = await parse.JSON(result);*/
    console.log(result);
    res.send(result);
};

exports.apiDetailedPlaces = async function (req, res) {
    let result = await googleModel.findDetailedPlace(req.params.id);
    console.log(req.params.id);
    res.send(result);
};
