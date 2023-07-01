const prev = document.getElementById('pagPrev');
const next = document.getElementById('pagNext');

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US';

var pagActual = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGEwNGJkOTViYzdhNTE1OTQxZmE5MTZmZTZmNjcwMiIsInN1YiI6IjY0NWViMzJlNWFiODFhMDBmZGNmMWMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoUAdOfcNP_wkP9V-hqo4XAT38PLFGhjhYPPUWpeNWQ'
    }
};



async function fetchPeliculas(url){
    lastUrl = url;
    let data = await fetch(url, options);
    let response = await data.json();

    console.log(response)

    let carteleraPeliculas = document.querySelector('.cartelera');
    if (response.results.length !== 0){
        for (let i = 0; i < response.results.length; i++) {
            carteleraPeliculas.innerHTML += `
                    <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
                    <div class="card text-bg-dark shadow item-card">
                        <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${response.results[i].poster_path}" class="card-img item-Imagen" alt="${response.results[i].title}">
                        <div class="card-img-overlay">
                            <h5 class="card-title item-Titulo">${response.results[i].title}</h5>
                            <p class="card-text item-Descripcion"></p>
                            <p class="item-Precio"><b>5000 CLP</b></p>
                            <a type="button" class="btn btn-outline-light btnVerMas" href="https://www.themoviedb.org/movie/${response.results[i].id}">Ver más</a>
                            <button type="button" class="btn btn-outline-info addCarro">Añadir Pelicula</button>
                        </div>
                    </div>
                </div>
                `
        }
        pagActual = response.page;
        nextPage = pagActual + 1;
        prevPage = pagActual - 1;
        totalPages = response.total_pages;


    }else{
        alert('No se encontaron peliculas')
    }

};
fetchPeliculas(url);

next.addEventListener('click', () => {
    if(nextPage <= totalPages){
        pageCall(nextPage);
    }
})

function pageCall(page){
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if(key[0] != 'page'){
        let url = lastUrl + '&page='+page;
        fetchPeliculas(url);
    }else{
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length -1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b
        fetchPeliculas(url);
    }
}