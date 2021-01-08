const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});
exports.findPlace = async function (input) {
    const res = await client.findPlaceFromText({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            input: input,
            inputtype: 'textquery',
            fields: 'formatted_address,name,geometry',
        },
        timeout: 1000, // milliseconds
    });
    return res.data.candidates[0];
};

exports.findDetailedPlace = async function (id) {
    const res = await client.placeDetails({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            place_id: id,
            fields: 'photos,rating',
        },
        timeout: 1000,
    });
    try {
        for (i = 0; i < Math.max(res.data.result.photos.length, 3); i++) {
            res.data.result.photos[i] = await getPhoto(
                res.data.result.photos[i].photo_reference
            );
            console.log;
            //console.log(res.data.result.photos[i]);
        }
    } catch (e) {
        //console.log(e);
    }
    return res.data;
};

exports.findCityStade = function () {
    client
        .textSearch({
            params: {
                key: process.env.GOOGLE_MAPS_API_KEY,
                query: 'City Stade',
                inputtype: 'textquery',
                location: '3.057256,50.629250',
                radius: '10000',
            },
            timeout: 1000, // milliseconds
        })
        .then((r) => {
            console.log(r.data.results);
        })
        .catch((e) => {
            console.log(e.response.data.error_message);
        });
};

exports.findNearestDecathlon = async function (lng, lat) {
    console.log(lng, lat);
    const res = await client.findPlaceFromText({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            input: 'Décathlon',
            inputtype: 'textquery',
            locationbias: 'circle:1000@' + lat + ',' + lng,
            fields: 'formatted_address,name,geometry',
        },
        timeout: 1000, // milliseconds
    });
    return res.data.candidates[0];
};

getPhoto = async function (ref) {
    const res = await client.placePhoto({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            photoreference: ref,
            maxheight: 300,
        },
        timeout: 1000,
    });
    return res.data;
};
