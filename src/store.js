import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { categoryCreateReducer, categoryDeleteReducer, categoryListReducer } from './reducers/categoryReducers';
import { couponCreateReducer, couponDeleteReducer, couponDetailsReducer, couponListReducer, couponUpdateReducer } from './reducers/couponReducers';
import { orderDetailsReducer, orderListReducer } from './reducers/orderReducers';
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productDeleteReducer,
  myProductListReducer,
  productUpdateReducer,
  contentUploadReducer,
  contentDeleteReducer,
  allotCourseReducer,
  sectionsListReducer,
} from './reducers/productReducers';
import { enrolledStudentListReducer, studentCreateReducer, studentDeleteReducer, studentDetailsReducer, studentListForEnrollReducer, studentListReducer, studentUpdateReducer } from './reducers/studentReducers';


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  myProductList : myProductListReducer,
  productUpdate: productUpdateReducer,
  categoryList:categoryListReducer,
  categoryCreate:categoryCreateReducer,
  categoryDelete:categoryDeleteReducer,
  couponList: couponListReducer,
  couponCreate: couponCreateReducer,
  couponDelete: couponDeleteReducer,
  couponUpdate:couponUpdateReducer,
  couponDetails: couponDetailsReducer,
  studentList: studentListReducer,
  studentCreate:studentCreateReducer,
  studentDetails:studentDetailsReducer,
  studentDelete: studentDeleteReducer,
  studentUpdate:studentUpdateReducer,
  contentUpload: contentUploadReducer,
  contentDelete: contentDeleteReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  studentListForEnroll: studentListForEnrollReducer,
  allotCourses: allotCourseReducer,
  sectionsList: sectionsListReducer,
  enrolledStudentList: enrolledStudentListReducer,

});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
