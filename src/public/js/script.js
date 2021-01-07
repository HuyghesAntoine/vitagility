const listCode = (data) => `
<a id="${
    data.uuid
}" class="list-group-item list-group-item-action" aria-current="true" data-uuid="0">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${data.name}</h5>
      <small>${data.sport.name}</small>
    </div>
    <p class="mb-1">${
        data.address.address != 'Inconnu' ? data.address.address : ''
    }</p>
</a>
`;

const cardCode = (data) => `
<div class="card">
  <img src="${data.photo}" class="card-img-top" alt="">
  <div class="card-body">
    <p class="card-text">
    <u>nom :</u> ${data.name}<br>
    <u>sports :</u> ${data.sport.name}<br>
    <u>adresse :</u> ${data.address.address}<br>
    ${data.sport.tags
        .map(function (key, index) {
            if (index < 5)
                return `<span class="text-capitalize badge rounded-pill bg-secondary bg-${key.replace(
                    '-',
                    ''
                )}">${key.replace('_', ' ')}</span>`;
        })
        .filter(Boolean)}
    </p>
  </div>
</div>`;

const link = (def) => `/api/places/${def.long}&${def.lat}&${def.radius}`;
let res = [];

async function loadActivities() {
    res = await fetch(link(def));
    res = await res.json();
    console.log(res);
    mainList.innerHTML = '';
    res.forEach((sport) => {
        mainList.innerHTML += listCode(sport);
    });
    document.querySelectorAll('a.list-group-item').forEach((el) => {
        el.addEventListener('click', (event) => {
            res.forEach(async (sport) => {
                if (sport.uuid == el.id) {
                    if (sport.google_place_id != null){
                        let detailedLink = '/api/places/details/'+sport.google_place_id;
                        let resultat = await fetch(detailedLink);
                        resultat = await resultat.json();
                        console.log(resultat);
                    }
                    console.log(sport);
                    infoCard.innerHTML = cardCode(sport);
                    document.getElementById('gmap_canvas').src =
                        'https://maps.google.com/maps?q=' +
                        sport.address.coordinates[1] +
                        ',' +
                        sport.address.coordinates[0] +
                        '&t=&z=11&ie=UTF8&iwloc=&output=embed';
                }
            });
        });
    });
}

// Global
let def = {
    lat: '3.057256',
    long: '55.629250',
    radius: '100',
};

if ('geolocation' in navigator) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    function success(pos) {
        var crd = pos.coords;
        def.lat = crd.latitude;
        def.long = crd.longitude;
        loadActivities();
    }

    function error(err) {
        loadActivities();
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
} else {
    console.error('Navigateur non compatible avec la géolocalisation');
}

/* Form Listener */
radius.addEventListener('change', (event) => {
    def.radius = radius.value;
    loadActivities();
});

loadingCode = `<div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div>`;

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    mainList.innerHTML = loadingCode;
    let res = await fetch('api/find/' + address.value);

    res = await res.json();
    console.log(res);
    def.lat = res.geometry.location.lat;
    def.long = res.geometry.location.lng;
    address.value = res.formatted_address;
    loadActivities();
});
