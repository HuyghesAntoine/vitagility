const listCode = (data) => `
<a href="#" class="list-group-item list-group-item-action" aria-current="true" data-uuid="0">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${data.name}</h5>
      <small>${data.quality_indicator}</small>
    </div>
    <p class="mb-1">${data.address.address || 'Inconnu'}</p>
    <small>${data.sport.name}</small>
</a>
`;

const cardCode = (data) => `
<div class="card">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${data}</p>
  </div>
</div>`;

const link = (def) => `/api/places/${def.long}&${def.lat}&${def.radius}`;

async function loadActivities() {
    let res = await fetch(link(def));
    res = await res.json();
    console.log(res);
    mainList.innerHTML = '';
    res.forEach((sport) => {
        console.log(sport);
        mainList.innerHTML += listCode(sport);
    });
    document.querySelectorAll('a.list-group-item').forEach((el) => {
        el.addEventListener('click', (event) => {
            infoCard.innerHTML = cardCode(el.getAttribute('data-uuid'));
        });
    });
}

// Global
let def = {
    lat: '3.057256',
    long: '50.629250',
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
