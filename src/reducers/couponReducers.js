import { COUPON_CREATE_FAIL, COUPON_CREATE_REQUEST, COUPON_CREATE_SUCCESS, COUPON_DELETE_FAIL, COUPON_DELETE_REQUEST, COUPON_DELETE_SUCCESS, COUPON_DETAILS_FAIL, COUPON_DETAILS_REQUEST, COUPON_DETAILS_SUCCESS, COUPON_EDIT_FAIL, COUPON_EDIT_REQUEST, COUPON_EDIT_SUCCESS, COUPON_LIST_FAIL, COUPON_LIST_REQUEST, COUPON_LIST_SUCCESS, COUPON_UPDATE_SUCCESS_CHANGE } from "../constants/couponConstants";

function couponListReducer(state = { coupons: [] }, action) {
    switch (action.type) {
      case COUPON_LIST_REQUEST:
        return { loading: true, coupons: [] };
      case COUPON_LIST_SUCCESS:
        return { loading: false, coupons: action.payload };
      case COUPON_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function couponCreateReducer(state = { coupon: {} }, action) {
    switch (action.type) {
      case COUPON_CREATE_REQUEST:
        return { loading: true };
      case COUPON_CREATE_SUCCESS:
        return { loading: false, success: true, coupon: action.payload };
      case COUPON_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function couponDeleteReducer(state = { coupon: {} }, action) {
    switch (action.type) {
      case COUPON_DELETE_REQUEST:
        return { loading: true };
      case COUPON_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COUPON_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function couponUpdateReducer(state = { coupon: {}, success:false }, action) {
    switch (action.type) {
      case COUPON_EDIT_REQUEST:
        return { loading: true };
      case COUPON_EDIT_SUCCESS:
        return { loading: false, success: true};
      case COUPON_EDIT_FAIL:
        return { loading: false, error: action.payload };
        case COUPON_UPDATE_SUCCESS_CHANGE:
          return {loading:false, success:action.payload}
      default:
        return state;
    }
  }

  function couponDetailsReducer(state = { coupon: { reviews: [] } }, action) {
    switch (action.type) {
      case COUPON_DETAILS_REQUEST:
        return { loading: true };
      case COUPON_DETAILS_SUCCESS:
        return { loading: false, coupon: action.payload };
      case COUPON_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }


  export {
    couponListReducer,couponCreateReducer,couponDeleteReducer,couponUpdateReducer,
    couponDetailsReducer
  };
  