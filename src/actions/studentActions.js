import axios from 'axios';
import Axios from 'axios';
import { ENROLLED_LIST_FAIL, ENROLLED_LIST_REQUEST, ENROLLED_LIST_SUCCESS } from '../constants/productConstants';
import { STUDENT_CREATE_FAIL, STUDENT_CREATE_REQUEST, STUDENT_CREATE_SUCCESS, STUDENT_DELETE_FAIL, STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_REQUEST, STUDENT_DETAILS_SUCCESS, STUDENT_EDIT_FAIL, STUDENT_EDIT_REQUEST, STUDENT_EDIT_SUCCESS, STUDENT_LIST_FAIL, STUDENT_LIST_FOR_ENROLL_FAIL, STUDENT_LIST_FOR_ENROLL_REQUEST, STUDENT_LIST_FOR_ENROLL_SUCCESS, STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_UPDATE_SUCCESS_CHANGE } from '../constants/studentConstants';
import { apiBaseUrl } from '../Config';

const listStudents =()=>async(dispatch)=>{
  
    dispatch({type:STUDENT_LIST_REQUEST});
    try {
      const {data} = await axios.get(`${apiBaseUrl}/api/admin/student/regstudents`,
      {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      console.log(data)
      if(data.flag === 2)
        dispatch({ type: STUDENT_LIST_FAIL, payload: data.msg});
      else
        dispatch({type:STUDENT_LIST_SUCCESS,payload:data.students});
    } catch (err) {
        console.log(err.msg)
      dispatch({ type: STUDENT_LIST_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg? err.msg:err.message, });
    }
};

const listStudentsForEnroll =()=>async(dispatch)=>{
  
  dispatch({type:STUDENT_LIST_FOR_ENROLL_REQUEST});
  try {
    const {data} = await axios.get(`${apiBaseUrl}/api/admin/student/regstudents`,
    {
        headers:
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });

    
    if(data.flag === 2)
      dispatch({ type: STUDENT_LIST_FOR_ENROLL_FAIL, payload: data.msg});
    else{
          let listStudent = [{label:"All", value:0}];
          const studentData = data.students;
          for (let i = 0; i < studentData.length; i++) {
            if(studentData[i].user_last_name)
              {
                listStudent.push({
              label:studentData[i].user_first_name + " " + studentData[i].user_last_name ,
              value:studentData[i].user_id
              })
            }
              else{

                listStudent.push({
                  label:studentData[i].user_first_name,
                  value:studentData[i].user_id
                  })
              }
          }
      if(listStudent)
      { console.log(listStudent)
        dispatch({type:STUDENT_LIST_FOR_ENROLL_SUCCESS,payload:listStudent});
      }
    }
     
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: STUDENT_LIST_FOR_ENROLL_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};


const listEnrolledStudents =(productId)=>async(dispatch)=>{
  
  dispatch({type:ENROLLED_LIST_REQUEST});
  try {
    const {data} = await axios.get(`${apiBaseUrl}/api/admin/product/`+productId+'/students',
    {
        headers:
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });

    
    if(data.flag === 2)
      dispatch({ type: ENROLLED_LIST_FAIL, payload: data.msg});
    else{
          let listEnrolled = [];
          if(data.students)
          {
          const studentData = data.students;
          for (let i = 0; i < studentData.length; i++) {
            if(studentData[i].user_last_name)
              {
                listEnrolled.push({
              label:studentData[i].user_first_name + " " + studentData[i].user_last_name ,
              email:studentData[i].user_email,
              value:studentData[i].user_id
              })
            }
              else{

                listEnrolled.push({
                  label:studentData[i].user_first_name,
                  value:studentData[i].user_id
                  })
              }
          }}else{
              listEnrolled = []
          }
      if(listEnrolled)
      { console.log(listEnrolled)
        dispatch({type:ENROLLED_LIST_SUCCESS,payload:listEnrolled});
      }
    }
     
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: ENROLLED_LIST_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};




    const createStudent = (student) => async (dispatch) => {
      try {
        dispatch({ type: STUDENT_CREATE_REQUEST, payload: student });
          const { data } = await Axios.post(`${apiBaseUrl}/api/users/auth/register`, student,  {
              headers:
              {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
              }
          });
          if(data.flag === 2)
              dispatch({ type: STUDENT_CREATE_FAIL, payload: data.msg});
          else
              dispatch({ type: STUDENT_CREATE_SUCCESS, payload: data });
      } catch (err) {
          console.log(err.msg)
        dispatch({ type: STUDENT_CREATE_FAIL, payload: err.response && err.response.data.msg
          ? err.response.data.msg
          : err.msg? err.msg:err.message, });
      }
    };

    const updateStudent = (student, id) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_EDIT_REQUEST, payload: student });
      
        const { data } = await Axios.put(`${apiBaseUrl}/api/admin/student/`+id+"/update", student,  {
            headers:
            {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        console.log(data.student)
        if(data.flag === 2)
              dispatch({ type: STUDENT_EDIT_FAIL, payload: data.msg});
          else
              dispatch({ type: STUDENT_EDIT_SUCCESS, payload: data.student });
    } catch (err) {
        console.log(err.msg)
      dispatch({ type: STUDENT_EDIT_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg? err.msg:err.message, });
    }
    };


    const deleteStudent = (id) => async (dispatch) => {
      try {
        dispatch({ type: STUDENT_DELETE_REQUEST });
        console.log(id)
        const { data } = await axios.delete(`${apiBaseUrl}/api/admin/student/`+id+'/delete', {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
        console.log(data);
        if(data.flag === 2)
              dispatch({ type: STUDENT_DELETE_FAIL, payload: data.msg});
          else
              dispatch({ type: STUDENT_DELETE_SUCCESS, payload: data, success: true });
      } catch (err) {
          console.log(err.msg)
        dispatch({ type: STUDENT_DELETE_FAIL, payload: err.response && err.response.data.msg
          ? err.response.data.msg
          : err.msg? err.msg:err.message, });
      }
  };

  
  const detailsStudent = (studentId) => async (dispatch) => {
    try {
      console.log(studentId)
      dispatch({ type: STUDENT_DETAILS_REQUEST, payload: studentId });
      const { data } = await axios.get(`${apiBaseUrl}/api/admin/student/`+studentId,{
        headers:
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });
    console.log(data);
      if(data.flag === 2)
            dispatch({ type: STUDENT_DETAILS_FAIL, payload: data.msg});
      else
            dispatch({ type: STUDENT_DETAILS_SUCCESS, payload: data.students });
    } catch (err) {
      console.log(err.msg)
    dispatch({ type: STUDENT_DETAILS_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

  const updateStudentSuccesschange = () => async(dispatch) => {
    dispatch({ type: STUDENT_UPDATE_SUCCESS_CHANGE, payload:false});
  }

export {listStudents, createStudent, updateStudent, deleteStudent, 
  updateStudentSuccesschange, detailsStudent, listStudentsForEnroll,
  listEnrolledStudents}