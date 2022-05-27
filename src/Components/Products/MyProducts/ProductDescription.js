import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { listCategories } from "../../../actions/categoryActions";
import { allotCourse, deleteContent, deleteContentSuccesschange, deleteProduct, detailsProduct, listMyProducts, sectionList, updateProduct } from "../../../actions/productActions";
import Loading from "../../Loading"
import { Link, Route } from 'react-router-dom';
import MessageBox from "../../MessageBox";
import Select from 'react-select';
import { listEnrolledStudents, listStudentsForEnroll } from "../../../actions/studentActions";
import Rating from "../../../Rating";


function ProductDescription(props) {

	const productId = props.match.params.id;

	const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;

	const studentListForEnroll = useSelector((state) => state.studentListForEnroll);
    const {studentData, loading:studentLoading, error:studentError } = studentListForEnroll;

	const enrolledStudentList = useSelector((state) => state.enrolledStudentList);
    const {studentEnrolled, loading:enrolledLoading, error:enrolledError } = enrolledStudentList;

	const categoryList = useSelector((state) => state.categoryList);
  	const { categories, loading:categoriesLoading, error:categoriesError} = categoryList;

	  const contentDelete = useSelector((state) => state.contentDelete);
		const {
			loading:loadingDelete,
			success: successDelete,
			error: errorDelete,
		} = contentDelete;

	const allotCourses = useSelector((state) => state.allotCourses);
    const { success:allotSuccess, loading:allotLoading, error:allotError } = allotCourses;

	const [contentList, setcontentList] = useState(null);
	const[ready, setready]  = useState(false);
	const [contentId, setContentId] = useState(0);
	const [selectedValue, setSelectedValue] = useState([]);

	const dispatch = useDispatch();
	
	useEffect(() => {			
		if(successDelete)
			setready(false);
		dispatch(listCategories())
		dispatch(listStudentsForEnroll());
        dispatch(detailsProduct(productId));
		dispatch(listEnrolledStudents(productId));
      }, [successDelete, allotSuccess]);

	  const deleteHandler = (contentId)=>{
		  dispatch(deleteContent(productId, contentId));

	  }
		  

	  const handleChange = (e) => {
		
		let selected = [];
		if(e.find( x => x.value == 0 ))
		{
			selected = (studentData.filter(ar => !studentEnrolled.find(rm => (rm.value === ar.value) ))).map(a => a.value);
			selected.shift()
		}
		else
			 selected = (Array.isArray(e) ? e.map(x => x.value) : []);
		console.log(selected)
		setSelectedValue(selected);
	  }
	  
	  const enrollHandler= (e) => {

			dispatch(allotCourse(
				{
					course_id:productId,
					students:selectedValue
				}
			))

	  }

	  function sortArray(objectArray,property){

		const unordered_list =  objectArray.reduce((acc, obj) => {
			const key = obj[property];
			if (!acc[key]) {
			   acc[key] = [];
			}
			// Add object to list for given key's value
			acc[key].push(obj);
			return acc;
		 }, {});
		 console.log(Object.entries(unordered_list).sort((a,b) => a[1]-b[1]));
		 setcontentList(Object.entries(unordered_list).sort((a,b) => a[1]-b[1]))
		 setready(true);
		//  return Object.entries(unordered_list).sort((a,b) => a[1]-b[1])
	  }
    
    return(
        <div className="content-wrapper-nosideMenu">
    		<div className="container-fluid">
			{(loading || categoriesLoading || loadingDelete || studentLoading || enrolledLoading) && <Loading></Loading>}
			{error && <MessageBox variant="danger">{error}</MessageBox>}
			{categoriesError && <MessageBox variant="danger">{categoriesError}</MessageBox>}
			{errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
			{studentError && <MessageBox variant="danger">{studentError}</MessageBox>}
			{enrolledError && <MessageBox variant="danger">{enrolledError}</MessageBox>}
			{product && categories && studentData && studentEnrolled &&
            <div class="description">
			<nav class="secondary_nav sticky_horizontal color">
				<div class="container">
					<ul class="clearfix">
						<li><a href="#description" class="active">Description</a></li>
						<li><a href="#lessons">Content</a></li>
						<li><a href="#enroll">Enroll</a></li>
					</ul>
				</div>
			</nav>
			<div class="container margin_60_35">
				<div class="row flex-column-reverse flex-lg-row">
					<div class="col-lg-8">
						<h1></h1>
						
						<section id="description">
							<h4>Overview</h4>
							<p>{product.short_description}</p>
							<h2>Description</h2>
							<p>{product.description}</p>
							<hr></hr>
							<h5>Prerequisites</h5>
							<ul>
								<li>
									
									<strong><p><i className="fa fw fa-angle-double-right"></i>&nbsp; {product.pre_requisites}</p></strong>
								</li>
								
							</ul>
								<hr></hr>
							<h5>What will you learn</h5>
							<ul>
								<li>
									
									<strong><p><i className="fa fw fa-check-circle-o"></i>&nbsp; {product.you_will_learn}</p></strong>
								</li>
								
							</ul>
								<hr></hr>
							<h5>This Includes</h5>
							<ul >
								<li>
									
									<strong><p><i className="fa fw fa-paper-plane"></i>&nbsp; {product.this_includes}</p></strong>
									
								</li>
								
							</ul>

							{/* /row */}
						</section>
						{/* /section */}
						
						<section id="lessons">
							<div class="intro_title">
							{product.content && !ready && sortArray(product.content,"section_name")}
								<h2>Content</h2>
								
								<ul>
									<li>{contentList  && contentList.length} Sections</li>
									<li>{product.content && product.content.length} Contents</li>
								</ul>
							</div>
							<div id="accordion_lessons" role="tablist" class="add_bottom_45">

							
								{contentList  && contentList.map((section) => (	
									<div>
								<div class="card">
									<div class="card-header" role="tab" id={"heading"+section[0].replace(/[^A-Z0-9]/ig, "_")}>
										<h5 class="mb-0">
											<a data-toggle="collapse" href={"#collapse"+section[0].replace(/[^A-Z0-9]/ig, "_")} aria-expanded="true" aria-controls={"collapse"+section[0].replace(/[^A-Z0-9]/ig, "_")}><i class="indicator ti-minus"></i> {section[0]}</a>
										</h5>
									</div>
									

									<div id={"collapse"+section[0].replace(/[^A-Z0-9]/ig, "_")} class="collapse show" role="tabpanel" aria-labelledby={"heading"+section[0].replace(/[^A-Z0-9]/ig, "_")} data-parent="#accordion_lessons">
										<div class="card-body">
											<div class="list_lessons">
												<ul>
													{section[1].map((resource)=>(
														<li><a target="_blank" href={resource.resource_url}>
															{(resource.resource_type === "video" || resource.resource_type === "youtube")  ? <i className="fa fa-fw fa-play-circle"></i>:
															 resource.resource_type === "pdf" ? <i className="fa fa-fw fa-file-pdf-o"></i> :
															 <i className="fa fa-fw fa fa-file-o"></i> 
															}
															 &nbsp;{resource.resource_name}</a>
															 <a  if="color" data-toggle="modal" data-target="#exampleModal9"><span className="deleteContent" onClick={()=>setContentId(resource.id)}><i className="fa fa-fw fa-trash"></i></span></a>
															 {resource.is_paid ?<span className="paid"> Paid&nbsp;</span>:<span className="free"> Free&nbsp;</span>}</li>
													))}
												</ul>
											</div> 
										</div>
									</div>
								</div>


								</div>
									))
									}

								{/* /card */}

							</div>
							{/* /accordion */}
							
							<Link to={{ pathname: `/admin/courses/${product.id}/upload`, state: { product } }}><div className="btn_1 gray edit view"><i className="fa fa-fw fa-upload "></i> + Add Content</div></Link>
						</section>
						{/* /section */}

					{/*********************************  ENROLLED STUDENT ******************************* */}

						<section id="enroll">
							<h2>Enroll Students</h2>
							<br></br><br></br>
							<div class="row">
								<div class="col-md-12">
								<h5>Select Students to Enroll</h5>
								<Select
									className="enroll-dropdown"
									placeholder="Select Students"
									options={studentData.filter(ar => !studentEnrolled.find(rm => (rm.value === ar.value) ))} // set list of the data
									onChange={handleChange} // assign onChange function
									isMulti
									isClearable
								/>
								<br></br>
								<button className="btn btn-primary enroll-button" onClick={enrollHandler}>Submit</button>
								</div>
							</div>
							<br></br>
							<hr></hr>
							<br></br>
							<div class="row">
								<h5><i className="fa fa-fw fa-arrow-circle-down bob-on-hover"></i> Enrolled Student List</h5>
								<br></br>
								<br></br><br></br>


							{studentEnrolled && 
								<div class="col-md-12" id="enroll-table">
									<div className="box_general recent">
									<h5><i className="fa fa-fw fa-users"></i> Enrolled Students</h5>
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
										</tr>
									</thead>
									<tbody>

									{(studentEnrolled).map((student) => (
										<tr>
										<td></td>
										<td>{student.label}</td>
										<td>{student.email}</td>
										</tr>
									))}

										</tbody>
										</table>
										</div>
									</div>
									}


							</div>

						</section>
						<hr></hr>
						<section id="reviews">
							<h2>Reviews</h2><br></br>
							<div class="reviews-container">
								<div class="row">
									<div class="col-lg-3">
										<div id="review_summary">
											<strong>{Number.parseFloat(product.course_rating).toFixed(1)}</strong>
											<Rating
												value={product.course_rating}
												text=""
											/>
											<small>Based on {product.tot_ratings} reviews</small>
										</div>
									</div>
								</div>
								{/* /row */}
							</div>

							<hr/>
						</section>
						
						{/* /section */}
					</div>
					{/* /col */}
					
					<aside class="col-lg-4" id="sidebar">
						<div class="box_detail">
							<div className="basic-img">
								<a href="#" ><img src={product.image_url} alt={product.image_name} class="img-fluid"/></a>
							</div>
							<div class="price">
								{product.discount ?
								 <div id="inline">
									 <div><h6><strike>{product.set_currency}{product.price}</strike></h6></div> &nbsp;
									 <div><h6>{product.discount}% off</h6></div>
									 </div>:<></>}
								{product.set_currency}{parseFloat(product.price - (product.discount*product.price)/100).toFixed(2)}
							</div>
							<div id="list_feat">
								<h3>Basic Info <Link to={{ pathname: `/admin/courses/${product.id}/update`, state: { product } }}><div className="btn_1 gray edit view hover-icons"><i className="fa fa-fw fa-pencil "><b> Edit</b></i></div></Link></h3>
								<ul className="course_list">
							<li><strong>Status</strong> {product.status === "Published" ? <i className="approved">{product.status}</i>:
							<i className="pending">{product.status}</i> } </li>
							<li><strong>Category</strong> {(categories.find( x => x.id === product.category )) && (categories.find( x => x.id === product.category )).name}</li>
							<li><strong>Sub Category</strong> {(categories.find( x => x.id === product.sub_category )) ? (categories.find( x => x.id === product.sub_category )).name  : "NULL"}</li>
							<li><strong>Instructor</strong> {product.creator_name}</li>
							<li><strong>Total Users</strong> {studentEnrolled.length}</li>
							</ul>
							</div>
						</div>
						
					</aside>
					
				</div>
				{/* /row */}
			</div>
			
			{/* /container */}

			<div class="modal fade" id="exampleModal9" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
		  {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "Yes, Delete" below if you are ready to delete this Content.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <div class="btn btn-danger" id="close" onClick={()=>deleteHandler(contentId)} data-dismiss="modal">Yes, Delete</div>
          </div>
        </div>
      </div>
    </div>
		</div>}
		</div>
		{/* /bg_color_1 */}
        </div>
    )
}


export default ProductDescription;