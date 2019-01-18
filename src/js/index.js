import Search from './models/Search'
import * as searchView from './views/searchView'
import {elements, renderLoader, clearLoader} from './views/base'

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3.Prepare UI for results.
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results from UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};


elements.searchForm.addEventListener('submit', e => {
    // Prevents making the action it wants (e.g. reloading the page, or following a URL)
    e.preventDefault();
    controlSearch();
});
// search.getResults();



// Key: 9aa7305dba59c02a5f638f0d4dbd7ac4
// https://www.food2fork.com/api/search