import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // Every async method returns a promise
    async getResults() {
        // const proxy = 'https://crossorigin.me/';
        const key = '9aa7305dba59c02a5f638f0d4dbd7ac4';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
        
    }
}