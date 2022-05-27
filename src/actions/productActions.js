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
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
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
    CONTENT_DELETE_FAIL,
    CONTENT_DELETE_SUCCESS,
    CONTENT_DELETE_SUCCESS_CHANGE,
    ALLOT_COURSE_REQUEST,
    ALLOT_COURSE_FAIL,
    ALLOT_COURSE_SUCCESS,
    SECTION_LIST_REQUEST,
    SECTION_LIST_FAIL,
    SECTION_LIST_SUCCESS,
    ENROLLED_LIST_SUCCESS_CHANGE,
  } from '../constants/productConstants';
  import axios from 'axios';
  import Axios from 'axios';
  import {apiBaseUrl} from "../Config";

  function sectionArray(objectArray){

    let section_list = [];

    for (let i = 0; i < objectArray.length; i++) 
      section_list.push(objectArray[i].section_name);
  
      return section_list;
}
  
  
  const listProducts =()=>async(dispatch)=>{
  
      dispatch({type:PRODUCT_LIST_REQUEST});
      try {
        const {data} = await axios.get(`${apiBaseUrl}/api/admin/product/marketplace`,
        {
            headers:
            {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        console.log(data)
        if(data.flag === 2)
          dispatch({ type: PRODUCT_LIST_FAIL, payload: data.msg});
        else
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
      } catch (err) {
          console.log(err.msg)
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.response && err.response.data.msg
          ? err.response.data.msg
          : err.msg? err.msg:err.message, });
      }
  };
  
  const listMyProducts =()=>async(dispatch)=>{
  
    dispatch({type:MY_PRODUCT_LIST_REQUEST});
    try {
      const {data} = await axios.get(`${apiBaseUrl}/api/admin/product/myproducts`,
      {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      console.log(data)
      if(data.flag === 2)
          dispatch({ type: MY_PRODUCT_LIST_FAIL, payload: data.msg});
      else{
        
        localStorage.setItem("inst_id",data.products[0].issued_by);
          dispatch({type:MY_PRODUCT_LIST_SUCCESS,payload:data.products});}
    } catch (err) {
        console.log(err)
      dispatch({ type: MY_PRODUCT_LIST_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg, });
    }
};

  
  const createProduct = (product) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST, payload: product });
        const { data } = await Axios.post(`${apiBaseUrl}/api/admin/product/createproduct`, product,  {
            headers:
            {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        if(data.flag === 2)
          dispatch({ type: PRODUCT_CREATE_FAIL, payload: data.msg});
        else
          dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (err) {
        console.log(err.msg)
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg? err.msg:err.message, });
    }
};
  
const updateProduct = (product, id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST, payload: product });
    
      const { data } = await Axios.put(`${apiBaseUrl}/api/admin/product/`+id+`/update`, product,  {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      console.log(data.product)
      if(data.flag === 2)
          dispatch({ type: PRODUCT_EDIT_FAIL, payload: data.msg});
      else
          dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data.product });
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: PRODUCT_EDIT_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

  const detailsProduct = (productId) => async (dispatch) => {
    try {
      console.log(productId)
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
      const { data } = await axios.get(`${apiBaseUrl}/api/admin/product/all/`+productId,{
        headers:
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });
    console.log(data.details);
      if(data.flag === 2)
            dispatch({ type: PRODUCT_DETAILS_FAIL, payload: data.msg});
      else
            dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.details });
    } catch (err) {
      console.log(err.msg)
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};
  
  
  const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      console.log(id)
      const { data } = await axios.delete(`${apiBaseUrl}/api/admin/product/`+id+`/delete`, {
        headers:
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });
      console.log(data);
      if(data.flag === 2)
          dispatch({ type: PRODUCT_DELETE_FAIL, payload: data.msg});
      else
          dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (err) {
        console.log(err.msg)
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg? err.msg:err.message, });
    }
};

const uploadContent = (content,id) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_UPLOAD_REQUEST, payload: content });
      const { data } = await Axios.post(`${apiBaseUrl}/api/admin/product/`+id+`/upload`, content,  {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      console.log(data)
      if(data.flag === 2)
          dispatch({ type: CONTENT_UPLOAD_FAIL, payload: data.msg});
      else
          dispatch({ type: CONTENT_UPLOAD_SUCCESS, payload: data });
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: CONTENT_UPLOAD_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

const deleteContent = (productId,contentId) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_DELETE_REQUEST });
    const { data } = await axios.delete(`${apiBaseUrl}/api/admin/product/`+productId+`/delete/`+contentId, {
      headers:
      {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
      }
  });
    console.log(data);
    if(data.flag === 2)
        dispatch({ type: CONTENT_DELETE_FAIL, payload: data.msg});
    else
        dispatch({ type: CONTENT_DELETE_SUCCESS, payload: data, success: true });
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: CONTENT_DELETE_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

const allotCourse = (details) => async (dispatch) => {
  try {
    dispatch({ type: ALLOT_COURSE_REQUEST});
      const { data } = await Axios.post(`${apiBaseUrl}/api/admin/product/allotcourse`, details,  {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      console.log(data)
      if(data.flag === 2)
          dispatch({ type: ALLOT_COURSE_FAIL, payload: data.msg});
      else
          dispatch({ type: ALLOT_COURSE_SUCCESS, payload: data });
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: ALLOT_COURSE_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

const updateProductSuccesschange = () => async(dispatch) => {
  dispatch({ type: PRODUCT_UPDATE_SUCCESS_CHANGE, payload:false});
}

const uploadContentSuccesschange = () => async(dispatch) => {
  dispatch({ type: CONTENT_UPLOAD_SUCCESS_CHANGE, payload:false});
}

const deleteContentSuccesschange = () => async(dispatch) => {
  dispatch({ type: CONTENT_DELETE_SUCCESS_CHANGE, payload:false});
}

const enrolledListSuccesschange = () => async(dispatch) => {
  dispatch({ type: ENROLLED_LIST_SUCCESS_CHANGE, payload:false});
}



  const sectionList = (productId) => async (dispatch) => {
    try {
      console.log(productId)
      dispatch({ type: SECTION_LIST_REQUEST, payload: productId });
      const { data } = await axios.get(`${apiBaseUrl}/api/admin/product/all/`+productId,{
        headers:
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });
    console.log(data.details);
      if(data.flag === 2)
            dispatch({ type: SECTION_LIST_FAIL, payload: data.msg});
      else
      {
        const list_sections = sectionArray(data.details.content)
        console.log(list_sections)
        dispatch({ type: SECTION_LIST_SUCCESS, payload: list_sections });
      }
            
    } catch (err) {
      console.log(err.msg)
    dispatch({ type: SECTION_LIST_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
  };

  
  export {
    listProducts,
    createProduct,
    deleteProduct,
    listMyProducts,
    updateProduct,
    detailsProduct,
    uploadContent,
    updateProductSuccesschange,
    uploadContentSuccesschange,
    deleteContentSuccesschange,
    deleteContent,
    allotCourse,
    sectionList,
    enrolledListSuccesschange
  };