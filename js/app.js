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
  console.log(respData);
}
