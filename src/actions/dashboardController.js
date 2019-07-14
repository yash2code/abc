export function updateShow(data) {
  return {
    type: "updateShow",
    payload: {
      showWithGuides: data.showWithGuides,
      showData: data.showData
    }
  };
}
export function updateBackground(data) {
  return {
    type: "updateBackground",
    payload: data
  };
}
export function addItem(item) {
  return {
    type: "addItem",
    payload: {
      name: item.name,
      sciName: item.botnical_name,
      image: item.image,
      cutImage: item.image,
      description: item.description
    }
  };
}
export function duplicateItem(item) {
  return {
    type: "duplicateItem",
    payload: item
  };
}
export function removeItem(item) {
  return {
    type: "removeItem",
    payload: item
  };
}
export function handleCutout(cutout) {
  return {
    type: "handleCutout",
    payload: cutout
  };
}
export function resetGuides() {
  return {
    type: "resetGuides"
  };
}
export function updateCanvas(data) {
  return {
    type: "updateCanvas",
    payload: data
  };
}
export function get() {
  return {
    type: "get"
  };
}
