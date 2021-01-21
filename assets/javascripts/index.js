let selector = document.getElementById("displaymovies");

const searchMovies = () => {
  let inputSearch = document.getElementById("findmovie").value;
  let dataMovie = `https://www.omdbapi.com/?apikey=${omdbKey}&s=${inputSearch}`;
  console.log(dataMovie);
  fetch(dataMovie)
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
    <div class="card flex-row flex-wrap align-items-center my-5" style="height: 200px">
      <img src=${poster} class="rounded" alt="" style="height: 180px; margin-left: 12px">
      <div class="card-block px-2">
        <h2 class="card-title text-primary">${title}</h2>
        <p class="card-text mb-3">${year}</p>
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

