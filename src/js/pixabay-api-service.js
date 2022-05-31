export default class PixabayService { 
    constructor() {
        this.searchQuery = "";
    } 
    
    fetchImages() { 
        // const option = {
        //     header: {
        //         Authorization: "27771595-431aa52f6f585107eea577c49",
        //     },
        // };

        const key = "27771595-431aa52f6f585107eea577c49";

        const url = `https://pixabay.com/api/?key=${key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=false`;
        
        return fetch(url)
            .then(r => r.json())
            .then(data => {
                console.log(data);
                return data.hits;
            });
    }

    get query() { 
        return this.searchQuery;
    }

    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
}