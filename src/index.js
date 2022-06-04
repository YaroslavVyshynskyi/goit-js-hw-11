import PixabayService from "./js/pixabay-api-service";
import Notiflix from "notiflix";
// import SimpleLightbox from "simplelightbox";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm"
import "simplelightbox/dist/simple-lightbox.min.css";
// import createCard from "./js/create-card";
// import LoadMoreBtn from "./js/load-more-btn";


const form = document.querySelector("#search-form");
const galleryContainer = document.querySelector(".gallery");
const LoadMoreBtn = document.querySelector(".load-more");
const pixabayService = new PixabayService();

// let gallery = $('.gallery-item').SimpleLightbox();
// gallery.refresh();
// let gallery = new SimpleLightbox('.gallery-item', { captionDelay: 250 }).refresh();


form.addEventListener("submit", onSerch);
LoadMoreBtn.addEventListener("clock", onLoadMore);


function onSerch(evt) { 
    evt.preventDefault();

    console.log(evt.currentTarget.elements.searchQuery.value);
    pixabayService.query = evt.currentTarget.elements.searchQuery.value;
    pixabayService.fetchImages().then(images => {
        clearGalleryContainer();
        appendImagesMarkup(images);
    });
}

function clearGalleryContainer() {
    galleryContainer.innerHTML = "";
}

let gallery = new SimpleLightbox('.gallery-item', { captionDelay: 250 });

function onLoadMore() {
    pixabayService.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup(hits) {
    
    hits.forEach(hit => {
        galleryContainer.insertAdjacentHTML("beforeend", createCard(hit));
    });
}

function createCard(hit) { 
    
    const { webformatURL, largeImageURL, likes, views, comments, downloads, tags } = hit;
    
    return `<a class="gallery-item" href="${largeImageURL}">
                <div class="photo-card">
                    <img class = "card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
                </div>
            </a>`
    // `<img src="${largeImageURL}" alt="${previewURL}" loading="lazy" />`
} 