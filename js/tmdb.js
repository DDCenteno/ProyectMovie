$(document).ready(function () {
    $initAPI = 'https://api.themoviedb.org/3/';
    $key = '?api_key=c6af48ec4f15d328eff057f6c9282de4';
    $sciFi = '&with_genres=878';

    mostPopular();
    nextReleases();
});




function mostPopular() {
    let output = '';
    axios.get($initAPI + 'discover/movie' + $key + '&sort_by=popularity.desc' + $sciFi)
        .then((response) => {
            movie = response.data.results;

            $.each(movie, function () {
                console.log(this);
                output += `<div class="containerMovie m-3 d-flex flex-column justify-content-center align-items-center ">
          <img src="https://image.tmdb.org/t/p/w500/${this.backdrop_path}" alt="" class="imgStyle">
          <h5 class="nameMovie text-center">${this.title}</h5>
        </div>
      `;
            })
            $('#mostPopular').html(output);
        })
}

function nextReleases() {
    let output = '';
    axios.get($initAPI + 'discover/movie' + $key + '&sort_by=release_date.asc' + $sciFi + '&year=2018')
        .then((response) => {
            movie = response.data.results;

            $.each(movie, function () {
                console.log(this);
                output += `<div class="containerMovie m-3 d-flex flex-column justify-content-center align-items-center ">
          <img src="https://image.tmdb.org/t/p/w500/${this.backdrop_path}" alt="" class="imgStyle">
          <h5 class="nameMovie text-center">${this.title}</h5>
        </div>
      `;
            })
            $('#nextReleases').html(output);
        })
}