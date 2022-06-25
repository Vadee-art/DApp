import {
  ARTIST_BY_ID_FAIL,
  ARTIST_BY_ID_REQUEST,
  ARTIST_BY_ID_RESET,
  ARTIST_BY_ID_SUCCESS,
  ARTIST_GALLERY_ADDRESS_UPDATE_FAIL,
  ARTIST_GALLERY_ADDRESS_UPDATE_REQUEST,
  ARTIST_GALLERY_ADDRESS_UPDATE_SUCCESS,
  ARTIST_IS_TALENT_FAIL,
  ARTIST_IS_TALENT_REQUEST,
  ARTIST_IS_TALENT_SUCCESS,
  ARTIST_LIST_FAIL,
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_RESET,
  ARTIST_LIST_SUCCESS,
  ARTIST_RELATED_FAIL,
  ARTIST_RELATED_REQUEST,
  ARTIST_RELATED_RESET,
  ARTIST_RELATED_SUCCESS,
} from '../constants/artistConstants';

export const artistByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTIST_BY_ID_REQUEST:
      return { loading: true };
    case ARTIST_BY_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        artist: action.payload,
        ...state,
      };
    case ARTIST_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case ARTIST_BY_ID_RESET:
      return {};
    case ARTIST_RELATED_REQUEST:
      return { loading: true };
    case ARTIST_RELATED_SUCCESS:
      return {
        loading: false,
        success: true,
        ...state,
        relatedTags: action.payload,
      };
    case ARTIST_RELATED_FAIL:
      return { loading: false, error: action.payload };
    case ARTIST_RELATED_RESET:
      return {};
    default:
      return state;
  }
};

export const artistListReducer = (state = { artists: [] }, action) => {
  switch (action.type) {
    case ARTIST_LIST_REQUEST:
      return { loading: true };
    case ARTIST_LIST_SUCCESS:
      return { loading: false, success: true, artists: action.payload };
    case ARTIST_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ARTIST_LIST_RESET:
      return { artists: [] };
    default:
      return state;
  }
};

export const artistGalleryReducer = (state = { theArtist: {} }, action) => {
  switch (action.type) {
    case ARTIST_GALLERY_ADDRESS_UPDATE_REQUEST:
      return { ...state, loading: true };
    case ARTIST_GALLERY_ADDRESS_UPDATE_SUCCESS:
      return { loading: false, success: true, gallery: action.payload };
    case ARTIST_GALLERY_ADDRESS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const artistIsTalentReducer = (state = { theArtist: {} }, action) => {
  switch (action.type) {
    case ARTIST_IS_TALENT_REQUEST:
      return { ...state, loading: true };
    case ARTIST_IS_TALENT_SUCCESS:
      return { loading: false, success: true, theTalent: action.payload };
    case ARTIST_IS_TALENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
