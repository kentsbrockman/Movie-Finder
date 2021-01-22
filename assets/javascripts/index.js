let selector = document.getElementById("displaymovies");

const searchMovies = () => {
  let inputSearch = document.getElementById("findmovie").value;
  let dataMovies = `https://www.omdbapi.com/?apikey=${omdbKey}&s=${inputSearch}`;
  console.log(dataMovies);
  fetch(dataMovies)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .then(response => {
      selector.innerHTML = "";
      response.Search.forEach(response => {
        displayMovie(
          selector,
          response.Title,
          response.Year,
          response.Poster,
        );
      });
    })
    .then(() => look())
  .catch((error) => {
    console.error(error);
    selector.innerHTML += `
      <div class="text-center mt-5">
        <b>No movie has been found unfortunately 😢<br>Give it another try with a valid title!</b>
      </div>`;
  });
};

const displayMovie = (selector, title, year, poster) => {
  selector.innerHTML += `
    <div class="card flex-row flex-wrap align-items-center my-5 film not-visible" style="height: 200px">
      <img src=${poster} class="rounded" alt="" style="height: 180px; margin-left: 12px">
      <div class="card-block px-2">
        <h3 class="card-title text-primary">${title}</h3>
        <p class="card-text mb-3">${year}</p>
        <button class="btn btn-primary rounded-pill my-2" id="${title}" data-toggle="modal" onclick="readMore(id)">Read More</button>
      </div>
    </div>

    <div class="modal" id="moviePopup_${title}" style="display:none">
      <div id="page-mask"></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h4 class="modal-title text-white">${title}</h4>
            <button type="button" class="close text-light" data-dismiss="modal">&times;</button>
          </div>
          <div class="row">
          <div class="col-lg-5 col-md-5 col-sm-5 text-center">
            <img src="${poster}">
          </div>
          <div class="modal-body col-lg-6 col-md-6 col-sm-5">
            <p class="movieRelease text-white"></p>
          </div>
          <div class="modal-body col-lg-6 col-md-6 col-sm-5">
            <p class="moviePlot text-white"></p>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Besides the "Submit" button, process search on "Enter" keypress
document.getElementById("findmovie").addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    searchMovies();
  }
});

//Build Read more
const readMore = (title) => {
  let dataSelectedMovie = `https://www.omdbapi.com/?apikey=${omdbKey}&t=${title}`;
  console.log(dataSelectedMovie)
  fetch(dataSelectedMovie)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .then(response => {
      showMoviePopup(
        response.Title,
        response.Released,
        response.Plot,
      );
    })
  .catch(error => console.error(error));
};

const showMoviePopup = (title, released, plot) => {
  //Inject relevant data
  let bootstrapModal = document.getElementById(`moviePopup_${title}`);
  bootstrapModal.querySelector(".movieRelease").innerHTML = released;
  bootstrapModal.querySelector(".moviePlot").innerHTML = plot;

  //Apply style on the whole popup
  bootstrapModal.style.display = "block";

  //Process closing of popup with cross or by clicking outside of the window
  let closing = bootstrapModal.querySelector(".close");
  closing.addEventListener("click", () => {
    bootstrapModal.style.display = "none";
  });
  window.addEventListener("click", () => {
    if (event.target == bootstrapModal) {
      bootstrapModal.style.display = "none";
    }
  });
};

