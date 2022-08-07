import { combineReducers } from '@reduxjs/toolkit';
import {
  artworksReducer,
  artworkDeleteReducer,
  artworkReducer,
  artworkUpdateReducer,
  artworkCreateReducer,
  categoriesReducer,
  artworkVoucherDeleteReducer,
  artworkCarouselsReducer,
  artworkIsTalentReducer,
} from './artworkReducer.js';
import cartReducer from './cartReducer.js';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userUpdateReducer,
  favArtworkReducer,
  favArtworkListReducer,
  artistArtworksReducer,
  dialogReducer,
  favArtistListReducer,
  favArtistReducer,
} from './userReducer';
import headerReducer from './headerReducer';
import {
  artistRelated,
  artistGalleryReducer,
  artistListReducer,
} from './artistReducer.js';
import { articleListReducer } from './articleReducer.js';
import { filterReducer } from './filterReducer.js';
import {
  mintAndRedeemReducer,
  galleryDeployReducer,
  voucherReducer,
  walletConnectionReducer,
} from './lazyFactoryReducer.js';
import {
  ethPriceReducer,
  marketBalanceReducer,
  marketPlaceDeployReducer,
  marketPlaceFeeReducer,
  marketPlaceReducer,
  marketWithdrawReducer,
} from './marketPlaceReducer.js';

export default combineReducers({
  dialog: dialogReducer,
  headerStatus: headerReducer,
  artworks: artworksReducer,
  isCarousels: artworkCarouselsReducer,
  theArtwork: artworkReducer,
  artworkDeleteList: artworkDeleteReducer,
  voucherDelete: artworkVoucherDeleteReducer,
  theCart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  artistList: artistListReducer,
  theArtist: artistRelated,
  isTalent: artworkIsTalentReducer,
  artworkUpdate: artworkUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  favArtist: favArtistReducer,
  favArtwork: favArtworkReducer,
  favArtworkList: favArtworkListReducer,
  favArtistList: favArtistListReducer,
  userDeleteList: userDeleteReducer,
  artworkCreate: artworkCreateReducer,
  userUpdate: userUpdateReducer, // update user from admin
  myWorks: artistArtworksReducer,
  articlesList: articleListReducer,
  filterOrigin: filterReducer,
  categoryList: categoriesReducer,
  walletConnection: walletConnectionReducer,
  myVoucher: voucherReducer,
  marketPlaceDeployment: marketPlaceDeployReducer,
  shippingAndFee: marketPlaceFeeReducer,
  theMarketPlace: marketPlaceReducer,
  marketPlaceBalance: marketBalanceReducer,
  marketWithdraw: marketWithdrawReducer,
  deployGallery: galleryDeployReducer,
  backEndGallery: artistGalleryReducer,
  redeemAndMint: mintAndRedeemReducer,
  ethPrice: ethPriceReducer,
});
