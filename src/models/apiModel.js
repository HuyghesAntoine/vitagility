const fetch = require('node-fetch');

exports.getPlaces = async function (
    longitude = 0,
    latitude = 0,
    radius = 5,
    sport = '',
    outdoor = true,
    indoor = true,
) {
    let url =
        'https://sportplaces.api.decathlon.com/api/v1/places?origin=' +
        longitude +
        ',' +
        latitude +
        '&radius=' +
        radius + 
        '&limit=' + 100;
    if (sport != '') {
        url += '&sports=' + sport;
    }
    console.log(sport);
    let places = [];

    let result = await fetch(url);
    result = await result.json();
    
    let nb_result = 0;
    for(i = 0; i<result.data.features.length; i++){
    //result.data.features.forEach(async (element) => {
        let ad = result.data.features[i].properties.address_components;
        if(result.data.features[i].properties.name != "Under review, proposed: -" && result.data.features[i].properties.quality_indicator > 0 && nb_result < 10){
            let sport = await getSport(result.data.features[i].properties.activities[0].sport_id);
            let test_indoor = false;
            let test_outdoor = false;
            console.log(test_indoor + " && " + test_outdoor);
            sport.tags.forEach(async (tag)=>{
                if(indoor && tag == "indoor"){
                    test_indoor = true;
                }
                if(outdoor && tag == "outdoor"){
                    test_outdoor = true;
                }
            });
            if(test_outdoor==outdoor && test_indoor==indoor){
                if(ad.address == null) ad.address = "Inconnu";
                console.log(test_indoor + " && " + test_outdoor + "->" + result.data.features[i].properties.name);
                places.push({
                    address: {
                        address: ad.address,
                        postal_code: ad.postal_code,
                        city: ad.city,
                        country: ad.country,
                        coordinates: result.data.features[i].geometry.coordinates[0],
                    },
                    name: result.data.features[i].properties.name,
                    photo: result.data.features[i].properties.photo_reference,
                    uuid: result.data.features[i].properties.uuid,
                    quality_indicator: result.data.features[i].properties.quality_indicator,
                    sport: result.data.features[i].properties.activities[0].sport_id,
                });
                nb_result += 1;
            }
        }
    };//);
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

exports.getSports = async function () {
    let result = await fetch(
        'https://sportplaces.api.decathlon.com/api/v1/sports/'
    );
    result = await result.json();

    return result;
};
