import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { listCategories } from "../../../actions/categoryActions";
import { deleteProduct, listMyProducts, updateProduct } from "../../../actions/productActions";
import Loading from "../../Loading"
import { Link, Route } from 'react-router-dom';
import MessageBox from "../../MessageBox";
import PaginationComponent, { filterItemsBySearchKeyword } from "../../PaginationComponent";

const pageLimit = 2; //The max numbers of results to be displayed on a page

function Courses(params) {

  const [product_id, setProduct] = useState('')
  const [searchText, setSearchText] = useState('');
  const [filterVal, setfilterVal] = useState(null);
  const [currPage, setCurrPage] = useState(1);

  const myProductList = useSelector((state) => state.myProductList);
  const { products, loading, error } = myProductList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
	error: errorDelete,
  } = productDelete;

	const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading:categoriesLoading, error:categoriesError} = categoryList;

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

    useEffect(() => {
    dispatch(listMyProducts());
	dispatch(listCategories())

  }, [successDelete]);

  const [filteredProducts, productsToDisplay] = filterItemsBySearchKeyword(products, searchText, "product_name", {pageNumber:currPage, pageLimit});

    return(

	<div className="content-wrapper-nosideMenu">
    	<div className="container-fluid">
		
      {/* Breadcrumbs*/}

      <ol className="breadcrumb">
        <li className="breadcrumb-item">
		<Link to={{pathname:"/admin/dashboard"}}>Dashboard</Link>
        </li>
        <li className="breadcrumb-item active">Your Courses</li>
      </ol>
	{loading || categoriesLoading && <Loading></Loading>}
	{error && <MessageBox variant="danger">{error}</MessageBox>}
	{categoriesError && <MessageBox variant="danger">{categoriesError}</MessageBox>}
	{errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
	{(products && categories) && <div>
	<div id="inline">	
	  <div className="nav-item"><form className="form-inline my-2 my-lg-0 mr-lg-2">
            <div className="input-group " >
              <input className="form-control search-top" type="text" onChange={(e)=>{
				  if(currPage !== 1)
				  	setCurrPage(1);
				  setSearchText(e.target.value)}}  placeholder="Search within your Courses ..."/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form></div>

		  <div className="create-course bob-on-hover"><a  href="/admin/courses/create">
			  <i class="fa fa-fw fa-plus-circle add"></i>Add courses</a></div>
{/* 			
			  <div className="filter">
					<select name="orderby" onChange={(e)=>{e.preventDefault(); setfilterVal("JEE")}} class="form-control">
					<option value={null}>All</option>
						{categories.map((category)=>(
							<option value={category.id}>{category.name}</option>
						))}
					</select>
				</div> */}
		</div>
		  <br></br>


		<div className="box_general courses_box">
			<div className="header_box">
				<h2 className="d-inline-block">Your Courses</h2>
			</div>
			<div className="list_general">
				<ul>

					{productsToDisplay.map((product) => (
					<li>
						<figure><img src={product.image_url} alt=""/></figure>
						<h4>{product.product_name} &nbsp;
						{product.status === "Published" ? <i className="approved">{product.status}</i>:
						<i className="pending">{product.status}</i> }  </h4>
						<ul className="course_list">
							<li><strong>Price</strong>
							{product.discount ? <strike>₹{product.price}</strike>:<></>}
							&nbsp;&nbsp;₹{parseFloat(product.price - (product.discount*product.price)/100).toFixed(2)}</li>
							<li><strong>Category</strong> {(categories.find( x => x.id === product.category )) && (categories.find( x => x.id === product.category )).name}</li>
							<li><strong>Sub Category</strong> {(categories.find( x => x.id === product.sub_category )) ? (categories.find( x => x.id === product.sub_category )).name  : "NULL"}</li>
							<li><strong>Instructor</strong> {product.creator_name}</li>
						</ul>
						<h6>Course description</h6> 
						<p classNameName="description">{(product.description).substring(0,400)} ....<a href={"/admin/courses/"+product.id+"/details"}>View more</a></p>
						<ul className="buttons">
							
							&nbsp;<Link to={{ pathname: `/admin/courses/${product.id}/upload`, state: { product } }}><div className="btn_1 gray edit view hover-icons"><i className="fa fa-fw fa-upload "></i>+ Add Content</div></Link>
							<li><a href={"/admin/courses/"+product.id+"/details"}><div className="btn_1 gray approve  hover-icons"><i className="fa fa-fw fa-eye"></i><b> Details</b></div></a></li>
							<Link to={{ pathname: `/admin/courses/${product.id}/update`, state: { product } }}><div className="btn_1 gray edit view hover-icons"><i className="fa fa-fw fa-pencil "></i><b> Edit</b></div></Link> &nbsp;
							<li><a  if="color" data-toggle="modal" data-target="#exampleModal2"><div onClick={()=>setProduct(product.id)} className="btn_1 gray delete hover-icons"><i className="fa fa-fw fa-trash"></i><b> Delete</b></div></a></li>&nbsp;
							
						</ul>
					</li>))}
				</ul>
			</div>
		</div>
		{/* /box_general */}
		<PaginationComponent pageLimit={2} currPage={currPage} setCurrPage={setCurrPage} itemsCount={filteredProducts.length} />
		{/* /pagination*/}
	<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Course will be permanently deleted and can't be undone. Select "Yes, Delete" below if you are ready to delete this course.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <div class="btn btn-danger" id="close" onClick={()=>deleteHandler(product_id)} data-dismiss="modal">Yes, Delete</div>
          </div>
        </div>
      </div>
    </div>
	  </div>}
		</div>
		</div>
    )
    
}



export default Courses;