const initialState = {
  toHome: false,
  toLogin: false,
  toRegister: false,
  toDash: false,
  toProfile: false,
  toDesigns: false,
  toFaq: false,
  toAsk: false,
  toForgetPassword: false,
}
export default function(state = initialState, action) {
  var toHome, toLogin, toRegister, toDash, toProfile, toDesigns, toFaq, toAsk,toForgetPassword
  switch (action.type) {
    case "handleNavigation":
      if (action.payload === 'home') {
        toHome = true
      } else {
        toHome = false
      }
      if (action.payload === 'login') {
        toLogin = true
      } else {
        toLogin = false
      }
      if (action.payload === 'register') {
        toRegister = true
      } else {
        toRegister = false
      }
      if (action.payload === 'New Design') {
        toDash = true
      } else {
        toDash = false
      }
      if (action.payload === 'My Profile') {
        toProfile = true
      } else {
        toProfile = false
      }
      if (action.payload === 'My Designs') {
        toDesigns = true
      } else {
        toDesigns = false
      }
      if (action.payload === 'FAQ') {
        toFaq = true
      } else {
        toFaq = false
      }
      if (action.payload === 'Questions') {
        toAsk = true
      } else {
        toAsk = false
      }
      if(action.payload === 'forget_password'){
        toForgetPassword = true;
      }else{
        toForgetPassword = false;
      }
      return {
        ...state,
        toHome: toHome,
        toLogin: toLogin,
        toRegister: toRegister,
        toDash: toDash,
        toProfile: toProfile,
        toDesigns: toDesigns,
        toFaq: toFaq,
        toAsk: toAsk,
        toForgetPassword : toForgetPassword
      };
    case "resetNavigation":
      return {
        ...state,
        toHome: false,
        toLogin: false,
        toRegister: false,
        toDash: false,
        toProfile: false,
        toDesigns: false,
        toFaq: false,
        toAsk: false,
        toForgetPassword: false
      };
    default:
      return state;
  }
}
