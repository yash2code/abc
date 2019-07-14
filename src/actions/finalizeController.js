export function updateFinalizePage(step, steps) {
  return {
    type: "updateFinalizePage",
    payload: {
      step: step,
      steps: steps
    }
  };
}
export function updateFinalizeData(data) {
  return {
    type: "updateFinalizeData",
    payload: {
      plants: data.plants,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      morning: data.morning,
      afternoon: data.afternoon,
      night: data.night,
      anytime: data.anytime,
      animation: data.animation
    }
  };
}
export function getFinalize() {
  return {
    type: "get"
  };
}
