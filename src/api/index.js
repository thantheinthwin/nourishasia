import axios from "axios";

const baseURL = 'https://api.edamam.com'

const nutrition_analysis_api = {
    apiKey: process.env.REACT_APP_EDAMAM_NUTRITION_ANALYSIS_API_KEY,
    apiId: process.env.REACT_APP_EDAMAM_NUTRITION_ANALYSIS_API_ID
}

const recipe_search_api = {
    apiKey: process.env.REACT_APP_EDAMAM_RECIPE_SEARCH_API_KEY,
    apiId: process.env.REACT_APP_EDAMAM_RECIPE_SEARCH_API_ID
}

export const getNutritionalFacts = async (ingredientList) => {
    const formattedIngredients = ingredientList.map(ingredient => `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`);

    try {
        const res = await axios.post(`${baseURL}/api/nutrition-details?app_id=${nutrition_analysis_api.apiId}&app_key=${nutrition_analysis_api.apiKey}`, {
            ingr: formattedIngredients
        });
        return res.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to retrieve nutritional facts.');
    }
}

export const getRecipe = async (query) => {
    const from = 0;
    const to = 25;

    try {
        const response = await axios.get(`${baseURL}/search?q=${encodeURIComponent(query)}&app_id=${recipe_search_api.apiId}&app_key=${recipe_search_api.apiKey}&from=${from}&to=${to}`);
        return response.data.hits;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to retrieve recipes.');
    }
}