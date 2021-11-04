
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY= 'REMOVE_CATEGORY';

const addCategory = (category) => {
    return {
        type: ADD_CATEGORY,
        payload: category
    }
}

const removeCart = () => {
    return {
        type: REMOVE_CATEGORY,
    }
}



const actionCart = {
    addCategory,
    removeCart
}

export default actionCart
