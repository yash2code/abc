export function updateShow(data) {
  console.log(data);
  return {
    type: "update_Show",
    payload: {
      show: data,
      showWithGuides: data.showWithGuides,
      // showData: data
    }
  };
}
export function addItem(item) {
  return {
    type: "addItem",
    payload: {
      name: item.name,
      sciName: item.sciName,
      image: item.image,
      cutImage: item.image,
      description: item.description
    }
  }
}
export function duplicateItem(item) {
  return {
    type: "duplicateItem",
    payload: item
  }
}
export function removeItem(item) {
  return {
    type: "removeItem",
    payload: item
  }
}
export function handleCutout(cutout) {
  return {
    type: "handleCutout",
    payload: cutout
  }
}
export function resetGuides() {
  return {
    type: "resetGuides"
  }
}
export function updateDrawer(data) {
  return {
    type: "updateDrawer",
    payload: data
  };
}
export function updateDrawerView(data, object) {
  return {
    type: "updateDrawerView",
    payload: {
      drawerView: data,
      drawerObject: object
    }
  };
}
export function updateSearchShow(data) {
  return {
    type: "updateSearch",
    payload: data
  };
}
export function getShow() {
  return {
    type: "get"
  };
}
