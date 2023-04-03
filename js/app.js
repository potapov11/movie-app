const API_Key = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const API_url_popular = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

getMovies(API_url_popular);

async function  getMovies(url) {

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application.json',
      'X-API-KEY': API_Key,
    }
  });
  const respData = await response.json();
  showMovies(respData);
  console.log(respData);
}


  function getClassByRate(vote){
    if(vote >= 7) {
      return 'green';
    } else if(vote > 5) {
      return 'orange';
    } else {
      return 'red';
    }
}

function showMovies(data) {
  const moviesEl = document.querySelector('.movies');
  data.films.forEach(movie => {
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
      <div class="movie__category">${movie.genres.map((genre)=> ` ${genre.genre}`)}</div>
      <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
    </div>
  </div>
    `
    moviesEl.appendChild(movieEl);
  });
}

// "films": [
//   {
//     "filmId": 1267348,
//     "nameRu": "Джон Уик 4",
//     "nameEn": "John Wick: Chapter 4",
//     "year": "2023",
//     "filmLength": "02:49",
//     "countries": [
//       {
//         "country": "США"
//       }
//     ],
//     "genres": [
//       {
//         "genre": "триллер"
//       },
//       {
//         "genre": "криминал"
//       },
//       {
//         "genre": "боевик"
//       }
//     ],
//     "rating": "7.9",
//     "ratingVoteCount": 25574,
//     "posterUrl": "https://kinopoiskapiunofficial.tech/images/posters/kp/1267348.jpg",
//     "posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/1267348.jpg",
//     "ratingChange": null
//   },
