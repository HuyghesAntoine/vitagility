const apiModel = require('../models/apiModel');

exports.apiPlaces = async function (req, res) {
    let result = await apiModel.getPlaces(
        req.params.long,
        req.params.lat,
        req.params.radius
    );
    res.send(result);
};
