import Notiflix from "notiflix";

const KEY = "27771595-431aa52f6f585107eea577c49"
const URL = "https://pixabay.com/api/"
export default class PixabayService { 
    constructor() {
        this.searchQuery = "";
        this.per_page = 40;
        this.page = 1;
    } 
    
    fetchImages() {

        const key = "27771595-431aa52f6f585107eea577c49";
        const url = `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=false&per_page=${this.per_page}&page=${this.page}`;
        
        return fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error();
            })
            .then(data => {
                console.log(data);
                if (data.hits.length > 0) {
                    this.incrementPage();

                    const totalHits = data.totalHits;
                    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
                    return data.hits;
                }
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            });
    }

    incrementPage() { 
        this.page += 1;
    }

    resetPage() { 
        this.page = 1;
    }

    get query() { 
        return this.searchQuery;
    }

    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
}