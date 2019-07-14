const initialState = {
  bottom: false,
  drawerView: '',
  search: false,
  show:[]
}
export default function(state = initialState, action) {
  switch (action.type) {
    case "updateDrawer":
      return {
        ...state,
        bottom: action.payload
      };
    case "updateDrawerView":
      return {
        ...state,
        drawerView: action.payload.drawerView
      };
    case "updateSearch":
      return {
        ...state,
        search: action.payload
      };
    case "update_Show":
      return {
        ...state,
        show: [...state.show,action.payload.show]
      };
    default:
      return state;
  }
}
