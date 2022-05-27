import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../Loading";
import MessageBox from "../MessageBox";
import { Link, Route } from 'react-router-dom';
import { detailsOrder } from "../../actions/orderAction";
import { listStudents } from "../../actions/studentActions";
import { listMyProducts, listProducts } from "../../actions/productActions";
import moment from 'moment';


function OrderDescription(props) {

    const orderId = props.match.params.id;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const myProductList = useSelector((state) => state.myProductList);
    const { products, loading:loadingProduct, error:errorProduct } = myProductList;

    const studentList = useSelector((state) => state.studentList);
    const {students, loading:loadingStudent, error:errorStudent } = studentList;

    const dispatch = useDispatch();
    useEffect(() => {			
        dispatch(detailsOrder(orderId));
        dispatch(listStudents())
        dispatch(listMyProducts());
      }, []);


      console.log(order)

    return(
        <div>
		
	{/* /header */}
	
		{/*/hero_in*/}
        <div className="content-wrapper ">
    	        <div className="container-fluid ">
        <div className="box_general order-details-container">
            <h5 className="color-black">Order Details</h5><br></br>
            
            {loading || loadingProduct || loadingStudent && <Loading></Loading>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {errorProduct && <MessageBox variant="danger">{errorProduct}</MessageBox>}
            {errorStudent && <MessageBox variant="danger">{errorStudent}</MessageBox>}
            {(order && students && products )&&
                <div>
                <div class="row">
                    <div class="col-md-6">
                        <ul className="course_list big-font">
                            <li><strong>Order Status</strong><i class="approved">{order.orderDetailList && order.orderDetailList[0].order_status}</i></li>
                            <li><strong>Order Id</strong>{orderId}</li>
                            {order.orderDetailList && (students.find( x => x.user_id === order.orderDetailList[0].user_id )) &&  <li><strong>User</strong> {(students.find( x => x.user_id === order.orderDetailList[0].user_id )).user_first_name} {((students.find( x => x.user_id === order.orderDetailList[0].user_id )).user_last_name)} </li>} 
                            <li><strong>Issued On</strong> {order.orderDetailList && (moment(order.orderDetailList[0].issued_on).local().format('DD-MM-YYYY   HH:mm:ss'))}</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul className="course_list big-font">
                            <li><strong>Mode of Payment</strong>{order.orderDetailList && order.orderDetailList[0].method_of_payment}</li>
                            <li><strong>Payment Id</strong>{order.orderDetailList && order.orderDetailList[0].payment_id}</li>
                            <li><strong>From Account</strong>{order.orderDetailList && order.orderDetailList[0].method_of_payment}</li>
                            <li><strong>Invoice Number</strong>{order.orderDetailList && order.orderDetailList[0].invoice_number}</li>
                            
                        </ul>
                    </div>
                </div>
                
             <br></br>
				<div class="row">
					<div class="col-md-8">
						<div className="box_general">
						<table class="table table-striped">
							<thead>
								<tr>
									<th>
										Item
									</th>
									<th>
										Initial Price
									</th>
									<th>
										Price <br></br>after discount
									</th>
									<th>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
                            {order.orderDetailList && order.orderDetailList.map((orderDes) => (

                                    <tr>
                                    
                                    <td>
                                        <div class="thumb_cart">
                                        {(products.find( x => x.id === orderDes.product_id )) && <img src={(products.find( x => x.id === orderDes.product_id )).image_url} alt="Image"/>}
                                            
                                        </div>
                                        {(products.find( x => x.id === orderDes.product_id )) && <span class="item_cart">{((products.find( x => x.id === orderDes.product_id )).product_name)}</span>}
                                    </td>
                                    <td>
                                        {orderDes.price_before_coupon}
                                    </td>
                                    <td>
                                        <strong>{orderDes.net_price}</strong>
                                    </td>
                                    <td class="options"  width="5%" text-align="center">
                                    {(products.find( x => x.id === orderDes.product_id )) && <a href={"/admin/courses/"+(products.find( x => x.id === orderDes.product_id )).id+"/details"}><i class="icon-eye"></i>View</a>}
                                    </td>
                                    </tr>
                                    
                                    ))}
								
								
							</tbody>
						</table>
						{/* /cart-options */}
					</div>
					</div>
					{/* /col */}
					
					<aside class="col-md-4" id="sidebar">
						<div class="box_detail">
							<div id="total_cart">
								Total
							</div>
							<div class="add_bottom_30">
                                <h6>Initial Total<span class="float-right">₹ {order.beforeAmount}</span></h6>
                                <h6>Discount<span class="float-right">- ₹ {(order.beforeAmount - order.amount).toFixed(2)}</span></h6>
                                <div className="final">
                                <h5 >Amount<span class="float-right">₹ {order.amount}</span></h5>
                                </div>
                                
                            </div>
						</div>
					</aside>
				</div>
                </div>
                    }
				{/* /row */}
			</div>
			{/* /container */}
		{/* /bg_color_1 */}
	{/*/main*/}
	
	{/*/footer*/}
    </div>
    </div>

	</div>
    )
    
}

export default OrderDescription;