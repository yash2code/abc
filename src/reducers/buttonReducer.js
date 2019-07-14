const initialState = {
  menu: false
}
export default function(state = initialState, action) {
  var menu
  switch (action.type) {
    case "updateButtons":
      if (action.payload.menu !== null) {
        menu = action.payload.menu
      } else {
        menu = state.menu
      }
      return {
        ...state,
        menu: menu
      };
    default:
      return state;
  }
}
