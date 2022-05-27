import Login from "./Authentication/Auth-Componont/Login";
import './App.css';
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";
import './admin.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { myProductListReducer } from './reducers/productReducers';
import CreateCourses from "./Components/Products/MyProducts/CreateProduct";
import Coupons from "./Components/Coupons/Coupons";
import CreateCoupons from "./Components/Coupons/CreateCoupons";
import UpdateCoupons from "./Components/Coupons/UpdateCoupons";
import UpdateCourses from "./Components/Products/MyProducts/updateProduct";
import AllCategories from "./Components/Category/AllCategories";
import StudentList from "./Components/Students/StudentList";
import RegisterStudent from "./Components/Students/regitserStudents";
import UpdateStudent from "./Components/Students/updateStudent";
import UploadContents from "./Components/Products/MyProducts/uploadContent";
import ProductDescription from "./Components/Products/MyProducts/ProductDescription";
import StudentDescription from "./Components/Students/studentDetails";
import OrderDescription from "./Components/Orders/OrderDetails";
import OrderList from "./Components/Orders/OrderList";
import Courses from "./Components/Products/MyProducts/Courses";
import NavBar from "./Components/NavBar";
import {integrationDashboardBaseUrl} from "./Config";
import IdLogin from "./Components/Dashboard/IdLogin";

const adminLogoutApiUrl = "http://192.168.1.3:5000/auth/adminlogout";

function App() {
  
  return (

    <BrowserRouter>
    
{/* ************************    BODY *******************************/}
   
    <div className="fixed-nav sticky-footer" id="page-top">
  
  {/* Navigation*/}
    
  {/* /Navigation*/}
  <section id="top">

  <div className="routes">

{/* <Route exact path="/myproducts" component={MyProducts} /> */}
{/* <Route exact path="/createproducts" component={CreateProducts} /> */}
<Switch>
  <Route exact path="/" component={Login} />
  <Route exact path={["/auth/login/:instId"]} component={IdLogin} />
  {/*<Route exact path={["/", "/auth"]} component={Auth} />*/}
  {/*<Route exact path="auth/register" component={Register} />*/}
  <Route exact path={["/admin","/admin/dashboard/:token", "/admin/dashboard"]} component={Dashboard} />
  <Route exact path="/admin/courses" component={Courses} />
  <Route exact path="/admin/courses/create" component={CreateCourses} />
  <Route exact path="/admin/coupons" component={Coupons} />
  <Route exact path="/admin/coupons/createcoupons" component={CreateCoupons} />
  <Route exact path="/admin/coupons/:id/updatecoupon" component={UpdateCoupons} />
  <Route exact path="/admin/courses/:id/update" component={UpdateCourses} />
  <Route exact path="/admin/categories" component={AllCategories} />
  <Route exact path="/admin/students" component={StudentList} />
  <Route exact path="/admin/students/register" component={RegisterStudent} />
  <Route exact path="/admin/students/:id/update" component={UpdateStudent} />
  <Route exact path="/admin/students/:id/details" component={StudentDescription} />
  <Route exact path="/admin/courses/:id/upload" component={UploadContents} />
  <Route exact path="/admin/courses/:id/details" component={ProductDescription} />
  <Route exact path="/admin/orders" component={OrderList} />
  <Route exact path="/admin/orders/:id/details" component={OrderDescription} />
</Switch>
</div>
  

  {/* CONTENT */}

  </section>
    <footer className="sticky-footer">
      <div className="container">
        <div className="text-center">
          <small>Copyright © speedlabs</small>
        </div>
      </div>
    </footer>
    {/* Scroll to Top Button*/}
    <a className="scroll-to-top rounded" href="#top">
      <i className="fa fa-angle-up"></i>
    </a>
    {/* Logout Modal*/}
    <LogoutBox />
    
	
</div>

</BrowserRouter>
  );
}

function LogoutBox()
{
  const history = useHistory();

  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button className="btn btn-primary" data-dismiss="modal" onClick={() => {
              localStorage.removeItem("token");
              history.replace("/auth/login"); //Redirecting to login page
            }}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

