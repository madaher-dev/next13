import {
  SET_USER_LOADING,
  CLEAR_ERRORS,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_VERIFICATION_REQUIRED,
  RESET_MAIL_RESEND,
  RESET_CODE_DISABLED,
  USER_ERROR,
  UPDATE_USER,
  UPDATED_PROFILE,
  TEMP_FAV,
  CLEAR_USER_LOADING,
  CLEAR_DATA,
  GET_HOTEL_LOCATION,
  GET_BROWSER,
  SET_FAVORITES_LOADING,
  ADD_CITY,
} from "./Types.js";

import axios from "axios";

//axios.defaults.withCredentials = true;
const factory = require("./actionsFactory");
// the prefix is used to reuse types
const PREFIX = "USER_";

let URL = process.env.NEXT_PUBLIC_BASE_URL;
// if (process.env.NODE_ENV_CUSTOM === 'staging') {
//   URL = process.env.BASE_URL_STAGING;
// } else if (process.env.NODE_ENV_CUSTOM === 'production') {
//   URL = process.env.BASE_URL_PROD;
// } else {
//   URL = process.env.BASE_URL_DEV;
// }

// Signup User
export const signup = (data) =>
  factory.post(data, `${URL}/users/signup`, "SIGNUP_SUCCESS", "USER_ERROR");
// Signup User
export const contacUs = (data) =>
  factory.post(
    data,
    `${URL}/users/contactUs`,
    "CONTACT_SUCCESS",
    "CONTACT_ERROR"
  );

// Confirm Email - Step 2 of signup (expect user and token)
export const confirmEmail = (code, email) =>
  factory.patch(
    { code, email },
    `${URL}/users/confirmEmail`,
    "EMAIL_VERIFIED",
    "USER_ERROR"
  );

// Add Recommendation to user favorites
export const addFavorite = (recID, type) =>
  factory.patch(
    {},
    `${URL}/users/favorites/${recID}/type/${type}`,
    "FOVIRITE_ADDED",
    "USER_ERROR"
  );

// Add Recommendation to user favorites
export const removeFavorite = (recID, type) =>
  factory.patch(
    {},
    `${URL}/users/favorites/remove/${recID}/type/${type}`,
    "FOVIRITE_REMOVED",
    "USER_ERROR"
  );

//Get user Favorites
export const getFavorites = (lng, lat) =>
  factory.get(
    `${URL}/users/favorites?lng=${lng}&lat=${lat}`,
    "GET_FAVORITES",
    "USER_ERROR"
  );

// set favorites loading
export const setFavoritesLoading = () => ({ type: SET_FAVORITES_LOADING });

// Add recommendation to temp fav to be added after login
export const tempFav = (recID, type) => async (dispatch) => {
  dispatch({
    type: TEMP_FAV,
    payload: { id: recID, type },
  });
};
// Set the device coordinates to the store..
export const setLocationState =
  (geoLocation, slug, logo, locationId) => (dispatch) => {
    dispatch({
      type: GET_HOTEL_LOCATION,
      payload: { geoLocation, slug, logo, locationId },
    });
  };

// Get city and weather info from coordinates
export const getWeather = (lat, lng) =>
  factory.get(
    `${URL}/info/weather?lat=${lat}&lng=${lng}`,
    "GET_USER_INFO",
    "USER_INFO_FAIL"
  );
// Get city and weather info from coordinates
export const getMenus = (city) =>
  factory.get(
    `${URL}/menus/public?city=${city}`,
    "GET_MENUS",
    "USER_INFO_FAIL"
  );

// Login User
export const loginUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${URL}/users/login`, user, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, //User
    });
  } catch (err) {
    if (err.response.status === 402) {
      dispatch({
        type: LOGIN_VERIFICATION_REQUIRED,
        payload: user.email, // continue here
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: err?.response.data.message,
      });
      dispatch(logout());
    }
  }
};

// To send a 6 digits code after user fills in forgot password form (with email)
export const forgotPassword = (email) =>
  factory.post(
    { email },
    `${URL}/users/forgotPasswordApp`,
    "RESET_EMAIL_SENT",
    "USER_ERROR"
  );
// To check if 6 digit code is coreect for this specific email
export const checkResetToken = (email, token) =>
  factory.post(
    { email, token },
    `${URL}/users/checkResetTokenApp`,
    "RESET_CODE_SUCCESS",
    "USER_ERROR"
  );

// Send the new password with the token
export const resetPassword = (
  token,
  data //passwordConfirm , password
) =>
  factory.patch(
    data,
    `${URL}/users/resetPasswordApp/${token}`,
    "RESET_PASSWORD_SUCCESS",
    "USER_ERROR"
  );
// Update Password
export const updatePassword = (
  data //passwordCurrent , password
) =>
  factory.patch(
    data,
    `${URL}/users/updateMyPassword`,
    "UPDATE_PASSWORD_SUCCESS",
    "USER_ERROR"
  );

// To resend registraion email (crrently uses 6 digit code for app users)
export const resendEmail = (email) =>
  factory.post(
    { email },
    `${URL}/users/resendEmail`,
    "EMAIL_RESEND",
    "USER_ERROR"
  );

//  Update Partner
export const editProfile = (data) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  const form = new FormData();
  const { name, phone, dob, photo } = data;
  if (name) {
    form.append("name", name);
  }

  if (phone) {
    form.append("phone", phone);
  }

  if (dob) {
    form.append("dob", dob);
  }

  if (photo) {
    // const image = {
    //   name: response.fileName,
    //   type: response.type,
    //   uri: response.uri.replace('file://', ''),
    // };
    form.append("photo", photo);
  }
  try {
    const res = await axios.patch(`${URL}/users/updateMe`, form, config);

    dispatch(updateProfile(true));
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err?.response.data.message,
    });
  }
};

// To reset the mailResend number
export const resetMailResend = () => {
  return { type: RESET_MAIL_RESEND };
};

// Check user used to get user info on first load
export const checkUser = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(`${URL}/users/me`, config);
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${URL}/users/deleteCookie`);
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.log(err);
  }
};

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// disable reset code success
export const ResetCodeDisabled = () => ({ type: RESET_CODE_DISABLED });

// Clear user data
export const clearData = (keys) => ({
  type: PREFIX + CLEAR_DATA,
  payload: keys,
});
// Set Browser Info
export const setBrowser = (results) => ({
  type: GET_BROWSER,
  payload: results,
});

// Set Loading
export const setLoading = () => ({ type: SET_USER_LOADING });
export const clearLoading = () => ({ type: CLEAR_USER_LOADING });

// update profile picture action
export const updateProfile = (status) => ({
  type: UPDATED_PROFILE,
  payload: status,
});

// Facebook Login
export const facebookLogin = (data) =>
  factory.post(
    data,
    `${URL}/users/facebookLogin`,
    "EMAIL_VERIFIED",
    "USER_ERROR"
  );
// Google Login
export const googleLogin = (data) =>
  factory.post(
    data,
    `${URL}/users/googleLoginWeb`,
    "EMAIL_VERIFIED",
    "USER_ERROR"
  );
// Google Login
export const appleLogin = (data) =>
  factory.post(data, `${URL}/users/appleLogin`, "EMAIL_VERIFIED", "USER_ERROR");

export const addCity = (city) => {
  return { type: ADD_CITY, payload: city };
};
