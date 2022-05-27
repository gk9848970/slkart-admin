import axios from 'axios';
import Axios from 'axios';

import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants";
import {apiBaseUrl} from "../Config"

function orderArray(orders)
{
  const ordersMap = new Map();

  orders.forEach((order) => {
    if(!ordersMap.has(order.order_id))
    {
      ordersMap.set(order.order_id, {
        a: order.id,
        order_id:order.order_id,
        invoice_number:order.invoice_number,
        user_id:order.user_id,
        amount:order.amount,
        issued_on:order.issued_on,
        order_status:order.order_status
      });
    }
  });
  
  return Array.from(ordersMap.entries());
}

const listOrders =()=>async(dispatch)=>{
  
    dispatch({type:ORDER_LIST_REQUEST});
    try {
      const {data} = await axios.get(`${apiBaseUrl}/api/admin/orders` ,
      {
          headers:
          {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
          }
      });
      
      if(data.flag === 2)
        dispatch({ type: ORDER_LIST_FAIL, payload: data.msg});
      else
      {
        const orderList = orderArray(data.orders)
        console.log(orderList)
        if(orderList)
          dispatch({type:ORDER_LIST_SUCCESS,payload:orderList});
      }
    } catch (err) {
        console.log(err.msg)
      dispatch({ type: ORDER_LIST_FAIL, payload: err.response && err.response.data.msg
        ? err.response.data.msg
        : err.msg? err.msg:err.message, });
    }
};




const detailsOrder = (orderId) => async (dispatch) => {
    try {
      console.log(orderId)
      dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
      const { data } = await axios.get(`${apiBaseUrl}/api/admin/orders`,{
        headers:
        {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });
    // console.log(data.orders);
      if(data.flag === 2)
            dispatch({ type: ORDER_DETAILS_FAIL, payload: data.msg});
      else
      {
        data.orders.forEach((order) => {
          order.amount = parseFloat(order.amount);
          order.net_price = parseFloat(order.net_price);
          order.price_before_coupon = parseFloat(order.price_before_coupon);
        });

        const orderDetailList = (data.orders.filter( x => x.order_id === orderId ))
        if(orderDetailList)
        {
          var amount = orderDetailList[0].amount;
          var beforeAmount = 0;
          for (let i = 0; i < orderDetailList.length; i++) {
            beforeAmount += orderDetailList[i].price_before_coupon;
          }          
          dispatch({ type: ORDER_DETAILS_SUCCESS, payload: {orderDetailList,amount,beforeAmount}});
        }
      }
            
    } catch (err) {
      console.log(err.msg)
    dispatch({ type: ORDER_DETAILS_FAIL, payload: err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg? err.msg:err.message, });
  }
};



export {
    listOrders,detailsOrder
}

/*
const orderDetailList = (data.orders.filter( x => x.order_id === orderId ))
        if(orderDetailList)
        {
          var amount = 0;
          var beforeAmount = 0;
          for (let i = 0; i < orderDetailList.length; i++) {
            amount += parseInt(orderDetailList[i].amount);
            beforeAmount = beforeAmount + orderDetailList[i].price_before_coupon;
          }          
          dispatch({ type: ORDER_DETAILS_SUCCESS, payload: {orderDetailList,amount,beforeAmount}});
        }
  */