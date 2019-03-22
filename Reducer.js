// Reducer
const textReducer = (state = {}, action) => {
    if (typeof state === 'undefined') {
        return 0;
    }
    switch(action.type){
      case 'TEXT' :
        return {...state, text: action.payload}
      default:
        return state
    }
}
export default textReducer;