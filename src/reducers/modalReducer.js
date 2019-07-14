const initialState = {
  share: false,
  save: false,
  spec: false,
  crop: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "updateShare":
      return {
        ...state,
        share: action.payload
      };
    case "updateSave":
      return {
        ...state,
        save: action.payload
      };
    case "updateSpec":
      return {
        ...state,
        spec: action.payload
      };
    case "updateCrop":
      console.log("updateCrop: " + action.payload);
      return {
        ...state,
        crop: action.payload
      };
    default:
      return state;
  }
}
