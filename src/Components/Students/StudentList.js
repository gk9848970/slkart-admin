import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudent, listStudents } from "../../actions/studentActions";
import './student.css';
import Loading from "../Loading";
import MessageBox from "../MessageBox";
import moment from 'moment';
import { Link, Route } from 'react-router-dom';

let searchWord;
let setSearchWord;

function StudentList(params) {

    const studentList = useSelector((state) => state.studentList);
    const {students, loading, error } = studentList;
    [searchWord, setSearchWord] = useState("");
    
    const[studentId, setStudentId] = useState(0)

    const studentDelete = useSelector((state) => state.studentDelete);
  const {
    success: successDelete,
	error: errorDelete,
  } = studentDelete;

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
      dispatch(deleteStudent(id));
    };

  useEffect(() => {
    dispatch(listStudents());
  }, [successDelete]);

  const filteredResults = searchWord.length ? students.filter((student) => (`${student.user_first_name} ${student.user_last_name}`).toLowerCase().includes(searchWord.toLowerCase())) : students;

  return(
    <div>
      <div className="content-wrapper">
    	    <div className="container-fluid">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
        <Link to={{pathname:"/admin/dashboard"}}>Dashboard</Link>
        </li>
        <li class="breadcrumb-item active">Students-Users</li>
      </ol>

      
      <div class="card mb-3">
        	{loading && <Loading></Loading>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}


        {(students) && <div>
          <div className="create-user"><a  href="/admin/students/register">
			      <i class="fa fa-fw fa-plus-circle add2"></i>Register Users</a>
		    </div>


          <div class="card-header">
          <i class="fa fa-table"></i> Student/User List
          </div>

        <div class="card-body"> 
          <div class="table-responsive table_outer">
            <table class="table table-bordered  " id="studentList" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Student/User Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Country Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {filteredResults.map((student) => (
                <tr>
                  <td></td>
                  <td>{student.user_first_name} {student.user_last_name}</td>
                  <td>{student.user_email}</td>
                  <td>{student.country_code}-{student.user_contact_no}</td>
                  <td>{student.user_country_name}</td>
                  <td>
                  <a href={"/admin/students/"+student.user_id+"/details"}><div  className="btn_1 gray approve hover-icons"><i className="fa fa-fw fa-eye "></i><b> View</b></div></a>
                  <a  if="color" data-toggle="modal" data-target="#exampleModal7"><div onClick={()=>setStudentId(student.user_id)} className="btn_1 gray delete hover-icons"><i className="fa fa-fw fa-trash"></i><b> Delete</b></div></a>
                  <Link to={{ pathname: `/admin/students/${student.user_id}/update`, state: { student } }}><div className="btn_1 gray edit hover-icons"><i className="fa fa-fw fa-pencil hover-icons "></i><b> Edit</b></div></Link>
                  </td>
                </tr>
              ))}
              
              
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="card-footer small text-muted">Updated at {moment(Date.now()).local().format('DD-MM-YYYY HH:mm:ss')} IST </div>

        <div class="modal fade" id="exampleModal7" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
		        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">User will be permanently deleted and can't be undone. Select "Yes, Delete" below if you are ready to delete the user.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <div class="btn btn-danger" id="close" onClick={()=>deleteHandler(studentId)} data-dismiss="modal">Yes, Delete</div>
          </div>
        </div>
      </div>
    </div>




        </div>}
      </div>
      </div>
     
      </div>
    </div>
  )
  
}

export default StudentList;
export {setSearchWord};