import axios from 'axios';
import { key1, key2, proxy } from '../config'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // Every async method returns a promise
    async getResults() {
        // const proxy = 'https://crossorigin.me/';
        
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key1}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
        
    }
}