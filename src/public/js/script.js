const listCode = (data) => `
<a id="${data.uuid}" class="list-group-item list-group-item-action ${
    typeof data.google_place_id == 'string'
        ? 'vtmn-border-right-success'
        : 'vtmn-border-right-danger'
}">
    <div class="d-flex justify-content-between">
      <p class="mb-1 vtmn-typo_text-1">${
          data.quality_indicator >= 3
              ? `<img class="d-inline" width="25" src="assets/icons/services/badge.svg"/>`
              : ''
      } ${data.name} <small class="vtmn-typo_text-3 vtmn-text-grey">(${
    data.sport.name
})</small></p>
      
      <img
      src="assets/sports_picto/${data.sport.name
          .replace(/\ /g, '_')
          .toLowerCase()}.svg"
      height="50"
      width="50" />
    </div>

</a>
`;

const cardCode = (data) => `
<div class="row">
<div class="col-6">
${imgSlide(data.photos)}
</div>
<div class="col-6">
<div class="card">

  <div class="card-body">
    <p class="card-text">
    <span class="vtmn-typo_title-3">${
        data.quality_indicator >= 3
            ? `<img class="d-inline" src="assets/icons/reviews/star_full.svg"/>`
            : ''
    } ${data.name}</span>
    <u>sports :</u> ${data.sport.name}<br>
    <u>adresse :</u> ${data.address.address}<br>
    ${
        typeof data.rating !== 'undefined'
            ? "D' après les utilisateurs :" +
              `<div class="float-start" data-bs-toggle="tooltip" data-bs-placement="top" title="${data.rating} / 5 ">` +
              `<img class="d-inline"
            src="assets/icons/reviews/star_full.svg"
            height="15"
            width="15" />`.repeat(parseInt(data.rating)) +
              `<img class="d-inline"
            src="assets/icons/reviews/star_empty.svg"
            height="15"
            width="15" />`.repeat(5 - parseInt(data.rating)) +
              `</div>`
            : ''
    }<br>
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
</div></div>`;

var app = document.getElementById('loadingText');

var typewriter = new Typewriter(app, {
    loop: true,
    cursor: '',
    delay: '80',
});

typewriter
    .typeString('Chargement de vos résultats ...')
    .deleteChars(13)
    .typeString("lieux d'entrainement")
    .deleteChars("lieux d'entrainement".length)
    .typeString('marathons')
    .pause(1000)
    .start();

function imgSlide(photos) {
    let inner = '';
    let indicators = '';
    let min = Math.min(photos.length, 3);
    console.log('Max displaying', min);
    for (i = 0; i < min; i++) {
        inner += `<div class="carousel-item ${i == 1 ? 'active' : ''}">
        <img src="${photos[i]}" class="d-block w-100">
      </div>`;
        indicators += `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"></li>`;
    }

    if (photos.length == 0) return '';

    return `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <ol class="carousel-indicators">
        ${indicators}
    </ol>
    <div class="carousel-inner">
        ${inner}
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </div>`;
}

document.getElementById('pleinAirCheck').addEventListener('change', (event) => {
    def.outdoor = document.getElementById('pleinAirCheck').checked;
    loadActivities();
});
document.getElementById('couvertCheck').addEventListener('change', (event) => {
    def.indoor = document.getElementById('couvertCheck').checked;
    loadActivities();
});
document.getElementById('selectSports').addEventListener('change', (event) => {
    def.sport = document.getElementById('selectSports').value;
    loadActivities();
});

const link = (def) =>
    `/api/places/${def.long}&${def.lat}&${def.radius}&${def.sport}&${def.outdoor}&${def.indoor}`;
let res = [];
document.getElementById('pleinAirCheck').checked = true;
document.getElementById('couvertCheck').checked = true;

loadSports();
async function loadSports() {
    let sports = await fetch('/api/sports');
    sports = await sports.json();
    sports.forEach((sport) => {
        var node = document.createElement('option');
        var textnode = document.createTextNode(sport.name);
        node.appendChild(textnode);
        node.value = sport.id;
        document.getElementById('selectSports').appendChild(node);
    });
}

async function loadActivities() {
    console.log(link(def));
    res = await fetch(link(def));
    res = await res.json();
    mainList.innerHTML = '';
    res.forEach((sport) => {
        mainList.innerHTML += listCode(sport);
    });
    document.querySelectorAll('a.list-group-item').forEach((el) => {
        el.addEventListener('click', (event) => {
            res.forEach(async (sport) => {
                if (sport.uuid == el.id) {
                    detail = {};
                    if (typeof sport.google_place_id != 'null') {
                        let detailedLink =
                            '/api/places/details/' + sport.google_place_id;
                        detail = await fetch(detailedLink);
                        detail = await detail.json();
                        detail = detail.result;
                        for (
                            i = 0;
                            i < Math.max(detail.photos.length, 3);
                            i++
                        ) {
                            var arrayBufferView = new Uint8Array(
                                detail.photos[i].data
                            );
                            var blob = new Blob([arrayBufferView], {
                                type: 'image/jpeg',
                            });
                            var urlCreator = window.URL || window.webkitURL;
                            var imageUrl = urlCreator.createObjectURL(blob);
                            detail.photos[i] = imageUrl;
                        }
                    }
                    console.log(detail);
                    sport = Object.assign(sport, detail);
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
    loader.classList.add('d-none');
}

// Global
let def = {
    lat: '3.057256',
    long: '55.629250',
    radius: '100',
    indoor: 'true',
    outdoor: 'true',
    sport: '-1',
};

function geo() {
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
}

activeGeo.addEventListener('click', (event) => {
    geo();
});

/* Form Listener */
radius.addEventListener('change', (event) => {
    def.radius = radius.value;
    loadActivities();
});

loadingCode = `<div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div>`;

searchForm.addEventListener('submit', async (event) => {
    loader.classList.remove('d-none');
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

geo();
