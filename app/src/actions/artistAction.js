import artworksBase from '../apis/artworksBase';
import {
  ARTIST_BY_ID_FAIL,
  ARTIST_BY_ID_REQUEST,
  ARTIST_BY_ID_SUCCESS,
  ARTIST_LIST_FAIL,
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_SUCCESS,
  ARTIST_GALLERY_ADDRESS_UPDATE_REQUEST,
  ARTIST_GALLERY_ADDRESS_UPDATE_SUCCESS,
  ARTIST_GALLERY_ADDRESS_UPDATE_FAIL,
  ARTIST_RELATED_REQUEST,
  ARTIST_RELATED_SUCCESS,
  ARTIST_RELATED_FAIL,
  SIMILAR_ARTISTS_REQUEST,
  SIMILAR_ARTISTS_SUCCESS,
  SIMILAR_ARTISTS_FAIL,
} from '../constants/artistConstants';

export const fetchArtistById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ARTIST_BY_ID_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await artworksBase.get(`artists/${id}/`, config);
    dispatch({
      type: ARTIST_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: ARTIST_BY_ID_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const fetchArtistRelatedArt = (artistId) => async (dispatch) => {
  try {
    dispatch({ type: ARTIST_RELATED_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const response = await artworksBase.get(
      `artists/artist/related/${artistId}/`,
      config
    );
    dispatch({
      type: ARTIST_RELATED_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: ARTIST_RELATED_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const fetchSimilarArtists = (artistId) => async (dispatch) => {
  try {
    dispatch({ type: SIMILAR_ARTISTS_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const response = await artworksBase.get(
      `artists/artist/similar/${artistId}/`,
      config
    );
    dispatch({
      type: SIMILAR_ARTISTS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: SIMILAR_ARTISTS_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const fetchArtistList =
  (keyword = '', page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ARTIST_LIST_REQUEST });

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      let response;
      if (keyword) {
        response = await artworksBase.get(
          `/artists/${keyword}&page=${page}`,
          config
        );
      } else {
        response = await artworksBase.get(`/artists/?page=${page}`, config);
      }

      dispatch({
        type: ARTIST_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: ARTIST_LIST_FAIL,
        payload:
          e.response && e.response.status ? e.response.status : e.message,
      });
    }
  };

export const updateArtistGallery =
  (galleryAddress, artistId, artistWalletAddress) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ARTIST_GALLERY_ADDRESS_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const formData = new FormData();
      formData.set('galleryAddress', galleryAddress);
      formData.set('artistWalletAddress', artistWalletAddress);

      const { data } = await artworksBase.put(
        `/artists/${artistId}/gallery/update/`,
        formData,
        config
      );

      dispatch({
        type: ARTIST_GALLERY_ADDRESS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: ARTIST_GALLERY_ADDRESS_UPDATE_FAIL,
        payload:
          e.response && e.response.data.detail
            ? e.response.data.detail
            : e.message,
      });
    }
  };
