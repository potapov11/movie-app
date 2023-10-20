const API_Key = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const API_url_popular =
	'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_url_search =
	'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_Movie_details = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/';

getMovies(API_url_popular);

async function getMovies(url) {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application.json',
			'X-API-KEY': API_Key,
		},
	});
	const respData = await response.json();
	showMovies(respData);
	console.log(respData);
}

function getClassByRate(vote) {
	if (vote >= 7) {
		return 'green';
	} else if (vote > 5) {
		return 'orange';
	} else {
		return 'red';
	}
}

function showMovies(data) {
	document.querySelector('.movies').innerHTML = '';

	const moviesEl = document.querySelector('.movies');
	data.films.forEach((movie) => {
		console.log(movie);
		const movieEl = document.createElement('div');
		movieEl.classList.add('movie');
		movieEl.innerHTML = `
    <div class="movie">
      <div class="movie__cover-inner">
        <img class="movie__cover" src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
        ${
					movie.rating !== 'null' &&
					`
        <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${
						movie.rating
					}</div>`
				}
      </div>
    </div>
    `;
		movieEl.addEventListener('click', () => openModal(movie.filmId));
		moviesEl.appendChild(movieEl);
	});
}

//Поиск

const form = document.querySelector('form');
const search = document.querySelector('.header__search');
const clearSearch = document.querySelector('.header__clear');

search.addEventListener('input', (e) => {
	const apiSearcUrl = `${API_url_search}${search.value}`;
	if (search.value) {
		console.log(search.value);
		getMovies(apiSearcUrl);
	}
});

clearSearch.addEventListener('click', () => {
	search.value = '';
	getMovies(API_url_popular);
});

//Modal
const modalEl = document.querySelector('.modal');

async function openModal(id) {
	const response = await fetch(API_Movie_details + id, {
		headers: {
			'Content-Type': 'application.json',
			'X-API-KEY': API_Key,
		},
	});
	const respdata = await response.json();
	console.log(respdata);

	console.log(id);
	modalEl.classList.add('modal--show');
	document.body.classList.add('stop-scrolling');

	modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${respdata.data.posterUrl}" alt="">
      <h2>
        <span class="modal__movie-title">Название ${respdata.data.nameRu}</span>
        <span class="modal__movie-release-year">Год ${respdata.data.year}</span>
      </h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        ${
					respdata.data.filmLength
						? `<li class="modal__movie-runtime">Время ${respdata.data.filmLength}-минут</li>`
						: ``
				}
        <li >Сайт: <a class="modal__movie-site" href="${respdata.data.webUrl}">${
		respdata.data.webUrl
	}</a></li>
        <li class="modal__movie-genre">Жанр - ${respdata.data.genres.map(
					(el) => `<span>${el.genre}</span>`,
				)}</li> 
        <li class="modal__movie-overview">Описание - ${respdata.data.description}</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `;
	const btnClose = document.querySelector('.modal__button-close');
	console.log(btnClose);
	btnClose.addEventListener('click', () => closeModal());
}

function closeModal() {
	modalEl.classList.remove('modal--show');
	document.body.classList.remove('stop-scrolling');
	console.log('elfkztn');
}

window.addEventListener('click', (e) => {
	if (e.target === modalEl) {
		closeModal();
	}
});

window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeModal();
	}
});

{
	/* <li class="modal__movie-genre">Жанр - ${respdata.data.genres.map((el) => `<span>${el.genre}</span>`)}</li> */
}
