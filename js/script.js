"use strict";

let elResult = document.querySelector('.movies__result');
let elList = document.querySelector('.movies__list');
let elSelect = document.querySelector('.form-select');
let elFormControl = document.querySelector('.form');

elResult.textContent = movies.length



const generateCategories = function(movies){
  let uniqueMovies = [] 
  
  movies.forEach(movie => {
    movie.categories.forEach(categor => {
      if(!uniqueMovies.includes(categor)){
        uniqueMovies.push(categor);
      }
    });
  })


  uniqueMovies.forEach(categor => {
    let newMoviesOpt = document.createElement("option")

    newMoviesOpt.value = categor
    newMoviesOpt.textContent = categor

    elSelect.appendChild(newMoviesOpt)
  })
}

const generateMovies = function(moviesArray, element){
  moviesArray.forEach(film =>{
    //CREATE
   
      let newItem = document.createElement('li');
      let newImg = document.createElement('img');
      let newDiv = document.createElement('div');
      let newHeading = document.createElement('h5');
      let newDesc = document.createElement('p');
      let newDesc2 = document.createElement('p');
      let newButton = document.createElement('a');
      let newButton2 = document.createElement('button');
      let newButton3 = document.createElement('button');

    //SET ATTRIBUTE
    newItem.setAttribute('class', 'card w-25 mb-3')
    newImg.setAttribute('class', 'card-img-top')
    newImg.setAttribute('src', film.smallThumbnail)
    newDiv.setAttribute('class', 'card-body')
    newHeading.setAttribute('class', 'card-title text-light')
    newDesc.setAttribute('class', 'card-text calendar text-light')
    newDesc2.setAttribute('class', 'card-text star text-light')
    newButton.setAttribute('class', 'btn btn-outline-primary')
    newButton.setAttribute('href', 'btn btn-outline-primary')
    newButton2.setAttribute('class', 'btn btn-outline-info')
    newButton3.setAttribute('class', 'btn btn-outline-success')

    //TEXT CONTENT
    newHeading.textContent = film.title;
    newDesc.textContent = film.year;
    newDesc2.textContent = film.imdbRating;
    newButton.textContent = "Watch trailer";
    newButton2.textContent = "More info";
    newButton3.textContent = "Bookmark";

    //APPEND CHILD
    element.appendChild(newItem);
    newItem.appendChild(newImg);
    newItem.appendChild(newDiv);
    newDiv.appendChild(newHeading);
    newDiv.appendChild(newDesc);
    newDiv.appendChild(newDesc2);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newButton2);
    newDiv.appendChild(newButton3);
  })

}

generateMovies(movies, elList);
generateCategories(movies);

elFormControl.addEventListener('submit', (evt) => {
  evt.preventDefault();


  elList.innerHTML = null;

  let selectValue = elSelect.value;

  let filmsArray = []

  movies.forEach(function(movie) {
    if(movie.categories.includes(selectValue) || elSelect.value === 'All'){
      filmsArray.push(movie);
    }
  })

  // elResult.textContent = filmsArray.movie.length

  generateMovies(filmsArray, elList)
})
