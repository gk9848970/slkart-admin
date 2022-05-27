/**   author : RAGHAV RANJAN */

import './admin.css';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { listCategories } from '../../../actions/categoryActions';
import Loading from '../../Loading';
import MessageBox from '../../MessageBox';
import { Link, Route } from 'react-router-dom';
import { createProduct } from '../../../actions/productActions';
import axios from 'axios';
import {apiBaseUrl} from "../../../Config";

function CreateCourses(props) {

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;

  const [image_name, setImage_name] = useState('');
  const [image_url, setImage_url] = useState('');
  const [product_name, setProductName] = useState('');
  const [creator_name, setCreatorName] = useState('');
  const [category, set_Category] = useState('');
  const [status, set_Status] = useState('Unpublished');
  const [description, set_description] = useState('');
  const [you_will_learn, set_learning] = useState('');
  const [this_includes, set_Includes] = useState('');
  const [pre_requisites, set_Prerequisite] = useState('');
  const [set_currency, set_Currency] = useState('₹');
  const [price, set_Price] = useState('');
  const [sub_category, setsub_category ] = useState(0);
  const [subCategoryList, setSubCategoryList] = useState([])
  const [short_description, setshort_description] = useState('');
  const [discount, setDiscount] = useState(0);

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
      const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
      } = productCreate;

  useEffect(() => {
        if(successSave)
        props.history.push("/admin/courses")
    dispatch(listCategories())
}, [successSave]);


const uploadCoverImageHandler = (e) => {
  const file = e.target.files[0];
  document.getElementById("cover-image").src = URL.createObjectURL(file);
  const bodyFormData = new FormData();
  bodyFormData.append('image', file);
  setUploading(true);
  axios
    .post(`${apiBaseUrl}/api/admin/product/uploadcontent`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response.data.details);
      setImage_url(response.data.details);
      setUploading(false);
    })
    .catch((err) => {
      console.log(err);
      setUploading(false);
    });
};

  const submitDataHandler = (e) => {

    e.preventDefault();
    
    // console.log({image_url,product_name,creator_name,
    //   set_currency,category,price,
    //   you_will_learn,
    //   pre_requisites,status,this_includes,description,sub_category, summary})
      // setImage_name(`${product_name}.jpg`)
      // if(image_url&&product_name&&creator_name&&
      //   set_currency&&category&&price&&
      //   label&&you_will_learn&&
      //   pre_requisites&&status&&this_includes&&description&& product_type){
        if(sub_category){
      dispatch(createProduct({
        image_name:`${product_name}.jpg`,image_url,product_name,creator_name,
        set_currency,category,price,you_will_learn,
        pre_requisites,status,this_includes,description,sub_category,short_description, discount
      }  ))}else{
        dispatch(createProduct({
          image_name:`${product_name}.jpg`,image_url,product_name,creator_name,
          set_currency,category,price,you_will_learn,
          pre_requisites,status,this_includes,description,short_description, discount
        }  ))

    }
    // }else{
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
              <li class="breadcrumb-item active">Add Courses</li>
            </ol>
            {(loadingSave || loading )&& <Loading></Loading>}
		        {(error) && <MessageBox variant="danger">{error}</MessageBox>}
            {errorSave &&  <MessageBox variant="danger">{errorSave}</MessageBox>}

          {categories && <div>
          {categories == null ? <MessageBox variant="danger">
            First you need to add categories.
             <a href="/admin/category/createCategory">Add Categories</a>
             </MessageBox> :
             <form onSubmit={submitDataHandler}>
            <div>
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-file"></i>Basic info</h2>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label className="required">Course title</label>
                  <input type="text" class="form-control" required onChange={(e) => setProductName(e.target.value)} placeholder="Product title"/>
                </div>
              </div>
            </div>
            {/* /row*/}

            <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Select Currency</label>
                  <select name="currency" id="currency" required onChange={(e) => set_Currency(e.target.value)} class="form-control">
                    <option value="₹">₹ INR</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Course price</label>
                  <input type="number" class="form-control" required  onChange={(e) => set_Price(e.target.value)} placeholder="Course price"/>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Discount(%)</label>
                  <input type="number" class="form-control" max="100" required  onChange={(e) => setDiscount(e.target.value)} placeholder="discount%"/>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Category <a href="#0" data-toggle="tooltip" data-placement="top" href="/admin/category" tittle="Go to Categories page">
                    <i class="fa fa-fw fa-question-circle"></i></a></label>
                   
                  <select name="course-category" id="course-category"  required  onChange={(e) => {set_Category(e.target.value);(e.target.value && setSubCategoryList((categories.filter( x => x.parent_id == e.target.value ))) )}} class="form-control">
                  <option disabled selected value>--Select Category --</option>
                  {categories.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                  </select>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Sub Category <a href="#0" data-toggle="tooltip" data-placement="top" href="/admin/category" tittle="Go to Categories page">
                    <i class="fa fa-fw fa-question-circle"></i></a></label>
                   
                  <select name="course-category" id="course-category" onChange={(e)=>setsub_category(e.target.value)} required class="form-control">
                  <option disabled selected value>--Select Sub Category --</option>
                  {subCategoryList.map((subCategory) => (
                    <option value={subCategory.id}>{subCategory.name}</option>
                  ))}
                  <option value="0">NULL</option>
                  </select>
                  
                </div>
              </div>

            </div>
            {/* /row*/}
            <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Course status</label>
                  <select name="course-status" id="course-status"  required onChange={(e) => set_Status(e.target.value)} class="form-control">
                    <option value="Unpublished">Unpublished</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
              <div class="col-md-5">
                <div class="form-group">
                  <label className="required">Course Instructor</label>
                  <input type="text" class="form-control"  required  onChange={(e) => setCreatorName(e.target.value)} placeholder="Product Instructor / Creator"/>
                </div>
              </div>
            </div>
            {/* /row*/}
            <div class="row">
            <div class="col-md-11">
            <div class="form-group">
                  <label className="required">Course Cover picture</label><br></br>
                  {uploading && <div id="inline"><div class="loader"></div> &nbsp;Uploading ...</div>}
                  <input type="file" onChange={uploadCoverImageHandler}  />
                      <img id="cover-image" src="https://via.placeholder.com/150" alt="your image" />
                </div>
              </div>
            </div>
            {/* /row*/}
          </div>
          {/* /box_general*/}
          
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-file-text"></i>Description</h2>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label className="required">Course description</label>
                  <textarea rows="5" class="form-control"  required  onChange={(e) => set_description(e.target.value)} height="100px" placeholder="Description"></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <label className="required">Summary/Short Description<a data-toggle="tooltip" data-placement="top" title="Max-Characters: 90"><i class="fa fa-fw fa-question-circle"></i></a></label>
                  <textarea rows="3" class="form-control" maxLength="90"  required  onChange={(e) => setshort_description(e.target.value)} height="100px" placeholder="Summary / Short Description"></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>This Includes</label>
                  <textarea rows="5" class="form-control" height="100px"  onChange={(e) => set_Includes(e.target.value)} placeholder="This includes..."></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>What student will Learn</label>
                  <textarea rows="5" class="form-control" height="100px" onChange={(e) => set_learning(e.target.value)} placeholder="What student will Learn"></textarea>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-md-11">
                <div class="form-group">
                  <label>Pre-requisites</label>
                  <textarea rows="3" class="form-control" height="100px" onChange={(e) => set_Prerequisite(e.target.value)} placeholder="Pre-requisites"></textarea>
                </div>
              </div>
          </div>
          </div>
          <br></br>
          <p class="note">Note: You can upload Resources after you create this course</p>
          <br></br>
          {/* /box_general*/}
          
          {/* <div class="box_general padding_bottom">
            <div class="row">
              <div class="col-md-12">
                <h6>Item</h6>
                <table id="pricing-list-container" width="100%">
                  <tr class="pricing-list-item">
                    <td>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <input type="text" class="form-control" placeholder="Title"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <input type="text" class="form-control" placeholder="Content-Resource-name"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <input type="text" class="form-control"  placeholder="Content-URL"/>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <div class="form-group">
                            <a class="delete" href="#"><i class="fa fa-fw fa-remove"></i></a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
                <a href="#0" class="btn_1 gray add-pricing-list-item"><i class="fa fa-fw fa-plus-circle"></i>Add Item</a>
                </div>
            </div> */}
            {/* /row*/}
          {/* </div> */}
          {/* /box_general*/}
          <div id="inline">
          <div><p><button type="submit" id="save" class="btn_1 medium">Save</button></p></div>
          <div><p><a href="/admin/courses" class="cancel-button">Cancel</a></p></div>
          </div>
          </div>
          </form>}
          </div>}
           {/* /.container-fluid*/}
          </div>
           {/* /.container-wrapper*/}
          </div>
        </div>
    )
    
}

export default CreateCourses;