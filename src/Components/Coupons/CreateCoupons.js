import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { listMyProducts } from "../../actions/productActions";
import Loading from '../Loading';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import MessageBox from '../MessageBox';
import { createcoupon } from "../../actions/couponActions";

function CreateCoupons(params) {

  const myProductList = useSelector((state) => state.myProductList);
  const { products, loading, error } = myProductList;

  const couponCreate = useSelector((state) => state.couponCreate);
  const { success,loading:createLoading, error:createError } = couponCreate;


  const [coupon_code, setCouponCode] = useState('');
  const [discount_percent, setdiscount_percent] = useState(0);
  const [coupon_quantity, setcouponQunatity] = useState(0);
  const [on_course_id, setonCourseId] = useState(0);
  const [description, setdescription] = useState('');
  const [label, setLabel] = useState('active');
  const [valid_from, setvalid_from] = useState('');
  const [valid_till, setvalid_till] = useState('');
  const [terms_and_conditions, setterms_and_conditions] = useState('');
  

  const dispatch = useDispatch();

  useEffect(() => {
    if(success)
      params.history.push('/admin/coupons')
    dispatch(listMyProducts())
}, [success]);

    const submitDataHandler = (e) => {

      e.preventDefault();

      console.log(coupon_quantity,coupon_code,on_course_id,
        description,label,discount_percent,valid_from,
        valid_till,terms_and_conditions);

      // if(coupon_quantity&&coupon_code&&on_course_id&&
      //   description&&label&&discount_percent&&valid_from&&
      //   valid_till&&terms_and_conditions){
      dispatch(createcoupon(
        { 
          coupon_quantity,coupon_code,on_course_id,
          description,label,discount_percent,valid_from,
          valid_till,terms_and_conditions

        }
      ))
      // else{
      //   alert("Please Fill all required Fields")
      // }
  }


    return(
        <div>
        <div class="content-wrapper">
          <div class="container-fluid">
            {/* Breadcrumbs*/}
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
              <Link to={{pathname:"/admin/dashboard"}}>Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Add Coupons</li>
            </ol>
            {(loading || createLoading) && <Loading></Loading>}
		        {(error || createError) && <MessageBox variant="danger">{error.msg}</MessageBox>}

          {products && <div>
          {products == null ? <MessageBox variant="danger">
            First you need to add courses.
             <a href="/admin/courses/createcourse">Add Courses</a>
             </MessageBox> :
            <div>
            <form onSubmit={submitDataHandler}>
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-file"></i>Basic info</h2>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label className="required" className="required">Coupon Code</label>
                  <input type="text" class="form-control" required onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon Code"/>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required" className="required">Discount Percent %</label>
                  <input type="number" class="form-control"  max="100" min="0" required onChange={(e) => setdiscount_percent(e.target.value)}  placeholder="Discount Percent %"/>
                </div>
              </div>
            </div>
            {/* /row*/}
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required" className="required">Coupon Label</label>
                  <select name="course-label" id="course-label" class="form-control"  required onChange={(e) => setLabel(e.target.value)} >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required" className="required">Coupon Quantity</label>
                  <input type="number" class="form-control" placeholder="Coupon Quantity" required onChange={(e) => setcouponQunatity(e.target.value)}/>
                </div>
              </div>
            </div>

            <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                  <label className="required" className="required">Valid from</label>
                  <input type="date" class="form-control" required onChange={(e) => setvalid_from(moment(e.target.value).format('YYYY/MM/DD'))} />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required" className="required">Valid till</label>
                  <input type="date" class="form-control" required onChange={(e) => setvalid_till(moment(e.target.value).format('YYYY/MM/DD'))}/>
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                  <label className="required" className="required">On Product <a href="#0" data-toggle="tooltip" data-placement="top" href="/admin/category" tittle="Go to Categories page">
                    <i class="fa fa-fw fa-question-circle"></i></a></label>
                  <select name="course-category" id="course-category" class="form-control" required onChange={(e) => setonCourseId(e.target.value)} >
                    <option disabled selected value>---- Select Product -----</option>
                  {products.map((product) => (
                    <option value={product.id}>{product.product_name}</option>
                  ))}
                  </select>
                </div>
              </div>

            {/* /row*/}
            {/* /row*/}
          </div>

            </div>
            {/* /row*/}


          {/* /box_general*/}
          
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-file-text"></i>Description and  T & C</h2>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label className="required" className="required">Description</label>
                  <textarea rows="5" class="form-control" height="100px" placeholder="Description" required onChange={(e) => setdescription(e.target.value)}></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label className="required" className="required">Terms and conditions</label>
                  <textarea rows="4" class="form-control" height="100px" placeholder="Terms and conditions" required onChange={(e) => setterms_and_conditions(e.target.value)}></textarea>
                </div>
              </div>
            </div>
          
          </div>
          
          
          {/* /box_general*/}
          <div id="inline">
          <div><p><button type="submit" id="save" class="btn_1 medium">Save</button></p></div>
          <div><p><a href="/admin/coupons" class="cancel-button">Cancel</a></p></div>
          </div>
          </form>
          </div>}
          </div>}
           {/* /.container-fluid*/}
          </div>
           {/* /.container-wrapper*/}
          </div>
        </div>
    )
    
}

export default CreateCoupons;