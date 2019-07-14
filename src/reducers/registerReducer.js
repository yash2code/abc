const initialState = {
  step: 0,
  steps: [],
  username: '',
  email: '',
  phone: '',
  password: '',
  securityCode: '',
  first: '',
  last: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  state: ''
}
export default function(state = initialState, action) {
  switch (action.type) {
    case "updateRegisterPage":
      return {
        ...state,
        step: action.payload.step,
        steps: action.payload.steps
      };
    case "updateRegisterData":
      return {
        ...state,
        username: action.payload.username || state.username,
        email: action.payload.email || state.email,
        password: action.payload.password || state.password,
        phone: action.payload.phone || state.phone,
        securityCode: action.payload.securityCode || state.securityCode,
        first: action.payload.first || state.first,
        last: action.payload.last || state.last,
        address1: action.payload.address1 || state.address1,
        address2: action.payload.address2 || state.address2,
        zip: action.payload.zip || state.zip,
        city: action.payload.city || state.city,
        state: action.payload.state || state.state
      };
    default:
      return state;
  }
}
