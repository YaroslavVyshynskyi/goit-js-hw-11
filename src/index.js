import PixabayService from "./js/pixabay-api-service";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const galleryContainer = document.querySelector(".gallery");
const pixabayService = new PixabayService();



form.addEventListener("submit", onSerch);

function onSerch(evt) { 
    evt.preventDefault();

    console.log(evt.currentTarget.elements.searchQuery.value);
    pixabayService.query = evt.currentTarget.elements.searchQuery.value;
    pixabayService.fetchImages().then(images => {
        clearGalleryContainer();
        appendImagesMarkup(images);
    });
}

function appendImagesMarkup(hits) {
    
    hits.forEach(hit => {
        galleryContainer.insertAdjacentHTML("beforeend", createCard(hit));
    });
}

function createCard(hit) { 
    
    const { previewURL, webformatURL, largeImageURL, likes, views, comments, downloads } = hit;
    
    return `<div class="photo-card">
            <img class = "card-image" src="${largeImageURL}" alt="${webformatURL}" loading="lazy" width = 383 height = 210/>
            <div class="info">
                <p class="info-item">
                    <b>likes:</b> 
                    ${likes}
                </p>
                <p class="info-item">
                    <b>views:</b> 
                    ${views}
                </p>
                <p class="info-item">
                    <b>comments:</b>
                    ${comments}
                </p>
                <p class="info-item">
                    <b>downloads:</b>
                    ${downloads}
                </p>
            </div>
        </div>`
    // `<img src="${largeImageURL}" alt="${previewURL}" loading="lazy" />`
} 

function clearGalleryContainer() {
    galleryContainer.innerHTML = "";
}

let gallery = new SimpleLightbox('.gallery-item', { captionDelay: 250 });