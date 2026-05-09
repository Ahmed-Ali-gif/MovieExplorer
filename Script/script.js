const eyeIcon = document.querySelector(".eye-icon");
const eyeIconToggle = document.querySelector(".eye-icon-toggle");
const toggleHeartBlack = document.querySelector(".toggle-heart-black");
const toggleHeartWhite = document.querySelector(".toggle-heart-white");
eyeIcon.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  eyeIconToggle.style.display = "block";
  toggleHeartWhite.style.display = "none";
  toggleHeartBlack.style.display = "block";
});
eyeIconToggle.addEventListener("click", () => {
  document.body.classList.remove("light-mode");
  eyeIconToggle.style.display = "none";
  toggleHeartWhite.style.display = "block";
  toggleHeartBlack.style.display = "none";
});
// -------------------------------
const searchInpt = document.getElementById("search-inpt");
const searchBtn = document.querySelector(".search-btn");
const movieCardsContainer = document.querySelector(".movie-cards-container");
const boxImg = document.querySelector(".box-img");
const box = document.querySelector("box");
const getMovies = async (url) => {
  try {
    const fetchMovies = await fetch(url);
    const data = await fetchMovies.json();
    console.log(data.Search);
    movieCardsContainer.innerHTML = "";
    data.Search.forEach((e) => {
      const movie = document.createElement("div");
      console.log(e);
      movie.classList.add("box");
      movie.innerHTML = `
     <img class="box-img" src=${e.Poster} alt="" />
        <div class="box-content">
          <h3 class="box-h3">${e.Title}</h3>
        <div class="sub-box">
        <div class="rating-box">
          <i class="fa-solid fa-star star"></i>
          <p class="box-p">Rating: 8.0</p>
         </div>
            <span class="box-year">${e.Year}</span>
        </div>
    `;
      movieCardsContainer.appendChild(movie);
    });
  } catch (error) {
    if (error) {
      movie.textContent = error;
    }
    console.log(" Error fetching movies:", error);
  }
};
searchBtn.addEventListener("click", () => {
  const searchValue = searchInpt.value;
  const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=f73d559e`;
  getMovies(url);
});
// ---------------------------------
let favouriteMoviesSection = document.querySelector(".favourite-movies-section");
const url_1 = `https://api.tvmaze.com/search/shows?q=dark`;
const url_2 = `https://api.tvmaze.com/search/shows?q=superman`;
const getPopularSection = async (url_1) => {
  try {
    const fetchMoviesUrl = await fetch(url_1);
    const fetchMoviesData = await fetchMoviesUrl.json();
    favouriteMoviesSection.innerHTML = " ";
    fetchMoviesData.forEach((e) => {
      const newSection = document.createElement("div");
      newSection.classList.add("box");
      console.log(fetchMoviesData[0].show);
      newSection.innerHTML = `          
      <img class="box-img" src=${e.show.image.original} alt=${e.show.name} />
          <div class="box-content">
            <h3 class="box-h3">${e.show.name}</h3>
            <div class="sub-box">
              <div class="rating-box">
                <i class="fa-solid fa-star star"></i>
                <p class="box-p">Rating: ${e.show.rating.average}</p>
              </div>
              <span class="box-year"> ${e.show.ended}</span>
            </div>
          </div>
      `
      favouriteMoviesSection.appendChild(newSection);
    });
  } catch (error) {
    console.log(error);
  }
};
const btnGlobal = document.querySelector(".btn-global");
const LoadMore = () => {
  getPopularSection(url_1);
};
btnGlobal.addEventListener("click", LoadMore);
