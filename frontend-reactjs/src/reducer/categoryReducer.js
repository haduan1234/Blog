import { ADD_CATEGORY, REMOVE_CATEGORY } from './action'

const initital = {
    listCategory: [],
    categoryId : null
}
const categorysReducer = (state = initital, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            const newList =[...state.listCategory];
            newList.push(action.payload);
          return {
              ...state,
              listCategory: newList
          }
        default:
            return state;
    }
}



export default categorysReducer;