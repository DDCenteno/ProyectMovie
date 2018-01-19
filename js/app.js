$(document).ready(function() {
  // sticky menu
  $(window).on('scroll', function() {
    if ($(window).scrollTop()) {
      $('#menu').addClass('blue');
      $('.logo').attr('src','../assets/images/logo-white-01.png');
    } else {
      $('#menu').removeClass('blue');
        $('.logo').attr('src','../assets/images/logo-01.png');
    }
  });
  // ---------> Imprime foto y datos usuario <-------------
  // database
  var database = firebase.database();
  var reference = database.ref('user');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;
      reference.on('value', function(datos) {
        users = datos.val();
        var arrayUser = Object.values(users);
        for (i = 0; i < arrayUser.length; i++) {
          if (arrayUser[i].uid === uid) {
            var id = arrayUser[i];
            $('#logout').show();
            $('#register').hide();
            $('#user-name').text(id.name);
            $('#user-email').text(id.email);
            // console.log(id.profilePhoto);
            $('#user-profile').attr('src', id.profilePhoto);
          }
        }
      });
    }
  });

  $('#logout').click(function() {
    firebase.auth().signOut().then(function() {
      console.log('Cerrando sesión...');
      $(location).attr('href','index.html');
    }).catch(function(error) {
      console.log(error);
    });
  });
  // Agregando funcionalidad a searchbar
  $('#searchBtn').on('click', (e) => {

    let searchText = $('#searchMovie').val();
      $('#nameInputSearch').html('The results for <span class="bold"> ' + searchText + '</span> are... ');
    getMovies(searchText);
    e.preventDefault();
  });

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=3a181f1c')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        axios.get('http://www.omdbapi.com?t=' + movie.Title + '&apikey=3a181f1c')
          .then((response) => {
            let movieS = response.data;
            console.log(movieS);
            $genre = movieS.Genre.toString();
            selector = 'Sci-Fi';
            if ($genre.indexOf(selector) !== -1) {
              output += `<div class="containerMovie m-3 d-flex flex-column justify-content-center align-items-center ">
          <img src="${movieS.Poster}" alt="" class="imgStyle">
          <h5 class="nameMovie text-center">${movieS.Title}
        <a href="#"  class="text-white" id="btnSeeMore" onclick="infoMovie('${movieS.imdbID}')"><i class="fa fa-search-plus" aria-hidden="true" id="searchmore"></i></a>
        </h5>  
        </div>
     `;
            }
            $('.hightLight').addClass('hidenNow');
            $('#moviesBox').html(output);
          })
          .catch((err) => {
            console.log(err);
          });
        });
      })
    .catch((err) => {
      console.log(err);
    });
    }
});

