class Place {
    constructor(address, name) {
        this.address = address;
        this.name = name;
    }
}
class Address {
    constructor(address, postalCode, city, country) {
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }
}

function getPlaces(longitude, latitude, radius, sport) {
    let places = [];
    let request = new XMLHttpRequest();
    let url =
        'https://sportplaces.api.decathlon.com/api/v1/places?origin=' +
        longitude +
        ',' +
        latitude +
        '&radius=' +
        radius +
        '&limit=10';
    if (sport != '') {
        console.log('ouah');
        url += '&sports=' + sport;
    }
    request.open('GET', url);
    request.send();
    request.onload = () => {
        console.log(request);
        if (request.status === 200) {
            // by default the response comes in the string format, we need to parse the data into JSON
            let data = JSON.parse(request.response);
            data.data.features.forEach((element) => {
                let ad = element.properties.address_components;
                let address = new Address(
                    ad.address,
                    ad.postal_code,
                    ad.city,
                    ad.country
                );
                places.push(new Place(address, element.properties.name));
            });
        } else {
            console.log(`error ${request.status} ${request.statusText}`);
        }
    };
    return places;
}

let tab = getPlaces('-73.582', '45.511', '99', '175');
console.log(tab);
