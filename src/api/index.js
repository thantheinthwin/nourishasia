import axios from "axios";

const baseURL = 'https://api.edamam.com/api/'

const nutrition_analysis_api = {
    apiKey: process.env.REACT_APP_EDAMAM_NUTRITION_ANALYSIS_API_KEY,
    apiId: process.env.REACT_APP_EDAMAM_NUTRITION_ANALYSIS_API_ID
}

export const getNutritionalFacts = async (ingredientList) => {
    const formattedIngredients = ingredientList.map(ingredient => `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`);

    try {
        const res = await axios.post(`${baseURL}nutrition-details?app_id=${nutrition_analysis_api.apiId}&app_key=${nutrition_analysis_api.apiKey}`, {
            ingr: formattedIngredients
        });
        return res.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to retrieve nutritional facts.');
    }
}