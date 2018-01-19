$(document).ready(function () {

  infoMovie();
});

function infoMovie() {
  let movieTitle = sessionStorage.getItem('movieTitle');

  axios.get('http://www.omdbapi.com?t=' + movieTitle + '&plot=full' + '&apikey=3a181f1c')
    .then((response) => {

      let movie = response.data;

      let output = `
      <div class="col-xs-12 col-md-12">
      <div class="container-imag col-xs-12 col-md-4">
        <img src='${movie.Poster}' alt="" class="imgStyle">
      </div>
      <div class="review col-xs-12 col-md-8 ">
        <h1 class="font-weight-bold">${movie.Title}</h1>
        <hr>
        <div class="plot">
          <span class="icons">
            <i class="fa fa-star" aria-hidden="true"></i>
          </span>
          <span>${movie.Ratings[0].Value}</span>
          <span class="icons">
            <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
          <span>${movie.Ratings[1].Value}</span>
        </div>
        <div class="">
          <h5>Plot</h5>
          <p class="text-justify">${movie.Plot}</p>
        </div>
        <div class="columns">
          <p class="font-weight-bold">Production</p>
          <p>${movie.Production}</p>
          <p class="font-weight-bold">Runtime</p>
          <p>${movie.Runtime}</p>
          <p class="font-weight-bold">Rated <span>${movie.Rated}</span></p>
          <p class="font-weight-bold">Director</p>
          <p>${movie.Director}</p>
          <p class="font-weight-bold">Actors</p>
          <p>${movie.Actors}</p>
          <p class="font-weight-bold">Year</p>
          <p>${movie.Released}</p>
          <p class="font-weight-bold">Country</p>
          <p>${movie.Country}</p>
        </div>
      </div>
    </div>
        `;

      $('.movie-plot').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}