import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './order.css';
import Loading from "../Loading";
import MessageBox from "../MessageBox";
import moment from 'moment';
import { Link, Route } from 'react-router-dom';
import { listOrders } from "../../actions/orderAction";
import { listStudents } from "../../actions/studentActions";


function OrderList(params) {

    const studentList = useSelector((state) => state.studentList);
    const {students, loading:loadingStudent, error:errorStudent } = studentList;

    const orderList = useSelector((state) => state.orderList);
    const {orders, loading, error } = orderList;


    const[orderId, setOrderId] = useState(0)


    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
    dispatch(listStudents());
  }, []);

  console.log(orders)

  return(
    <div>
      <div className="content-wrapper">
    	    <div className="container-fluid">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
        <Link to={{pathname:"/admin/dashboard"}}>Dashboard</Link>
        </li>
        <li class="breadcrumb-item active">Orders</li>
      </ol>


      <div class="card mb-3">
        	{loading || loadingStudent && <Loading></Loading>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {errorStudent && <MessageBox variant="danger">{errorStudent}</MessageBox>}


        {(orders && students) && <div>

          <div class="card-header">
          <i class="fa fa-table"></i> Order List
          </div>

        <div class="card-body">
          <div class="table-responsive table_outer">
            <table class="table table-bordered  " id="studentList" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Order Id</th>
                  <th>User/Student</th>
                  <th>Invoice Number</th>
                  <th>Amount</th>
                  <th>Issued On</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {(orders.reverse()).map((order) => (
                <tr>
                  <td></td>
                  <td>{order[0]}</td>
                  {(students.find( x => x.user_id === order[1].user_id )) && <td>{((students.find( x => x.user_id === order[1].user_id )).user_first_name)} {((students.find( x => x.user_id === order[1].user_id )).user_last_name)}</td> }
                  <td>{order[1].invoice_number}</td>
                  <td>₹ {order[1].amount}</td>
                  <td>{(moment(order[1].issued_on).utcOffset("+05:30").format('DD-MM-YYYY   HH:mm:ss'))}</td>
                  <td><i class="approved">{order[1].order_status}</i></td>
                  <td>
                  <Link to={{ pathname: `/admin/orders/${order[0]}/details`, state: { amount:order[1].amount } }}><div className="btn_1 gray edit view left-shift hover-icons"><i className="fa fa-fw fa-eye "></i><b> Details</b></div></Link>
                  </td>

                </tr>
              ))}
              
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="card-footer small text-muted">Updated at {moment(Date.now()).local().format('DD-MM-YYYY HH:mm:ss')} IST </div>


        </div>}
      </div>
      </div>
     
      </div>
    </div>
  )







  
}

export default OrderList;