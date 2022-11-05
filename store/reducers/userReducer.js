import {
  GET_USER_INFO,
  USER_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  SET_USER_LOADING,
  SIGNUP_SUCCESS,
  USER_LOADED,
  EMAIL_VERIFIED,
  AUTH_ERROR,
  EMAIL_RESEND,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_VERIFICATION_REQUIRED,
  RESET_MAIL_RESEND,
  RESET_EMAIL_SENT,
  RESET_CODE_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  RESET_CODE_DISABLED,
  UPDATE_USER,
  UPDATED_PROFILE,
  FOVIRITE_REMOVED,
  FOVIRITE_ADDED,
  TEMP_FAV,
  CLEAR_USER_LOADING,
  CLEAR_DATA,
  GET_HOTEL_LOCATION,
  USER_INFO_FAIL,
  CONTACT_SUCCESS,
  CONTACT_ERROR,
  GET_BROWSER,
  GET_FAVORITES,
  SET_FAVORITES_LOADING,
  GET_MENUS,
  ADD_CITY,
} from "../actions/Types.js";

const initialState = {
  loading: false,
  error: null,
  user: null,
  info: null,
  token: null,
  location: {},
  browser: {},
  isAuthenticated: null,
  mailResend: 0,
  resetCodeSuccess: false,
  profileUpdated: false,
  favorite: null,
  type: null,
  failed: false, //If location info failed
  sent: false, // for contact form
  menu: [],
  city: null,
};

// the prefix is used to reuse types
const PREFIX = "USER_";

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        loading: false,
        error: null,
        info: action.payload.data,
        failed: false,
      };
    case USER_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        failed: true,
      };
    case GET_MENUS:
      return {
        ...state,
        loading: false,
        menus: action.payload.data.data,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        loading: false,
        error: "Ooops! We were not able to receive your info.",
        sent: false,
      };
    case CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        sent: true,
      };
    case SIGNUP_SUCCESS: //Completed step 1 of signup
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.data.user, //Check user.validated
      };
    case RESET_EMAIL_SENT: //Completed step 1 of passwprd reset
      return {
        ...state,
        loading: false,
        error: null,
        user: state.isAuthenticated
          ? { ...action.payload.data.user, ...state.user }
          : action.payload.data.user,
      };
    case EMAIL_VERIFIED: //Final step of signup. will get user info and token
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
        user: action.payload.data.user,
        token: action.payload.token,
      };

    case EMAIL_RESEND:
      return {
        ...state,
        mailResend: state.mailResend + 1,
      };
    case RESET_CODE_DISABLED:
      return {
        ...state,
        resetCodeSuccess: false,
      };
    case RESET_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        resetCodeSuccess: true,
      };
    case FOVIRITE_ADDED:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          favoriteRecommendations:
            action.payload.data.user.favoriteRecommendations,
          favoriteItems: action.payload.data.user.favoriteItems,
          favoriteAttractions: action.payload.data.user.favoriteAttractions,
          favoriteExperiences: action.payload.data.user.favoriteExperiences,
        },
        favorite: null,
      };
    case FOVIRITE_REMOVED:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          favoriteRecommendations:
            action.payload.data.user.favoriteRecommendations,
          favoriteItems: action.payload.data.user.favoriteItems,
          favoriteAttractions: action.payload.data.user.favoriteAttractions,
          favoriteExperiences: action.payload.data.user.favoriteExperiences,
        },
      };
    case TEMP_FAV:
      return {
        ...state,
        favorite: action.payload.id,
        type: action.payload.type,
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload.data,
        error: false,
        favoritesLoading: false,
      };
    case SET_FAVORITES_LOADING:
      return {
        ...state,
        favoritesLoading: true,
      };
    case UPDATED_PROFILE:
      return {
        ...state,
        profileUpdated: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: true,
      };
    case LOGIN_SUCCESS: //Will Login Unconfirmed email
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data.user,
        token: action.payload.token,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_VERIFICATION_REQUIRED:
      return {
        ...state,
        loading: false,
        user: { email: action.payload },
      };
    case RESET_MAIL_RESEND:
      return {
        ...state,
        mailResend: 0,
      };
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_USER_LOADING:
      return {
        ...state,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
        page: 1,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.data.data,
        isAuthenticated: true,
        error: null,
        loading: false,
      };
    case GET_HOTEL_LOCATION:
      return {
        ...state,
        loadingLocation: false,
        error: null,
        location: action.payload,
      };

    case GET_BROWSER:
      return {
        ...state,
        browser: action.payload,
      };

    case ADD_CITY:
      return {
        ...state,
        city: action.payload,
      };

    case PREFIX + CLEAR_DATA:
      //to clear a specific variable form the state, we pass it in an array (created to avoid multiple customized cases)
      let variables = action.payload;
      let tempState = state;
      let initialObj = { city: state.city };

      if (variables && variables?.indexOf("*") !== -1) {
        initialObj = { city: initialState.city };
      }

      for (let i = 0; variables && i < variables.length; i++) {
        tempState[variables[i]] = initialState[variables[i]];
      }

      return variables?.length > 0
        ? { ...tempState, ...initialObj }
        : { ...initialState, ...initialObj };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
        // info: null,
        token: null,
        isAuthenticated: null,
        resetCodeSuccess: false,
        favorite: null,
      };

    default:
      return state;
  }
};
