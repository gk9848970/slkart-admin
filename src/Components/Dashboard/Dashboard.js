import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Loading from '../Loading'
import { useScrollTrigger } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { listMyProducts } from '../../actions/productActions';
import { listStudents } from '../../actions/studentActions';
import { listCoupons } from '../../actions/couponActions';
import { Link, Route } from 'react-router-dom';
import { listOrders } from '../../actions/orderAction';
import NavBar from "../NavBar";
import moment from 'moment';
import { useParams } from 'react-router-dom';



function Dashboard(params) {

  const myProductList = useSelector((state) => state.myProductList);
  const { products, loading, error } = myProductList;

  const orderList = useSelector((state) => state.orderList);
  const {orders, loading:orderLoading, error:orderError } = orderList;

  const couponList = useSelector((state) => state.couponList);
  const { coupons, loading:couponLoading, error:couponError } = couponList;

  const studentList = useSelector((state) => state.studentList);
  const {students, loading:studentLoading, error:ErrorLoading } = studentList;

  const dispatch = useDispatch();

  const token = useParams().token; //Getting the jwt from url
  if(token)
    localStorage.setItem("token", token); //Saving the token in local storage
  
  useEffect(() => {
    dispatch(listStudents());
    dispatch(listMyProducts());
    dispatch(listCoupons());
    dispatch(listOrders());
  }, []);


    return(
        <div>
        <NavBar />
    <div class="content-wrapper">
        <div class="container-fluid">
      
          {/* Breadcrumbs*/}
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
            <Link to={{pathname:"/admin/dashboard"}}>Dashboard</Link>
            </li>
            <li class="breadcrumb-item active">My Dashboard</li>
          </ol>
        {true && 
        <div>
        {/* Icon Cards*/}
          <div class="row">
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card dashboard text-white bg-primary o-hidden h-100">
                <div class="card-body text-white">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-shopping-cart"></i>
                  </div>
                  <div><h6 className="text-white">Total Revenue</h6></div>
                  <div><h1 className="text-white">₹ {orders ? (orders.reduce((a, curr) => a + (curr[1].amount ? parseInt(curr[1].amount) : 0), 0)).toFixed(2) : "0"}</h1></div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="/admin/orders">
                  <span class="float-left">View Details</span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card dashboard text-white bg-warning o-hidden h-100">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-users"></i>
                  </div>
                  <div><h6 className="text-white">Total Students</h6></div>
                  <div><h1 className="text-white">{students ? students.length : "0"}</h1></div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="/admin/students">
                  <span class="float-left">View Details</span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card dashboard text-white bg-success o-hidden h-100">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-calendar-check-o"></i>
                  </div>
                  <div><h6 className="text-white">Total Courses</h6></div>
                  <div><h1 className="text-white">{products ? products.length : "0"}</h1></div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="/admin/courses">
                  <span class="float-left">View Details</span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-3">
              <div class="card dashboard text-white bg-danger o-hidden h-100">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-tag"></i>
                  </div>
                  <div><h6 className="text-white">Total Coupons</h6></div>
                  <div><h1 className="text-white">{coupons ? coupons.length : "0"}</h1></div>
                </div>
                <a class="card-footer text-white clearfix small z-1" href="/admin/coupons">
                  <span class="float-left">View Details</span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
        </div>
        {/* /cards */}
        <h2></h2>
        <div class="box_general padding_bottom">
          <div class="header_box version_2">
            <h2><i class="fa fa-bar-chart"></i>Statistic</h2>
          </div>
        <canvas id="myAreaChart" width="100%" height="30" margin="45px 0 15px 0"></canvas>

        <div class="row">
              <div class="col-md-6">
                <div className="box_general recent">
                <h5><i className="fa fa-fw fa-shopping-cart"></i> Recent Orders</h5>
              <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>
                        Sl No
                      </th>
                      <th>
                        Order Id
                      </th>
                      <th>
                        Amount
                      </th>
                      <th>
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                  {orders && (orders.slice(Math.max(orders.length - 5, 0)).reverse()).map((order) => (
                      <tr>
                      <td></td>
                      <td>{order[0]}</td>
                      <td>₹ {(order[1].amount)}</td>
                      <td>{(moment(order[1].issued_on).local().format('DD-MM-YYYY'))}</td>
                      </tr>
                  ))}

                    </tbody>
                    </table>
                    </div>
                </div>


                <div class="col-md-6">
                <div className="box_general recent">
                <h5><i className="fa fa-fw fa-users"></i> Recent Students</h5>
              <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>
                        Sl No
                      </th>
                      <th>
                        Student Name
                      </th>
                      <th>
                        Student Email Id
                      </th>
                      <th>
                        Contact No.
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                  {students && (students.slice(Math.max(students.length - 5, 0)).reverse()).map((student) => (
                      <tr>
                      <td></td>
                      <td>{student.user_first_name} {student.user_last_name}</td>
                      <td>{student.user_email}</td>
                      <td>{student.country_code}-{student.user_contact_no}</td>
                      </tr>
                  ))}

                    </tbody>
                    </table>
                    </div>
                </div>
                
              </div>

        </div>
          
            

        </div>}
        {/* /.container-fluid*/}
        </div>
        {/* /.container-wrapper*/}
        </div>
        </div>
    )
    
}

export default Dashboard;