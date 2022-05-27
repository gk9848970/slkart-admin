import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    MY_PRODUCT_LIST_REQUEST,
    MY_PRODUCT_LIST_SUCCESS,
    MY_PRODUCT_LIST_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
    CONTENT_UPLOAD_REQUEST,
    CONTENT_UPLOAD_SUCCESS,
    CONTENT_UPLOAD_FAIL,
    PRODUCT_UPDATE_SUCCESS_CHANGE,
    CONTENT_UPLOAD_SUCCESS_CHANGE,
    CONTENT_DELETE_REQUEST,
    CONTENT_DELETE_SUCCESS,
    CONTENT_DELETE_FAIL,
    CONTENT_DELETE_SUCCESS_CHANGE,
    ALLOT_COURSE_REQUEST,
    ALLOT_COURSE_SUCCESS,
    ALLOT_COURSE_FAIL,
    SECTION_LIST_REQUEST,
    SECTION_LIST_SUCCESS,
    SECTION_LIST_FAIL,
  } from '../constants/productConstants';
  
  function productListReducer(state = { products: [] }, action) {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] };
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function myProductListReducer(state = { products: [] }, action) {
    switch (action.type) {
      case MY_PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] };
      case MY_PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case MY_PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  
  
  function productDetailsReducer(state = { product: { reviews: [] } }, action) {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function productDeleteReducer(state = { product: {} }, action) {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false, product: action.payload, success: true };
      case PRODUCT_DELETE_FAIL:
        { console.log(action.payload)
        return { loading: false, error: action.payload };}
      default:
        return state;
    }
  }

  
  function productCreateReducer(state = { product: {} }, action) {
    switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
        return { loading: true };
      case PRODUCT_CREATE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function productUpdateReducer(state = { product: {}, success:false }, action) {
    switch (action.type) {
      case PRODUCT_EDIT_REQUEST:
        return { loading: true };
      case PRODUCT_EDIT_SUCCESS:
        return { loading: false, success: true};
      case PRODUCT_EDIT_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_UPDATE_SUCCESS_CHANGE:
        return {loading:false, success:action.payload}
      default:
        return state;
    }
  }

  function contentUploadReducer(state = { content: {}, success:false }, action) {
    switch (action.type) {
      case CONTENT_UPLOAD_REQUEST:
        return { loading: true };
      case CONTENT_UPLOAD_SUCCESS:
        return { loading: false, success: true, content: action.payload };
      case CONTENT_UPLOAD_FAIL:
        return { loading: false, error: action.payload };
      case CONTENT_UPLOAD_SUCCESS_CHANGE:
        return {loading:false, success:action.payload}
      default:
        return state;
    }
  }

  function contentDeleteReducer(state = { content: {}, success:false }, action) {
    switch (action.type) {
      case CONTENT_DELETE_REQUEST:
        return { loading: true };
      case CONTENT_DELETE_SUCCESS:
        return { loading: false, content: action.payload, success: true };
      case CONTENT_DELETE_FAIL:
        { console.log(action.payload)
        return { loading: false, error: action.payload };}
      case CONTENT_DELETE_SUCCESS_CHANGE:
        return {loading:false, success:action.payload}
      default:
        return state;
    }
  }
  

  function allotCourseReducer(state = { content: {}, success:false }, action) {
    switch (action.type) {
      case ALLOT_COURSE_REQUEST:
        return { loading: true };
      case ALLOT_COURSE_SUCCESS:
        return { loading: false, success: true };
      case ALLOT_COURSE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function sectionsListReducer(state = { sections:[] }, action) {
    switch (action.type) {
      case SECTION_LIST_REQUEST:
        return { loading: true};
      case SECTION_LIST_SUCCESS:
        return { loading: false, sections:action.payload};
      case SECTION_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  export {
    productListReducer,
    productDetailsReducer,
    productCreateReducer,
    productDeleteReducer,
    productUpdateReducer,
    myProductListReducer,
    contentUploadReducer,
    contentDeleteReducer,
    allotCourseReducer,
    sectionsListReducer,
  };
  