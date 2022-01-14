"use strict";

let elResult = document.querySelector('.movies__result');
let elList = document.querySelector('.movies__list');
let elSelect = document.querySelector('.form-select');

elResult.textContent = movies.length

elSelect.innerHTML = null


for(let movie of movies) {

    // CREATEELEMENTS
    let newItem = document.createElement('li');
    let newImg = document.createElement('img');
    let newDiv = document.createElement('div');
    let newHeading = document.createElement('h5');
    let newDesc = document.createElement('p');
    let newDesc2 = document.createElement('p');
    let newButton = document.createElement('a');
    let newButton2 = document.createElement('button');
    let newButton3 = document.createElement('button');


    // SETATRIBUTES 
    newItem.setAttribute('class', 'card w-50 mb-3')
    newImg.setAttribute('class', 'card-img-top w-100')
    newImg.setAttribute('src', movie.smallThumbnail)
    newDiv.setAttribute('class', 'card-body')
    newHeading.setAttribute('class', 'card-title')
    newDesc.setAttribute('class', 'card-text calendar')
    newDesc2.setAttribute('class', 'card-text star')
    newButton.setAttribute('class', 'btn btn-outline-primary')
    newButton.setAttribute('href', 'btn btn-outline-primary')
    newButton2.setAttribute('class', 'btn btn-outline-info')
    newButton3.setAttribute('class', 'btn btn-outline-success')

    // TEXT-CONTENTS
    newHeading.textContent = movie.title;
    newDesc.textContent = movie.year;
    newDesc2.textContent = movie.imdbRating;
    newButton.textContent = "Watch trailer";
    newButton2.textContent = "More info";
    newButton3.textContent = "Bookmark";

    // APPENDCHILD
    elList.appendChild(newItem);
    newItem.appendChild(newImg);
    newItem.appendChild(newDiv);
    newDiv.appendChild(newHeading);
    newDiv.appendChild(newDesc);
    newDiv.appendChild(newDesc2);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newButton2);
    newDiv.appendChild(newButton3);
  
}