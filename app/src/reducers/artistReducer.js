import {
  ARTIST_BY_ID_FAIL,
  ARTIST_BY_ID_REQUEST,
  ARTIST_BY_ID_RESET,
  ARTIST_BY_ID_SUCCESS,
  ARTIST_GALLERY_ADDRESS_UPDATE_FAIL,
  ARTIST_GALLERY_ADDRESS_UPDATE_REQUEST,
  ARTIST_GALLERY_ADDRESS_UPDATE_SUCCESS,
  ARTIST_LIST_FAIL,
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_RESET,
  ARTIST_LIST_SUCCESS,
  ARTIST_RELATED_FAIL,
  ARTIST_RELATED_REQUEST,
  ARTIST_RELATED_RESET,
  ARTIST_RELATED_SUCCESS,
  SIMILAR_ARTISTS_FAIL,
  SIMILAR_ARTISTS_REQUEST,
  SIMILAR_ARTISTS_RESET,
  SIMILAR_ARTISTS_SUCCESS,
} from '../constants/artistConstants';

export const artistRelated = (state = {}, action) => {
  switch (action.type) {
    // by Id
    case ARTIST_BY_ID_REQUEST:
      return { loading: true };
    case ARTIST_BY_ID_SUCCESS:
      return {
        ...state,
        success: true,
        artist: action.payload,
        loading: false,
      };
    case ARTIST_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case ARTIST_BY_ID_RESET:
      return {};
    // related tags
    case ARTIST_RELATED_REQUEST:
      return { loading: true };
    case ARTIST_RELATED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        relatedTags: action.payload,
      };
    case ARTIST_RELATED_FAIL:
      return { loading: false, error: action.payload };
    case ARTIST_RELATED_RESET:
      return {};
    // related artists
    case SIMILAR_ARTISTS_REQUEST:
      return { loading: true };
    case SIMILAR_ARTISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        relatedArtists: action.payload,
      };
    case SIMILAR_ARTISTS_FAIL:
      return { loading: false, error: action.payload };
    case SIMILAR_ARTISTS_RESET:
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
