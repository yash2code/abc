export function updateRegisterPage(step, steps) {
  return {
    type: "updateRegisterPage",
    payload: {
      step: step,
      steps: steps
    }
  };
}
export function updateRegisterData(obj) {
  console.log(obj);
  return {
    type: "updateRegisterData",
    payload: {
      username: obj.username,
      email: obj.email,
      password: obj.password,
      securityCode: obj.securityCode,
      first: obj.first,
      last: obj.last,
      phone: obj.phone,
      address1: obj.address1,
      address2: obj.address2,
      zip: obj.zip,
      city: obj.city,
      state: obj.state
    }
  };
}
export function getRegister() {
  return {
    type: "get"
  };
}
