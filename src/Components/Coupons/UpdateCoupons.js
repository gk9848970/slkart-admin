
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { listMyProducts } from "../../actions/productActions";
import Loading from '../Loading';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import MessageBox from '../MessageBox';
import { createcoupon, updateCoupon, updateCouponSuccesschange } from "../../actions/couponActions";

function UpdateCoupons(props) {

  const {coupon} = props.location.state
  const myProductList = useSelector((state) => state.myProductList);
  const { products, loading, error } = myProductList;

  const couponUpdate = useSelector((state) => state.couponUpdate);
  const { success:updateSuccess,loading:updateLoading, error:updateError } = couponUpdate;


  const [coupon_code, setCouponCode] = useState(coupon.coupon_code);
  const [discount_percent, setdiscount_percent] = useState(coupon.discount_percent);
  const [coupon_quantity, setcouponQunatity] = useState(coupon.coupon_quantity);
  const [on_course_id, setonCourseId] = useState(coupon.on_course_id);
  const [description, setdescription] = useState(coupon.description);
  const [label, setLabel] = useState(coupon.label);
  const [valid_from, setvalid_from] = useState(coupon.valid_from);
  const [valid_till, setvalid_till] = useState(coupon.valid_till);
  const [terms_and_conditions, setterms_and_conditions] = useState(coupon.terms_and_conditions);
  

  const dispatch = useDispatch();

  useEffect(() => {
    if(updateSuccess)  
    {
        dispatch(updateCouponSuccesschange())
        props.history.push('/admin/coupons')
    }
      
    dispatch(listMyProducts())
}, [updateSuccess]);

    const submitDataHandler = (e) => {
      // if(coupon_quantity&&coupon_code&&on_course_id&&
      //   description&&label&&discount_percent&&valid_from&&
      //   valid_till&&terms_and_conditions){
        e.preventDefault();
      dispatch(updateCoupon(
        { 
          coupon_quantity,coupon_code,on_course_id,
          description,label,discount_percent,
          valid_from:moment(valid_from).format('YYYY/MM/DD'),
          valid_till:moment(valid_till).format('YYYY/MM/DD'),
          terms_and_conditions

        }, coupon.id
      ))
    // }else{
    //     alert("Please Fill all required Fields")
    //   }
  }


    return(
        <div>
        <div class="content-wrapper-nosideMenu">
          <div class="container-fluid">
            {/* Breadcrumbs*/}
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
              <Link to={{pathname:"/admin/dashboard"}}>Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Update Coupons</li>
            </ol>
            {(loading || updateLoading) && <Loading></Loading>}
		        {(error || updateError) && <MessageBox variant="danger">{error.msg}</MessageBox>}

          {products && <div>
          {products == null ? <MessageBox variant="danger">
            First you need to add courses.
             <a href="/admin/courses/createcourse">Add Courses</a>
             </MessageBox> :
            <div>
            <form onSubmit={submitDataHandler} class="form-width">
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-file"></i>Basic info</h2>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label className="required">Coupon Code</label>
                  <input type="text" class="form-control" value={coupon_code} required onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon Code"/>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Discount Percent %</label>
                  <input type="number" class="form-control" value={discount_percent}  max="100" min="0" required onChange={(e) => setdiscount_percent(e.target.value)}  placeholder="Discount Percent %"/>
                </div>
              </div>
            </div>
            {/* /row*/}
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Coupon Label</label>
                  <select name="course-label" id="course-label" value={label} class="form-control"  required onChange={(e) => setLabel(e.target.value)} >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Coupon Quantity</label>
                  <input type="number" class="form-control" value={coupon_quantity} placeholder="Coupon Quantity" required onChange={(e) => setcouponQunatity(e.target.value)}/>
                </div>
              </div>
            </div>

            <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Valid from</label>
                  <input type="date" class="form-control" required value={moment(valid_from).format('YYYY-MM-DD')} onChange={(e) => setvalid_from(moment(e.target.value).format('YYYY/MM/DD'))} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Valid till</label>
                  <input type="date" class="form-control" required value={moment(valid_till).format('YYYY-MM-DD')} onChange={(e) => setvalid_till(moment(e.target.value).format('YYYY/MM/DD'))}/>
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                  <label className="required">On Product <a href="#0" data-toggle="tooltip" data-placement="top" href="/admin/category" tittle="Go to Categories page">
                    <i class="fa fa-fw fa-question-circle"></i></a></label>
                  <select name="course-category" id="course-category" value={on_course_id} class="form-control" required onChange={(e) => setonCourseId(e.target.value)} >
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
                  <label className="required">Description</label>
                  <textarea rows="5" class="form-control" value={description} height="100px" placeholder="Description" required onChange={(e) => setdescription(e.target.value)}></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label className="required">Terms and conditions</label>
                  <textarea rows="4" class="form-control" value={terms_and_conditions} height="100px" placeholder="Terms and conditions" required onChange={(e) => setterms_and_conditions(e.target.value)}></textarea>
                </div>
              </div>
            </div>
          
          </div>
          
          
          {/* /box_general*/}
          <div id="inline">
          <div id="inline">
          <div><p><button type="submit" id="save" class="btn_1 medium">Update</button></p></div>
          <div><p><a href="/admin/coupons" class="cancel-button">Cancel</a></p></div>
          </div>
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

export default UpdateCoupons;