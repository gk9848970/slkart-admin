import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import Loading from "../Loading";
import './category.css';
import MessageBox from "../MessageBox";
import { createCategory, deleteCategory, listCategories } from "../../actions/categoryActions";
import PaginationComponent, { filterItemsBySearchKeyword } from "../PaginationComponent";

const pageLimit = 2; //The max numbers of results to be displayed on a page

function AllCategories(params) {

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;

  const [categoryId,setcategory] = useState('')
  const [name, setName] = useState('')
  const [parent_id, setParentId] = useState(0)
  const [searchText, setSearchText] = useState("");
  const [currPage, setCurrPage] = useState(1);

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDel} = categoryDelete;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success:successCreate,loading:loadingCreate, error:errorCreate } = categoryCreate;

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  
  const submitDataHandler = (e) => {
    if(name.length)
    {
      if(parent_id == 0)
          dispatch(createCategory({name}))
      else
        dispatch(createCategory({name,parent_id}))
    }
    else
      alert("Enter category name");
  }

    useEffect(() => {
	dispatch(listCategories())

  }, [successDel, successCreate]);

  const [filteredCategories, categoriesToDisplay] = filterItemsBySearchKeyword(categories, searchText, "name", {pageNumber:currPage, pageLimit});

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
	{(loading || loadingDelete || loadingCreate) && <Loading></Loading>}
	{error && <MessageBox variant="danger">{error}</MessageBox>}
  {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
	{categories && <div>
	<div id="inline">	
	  <div className="nav-item"><form className="form-inline my-2 my-lg-0 mr-lg-2">
            <div className="input-group " >
              <input className="form-control search-top " type="text" placeholder="Search within categories..." onChange={(e) => setSearchText(e.target.value)}/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form></div>

		  <div className="create-category"><a  if="color" data-toggle="modal" data-target="#exampleModal5">
      <i class="fa fa-fw fa-plus-circle add"></i>Create Category</a></div>
		</div>
		  <br></br>
		
    {categoriesToDisplay.map((category) => {
        return (<CategoryCard category={category} categories={categories} setcategory={setcategory} />);
    })}  

		{/* /box_general */}
		<PaginationComponent pageLimit={pageLimit} currPage={currPage} setCurrPage={setCurrPage} itemsCount={filteredCategories.length}/>
		{/* /pagination*/}
	<div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Category will be permanently deleted and can't be undone. Select "Yes, Delete" below if you are ready to delete this category.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <div class="btn btn-danger" id="close"data-dismiss="modal" onClick={()=>deleteHandler(categoryId)}>Yes, Delete</div>
          </div>
        </div>
      </div>
    </div>
      
    {/* CREATE MODAL */}
    <div class="modal fade" id="exampleModal5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
          {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            <h5 class="modal-title" id="exampleModalLabel">Create Category</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form>
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-file"></i>Basic info</h2>
            </div>
            <div class="row">
              <div class="col-md-10">
                <div class="form-group">
                  <label className="required">Category Name</label>
                  <input type="text" class="form-control" required onChange={(e) => setName(e.target.value)} placeholder="Category Name"/>
                </div>
              </div>
              <div class="col-md-10">
                <div class="form-group">
                <label className="required">Parent Category <a href="#0" data-toggle="tooltip" data-placement="top" href="/admin/category" tittle="Go to Categories page">
                    <i class="fa fa-fw fa-question-circle"></i></a></label>
                   
                  <select name="course-category" id="course-category" required onChange={(e) => setParentId(e.target.value)} class="form-control">
                  <option disabled selected value="0">---- Select Parent Category ----</option>
                  {categories.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                  <option value="0">NULL</option>
                  </select>
                </div>
              </div>
            </div>
            </div>
          <div class="modal-footer">
            
            <div class="btn btn-success" id="close" onClick={()=>submitDataHandler()} data-dismiss="modal">Save</div>
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button> 
          </div>
          </form>
        </div>
      </div>
    </div>

	  </div>}
		</div>
		</div>
    )
    
}

function CategoryCard(props)
{
  const category = props.category;
  const categories = props.categories;
  const setcategory = props.setcategory;

  return (
    <div className="box_general category-list" key={category.id}>
      <div className="list_general">
      <div class="row category-row">
      <div class="col-md-3">
        <p>Category Name</p>
        <h4>{category.name}</h4>
      </div>
      <div class="col-md-1">
        <p></p>
        <h4></h4>
      </div>
      <div class="col-md-3">
        <p>Parent Category Name</p>
        {(categories.find( x => x.id === category.parent_id )) ?  <h6>{(categories.find( x => x.id === category.parent_id )).name}&nbsp; </h6>  : <h6>NULL</h6>} 
      </div>  
      <div class="col-md-3 float-right">
        <p></p>
        <a  if="color" data-toggle="modal" data-target="#exampleModal4"><div onClick={()=>setcategory(category.id)} className="btn_1 gray delete"><i className="fa fa-fw fa-trash"></i>Delete</div></a>&nbsp;		
      </div>
    
    </div>
    </div>
<br></br>
</div>
  );
}

/*****************************Functions*********************/
function getCategoryCards(categories, setCategories, searchText)
{
  /*Returns the category cards to be displayed */

  const categoryCards = [];

  console.log(searchText.toLowerCase())
  categories.forEach((category) => {
    if(searchText.length === 0 || category.name.toLowerCase().includes(searchText.toLowerCase()))
      categoryCards.push(<CategoryCard category={category} categories={categories} setcategory={setCategories} />);
  })

  return categoryCards;
}


export default AllCategories;