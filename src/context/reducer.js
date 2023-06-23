export const actionType = {
    SET_USER: 'SET_USER',
    SET_RECIPES: 'SET_RECIPES'
}

const reducer = (state, action) => {
    switch(action.type){
        case actionType.SET_USER:
            return{
                ...state,
                user: action.user,
            };
        case actionType.SET_RECIPES:
            return{
                ...state,
                recipes: action.recipes,
            }
        default:
            return state;
    }
}

export default reducer;