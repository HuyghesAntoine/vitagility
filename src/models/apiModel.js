const fetch = require('node-fetch');

exports.getPlaces = async function (
    longitude = 0,
    latitude = 0,
    radius = 5,
    sport = '-1',
    outdoor = true,
    indoor = true
) {
    let url =
        'https://sportplaces.api.decathlon.com/api/v1/places?origin=' +
        longitude +
        ',' +
        latitude +
        '&radius=' +
        radius +
        '&limit=' +
        100;
    if (sport != '-1') {
        url += '&sports=' + sport;
    }
    let places = [];

    let result = await fetch(url);
    result = await result.json();
    let nb_result = 0;
    for (i = 0; i < result.data.features.length; i++) {
        //result.data.features.forEach(async (element) => {
        let ad = result.data.features[i].properties.address_components;
        if (
            result.data.features[i].properties.name !=
                'Under review, proposed: -' &&
            result.data.features[i].properties.quality_indicator > 0 &&
            nb_result < 10
        ) {
            let sport = await getSport(
                result.data.features[i].properties.activities[0].sport_id
            );
            var test_indoor = false;
            var test_outdoor = false;
            var final = false;
            sport.tags.forEach(async (tag) => {
                if (tag == 'indoor') test_indoor = true;
                if (tag == 'outdoor') test_outdoor = true;
            });
            if (indoor && outdoor) {
                if (test_outdoor && test_indoor) {
                    final = true;
                }
            }
            if (indoor && !outdoor) {
                if (test_indoor) final = true;
            }
            if (outdoor && !indoor) {
                if (test_outdoor) final = true;
            }
            if (!outdoor && !indoor) final = true;
            if (final == true) {
                if (ad.address == null) ad.address = 'Inconnu';
                places.push({
                    address: {
                        address: ad.address,
                        postal_code: ad.postal_code,
                        city: ad.city,
                        country: ad.country,
                        coordinates:
                            typeof result.data.features[i].geometry
                                .coordinates[0] == 'object'
                                ? result.data.features[i].geometry
                                    .coordinates[0]
                                : [
                                    result.data.features[i].geometry
                                        .coordinates[0],
                                    result.data.features[i].geometry
                                        .coordinates[1],
                                ],
                    },
                    google_place_id:
                        result.data.features[i].properties.google_place_id,
                    name: result.data.features[i].properties.name,
                    photo: result.data.features[i].properties.photo_reference,
                    uuid: result.data.features[i].properties.uuid,
                    quality_indicator:
                        result.data.features[i].properties.quality_indicator,
                    sport:
                        result.data.features[i].properties.activities[0]
                            .sport_id,
                });
                nb_result += 1;
            }
        }
    } //);
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
exports.getSport = async function (id = '') {
    let result = await fetch(
        'https://sportplaces.api.decathlon.com/api/v1/sports/' + id
    );
    result = await result.json();

    return result;
};

exports.getSports = async function () {
    let result = await fetch(
        'https://sportplaces.api.decathlon.com/api/v1/sports/'
    );
    result = await result.json();
    order = [];
    result.forEach((sport) => {
        order.push({ name: sport.name, id: sport.id, tags: sport.tags });
    });
    order.sort(function (a, b) {
        if (a.name < b.name) return -1;
        else return 1;
    });

    return order;
};
