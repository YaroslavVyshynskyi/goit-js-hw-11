import PixabayService from "./js/pixabay-api-service";
import Notiflix from "notiflix";
import createCard from "./js/create-card";
import {
    createGallerySimplelightbox,
    refreshGallerySimplelightbox
} from "./js/simple-light-box";

import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector("#search-form");
const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const pixabayService = new PixabayService();


form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);


function onSearch(evt) { 
    evt.preventDefault();

    pixabayService.query = evt.currentTarget.elements.searchQuery.value;
    pixabayService.resetPage();

    if (pixabayService.query === "") {
        return Notiflix.Notify.warning("Enter text to search the gallery.");
    } 

    clearGalleryContainer();
    fetchImages().then(() => {
        createGallerySimplelightbox();
    });
}

function onLoadMore() {
    fetchImages().then(() => {
        refreshGallerySimplelightbox();
        smoothScroll();
    });
}

function fetchImages() { 
    loadMoreBtn.classList.add("is-hidden");

    return pixabayService.fetchImages().then((images = []) => {
        appendImagesMarkup(images);
        
        const galleryItemsCount = document.querySelectorAll(".gallery .gallery-item").length;

        if (images.length === 0 || galleryItemsCount >= pixabayService.totalHits) {
            loadMoreBtn.classList.add("is-hidden");
        } else {
            loadMoreBtn.classList.remove("is-hidden");
        }
    });  
}

function smoothScroll() {
    const { height: cardHeight } = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function clearGalleryContainer() {
    galleryContainer.innerHTML = "";
}

function appendImagesMarkup(hits = []) {
    if (!hits.length) return;

    hits.forEach(hit => {
        galleryContainer.insertAdjacentHTML("beforeend", createCard(hit));
    });
}
