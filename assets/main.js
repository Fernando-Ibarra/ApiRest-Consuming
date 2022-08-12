const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';

const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';

const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

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
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
};

async function loadFavouritesMichis() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY':'0bcad1ba-f0f3-470a-b522-db98ddac5976'
        }
    });
    const data = await res.json();
    console.log('Favoritos');
    console.log(data);
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error - " + res.status + " : " + data.message;
    } else {
        const section = document.getElementById('main--favourites-container');
        section.innerHTML = "";
        const div = document.createElement('div');
        const title = document.createElement('h1');
        const pTitle = document.createTextNode('Favorites Cats');
        title.appendChild(pTitle);
        div.appendChild(title)
        section.appendChild(div)
        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar foto de favoritos');
            
            img.src = michi.image.url;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteMichi(michi.id)
            article.appendChild(img);
            article.appendChild(btn);

            section.appendChild(article);
        });
    }
};

async function saveFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY':'0bcad1ba-f0f3-470a-b522-db98ddac5976',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();
    console.log('Save');
    console.log(res);
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error - " + res.status + " : " + data.message;
    } else {
        console.log('Michi guardado en favoritos');
        loadFavouritesMichis();
    }
}

async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY':'0bcad1ba-f0f3-470a-b522-db98ddac5976',
        }
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error - " + res.status + " : " + data.message;
    } else {
        console.log('Michi eliminado de favoritos');
        loadFavouritesMichis();
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-API-KEY':'0bcad1ba-f0f3-470a-b522-db98ddac5976',
        },
        body: formData,
    })

    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = "Hubo un error - " + res.status + " : " + data.message;
        console.log({data});
    } else {
        console.log('Foto de Michi subida');
        console.log({data});
        console.log(data.url);
        saveFavouriteMichi(data.id);
    }
}

const previewImg = () => {
    const file = document.getElementById('file').files;
    if (file.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            document.getElementById('preview').setAttribute("src", e.target.result);
        };
        fileReader.readAsDataURL(file[0]);
    }
}

loadRandomMichis();
loadFavouritesMichis();