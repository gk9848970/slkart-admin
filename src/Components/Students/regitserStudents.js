
import './student.css';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading';
import { Link, Route } from 'react-router-dom';
import MessageBox from '../MessageBox';
import { createStudent } from '../../actions/studentActions';

function RegisterStudent(props) {


  const [user_first_name, setuser_first_name] = useState('');
  const [user_last_name, setuser_last_name] = useState('');
  const [user_email, setuser_email] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [user_college_id, setuser_college_id] = useState(localStorage.getItem("inst_id"));
  const [country_code, set_country_code] = useState('');
  const [user_contact_no, setuser_contact_no] = useState(0);
  const [user_country_name, setuser_country_name] = useState('');
  const [user_state_name, setuser_state_name] = useState(0);
  const [user_city_name, setuser_city_name] = useState('');
  const [user_address, setuser_address] = useState('');
  const [zip_code, setzip_code] = useState('');
  const [user_gender, setuser_gender] = useState('Male');
  const [user_dob, setuser_dob] = useState('');

  console.log("college",user_college_id);
  const dispatch = useDispatch();

    const studentCreate = useSelector((state) => state.studentCreate);
      const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
      } = studentCreate;

  useEffect(() => {
        if(successSave)
          props.history.push('/admin/students')
}, [successSave]);


  const submitDataHandler = (e) => {

    e.preventDefault();

    // if(user_first_name&& user_last_name&&user_gender&&
    //   user_email&&user_dob&&user_country_name&&user_college_id&&
    //   user_contact_no&&user_state_name&&user_city_name&&country_code&&
    //   user_address&& password&&zip_code){
    if(password === confirmpassword){
      dispatch(createStudent(
        {
        user_first_name, user_last_name,user_gender,
        user_email,user_dob,user_country_name,user_college_id,
        user_contact_no,user_state_name,user_city_name,country_code,
        user_address, password,zip_code
        }
        ))
    }else{
        alert("Password and confirm Password doesn't match")
    }
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
              <li class="breadcrumb-item active">Add Students/Users</li>
            </ol>
            {(loadingSave)&& <Loading></Loading>}
		      {(errorSave) && <MessageBox variant="danger">{errorSave}</MessageBox>}
          <form onSubmit={submitDataHandler}>
            <div>
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-file"></i>Basic info</h2>
            </div>
            <div class="row">
              <div class="col-md-5">
                <div class="form-group">
                  <label className="required">First Name</label>
                  <input type="text" class="form-control" required onChange={(e) => setuser_first_name(e.target.value)} placeholder="First Name"/>
                </div>
              </div>
              <div class="col-md-5">
                <div class="form-group">
                  <label className="required">Last Name</label>
                  <input type="text" class="form-control" required onChange={(e) => setuser_last_name(e.target.value)} placeholder="Last Name"/>
                </div>
              </div>
            </div>
            {/* /row*/}
            <div class="row">
              <div class="col-md-5">
                <div class="form-group">
                  <label className="required">Email Id</label>
                  <input type="email" class="form-control" required onChange={(e) => setuser_email(e.target.value)} placeholder="example@speedlabs.com"/>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Gender</label>
                  <select name="gender" id="gender"  required onChange={(e) => setuser_gender(e.target.value)} class="form-control">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label className="required">Date of Birth</label>
                  <input type="date" class="form-control" required  onChange={(e) => setuser_dob(e.target.value)}/>
                </div>
              </div>
            </div>
            {/* /row*/}
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Password</label>
                  <input type="password" class="form-control"  required  onChange={(e) => setpassword(e.target.value)} placeholder="Password"/>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Confirm Password</label>
                  <input type="password" class="form-control"  required  onChange={(e) => setconfirmpassword(e.target.value)} placeholder="Confirm Password"/>
                </div>
              </div>
              {/* <div class="col-md-3">
                <div class="form-group">
                  <label className="required">College Id</label>
                  <input type="number" class="form-control" required  onChange={(e) => setuser_college_id(e.target.value)}/>
                </div>
              </div> */}
            </div>
            {/* /row*/}
            {/* /row*/}
          </div>
          {/* /box_general*/}
          
          <div class="box_general padding_bottom">
            <div class="header_box version_2">
              <h2><i class="fa fa-address-card"></i>Contact Details</h2>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                <label className="required">Country Code</label>
                  <input type="text" maxLength="3" class="form-control" required placeholder="+91" onChange={(e) => set_country_code(e.target.value)}/>
                </div>
                </div>
                <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Contact Number</label>
                  <input type="text" maxLength="10" class="form-control" required placeholde="0123456789" onChange={(e) => setuser_contact_no(e.target.value)}/>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label className="required">Country</label>
                  <input type="text" maxLength="20" class="form-control" placeholder="India" required  onChange={(e) => setuser_country_name(e.target.value)}/>
                </div>
              </div>
              <div class="col-md-5">
                <div class="form-group">
                  <label className="required">State</label>
                  <input type="text" maxLength="20" class="form-control" placeholder="Assam" required  onChange={(e) => setuser_state_name(e.target.value)}/>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label className="required" className="required">City Name</label>
                  <input type="text" class="form-control"  required  onChange={(e) => setuser_city_name(e.target.value)}/>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label className="required">PIN Code/Zip Code</label>
                  <input type="text" class="form-control"  required  onChange={(e) => setzip_code(e.target.value)}/>
                </div>
              </div>
          </div>

          <div class="row">
              <div class="col-md-10">
                <div class="form-group">
                  <label className="required">Address (Street/House No.)</label>
                  <textarea rows="2" class="form-control"  required onChange={(e) => setuser_address(e.target.value)} placeholder="Street/House No."></textarea>
                </div>
              </div>
          </div>

          </div>
          
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
          <div><p><a href="/admin/students" class="cancel-button">Cancel</a></p></div>
          </div>
          </div>
          </form>
           {/* /.container-fluid*/}
          </div>
           {/* /.container-wrapper*/}
          </div>
        </div>
    )
    
}

export default RegisterStudent;