"use strict";
//HTML ELEMENTLARNI CHAQIRIB OLDIM
//UMUMIY
let elResult = document.querySelector(".movies__result");
let elList = document.querySelector(".movies__list");
let elSelect = document.querySelector(".form-select");
let elFormControl = document.querySelector(".form");
let elSearchInput = document.querySelector(".form-control");
//MORE INFO BUTTONI UCHUN ELEMENTLAR
let newButton = document.querySelector(".btn-outline-info");
let elMoreInfoModal = document.querySelector(".more-info-modal");
let elMoreInfoOverlay = document.querySelector(".more-info-overlay");
let modalTitle = document.querySelector(".modal-title");
let modalDesc = document.querySelector(".modal-desc");
//WATCH TRELER UCHUN ELEMENTLAR
let elWatchTrelerModal = document.querySelector(".modals");
let elWatchTrelerOverlay = document.querySelector(".overlay");
let elBtnCloseModal = document.querySelector(".close-modal");

let elButton = document.querySelector(".btn-primary")
let elSelect2 = document.querySelector(".select-high-low");
//KINOLARNI HAJMI 
elResult.textContent = movies.length;

// elResult.textContent = Date();

//BOOKMARK BUTTONI UCHUN ELEMENTLAR
let bookmarkList = document.querySelector(".bookmark-list");

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
            "list-group-item bg-light d-flex flex-column"
        );
        newBokmarkBtn.setAttribute(
            "class",
            "btn btn-outline-danger mt-3 w-25 btn-remove"
        );

        node.appendChild(newLi);
        newLi.appendChild(newBokmarkBtn);

    });

};

array(bookmarkArray, bookmarkList)

bookmarkList.addEventListener("click", (evt) => {
    if (evt.target.matches(".btn-remove")) {
        let idRemoveBtn = evt.target.dataset.bookmarkDelete;

        console.log(evt.target);

        if (idRemoveBtn = evt.target.dataset.bookmarkId) {

        }
        console.log(evt.target.dataset.bookmarkId)
        const movieRemoveId = bookmarkArray.findIndex(
            (movie) => movie.imdbId === idRemoveBtn
        );

        bookmarkArray.splice(movieRemoveId, 1);

        bookmarkList.innerHTML = null;

        window.localStorage.setItem("bookmarkArray", JSON.stringify(bookmarkArray))

        array(bookmarkArray, bookmarkList);
    }
});


elList.addEventListener("click", (evt) => {
    let moreInfoArr = [];
    let watchArr = [];

    if (evt.target.matches(".bookmark-btn")) {
        let idBtn = evt.target.dataset.bookmarkId;

        evt.target.style.backgroundColor = "#198754"
        evt.target.style.color = "white"

        evt.target.disabled = true;

        const movieId = movies.find((movie) => movie.imdbId === idBtn);

        bookmarkList.innerHTML = null;

        if (!bookmarkArray.includes(movieId)) {
            bookmarkArray.push(movieId);
        } else {
            alert("Bu kino bookmarkda saqlangan :)");
        }

        window.localStorage.setItem("bookmarkArray", JSON.stringify(bookmarkArray))

        array(bookmarkArray, bookmarkList);

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
    } else if (evt.target.matches(".btn-watch")) {
        let watch = evt.target.dataset.watchId;

        elWatchTrelerModal.classList.add("modals");
        elWatchTrelerOverlay.classList.add("overlay");
        elWatchTrelerModal.classList.remove("hidden");
        elWatchTrelerOverlay.classList.remove("hidden");

        elWatchTrelerModal.innerHTML = null;

        watchArr.push(movies.find(modal => modal.imdbId === watch))

    }

    const render = function(arr2, element2) {
        arr2.forEach(filmm => {
            let youtube = filmm.youtubeId;
            let link = "https://www.youtube.com/embed/"

            let newIframe = document.createElement("iframe");

            newIframe.setAttribute("src", `${link}${youtube}`)
            newIframe.setAttribute("class", "w-100")
            newIframe.setAttribute("height", "500")

            element2.appendChild(newIframe)
        })

    }

    render(watchArr, elWatchTrelerModal)

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


elWatchTrelerOverlay.addEventListener("click", () => {
    elWatchTrelerModal.classList.remove("modals");
    elWatchTrelerOverlay.classList.remove("overlay");
    elWatchTrelerModal.classList.add("hidden");
    elWatchTrelerOverlay.classList.add("hidden");
})


const generateCategories = function(movies) {
    let uniqueMovies = [];

    movies.forEach((movie) => {
        movie.categories.forEach((categor) => {
            if (!uniqueMovies.includes(categor)) {
                uniqueMovies.push(categor);
                window.localStorage.setItem("uniqueMovies", JSON.stringify(uniqueMovies))
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


const generateMovies = function(moviesArray, element) {
    moviesArray.forEach((film) => {
        //CREATE

        let newItem = document.createElement("li");
        let newImg = document.createElement("img");
        let newDiv = document.createElement("div");
        let newHeading = document.createElement("h5");
        let newDesc = document.createElement("p");
        let newDesc2 = document.createElement("p");
        let newDivBtn = document.createElement("div");
        let newButton = document.createElement("button");
        let newButton2 = document.createElement("button");
        let newButton3 = document.createElement("button");

        //DATASET ADDING
        newButton.dataset.watchId = film.imdbId;
        newButton2.dataset.moreInfoId = film.imdbId;
        newButton3.dataset.bookmarkId = film.imdbId;

        //SET ATTRIBUTE
        newItem.setAttribute("class", "card w-25 bg-light mb-3");
        newImg.setAttribute("class", "card-img-top");
        newImg.setAttribute("src", film.smallThumbnail);
        newDiv.setAttribute("class", "card-body");
        newHeading.setAttribute("class", "card-title");
        newDesc.setAttribute("class", "card-text calendar");
        newDesc2.setAttribute("class", "card-text star");
        newDivBtn.setAttribute("class", "d-flex justify-content-between btn-box");
        newButton.setAttribute("class", "btn btn-outline-primary btn-watch");
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

elButton.addEventListener("click", () => {
    let selectValue = elSelect2.value;

    if (selectValue === "high") {
        let reting = []

        reting.push(movies.sort((a, b) => b.imdbRating - a.imdbRating))

        elList.innerHTML = null

        generateMovies(reting, elList)

    } else if (selectValue === "low") {
        let reting = []

        reting.push(movies.sort((a, b) => a.imdbRating - b.imdbRating))

        elList.innerHTML = null

        generateMovies(reting, elList)
    } else if (selectValue === "high-low") {

        elList.innerHTML = null;

        generateMovies(reting, elList);
    }
})

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

// elSearchInput.addEventListener("change", (evt) => {
//     evt.preventDefault();

//     let inputValue = elSearchInput.value;
//     const searchFilter = movies.filter((search) => search.title == inputValue);

//     elResult.textContent = searchFilter.length;

//     elList.innerHTML = null;

//     generateMovies(searchFilter, elList);
// });