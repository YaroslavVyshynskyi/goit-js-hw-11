import PixabayService from "./js/pixabay-api-service";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
// import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm"
import "simplelightbox/dist/simple-lightbox.min.css";
// import createCard from "./js/create-card";
// import LoadMoreBtn from "./js/load-more-btn";


const form = document.querySelector("#search-form");
const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const pixabayService = new PixabayService();

// let gallery = $('.gallery-item').SimpleLightbox();
// gallery.refresh();
// let gallery = new SimpleLightbox('.gallery-item', { captionDelay: 250 }).refresh();
let gallery = new SimpleLightbox('.gallery-item', { captionDelay: 250 });


form.addEventListener("submit", onSerch);
loadMoreBtn.addEventListener("click", fetchImages);


function onSerch(evt) { 
    evt.preventDefault();

    pixabayService.query = evt.currentTarget.elements.searchQuery.value;
    clearGalleryContainer();
    fetchImages();
}

function fetchImages() { 
    loadMoreBtn.classList.add("is-hidden");
    pixabayService.fetchImages().then(images => {
        appendImagesMarkup(images);
        const galleryItemsCount = document.querySelectorAll(".gallery a").length;
        if (galleryItemsCount >= images.total) {
            loadMoreBtn.classList.remove("is-hidden");
             Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        }
        loadMoreBtn.classList.remove("is-hidden");
    })
        .then(() => {
            const { height: cardHeight } = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();

            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });
        });
            
}    

function clearGalleryContainer() {
    galleryContainer.innerHTML = "";
}

// function onLoadMore() {
//     pixabayService.fetchImages().then(appendImagesMarkup);
// }

function appendImagesMarkup(hits) {
    
    hits.forEach(hit => {
        galleryContainer.insertAdjacentHTML("beforeend", createCard(hit));
    });
}

function createCard(hit) { 
    
    const { webformatURL, largeImageURL, likes, views, comments, downloads, tags } = hit;
    
    return `<a class="gallery-item" href="${largeImageURL}">
                <div class="photo-card">
                    <img class = "card-image" src="${webformatURL}" alt="${tags}" " />
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
    // loading="lazy`
} 

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

