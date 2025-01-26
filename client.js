let socket = io();
let addModal = document.querySelector("#addModal");

let closeModalButton = document.querySelector("#close");
closeModalButton.addEventListener("click", () => {
    addModal.style.display = "none";
})

let searchResultsContainer = document.querySelector("#results");
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", () => {
    searchResultsContainer.style.display = "flex";
    searchResultsContainer.style.maxHeight = "100%";
})

let addSongButton = document.querySelector("#addSong");
addSongButton.addEventListener("click", () => {
    searchResultsContainer.style.display = "none";    
    addModal.style.display = "flex";
    addModal.style.opacity = "1";
    searchResultsContainer.classList.toggle("show");
})