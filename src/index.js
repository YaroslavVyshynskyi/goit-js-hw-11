import Notiflix from "notiflix";
import PixabayService from "./js/pixabay-api-service";

// const articlesTpl = `
// <div class="photo-card">
//   <img src="${largeImageURL}" alt="${previewURL}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>likes:</b> 
//       ${likes}
//     </p>
//     <p class="info-item">
//       <b>views:</b> 
//       ${views}
//     </p>
//     <p class="info-item">
//       <b>comments:</b>
//       ${comments}
//     </p>
//     <p class="info-item">
//       <b>downloads</b>
//       ${downloads}
//     </p>
//   </div>
// </div>
// `;


const form = document.querySelector("#search-form");
const galleryContainer = document.querySelector(".gallery");
const pixabayService = new PixabayService();


form.addEventListener("submit", onSerch);

function onSerch(evt) { 
    evt.preventDefault();
    console.log(evt.currentTarget.elements.searchQuery.value);
    pixabayService.query = evt.currentTarget.elements.searchQuery.value;

    pixabayService.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup(hits) {
    
    hits.forEach(hit => {
    
        galleryContainer.insertAdjacentHTML("beforeend", createCard(hit));
    });
}

function createCard(hit) { 
    
    const { previewURL, webformatURL, largeImageURL, likes, views, comments, downloads } = hit;
    
    return `<div class="photo-card">
            <img src="${previewURL}" alt="${webformatURL}" loading="lazy" />
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