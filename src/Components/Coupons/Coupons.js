import React, { useState, useEffect } from "react";
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { deletecoupon, detailsCoupon, listCoupons, updateCoupon, updateCouponSuccesschange } from "../../actions/couponActions";
import './coupon.css'
import Loading from "../Loading";
import MessageBox from "../MessageBox";
import { Link, Route } from 'react-router-dom';
import PaginationComponent, { filterItemsBySearchKeyword } from "../PaginationComponent";

const pageLimit = 2; //The max numbers of results to be displayed on a page

function Coupons(params) {

  const [couponId, setCouponId] = useState('')
  const [filterStatus, setFilterStatus] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  
  const couponList = useSelector((state) => state.couponList);
  const { coupons, loading, error } = couponList;

  const couponDelete = useSelector((state) => state.couponDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDel} = couponDelete;

  const couponDetails = useSelector((state) => state.couponDetails);
  const { coupon:couponDetail, loading:UpdateLogin, error:UpdateError } = couponDetails;

  const couponUpdate = useSelector((state) => state.couponUpdate);
  const { success:updateSuccess,loading:updateLoading, error:updateError } = couponUpdate;

  const dispatch = useDispatch()
  
  const updateStatusHandler = (e,coupon, couponStatus) =>{
    e.preventDefault();
      const data = {
      coupon_code : coupon.coupon_code,
      coupon_quantity: coupon.coupon_quantity,
      description: coupon.description,
      discount_percent: coupon.discount_percent,
      label: couponStatus,
      on_course_id: coupon.on_course_id,
      terms_and_conditions: coupon.terms_and_conditions,
      valid_from: moment(coupon.valid_from).format('YYYY/MM/DD'),
      valid_till: moment(coupon.valid_till).format('YYYY/MM/DD'),
    }
    dispatch(updateCoupon(data,coupon.id));


  }

if(successDel)
  console.log("deleted")


      const deleteCouponHandler = (id) => {
      dispatch(deletecoupon(id))
    };

    useEffect(() => {
      if(updateSuccess)  
          dispatch(updateCouponSuccesschange())
        dispatch(listCoupons())
    }, [successDel,updateSuccess]);

    const filteredCoupons = getCoupons(coupons, filterStatus, {setCouponId, updateStatusHandler});
    const [_, couponsToDisplay] = filterItemsBySearchKeyword(filteredCoupons, "", "", {pageNumber:currPage, pageLimit});

    return(
        <div>
	<div class="content-wrapper-nosideMenu">
    	<div class="container-fluid">
      {/* Breadcrumbs*/}
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <Link to={{pathname:"/admin/dashboard"}}>Dashboard</Link>
        </li>
        <li class="breadcrumb-item active">Coupons</li>
      </ol>

      {(loading || loadingDelete || updateLoading) && <Loading></Loading>}
      {(error) && <MessageBox variant="danger">{error}</MessageBox>}
      {(UpdateError ) && <MessageBox variant="danger">{UpdateError}</MessageBox>}
      {(errorDelete ) && <MessageBox variant="danger">{errorDelete}</MessageBox>}


    { <div>
		<div class="box_general">
			<div class="header_box" id="inline">
      <div><h2 class="d-inline-block">Coupons</h2></div>
        <div className="create-coupon"><Link to={{pathname:"/admin/coupons/createcoupons"}}>
			  <i class="fa fa-fw fa-plus-circle add2"></i>Create Coupon</Link>
		    </div>
				<div class="filter">
					<select name="orderby" class="selectbox" onChange={(e) => {
            if(currPage !== 1)
              setCurrPage(1);
            setFilterStatus(parseInt(e.target.value))
          }}>
						<option value="0">Any status</option>
						<option value="1">Active</option>
						<option value="2">Pending</option>
					</select>
				</div>
			</div>
      </div>

      


      <div class="panel-group" id="accordion">

      {couponsToDisplay.map((coupon) => {
        return (<CouponCard coupon={coupon} setCouponId={setCouponId} updateStatusHandler={updateStatusHandler}/>);
      })};

		</div>
      <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Coupon will be permanently deleted and can't be undone. Select "Yes, Delete" below if you are ready to delete this coupon.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <div class="btn btn-danger" id="close" onClick={()=>deleteCouponHandler(couponId)} data-dismiss="modal">Yes, Delete</div>
          </div>
        </div>
      </div>
    </div>
      <PaginationComponent pageLimit={pageLimit} currPage={currPage} setCurrPage={setCurrPage} itemsCount={filteredCoupons.length}/>
    </div>}
		{/* /pagination*/}
	  </div>
	  {/* /container-fluid*/}
   	</div>
    {/* /container-wrapper*/}
		</div>
    )
    
}

function CouponCard(props)
{
  const coupon = props.coupon;
  const setCouponId = props.setCouponId;
  const updateStatusHandler = props.updateStatusHandler;

  return (
    <div class="box_general coupon-list" key={coupon.id}>
            <div class="panel panel-default">
              <div class="panel-heading accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" data-target={"#"+coupon.id}>
            <div id="inline">
            <div><i className="fa fa-fw fa-tag coupon-tag"></i></div>
            <div><h4>{coupon.coupon_code} &nbsp; <i className={coupon.label === "active" ? "approved" : "pending"}>
              
            <select name="status" className="coupon-status" value={coupon.label} onChange={(e)=>updateStatusHandler(e,coupon, e.target.value)}>
                <option value="active" className="active-coupon">Active</option>
                <option value="inactive" className="inactive-coupon">Inactive</option>
              </select>
              
              </i></h4></div>

              <label></label>

            
            <a  if="color" data-toggle="modal" data-target="#exampleModal3"><div className="btn_1 gray delete view hover-icons" onClick={()=>setCouponId(coupon.id)}><i className="fa fa-fw fa-trash "></i><b> Delete</b></div></a>
            <Link to={{ pathname: `/admin/coupons/${coupon.id}/updatecoupon`, state: { coupon } }}><div className="btn_1 gray edit view hover-icons"><i className="fa fa-fw fa-pencil "></i><b> Edit</b></div></Link>
            <div className="btn_1 gray approve view hover-icons"><i className="fa fa-fw fa-eye "></i><b> View</b></div>
            
            </div>
						<ul class="course_list">
							<li><strong>Discount</strong><i className="fa fa-fw fa-bolt"></i><strong>{coupon.discount_percent}%</strong></li>
							<li><strong>Valid from</strong> {(moment(coupon.valid_from).format('DD-MM-YYYY'))}</li>
							<li><strong>Valid Till</strong> {(moment(coupon.valid_till).format('DD-MM-YYYY'))}</li>
							<li><strong>Course Name</strong> {coupon.product_name}</li>
						</ul>
              </div>
              <div id={coupon.id} class="panel-collapse collapse">
                <div class="panel-body">
                  <h6 className="detail-head">Details</h6>
                <ul class="coupon-details">
                <li><strong>Coupon Quantity</strong> {coupon.coupon_quantity}</li>
                  <li><strong>Total Coupon Used</strong> {coupon.tot_coupons_used}</li>
                  <li><strong>Created At</strong> {(moment(coupon.created_at).format('DD-MM-YYYY'))}</li>
                  <li><strong>T & C</strong> {coupon.terms_and_conditions}</li>
                </ul>
                </div>
              </div>
            </div>

          </div>
  )
}

/*****************************Functions****************************** */
function getCoupons(couponsList, filterStatus)
{
  /*Returns the cupons to be displayed according to the filter status */

  const FILTER_STATUSES = {any : 0, active: 1, pending: 2}; 

  const coupons = [];
  if (couponsList) {
    
  
  couponsList.forEach((coupon) => {
    switch(filterStatus)
    {
      case FILTER_STATUSES.any : coupons.push(coupon); 
      break;
      case FILTER_STATUSES.active : if(coupon.label === "active") coupons.push(coupon); break;
      case FILTER_STATUSES.pending : if(coupon.label !== "active") coupons.push(coupon); break;
    }
  });
}

  return coupons;
}

export default Coupons;