import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import dashboardReducer from './dashboardReducer';
import registerReducer from './registerReducer';
import finalizeReducer from './finalizeReducer';
import modalReducer from './modalReducer';
import buttonReducer from './buttonReducer';
import navigationReducer from './navigationReducer';
import tutorialReducer from './tutorialReducer';
export default combineReducers({
 drawerReducer,
 dashboardReducer,
 registerReducer,
 finalizeReducer,
 modalReducer,
 buttonReducer,
 navigationReducer,
 tutorialReducer
});
