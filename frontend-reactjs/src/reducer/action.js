
export const ADD_CATEGORY = 'ADD_CATEGORY';

const addCategory = (category) => {
    return {
        type: ADD_CATEGORY,
        payload: category
    }
}



const actionCart = {
    addCategory,
}

export default actionCart
