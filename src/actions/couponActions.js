import axios from 'axios';
import Axios from 'axios';
import { COUPON_CREATE_FAIL, COUPON_CREATE_REQUEST, COUPON_CREATE_SUCCESS, COUPON_DELETE_FAIL, COUPON_DELETE_REQUEST, COUPON_DELETE_SUCCESS, COUPON_DETAILS_FAIL, COUPON_DETAILS_REQUEST, COUPON_DETAILS_SUCCESS, COUPON_EDIT_FAIL, COUPON_EDIT_REQUEST, COUPON_EDIT_SUCCESS, COUPON_LIST_FAIL, COUPON_LIST_REQUEST, COUPON_LIST_SUCCESS, COUPON_UPDATE_SUCCESS_CHANGE } from '../constants/couponConstants';
import {apiBaseUrl} from "../Config"

const listCoupons =()=>async(dispatch)=>{
  
    dispatch({type:COUPON_LIST_REQUEST});
    try {
      const {data} = await axios.get(`${apiBaseUrl}/api/admin/coupon/allcoupons`,
      {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      console.log(data)
      if(data.flag === 2)
          dispatch({ type: COUPON_LIST_FAIL, payload: data.msg});
      else
          dispatch({type:COUPON_LIST_SUCCESS,payload:data.coupons});
    } catch (err) {
        console.log("error message"+err)
      dispatch({ type: COUPON_LIST_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg? err.msg:err.message, });
    }
};

const createcoupon = (coupon) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_CREATE_REQUEST});
      const { data } = await Axios.post(`${apiBaseUrl}/api/admin/coupon/create`, coupon,  {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      console.log(data);
      if(data.flag === 2)
          dispatch({ type: COUPON_CREATE_FAIL, payload: data.msg});
      else
          dispatch({ type: COUPON_CREATE_SUCCESS, payload: data });
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: COUPON_CREATE_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

const deletecoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_DELETE_REQUEST });
    console.log(id)
    const { data } = await axios.delete(`${apiBaseUrl}/api/admin/coupon/`+id+'/delete', {
      headers:
      {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
      }
  });
    console.log(data);
    if(data.flag === 2)
          dispatch({ type: COUPON_DELETE_FAIL, payload: data.msg});
      else
          dispatch({ type: COUPON_DELETE_SUCCESS, payload: data, success: true });
  } catch (err) {
      console.log(err.msg)
    dispatch({ type: COUPON_DELETE_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

const updateCoupon = (coupon, id) => async (dispatch) => {
    try {
      dispatch({ type: COUPON_EDIT_REQUEST, payload: coupon });
        const { data } = await Axios.put(`${apiBaseUrl}/api/admin/coupon/`+id+"/update", coupon,  {
            headers:
            {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        console.log(data)
        if(data.flag === 2)
          dispatch({ type: COUPON_EDIT_FAIL, payload: data.msg});
        else
          dispatch({ type: COUPON_EDIT_SUCCESS, payload: data });
    } catch (err) {
        console.log(err.msg)
      dispatch({ type: COUPON_EDIT_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg? err.msg:err.message, });
    }
  };


  const detailsCoupon = (couponId) => async (dispatch) => {
    try {
      dispatch({ type: COUPON_DETAILS_REQUEST, payload: couponId });
      const { data } = await axios.get(`${apiBaseUrl}/api/admin/coupon/`+couponId,{
        headers:
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });
    // console.log(data.coupons[0])
    if(data.flag === 2)
        dispatch({ type: COUPON_DETAILS_FAIL, payload: data.msg});
    else
        dispatch({ type: COUPON_DETAILS_SUCCESS, payload: data.coupons[0] });
    } catch (err) {
      console.log(err.msg)
    dispatch({ type: COUPON_DETAILS_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};

const updateCouponSuccesschange = () => async(dispatch) => {
  dispatch({ type: COUPON_UPDATE_SUCCESS_CHANGE, payload:false});
}

export {
  createcoupon,deletecoupon,listCoupons,updateCoupon,detailsCoupon, updateCouponSuccesschange}