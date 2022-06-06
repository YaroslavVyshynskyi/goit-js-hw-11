import SimpleLightbox from "simplelightbox";

function createGallerySimplelightbox() {
   let gallery = new SimpleLightbox('.gallery a');
   gallery.on('show.simplelightbox', function () {});
}

function refreshGallerySimplelightbox() {
   let gallery = new SimpleLightbox('.gallery a');
   gallery.refresh('show.simplelightbox', function () {});
}

export {
    createGallerySimplelightbox,
    refreshGallerySimplelightbox
};