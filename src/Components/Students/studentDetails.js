import './student.css';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import MessageBox from '../MessageBox';
import { useParams } from 'react-router-dom';
import { detailsStudent } from '../../actions/studentActions';
import moment from 'moment';


function StudentDescription(props)
{
    const studentId  = props.match.params.id
	const studentDetails = useSelector((state) => state.studentDetails);
    const { student, loading, error } = studentDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        if(studentId)
            dispatch(detailsStudent(studentId));
    }, []);

    return (
        <div>
        {loading && <Loading></Loading>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {student && 
        <div className="content-wrapper">
            <div class="container content-fluid margin_60_35">
            <div class="row">
                <aside class="col-lg-3" id="sidebar">
                    <div class="profile" style={{minWidth:"fit-content"}}>
                        <figure className="user-avtar"><img src="/img/avtaar.png" alt="User" class="rounded-circle"/></figure>
                        
                        <ul>
                            <li>Name <span class="float-right">{student.user_first_name} {student.user_last_name}</span> </li>
                            <li className='p-4'><span>Email - </span><span >{student.user_email}</span></li>
                        </ul>
                    </div>
                </aside>
                {/*/aside */}

                <div class="col-lg-9">
                    <div class="box_teacher">
                        <div class="indent_title_in">
                            <i class="pe-7s-user"></i>
                            <h3>Profile</h3>
                            
                        </div>
                        <div class="wrapper_indent">
                            <ul>
                                <li><strong>College Id : </strong><span> &nbsp;&nbsp;&nbsp;{student.user_college_id}</span></li>
                                <li><strong>Gender : </strong><span> &nbsp;&nbsp;&nbsp;{student.user_gender}</span></li>
                                <li><strong>Date of Birth : </strong><span> &nbsp;&nbsp;&nbsp;{moment(student.user_dob).format('DD-MM-YYYY')}</span></li>
                            </ul>


                            <h5>Contact Details</h5>
                            <ul>
                                <li><strong>Contact No : </strong><span> &nbsp;&nbsp;&nbsp;{student.country_code}-{student.user_contact_no}</span></li>
                                <li>&nbsp;</li>
                                <li><h6>Address</h6></li>
                                <li><strong>City Name : </strong><span> &nbsp;&nbsp;&nbsp;{student.user_city_name}</span></li>
                                <li><strong>State : </strong><span> &nbsp;&nbsp;&nbsp;{student.user_state_name}</span></li>
                                <li><strong>Country : </strong><span> &nbsp;&nbsp;&nbsp;{student.user_country_name}</span></li>
                                <li><strong>PIN/ZIP Code : </strong><span> &nbsp;&nbsp;&nbsp;{student.zip_code}</span></li>
                                <li><strong>Street/Landmark : </strong><span> &nbsp;&nbsp;&nbsp;{student.user_address}</span></li>
                            </ul>


                            {/* End row*/}
                        </div>
                        {/*wrapper_indent */}
                        <hr class="styled_2"/>
                        <div class="indent_title_in">
                            <i class="pe-7s-display1"></i>
                            <h3>Purchased Products</h3>
                        </div>
                        <div class="wrapper_indent">
                            {student.products && <p>{student.user_first_name} {student.user_last_name} purchased {student.products.length} products</p>}
                                <div class="table-responsive">
                                    <table class="table table-striped add_bottom_30">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th>Course name</th>
                                                <th>Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {student.products && displayStudentProducts(student.products)}
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                        {/*wrapper_indent */}
                    </div>
                </div>
                {/* /col */}
            </div>
            {/* /row */}
        </div>
        </div>}
        </div>
        
    )
}

/************************Functions**************************** */
function displayStudentProducts(products)
{
    /*Displays the products owned by the student */

    //Function to return the appropriate number of rating stars
    const getRatingStars = (rating) => {
        const ratingStars = [];
        for(let i = 0; i < rating; ++i)
        {
            ratingStars.push(<i class="icon-star voted"></i>);
        }
        return ratingStars;
    };

    const studentProducts = [];

    products.forEach((product) => {
        studentProducts.push((
            <tr key={product.product_id}>
                <td>{product.category_name}</td>
                <td><a href="#">{product.product_name}</a></td>
                <td class="rating">
                    {getRatingStars(Math.max(1, Math.ceil(product.course_rating)))}
                </td>
            </tr>
        ))
    })

    return studentProducts;
}

		
export default StudentDescription;