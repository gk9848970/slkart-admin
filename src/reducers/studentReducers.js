import { ENROLLED_LIST_FAIL, ENROLLED_LIST_REQUEST, ENROLLED_LIST_SUCCESS, ENROLLED_LIST_SUCCESS_CHANGE } from '../constants/productConstants';
import { STUDENT_CREATE_FAIL, STUDENT_CREATE_REQUEST, STUDENT_CREATE_SUCCESS, STUDENT_DELETE_FAIL, STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_REQUEST, STUDENT_DETAILS_SUCCESS, STUDENT_EDIT_FAIL, STUDENT_EDIT_REQUEST, STUDENT_EDIT_SUCCESS, STUDENT_LIST_FAIL, STUDENT_LIST_FOR_ENROLL_FAIL, STUDENT_LIST_FOR_ENROLL_REQUEST, STUDENT_LIST_FOR_ENROLL_SUCCESS, STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_UPDATE_SUCCESS_CHANGE } from '../constants/studentConstants';


  function studentListReducer(state = { students: [] }, action) {
    switch (action.type) {
      case STUDENT_LIST_REQUEST:
        return { loading: true, students: [] };
      case STUDENT_LIST_SUCCESS:
        return { loading: false, students: action.payload };
      case STUDENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
}

function studentListForEnrollReducer(state = { studentData: [] }, action) {
  switch (action.type) {
    case STUDENT_LIST_FOR_ENROLL_REQUEST:
      return { loading: true, students: [] };
    case STUDENT_LIST_FOR_ENROLL_SUCCESS:
      return { loading: false, studentData: action.payload };
    case STUDENT_LIST_FOR_ENROLL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function enrolledStudentListReducer(state = { studentEnrolled: [], success:false}, action) {
  switch (action.type) {
    case ENROLLED_LIST_REQUEST:
      return { loading: true, students: [] };
    case ENROLLED_LIST_SUCCESS:
      return { loading: false, studentEnrolled: action.payload, success:true };
    case ENROLLED_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ENROLLED_LIST_SUCCESS_CHANGE:
      return {loading:false, success:action.payload}
    default:
      return state;
  }
}

function studentDetailsReducer(state = { student: {} }, action) {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { loading: true };
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, student: action.payload };
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function studentDeleteReducer(state = { student: {} }, action) {
  switch (action.type) {
    case STUDENT_DELETE_REQUEST:
      return { loading: true };
    case STUDENT_DELETE_SUCCESS:
      return { loading: false, student: action.payload, success: true };
    case STUDENT_DELETE_FAIL:
      { console.log(action.payload)
      return { loading: false, error: action.payload };}
    default:
      return state;
  }
}

function studentCreateReducer(state = { student: {} }, action) {
  switch (action.type) {
    case STUDENT_CREATE_REQUEST:
      return { loading: true };
    case STUDENT_CREATE_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case STUDENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function studentUpdateReducer(state = { student: {}, success:false}, action) {
  switch (action.type) {
    case STUDENT_EDIT_REQUEST:
      return { loading: true };
    case STUDENT_EDIT_SUCCESS:
      return { loading: false, success: true};
    case STUDENT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_UPDATE_SUCCESS_CHANGE:
      return {loading:false, success:action.payload}
    default:
      return state;
  }
}


export {studentListReducer, studentCreateReducer, studentDetailsReducer,
        studentDeleteReducer, studentUpdateReducer, studentListForEnrollReducer,
        enrolledStudentListReducer
}