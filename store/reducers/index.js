import { combineReducers } from "redux";
// import recommendationReducer from './recommendationReducer';
import userReducer from "./userReducer";
// import categoriesReducer from './catergoriesReducer';
// import trendsReducer from './trendsReducer';
// import bannersReducer from './bannersReducer';
// import itemsReducer from './itemsReducer';
// import alertReducer from './alertReducer';
// import bookingReducer from './bookingReducer';
// import boxesReducer from './boxesReducer';
// import experienceReducer from './experienceReducer';
// import topCitiesReducer from './topCitiesReducer';
// import newsReducer from './newsReducer';

export default combineReducers({
  // recommendations: recommendationReducer,
  users: userReducer,
  // categories: categoriesReducer,
  // trends: trendsReducer,
  // boxes: boxesReducer,
  // banners: bannersReducer,
  // items: itemsReducer,
  // alerts: alertReducer,
  // booking: bookingReducer,
  // experience: experienceReducer,
  // topCities: topCitiesReducer,
  // news: newsReducer,
});
