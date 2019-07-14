const initialState = {
  step: 0,
  steps: [],
  plants: [],
  fullName: 'User St. John',
  email: 'User@email.com',
  phone: '6231111111',
  animation: false,
  morning: false,
  afternoon: false,
  night: false,
  anytime: false
}
// TODO remove this (14 - 18) when you set up spec to populate from drawerReducer.showData
var plantObj = {
  name: 'Little John',
  sci: 'Callistemon Citrinus',
  quantity: '4'
}
for (let x = 0; x < 10; x++) {
  initialState.plants.push(plantObj);
}
export default function (state = initialState, action) {
  switch (action.type) {
    case "updateFinalizePage":
      var forwardsStep, backwardsStep;
      if (action.payload.step > state.step) {
        forwardsStep = true;
        backwardsStep = false;
      } else if (action.payload.step < state.step) {
        forwardsStep = false;
        backwardsStep = true;
      } else {
        forwardsStep = false;
        backwardsStep = false;
      }
      return {
        ...state,
        step: action.payload.step,
        steps: action.payload.steps,
        forwardsStep: forwardsStep,
        backwardsStep: backwardsStep
      };
    case "updateFinalizeData":
      var plants, fullName, email, phone, morning, afternoon, night, anytime, animation;

      if (action.payload.animation) {
        animation = action.payload.animation;
      } else {
        animation = state.animation;
      }
      if (action.payload.plants) {
        plants = action.payload.plants
      } else {
        plants = state.plants
      }
      if (action.payload.fullName) {
        fullName = action.payload.fullName
      } else {
        fullName = state.fullName
      }
      if (action.payload.email) {
        email = action.payload.email
      } else {
        email = state.email
      }
      if (action.payload.phone) {
        phone = action.payload.phone
      } else {
        phone = state.phone
      }
      if (action.payload.forwardsStep) {
        forwardsStep = action.payload.forwardsStep;
      } else {
        forwardsStep = state.forwardsStep;
      }
      if (action.payload.backwardsStep) {
        backwardsStep = action.payload.backwardsStep;
      } else {
        backwardsStep = state.backwardsStep;
      }
      if (action.payload.morning) {
        morning = !state.morning
      } else {
        morning = state.morning
      }
      if (action.payload.afternoon) {
        afternoon = !state.afternoon
      } else {
        afternoon = state.afternoon
      }
      if (action.payload.night) {
        night = !state.night
      } else {
        night = state.night
      }
      if (action.payload.anytime) {
        anytime = !state.anytime
      } else {
        anytime = state.anytime
      }
      return {
        ...state,
        plants: plants,
        fullName: fullName,
        email: email,
        phone: phone,
        forwardsStep: forwardsStep,
        backwardsStep: backwardsStep,
        morning: morning,
        afternoon: afternoon,
        night: night,
        anytime: anytime,
        animation: animation
      };
    default:
      return state;
  }
}