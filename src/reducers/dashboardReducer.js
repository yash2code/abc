var tempSpecObject = {
  name: "Little John Bottlebrush",
  sciName: "Callistemon Citrinus",
  quantity: 12
};

const initialState = {
  backgroundSource: "",
  showWithGuides: false,
  showData: [],
  currentCutout: null,
  tempSpecData: [],
  currentCanvas: null
};

for (let x = 0; x < 15; x++) {
  initialState.tempSpecData.push(tempSpecObject);
}

export default function(state = initialState, action) {
  var array, obj;
  switch (action.type) {
    case "updateShow":
      return {
        ...state,
        showWithGuides: action.payload.showWithGuides,
        showData: action.payload.showData || state.showData
      };
    case "updateBackground": {
      if (action.payload === "") {
        array = [];
      } else {
        array = state.showData;
      }
      return {
        ...state,
        backgroundSource: action.payload,
        showData: array
      };
    }
    case "addItem":
      array = state.showData;
      obj = {
        name: action.payload.name,
        sciName: action.payload.sciName,
        image: action.payload.image,
        cutImage: action.payload.cutImage,
        description: action.payload.description,
        xPos: 28,
        yPos: 66,
        width: 20,
        height: 22,
        showGuides: true
      };
      // todo set up a default width / height for every tree / plant type
      if (action.payload.sciName === "Ficus Nitida") {
        obj.xPos = 30.5;
        obj.yPos = 30;
        obj.height = 50;
        obj.width = 30;
      } else {
        // todo remove these if statements once we can drag and drop the cutouts arround
        if (array.length === 2) {
          obj.xPos = 38;
        } else if (array.length === 3) {
          obj.xPos = 52;
        } else if (array.length === 4) {
          obj.xPos = 64;
          obj.yPos = 63;
        }
      }
      array.push(obj);
      return {
        ...state,
        showWithGuides: true,
        showData: array,
        currentCutout: array.length - 1
      };
    case "removeItem":
      array = state.showData;
      array.splice(action.payload, 1);
      return {
        ...state,
        showData: array,
        currentCutout: 0
      };
    case "duplicateItem":
      array = state.showData;
      obj = array[action.payload];
      obj.showGuides = false;
      let duplicate = JSON.parse(JSON.stringify(obj));
      duplicate.showGuides = true;
      duplicate.xPos = obj.xPos + 5;
      array.push(duplicate);
      return {
        ...state,
        showWithGuides: true,
        showData: array,
        currentCutout: array.length - 1
      };
    case "handleCutout":
      obj = state.showData[action.payload];
      obj.showGuides = true;
      array = state.showData;
      array[action.payload] = obj;
      return {
        ...state,
        showData: array,
        currentCutout: action.payload
      };
    case "resetGuides":
      array = state.showData;
      for (let i = 0; i < array.length; i++) {
        array[i].showGuides = false;
      }
      return {
        ...state,
        showWithGuides: false,
        showData: array,
        currentCutout: 0
      };
    case "updateCanvas":
      return {
        ...state,
        currentCanvas: action.payload
      };
    default:
      return state;
  }
}
