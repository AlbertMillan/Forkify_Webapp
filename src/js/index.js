import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
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
    // const query = 'pizza';


    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3.Prepare UI for results.
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results from UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            clearLoader();
            alert('Error processing search!');
        }
    }
};


elements.searchForm.addEventListener('submit', e => {
    // Prevents making the action it wants (e.g. reloading the page, or following a URL)
    e.preventDefault();
    controlSearch();
});

// TESTING
// window.addEventListener('load', e => {
//     // Prevents making the action it wants (e.g. reloading the page, or following a URL)
//     e.preventDefault();
//     controlSearch();
// });

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/**
 * RECIPE CONTROLLER
 */
// const r = new Recipe(35626);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () => {
    // Prepare UI for changes
    

    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            console.log(state.recipe);
        } catch (error) {
            alert('Error processing recipe!');
            console.log(error);
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));