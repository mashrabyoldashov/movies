"use strict";

let elResult = document.querySelector(".movies__result");
let elList = document.querySelector(".movies__list");
let elSelect = document.querySelector(".form-select");
let elFormControl = document.querySelector(".form");
let newButton = document.querySelector(".btn-outline-info");
let elSearchInput = document.querySelector(".form-control");
let elMoreInfoModal = document.querySelector(".more-info-modal");
let elMoreInfoOverlay = document.querySelector(".more-info-overlay");
let elBtnCloseModal = document.querySelector(".close-modal");
let modalTitle = document.querySelector(".modal-title");
let modalDesc = document.querySelector(".modal-desc");

elResult.textContent = movies.length;

//BOOKMARK
let bookmarkList = document.querySelector(".bookmark-list");
let alert = document.querySelector(".alert");

const localBookmark = JSON.parse(window.localStorage.getItem("bookmarkArray"));

let bookmarkArray = localBookmark || [];



let array = function(array, node) {

    array.forEach((book) => {
        let newLi = document.createElement("li");
        let newBokmarkBtn = document.createElement("button");

        newLi.textContent = book.title;
        newBokmarkBtn.textContent = "Remove";

        newBokmarkBtn.dataset.bookmarkDelete = book.imdbId;

        newLi.setAttribute(
            "class",
            "list-group-item bg-dark text-light border border-light d-flex flex-column"
        );
        newBokmarkBtn.setAttribute(
            "class",
            "btn btn-outline-danger mt-3 w-25 btn-remove"
        );

        node.appendChild(newLi);
        newLi.appendChild(newBokmarkBtn);

    });

};

bookmarkList.addEventListener("click", (evt) => {
    if (evt.target.matches(".btn-remove")) {
        let idRemoveBtn = evt.target.dataset.bookmarkDelete;

        const movieRemoveId = bookmarkArray.findIndex(
            (movie) => movie.imdbId === idRemoveBtn
        );

        bookmarkArray.splice(movieRemoveId, 1);

        // bookmarkList.innerHTML = null;

        window.localStorage.setItem("bookmarkArray", JSON.stringify(bookmarkArray))

        array(localBookmark, bookmarkList);
    }
});

array(localBookmark, bookmarkList)


elList.addEventListener("click", (evt) => {
    let moreInfoArr = []

    if (evt.target.matches(".bookmark-btn")) {
        let idBtn = evt.target.dataset.bookmarkId;

        const movieId = movies.find((movie) => movie.imdbId === idBtn);

        bookmarkList.innerHTML = null;

        if (!bookmarkArray.includes(movieId)) {
            alert.textContent = "Kinolar Bookmarkda saqlanmoqda :)";
            alert.setAttribute("class", "alert mb-4 bg-dark border border-light text-light")
            bookmarkArray.push(movieId);
        } else {
            alert.textContent = "Bu kino bookmarkda saqlangan : (";
            alert.setAttribute("class", "alert mb-4 bg-dark border border-danger text-danger box-shadov-danger")
        }

        window.localStorage.setItem("bookmarkArray", JSON.stringify(bookmarkArray))

        array(localBookmark, bookmarkList);
    } else if (evt.target.matches(".more-info-btn")) {
        let idMoreInfoBtn = evt.target.dataset.moreInfoId;

        moreInfoArr.push(movies.find(moreIn => moreIn.imdbId === idMoreInfoBtn));

        const moreInformation = moreInfoArr.forEach(movee => {
            modalTitle.textContent = movee.title
            modalDesc.textContent = movee.summary
            elMoreInfoModal.classList.remove("hidden")
            elMoreInfoOverlay.classList.remove("hidden")
            elMoreInfoModal.classList.add("modals")
            elMoreInfoOverlay.classList.add("overlay")
        });

        moreInformation()

    }
});

elBtnCloseModal.addEventListener("click", () => {
    elMoreInfoModal.classList.add("hidden")
    elMoreInfoOverlay.classList.add("hidden")
    elMoreInfoModal.classList.remove("modals")
    elMoreInfoOverlay.classList.remove("overlay")
})

elMoreInfoOverlay.addEventListener("click", () => {
    elMoreInfoModal.classList.add("hidden")
    elMoreInfoOverlay.classList.add("hidden")
    elMoreInfoModal.classList.remove("modals")
    elMoreInfoOverlay.classList.remove("overlay")
})


const generateCategories = function(movies) {
    let uniqueMovies = [];

    movies.forEach((movie) => {
        movie.categories.forEach((categor) => {
            if (!uniqueMovies.includes(categor)) {
                uniqueMovies.push(categor);
            }
        });
    });

    uniqueMovies.forEach((categor) => {
        let newMoviesOpt = document.createElement("option");

        newMoviesOpt.value = categor;
        newMoviesOpt.textContent = categor;

        elSelect.appendChild(newMoviesOpt);
    });
};

// array(localBookmark, bookmarkList)

const generateMovies = function(moviesArray, element) {
    moviesArray.forEach((film) => {
        //CREATE

        let youTubeId = film.youtubeId;
        let youTubeLink = "https://www.youtube.com/watch?v=";

        let newItem = document.createElement("li");
        let newImg = document.createElement("img");
        let newDiv = document.createElement("div");
        let newHeading = document.createElement("h5");
        let newDesc = document.createElement("p");
        let newDesc2 = document.createElement("p");
        let newDivBtn = document.createElement("div");
        let newButton = document.createElement("a");
        let newButton2 = document.createElement("button");
        let newButton3 = document.createElement("button");

        //DATASET ADDING

        newButton2.dataset.moreInfoId = film.imdbId;
        newButton3.dataset.bookmarkId = film.imdbId;

        //SET ATTRIBUTE
        newItem.setAttribute("class", "card w-25 mb-3");
        newImg.setAttribute("class", "card-img-top");
        newImg.setAttribute("src", film.smallThumbnail);
        newDiv.setAttribute("class", "card-body");
        newHeading.setAttribute("class", "card-title text-light");
        newDesc.setAttribute("class", "card-text calendar text-light");
        newDesc2.setAttribute("class", "card-text star text-light");
        newDivBtn.setAttribute("class", "d-flex justify-content-between btn-box");
        newButton.setAttribute("class", "btn btn-outline-primary");
        newButton.setAttribute("target", "_blank");
        newButton.setAttribute("href", youTubeLink + youTubeId);
        newButton2.setAttribute("class", "btn btn-outline-info more-info-btn");
        newButton3.setAttribute("class", "btn btn-outline-success bookmark-btn");

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
        newDiv.appendChild(newDivBtn);
        newDivBtn.appendChild(newButton);
        newDivBtn.appendChild(newButton2);
        newDivBtn.appendChild(newButton3);
    });
};

generateMovies(movies, elList);
generateCategories(movies);

//SELECTGA QULOQ SOLDIM

elFormControl.addEventListener("submit", (evt) => {
    evt.preventDefault();

    elList.innerHTML = null;

    //SELECT FILTER
    let selectValue = elSelect.value;
    const filteredArray = movies.filter(
        (movie) =>
        movie.categories.includes(selectValue) || elSelect.value === "All"
    );

    elResult.textContent = filteredArray.length;

    elList.innerHTML = null;
    generateMovies(filteredArray, elList);
});

//INPUTGA QULOQ SOLDIM

elSearchInput.addEventListener("change", (evt) => {
    evt.preventDefault();

    let inputValue = elSearchInput.value;
    const searchFilter = movies.filter((search) => search.title == inputValue);

    elResult.textContent = searchFilter.length;

    elList.innerHTML = null;

    generateMovies(searchFilter, elList);
});