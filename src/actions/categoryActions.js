import axios from 'axios';
import Axios from 'axios';
import { CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from '../constants/categoryConstants';
import {apiBaseUrl} from "../Config"

const listCategories =()=>async(dispatch)=>{
  
    dispatch({type:CATEGORY_LIST_REQUEST});
    try {
      const {data} = await axios.get(`${apiBaseUrl}/api/admin/category/allcategories`,
      {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      console.log(data)
      if(data.flag === 2)
          dispatch({ type: CATEGORY_LIST_FAIL, payload: data.msg});
      else
          dispatch({type:CATEGORY_LIST_SUCCESS,payload:data});
    } catch (err) {
        console.log(err.msg)
      dispatch({ type: CATEGORY_LIST_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg? err.msg:err.message, });
    }
};

const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST});
      const { data } = await Axios.post(`${apiBaseUrl}/api/admin/category/create`, category,  {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      if(data.flag === 2)
          dispatch({ type: CATEGORY_CREATE_FAIL, payload: data.msg});
      else
          dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: CATEGORY_CREATE_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });
    const { data } = await axios.delete(`${apiBaseUrl}/api/admin/category/`+id+`/delete`, {
      headers:
      {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
      }
  });
    console.log(data);
    if(data.flag === 2)
          dispatch({ type:CATEGORY_DELETE_FAIL, payload: data.msg});
      else
          dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: CATEGORY_DELETE_FAIL,payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};


export {
  listCategories,
  createCategory,deleteCategory}