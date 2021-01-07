const fetch = require('node-fetch');

exports.getPlaces = async function (
    longitude = 0,
    latitude = 0,
    radius = 5,
    sport = ''
) {
    let url =
        'https://sportplaces.api.decathlon.com/api/v1/places?origin=' +
        longitude +
        ',' +
        latitude +
        '&radius=' +
        radius;
    if (sport != '') {
        url += '&sports=' + sport;
    }

    let places = [];

    let result = await fetch(url);
    result = await result.json();

    result.data.features.forEach(async (element) => {
        let ad = element.properties.address_components;
        if(element.properties.name != "Under review, proposed: -"){
            places.push({
                address: {
                    address: ad.address,
                    postal_code: ad.postal_code,
                    city: ad.city,
                    country: ad.country,
                    coordinates: element.geometry.coordinates[0],
                },
                name: element.properties.name,
                photo: element.properties.photo_reference,
                uuid: element.properties.uuid,
                quality_indicator: element.properties.quality_indicator,
                sport: element.properties.activities[0].sport_id,
            });
        }
    });
    for (i = 0; i < places.length; i++) {
        if (typeof places[i].sport == 'number')
            places[i].sport = await getSport(places[i].sport);
    }
    return places;
};

getSport = async function (id = '') {
    let result = await fetch(
        'https://sportplaces.api.decathlon.com/api/v1/sports/' + id
    );
    result = await result.json();

    return result;
};
