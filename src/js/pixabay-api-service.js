import Notiflix from "notiflix";
export default class PixabayService { 
    constructor() {
        this.searchQuery = "";
    } 
    
    fetchImages() {

        const key = "27771595-431aa52f6f585107eea577c49";
        const url = `https://pixabay.com/api/?key=${key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=false`;
        
        return fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error();
            })
            .then(data => {
                console.log(data);
                if (data.hits.length > 0) {
                    const totalHits = data.totalHits;
                    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
                    return data.hits;
                }
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            });
    }

    get query() { 
        return this.searchQuery;
    }

    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
}