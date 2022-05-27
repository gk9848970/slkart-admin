import "./admin.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../Loading";
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import MessageBox from "../../MessageBox";
import { listCategories } from "../../../actions/categoryActions";
import { sectionList, uploadContent, uploadContentSuccesschange } from "../../../actions/productActions";
import axios from 'axios';
import {apiBaseUrl} from "../../../Config";


function UploadContents(props) {

    const {product} = props.location.state;

    const categoryList = useSelector((state) => state.categoryList);
    const { categories, loading, error } = categoryList;

    const sectionsList = useSelector((state) => state.sectionsList);
  	const { sections, loading:sectionLoading, error:sectionError} = sectionsList;

    const contentUpload = useSelector((state) => state.contentUpload);
      const {
        loading: loadingUpload,
        success: successUpload,
        error: errorUpload,
      } = contentUpload;

      const [resource_type , setresource_type] =  useState('video');
      const [section_name, setsection_name] = useState('');
      const [image_url, setimage_url] = useState('');
      const [resource_name, setresource_name] = useState('');
      const [resource_url, setresource_url]  = useState('');
      const [is_paid,setis_paid] = useState(0);
      const [uploading, setUploading] = useState(false);
      const [uploading2, setUploading2] = useState(false);
  
//   const uploadContent = useSelector((state) => state.uploadContent);
//   const { success,loading:uploadLoading, error:uploadError } = uploadContent;

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
      setimage_url(response.data.details);
      setUploading(false);
    })
    .catch((err) => {
      console.log(err);
      setUploading(false);
    });
};


const uploadResourceHandler = (e) => {
  const file = e.target.files[0]; 
  const bodyFormData = new FormData();
  bodyFormData.append('image', file);
  setUploading2(true);
  axios
    .post(`${apiBaseUrl}/api/admin/product/uploadcontent`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response.data.details);
      setresource_url(response.data.details);
      setUploading2(false);
    })
    .catch((err) => {
      console.log(err);
      setUploading2(false);
    });
};






  const dispatch = useDispatch();

  useEffect(() => {

    if(successUpload){
            dispatch(uploadContentSuccesschange())
            props.history.push('/admin/courses/' + product.id + "/details" )}
      
    dispatch(sectionList(product.id));
    dispatch(listCategories())
    

}, [successUpload]);

    const submitDataHandler = (e) => {

      e.preventDefault();

      console.log(
        {resource_name , resource_type , resource_url ,
              section_name , image_url, is_paid}
      )
        dispatch(uploadContent(
            {resource_name , resource_type , resource_url ,
            section_name , image_url, is_paid},product.id
        ))

     
      }
    // dispatch(updateProduct(
    //   {
    //     image_name,image_url,product_name,creator_name,
    //     set_currency,category,price,course_rating,
    //     tot_ratings,tot_students,label,you_will_learn,
    //     pre_requisites,status,this_includes,description
    //   },id
    // ))

    


    return(
        <div>
        <div class="content-wrapper">
          <div class="container-fluid">
            {/* Breadcrumbs*/}
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
              <Link to={{pathname:"/admin/dashboard"}}>Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Upload Content</li>
            </ol>
            {(loading || loadingUpload || sectionLoading) && <Loading></Loading>}
		        {(errorUpload) && <MessageBox variant="danger">{errorUpload}</MessageBox>}
            {(sectionError) && <MessageBox variant="danger">{sectionError}</MessageBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}

          {(product && categories && sections) && <div>
            <form onSubmit={submitDataHandler}>
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-file"></i>Basic info</h2>
            </div>

            <div className="list_general">
				<ul>
					<li>
						<figure><img src={product.image_url} alt=""/></figure>
						<h4>{product.product_name} &nbsp;
						{product.status == "Published" ? <i className="approved">{product.status}</i>:
						<i className="pending">{product.status}</i> } </h4>
						<ul className="course_list">
							<li><strong>Category</strong> {(categories.find( x => x.id === product.category )) && (categories.find( x => x.id === product.category )).name}</li>
							<li><strong>Sub Category</strong> {(categories.find( x => x.id === product.sub_category )) ? (categories.find( x => x.id === product.sub_category )).name  : "NULL"}</li>
							<li><strong>Creator</strong> {product.creator_name}</li>
						</ul>
						<h6>Description</h6> 
						<p classNameName="description">{(product.description).substring(0,400)} ....<a href="/dashboard">View more</a></p>
					</li>
				</ul>
            </div>


            
          {/* /box_general*/}
          </div>
          
          <div class="box_general padding_bottom">
              <div className="upload-head">
              <h3 ><i className="fa fa-fw fa-upload"></i>Upload Content</h3>
              </div>
              <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label className="required">Resource Name</label>
                  <input type="text" class="form-control" onChange={(e) => setresource_name(e.target.value)}  required  placeholder="Resource Name"/>
                </div>
              </div>
             

              </div>
              <div className="row">
              <div class="col-md-5">
                <div class="form-group">
                  <label className="required">Section Name (Select from previous)</label>
                  <select  class="form-control" onChange={(e) => setsection_name(e.target.value)}>
                    <option selected disabled>----Select Section----</option>
                    {sections && sections.map((section) => (
                    <option value={section}>{section}</option>
                  ))}
                  </select>
                </div>
              </div>
                  &nbsp;OR&nbsp;
              <div class="col-md-5">
              <div class="form-group">
                  <label className="required">Section Name (Add a new section)</label>
                  <input type="text" class="form-control" onChange={(e) => setsection_name(e.target.value)} placeholder="Add new Section Name"/>
                </div>
              </div>

              {/* <div class="col-md-5">
                <div class="form-group">
                  <label className="required">Cover Image URL</label>
                  <input type="url" class="form-control" required onChange={(e) => setimage_url(e.target.value)} placeholder="Cover Image URL"/>
                </div>
              </div> */}


            </div>

            <div class="row">

            <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Free or Paid</label>
                  <select name="type" id="type" required onChange={(e) => setis_paid(e.target.value)}  class="form-control">
                    <option disabled selected>-----select resource visibilty-----</option>
                    <option value="0">Free</option>
                    <option value="1">Paid</option>
                  </select>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Content Type</label>
                  <select name="type" id="type" required onChange={(e) => setresource_type(e.target.value)}  class="form-control">
                    <option value="video">Video</option>
                    <option value="youtube">YouTube Video</option>
                    <option value="pdf">PDF</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

            </div>
                <br></br>

                <p class="note">Note: You can upload Only one Resource file/URL at a time</p>
            <div className="row">
            <div class="col-md-6">
                <div class="form-group">
                  <label className="required">Content Cover picture</label><br></br>
                  {uploading && <div id="inline"><div class="loader"></div> &nbsp;Uploading ...</div>}
                  <input type="file" onChange={uploadCoverImageHandler}  />
                      <img id="cover-image" src="https://via.placeholder.com/150" alt="your image" />
                </div>
              </div>

              <div class="col-md-6">

                { (resource_type == "pdf" || resource_type == "other") &&
                <div class="form-group">
                  <label>Resource (For PDF and Other)</label>
                  <br></br><br></br><br></br>
                  <input type="file" onChange={uploadResourceHandler}  />
                  {uploading2 && <div id="inline"><div class="loader"></div> &nbsp;Uploading ...</div>}
                </div>}

                { (resource_type == "video") &&
                <div class="form-group">
                  <label>Resource (Video)</label>
                  <br></br><br></br><br></br>
                  <input type="file" onChange={uploadResourceHandler}  />
                  {uploading2 && <div id="inline"><div class="loader"></div> &nbsp;Uploading ...</div>}
                </div>}

              </div>
            </div>
            


            <div className="row">
            
            </div>
            {resource_type == "youtube" &&
            <div className="row">
              <div class="col-md-10">
                <div class="form-group">
                  <label >Resource URL (if Video)</label>
                  <input type="url" class="form-control" onChange={(e) => setresource_url(e.target.value)} placeholder="resource URL"/>
                </div>
              </div>
            </div>}

            <div id="inline">
              <div><p><button type="submit" id="save" class="btn_1 medium">Upload</button></p></div>
              <div><p><a href={'/admin/courses/' + product.id+'/details'} class="cancel-button">Cancel</a></p></div>
            </div>
            
            </div>
          </form>
          </div>}
           {/* /.container-fluid*/}
          </div>
           {/* /.container-wrapper*/}
          </div>
        </div>
    )
    
}

export default UploadContents;