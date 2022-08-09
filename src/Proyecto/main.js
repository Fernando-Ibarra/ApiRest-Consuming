const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=0bcad1ba-f0f3-470a-b522-db98ddac5976';

const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=0bcad1ba-f0f3-470a-b522-db98ddac5976';

const spanError = document.getElementById('error');

async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random');
    console.log(data);
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
};

async function loadFavouritesMichis() {
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();
    console.log('Favoritos');
    console.log(data);
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error - " + res.status + " : " + data.message;
    } else {
    }
};

async function saveFavouriteMichis() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: 'MTg2ODc5Mw',
        }),
    });
    const data = await res.json();
    console.log('Save');
    console.log(res);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error - " + res.status + " : " + data.message;
    } else {
    }
}

loadRandomMichis();
loadFavouritesMichis();