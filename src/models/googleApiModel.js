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
    /*.then((r) => {
            console.log(r.data.candidates);
            return r.data.candidates;
        })
        .catch((e) => {
            console.log(e.response.data.error_message);
            return null;
        });*/
    return res.data.candidates[0];
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
